# Astro Lab — TODO

**Last Updated**: 2026-07-16
**Status**: v7.0.0 shipped
**GitHub Repo**: https://github.com/Cloud-Magic-Technology/astro

## Completed (v7.0.0 Release)

- [x] Upgrade to Astro 7.0.9 (React 19, Vue 3.5, Svelte 5, MDX 7, CF adapter 14)
- [x] Wire up Fonts API (Inter + JetBrains Mono)
- [x] Implement src/fetch.ts Advanced Routing pipeline
- [x] Configure Route Caching with Cloudflare CDN provider
- [x] Add Live Content Collections (GitHub releases)
- [x] Create KV binding and API demo
- [x] Capture real benchmarks (v5, v6-attributed, v7, v7-with-infra)
- [x] Rebuild homepage as narrative entry point (zero client JS)
- [x] Rebuild evolution page as v5→v6→v7 timeline
- [x] Rebuild performance page with real measured data
- [x] Create 4 v7 demo pages (advanced-routing, route-caching, rust-pipeline, agent-dev)
- [x] Create 2 v6 demo pages (live-content, platform-parity)
- [x] Restructure navigation (three-act + dropdowns)
- [x] Rewrite README with full page table and migration summary
- [x] Write MIGRATION_AUDIT.md

## Post-Launch

### GitHub Release
- [ ] Create GitHub Release for v7.0.0 tag with benchmark table
- [ ] Add repo description: "Astro 7 showcase — v5→v6→v7 evolution with real benchmarks, live demos, cross-framework state"
- [ ] Set topics: `astro`, `astro-7`, `islands-architecture`, `cloudflare-workers`, `showcase`, `react`, `vue`, `svelte`

### Deploy
- [ ] Deploy to Cloudflare Workers via `cf-token auto astro-lab --preset project -- npx wrangler deploy`
- [ ] Verify live site KV demo and live content pages work in production
- [ ] Set up custom domain if desired

### Community
- [ ] Post to r/astrojs with benchmark comparison
- [ ] Share in Astro Discord #showcase channel
- [ ] Blog post: "Migrating a Real Site from Astro 5 to 7"

### Future Enhancements
- [ ] Add Lighthouse CI to GitHub Actions
- [ ] Implement CSP when compatible with ClientRouter (blocked as of Astro 7.0.9)
- [ ] Add more live collection sources (npm downloads, Discord stats)
- [ ] Interactive benchmark runner page (build on-demand and compare)
