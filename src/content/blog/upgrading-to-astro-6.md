---
title: 'Upgrading to Astro 6'
description: 'A practical guide to the breaking changes in Astro 6 and how to migrate your project.'
pubDate: '2026-05-27'
tags: ['astro', 'upgrade', 'astro-6', 'migration']
author: 'CMTG Team'
---

# Upgrading to Astro 6

Astro 6 ships with Vite 7, Zod 4, and Node 22 as its foundation. Most codebases need only a handful of targeted changes — here's everything that matters.

## What Requires Code Changes

### `ViewTransitions` is now `ClientRouter`

The component that enables SPA-like navigation was renamed. Update your layout:

```astro
---
// Before
import { ViewTransitions } from 'astro:transitions';

// After
import { ClientRouter } from 'astro:transitions';
---

<head>
  <ClientRouter />
</head>
```

### `z` moves out of `astro:content`

Astro now ships Zod 4, and the `z` export has moved to its own module:

```typescript
// Before
import { defineCollection, z } from 'astro:content';

// After
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
```

Zod 4 also changes some validator locations. String format validators that were methods are now top-level:

```typescript
// Zod 3
z.string().email()
z.string().url()

// Zod 4
z.email()
z.url()
```

### `.default()` values must match output type

If your schema transforms a field, the default must be the post-transform value:

```typescript
// Zod 3 (broken in Zod 4)
views: z.string().transform(Number).default("0"),

// Zod 4 (correct)
views: z.string().transform(Number).default(0),
```

Use `.prefault()` if you want the old behavior where defaults are parsed through the transform.

### Cloudflare adapter: new `wrangler.jsonc` entrypoint

The adapter no longer builds a worker file you point `main` at. It now exposes a package entrypoint:

```jsonc
// Before
{ "main": "dist/_worker.js/index.js" }

// After
{ "main": "@astrojs/cloudflare/entrypoints/server" }
```

### `import.meta.env` values are always strings

Environment variables are no longer coerced to booleans or numbers:

```typescript
// Before (worked in v5)
const enabled: boolean = import.meta.env.ENABLED;

// After (explicit coercion required)
const enabled: boolean = import.meta.env.ENABLED === "true";
```

## New Defaults Worth Knowing

**Images no longer upscale** — the default image service won't enlarge images smaller than the requested dimensions. Review any images with explicit `width`/`height` props.

**`<script>` and `<style>` tags render in source order** — v5 reversed them. If you relied on that, you may need to reorder tags.

**`i18n.routing.redirectToDefaultLocale` defaults to `false`** — only relevant if you use i18n routing.

## Dependency Floors

| Dependency | Minimum |
|------------|---------|
| Node.js    | 22.12.0 |
| Vite       | 7.0     |

## Packages Updated in This Project

| Package | v5 | v6 |
|---------|----|----|
| `astro` | 5.17 | 6.3 |
| `@astrojs/react` | 4.4 | 5.0 |
| `@astrojs/svelte` | 7.2 | 8.1 |
| `@astrojs/vue` | 5.1 | 6.0 |
| `@astrojs/mdx` | 4.3 | 5.0 |
| `@astrojs/cloudflare` | 12.6 | 13.5 |
