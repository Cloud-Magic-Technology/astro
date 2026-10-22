# Migration Audit: Astro 5 → 7

## Summary

This repo migrated directly from Astro 5.17.1 to Astro 7.0.2 (skipping v6 as a separate step). The migration was performed via `npx @astrojs/upgrade` followed by manual fixes.

## Dependency Changes

| Package | v5 | v7 | Notes |
|---------|----|----|-------|
| `astro` | 5.17.1 | 7.0.2 | Core framework |
| `@astrojs/cloudflare` | 12.6.12 | 14.0.0 | Adapter rebuild: workerd in dev |
| `@astrojs/mdx` | 4.3.13 | 7.0.0 | Sätteri Rust markdown pipeline |
| `@astrojs/react` | 4.4.2 | 6.0.0 | React 19 compatibility |
| `@astrojs/svelte` | 7.2.5 | 9.0.0 | Svelte 5 compatibility |
| `@astrojs/vue` | 5.1.4 | 7.0.0 | Vue 3.5 compatibility |
| `react` | 19.2.4 | 19.2.4 | Unchanged |
| `vue` | 3.5.x | 3.5.27 | Unchanged |
| `svelte` | 5.x | 5.49.1 | Unchanged |
| `tailwindcss` | 4.1.x | 4.1.18 | Unchanged |
| `nanostores` | 1.1.0 | 1.1.0 | Unchanged |

**Total dependency tree:** 1377 (v5) → 1540 (v7)

## Removed/Changed APIs

### `<ViewTransitions />` → `<ClientRouter />`
- **Files affected:** `src/layouts/Layout.astro`, `src/pages/transitions/index.astro`
- **Change:** Import changed from `import { ViewTransitions } from 'astro:transitions'` to `import { ClientRouter } from 'astro:transitions'`
- **Component renamed:** `<ViewTransitions />` → `<ClientRouter />`

### `wrangler.jsonc` main field
- **Old:** `"main": "dist/_worker.js/index.js"` (direct path to build output)
- **New:** `"main": "@astrojs/cloudflare/entrypoints/server"` (adapter-managed entrypoint)
- **Reason:** Cloudflare adapter v14 manages the worker entrypoint; pointing to `dist/` caused build failures because the file doesn't exist before the first build

### Content Collections
- Already using the modern `content.config.ts` pattern with `glob` loader (no migration needed)
- `defineCollection` and `z` imported from `astro:content` (current pattern)
- No legacy `src/content/config.ts` found

## APIs Checked — Not Found (Clean)

| Pattern | Status |
|---------|--------|
| `Astro.glob()` | Not used |
| `Astro.locals.runtime` | Not used |
| `emitESMImage` | Not used |
| `astro:db` | Not used |
| Legacy content config (`src/content/config.ts`) | Not present |
| Zod 3 patterns | Not applicable (using `astro:content` z export) |

## Rust Compiler (v7)

Astro 7 ships a Rust-based compiler (oxc + Lightning CSS) with stricter HTML parsing. The v7 build succeeded without HTML strictness errors on this codebase. No self-closing non-void tags (`<div />`) were found.

## Sätteri Markdown Pipeline (v7)

Astro 7 replaces the JS-based remark/rehype markdown pipeline with the Rust-based Sätteri pipeline. This repo uses no custom remark or rehype plugins, so the migration was transparent. Blog `.md` files and showcase `.mdx` files render correctly under Sätteri.

## Vite 8 / Rolldown (v7)

Astro 7 ships with Vite 8 and the Rolldown bundler. The `@tailwindcss/vite` plugin and all framework integrations (React, Vue, Svelte, MDX) build successfully under Rolldown. No `esbuild` or `rollupOptions` config existed to clean up.

## Build Performance Comparison

| Metric | v5 (5.17.1) | v7 (7.0.2) | Change |
|--------|-------------|------------|--------|
| Build time (median of 3) | 24,612 ms | 17,832 ms | **-27.5%** |
| dist/ size | 2,143,248 bytes | 395,950 bytes | **-81.5%** |
| HTML pages | 21 | 22 | +1 |
| Client JS | 339,471 bytes | 335,735 bytes | **-1.1%** |
| Client CSS | 55,321 bytes | 56,355 bytes | +1.9% |
| Dependency count | 1,377 | 1,540 | +11.8% |

The dramatic reduction in `dist/` size (81.5%) is primarily due to the Cloudflare adapter v14 restructuring how worker output is bundled — the v5 adapter emitted a larger `_worker.js` directory structure.

## Features Not Yet Wired Up (Planned)

- [ ] Fonts API (`astro.config.mjs` fonts config)
- [ ] CSP support (`security.csp`)
- [ ] Live Content Collections (`defineLiveCollection`)
- [ ] `src/fetch.ts` Advanced Routing pipeline
- [ ] Route Caching with Cloudflare CDN provider
- [ ] Cloudflare KV binding demo
