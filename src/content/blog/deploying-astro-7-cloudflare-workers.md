---
title: 'Deploying Astro 7 to Cloudflare Workers'
description: 'A walkthrough of deploying an SSR Astro 7 site to Cloudflare Workers with KV bindings and the new cloudflare:workers import.'
pubDate: '2026-07-01'
tags: ['astro', 'astro-7', 'cloudflare', 'deployment']
author: 'CMTG Team'
---

# Deploying Astro 7 to Cloudflare Workers

Astro Lab runs on Cloudflare Workers — not Pages. Here's how we set it up and what changed from the v6 deployment model.

## Workers, Not Pages

Astro 7 with `@astrojs/cloudflare` deploys as a Worker, not a Pages project. The key difference: Workers give you access to bindings (KV, D1, R2, Queues) directly, and your `wrangler.jsonc` controls the deployment — not the Pages build settings dashboard.

```jsonc
// wrangler.jsonc
{
  "name": "astro-lab",
  "main": "@astrojs/cloudflare/entrypoints/server",
  "assets": { "directory": "dist/client", "binding": "ASSETS" },
  "kv_namespaces": [
    { "binding": "SHOWCASE_KV", "id": "..." }
  ]
}
```

## The New cloudflare:workers Import

Astro 6 accessed Cloudflare bindings through `Astro.locals.runtime.env`. Astro 7 (via `@astrojs/cloudflare` v13+) uses the standard `cloudflare:workers` module:

```typescript
// Before (Astro 6)
const kv = Astro.locals.runtime.env.SHOWCASE_KV;

// After (Astro 7)
import { env } from 'cloudflare:workers';
const kv = env.SHOWCASE_KV;
```

The new import works in API routes, middleware, and server-rendered pages. It's the same API that standalone Workers use — no Astro-specific adapter layer.

## KV in Practice

Astro Lab uses KV for the platform parity demo. Writing and reading is straightforward:

```typescript
// src/pages/api/kv-demo.ts
import { env } from 'cloudflare:workers';

export const POST: APIRoute = async ({ request }) => {
  const { key, value } = await request.json();
  await env.SHOWCASE_KV.put(key, value);
  return new Response(JSON.stringify({ ok: true }));
};

export const GET: APIRoute = async ({ url }) => {
  const key = url.searchParams.get('key');
  const value = await env.SHOWCASE_KV.get(key);
  return new Response(JSON.stringify({ key, value }));
};
```

## Astro Config

```javascript
// astro.config.mjs
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
});
```

That's it. No `output: 'hybrid'` (removed in Astro 7), no special build flags.

## Deployment

We use `cf-token` for scoped, auto-revoking API tokens:

```bash
cf-token auto astro-lab --preset project -- npx wrangler deploy
```

This mints a token with exactly the permissions Wrangler needs, runs the deploy, and revokes the token — even if the deploy fails. Nothing lingers.

## Static Assets

Astro splits the build into `dist/client` (static assets) and `dist/server` (Worker code). The `assets` binding in `wrangler.jsonc` serves static files from the Workers runtime — no separate CDN configuration needed.

Static assets get immutable `Cache-Control` headers automatically via `@astrojs/cloudflare`'s `_headers` injection for the `/_astro/*` path.

## Gotchas

1. **No `output: 'hybrid'`** — Astro 7 removed it. Use `output: 'server'` and `export const prerender = true` on individual pages
2. **`cloudflare:workers` only resolves at runtime** — your editor will show type errors; use `@ts-ignore` or ambient type declarations
3. **KV namespaces need preview IDs for local dev** — `wrangler dev` uses a separate namespace; set `preview_id` in `wrangler.jsonc`
