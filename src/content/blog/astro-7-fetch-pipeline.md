---
title: 'Building a Composable Fetch Pipeline in Astro 7'
description: 'How src/fetch.ts lets you compose middleware for timing, logging, and custom headers without touching your routes.'
pubDate: '2026-07-10'
tags: ['astro', 'astro-7', 'routing', 'middleware']
author: 'CMTG Team'
---

# Building a Composable Fetch Pipeline in Astro 7

Astro 7 introduces `src/fetch.ts` — a composable request pipeline that intercepts every incoming request before it reaches your routes. Think of it as middleware composition, but at the fetch level.

## The Pipeline Pattern

```typescript
// src/fetch.ts
import type { FetchPipeline } from 'astro';

const timing: FetchPipeline = (next) => async (request, context) => {
  const start = performance.now();
  const response = await next(request, context);
  const ms = (performance.now() - start).toFixed(1);
  response.headers.set('X-Response-Time', `${ms}ms`);
  return response;
};

const logging: FetchPipeline = (next) => async (request, context) => {
  const response = await next(request, context);
  console.log(JSON.stringify({
    method: request.method,
    url: new URL(request.url).pathname,
    status: response.status,
  }));
  return response;
};

export default [timing, logging];
```

Each pipeline function wraps the next, creating a chain. The first function in the array runs first (outermost wrapper), and the last runs closest to the route handler.

## Why Not Middleware?

Astro already has `src/middleware.ts`. The fetch pipeline operates at a different level:

- **Middleware** runs inside Astro's request lifecycle, after routing
- **Fetch pipeline** runs at the platform level, before Astro processes the request

This means the fetch pipeline can:
- Add response headers that survive Astro's processing
- Measure total response time including Astro's own overhead
- Short-circuit requests before they enter the Astro pipeline
- Integrate with platform-specific features (Cloudflare Workers, Deno, etc.)

## Practical Use: Custom Headers

Every response from Astro Lab includes custom headers added by the fetch pipeline:

```
X-Response-Time: 12.3ms
X-Powered-By: Astro-Lab
```

Check them yourself — open DevTools on any page and inspect the response headers.

## Composability

The pipeline array is just functions. You can conditionally include stages:

```typescript
const pipeline = [timing, logging];

if (import.meta.env.PROD) {
  pipeline.push(securityHeaders);
}

export default pipeline;
```

Or compose pipelines from shared libraries across projects. The pattern is the same one used by Hono, itty-router, and other modern server frameworks — functions wrapping functions.
