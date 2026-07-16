# Astro Lab — Power & Evolution Showcase

One codebase. Three major versions. Every feature, proven live.

An immersive showcase demonstrating Astro's evolution from v5 through v6 to v7, with real benchmarks, live feature demos, and cross-framework state sharing. Built with React 19, Vue 3.5, Svelte 5, Tailwind 4, and deployed to Cloudflare Workers.

## Pages

### Act I — Evolution
| Route | Description |
|-------|-------------|
| `/` | Narrative homepage with three-act structure (zero client JS) |
| `/evolution` | Interactive v5→v6→v7 timeline with animated metrics |

### Act II — Feature Demos
| Route | Version | Description |
|-------|---------|-------------|
| `/v7/advanced-routing` | v7 | `src/fetch.ts` pipeline composition with live response headers |
| `/v7/route-caching` | v7 | CDN cache directives with Cloudflare provider (SSR) |
| `/v7/rust-pipeline` | v7 | Real build benchmarks + strict HTML gotchas |
| `/v7/agent-dev` | v7 | Background dev server, JSON logs, health endpoints |
| `/v6/live-content` | v6 | GitHub releases fetched at request time (SSR) |
| `/v6/platform-parity` | v6 | Cloudflare KV via `cloudflare:workers` import |
| `/playground` | v5 | Hydration strategies across React/Vue/Svelte |
| `/state-sharing` | v5 | Cross-framework cart (Nano Stores) |
| `/transitions` | v5 | View Transitions gallery |
| `/server-islands` | v5 | Static + dynamic content mixing |
| `/api-demo` | v5 | Server endpoints |
| `/content-power` | v5 | MDX + Content Collections |

### Act III — Performance
| Route | Description |
|-------|-------------|
| `/performance` | Real v5 vs v7 build metrics with animated charts |
| `/blog` | Content collection-powered blog |

## v5 → v7 Migration Summary

| Metric | v5 (5.17.1) | v7 (7.0.9) | Change |
|--------|-------------|------------|--------|
| Build time (median) | 24.6s | 17.8s | **-27.5%** |
| dist/ size | 2,093 KB | 387 KB | **-81.5%** |
| Client JS | 332 KB | 328 KB | -1.1% |
| HTML pages | 21 | 25+ | +4 static (+SSR) |

See `MIGRATION_AUDIT.md` for the full migration log.

## Tech Stack

- **Framework:** Astro 7.0.9 (Rust compiler, Sätteri markdown, Vite 8 + Rolldown)
- **UI Frameworks:** React 19, Vue 3.5, Svelte 5
- **Styling:** Tailwind CSS 4 (Vite plugin)
- **State:** Nano Stores (cross-framework)
- **Content:** MDX + Content Collections (build-time) + Live Collections (request-time)
- **Deployment:** Cloudflare Workers via `@astrojs/cloudflare` 14.1.3
- **Fonts:** Inter + JetBrains Mono via Astro Fonts API

## Project Structure

```
src/
├── components/
│   ├── evolution/     # Timeline components
│   ├── performance/   # ComparisonChart.svelte, AnimatedNumber.svelte
│   ├── state/         # ProductCard.tsx, CartSidebar.vue, CheckoutButton.svelte
│   ├── shared/        # CodeBlock.astro, InfoBox.astro
│   └── ...
├── content/
│   ├── blog/          # Markdown blog posts
│   └── showcase/      # MDX showcase content
├── layouts/           # Layout.astro (three-act navigation)
├── pages/
│   ├── v7/            # Astro 7 feature demos
│   ├── v6/            # Astro 6 feature demos
│   ├── api/           # Server endpoints
│   ├── blog/          # Blog routes
│   └── transitions/   # View Transitions gallery
├── stores/            # cart.ts (Nano Stores cross-framework state)
├── styles/            # global.css (Tailwind + font theme)
├── fetch.ts           # Request pipeline (v7 Advanced Routing)
├── content.config.ts  # Build-time collections
└── live.config.ts     # Live collections (GitHub releases)
benchmarks/            # Real measured build metrics (v5, v6, v7)
```

## Getting Started

```bash
npm install
npm run dev       # Start dev server (workerd parity)
npm run build     # Production build
npm run preview   # Preview production build
```

## Deployment

Deployed to Cloudflare Workers. See `wrangler.jsonc` for configuration.

```bash
npx wrangler deploy
```

## Credits

A [Cloud Magic Software Group](https://cloudmagic.software) showcase.

Built with [Astro](https://astro.build) and [Claude Code](https://claude.ai/code).
