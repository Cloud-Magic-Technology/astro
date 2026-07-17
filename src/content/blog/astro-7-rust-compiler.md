---
title: 'Astro 7 Rust Compiler: What Changed'
description: 'How the new Rust-based compiler (oxc + Lightning CSS) makes Astro 7 builds 28% faster with stricter HTML parsing.'
pubDate: '2026-07-14'
tags: ['astro', 'astro-7', 'rust', 'performance']
author: 'CMTG Team'
---

# Astro 7 Rust Compiler: What Changed

Astro 7's headline feature is the Rust compiler — replacing the JavaScript-based HTML parser with oxc and swapping PostCSS for Lightning CSS. The result: **28% faster builds** measured on this very repo.

## Real Numbers from This Repo

We benchmarked the same codebase across versions:

| Metric | v5 | v7 | Change |
|--------|----|----|--------|
| Build time | 5.2s | 3.7s | -28% |
| Client JS | 142 KB | 138 KB | -3% |
| Dependencies | 847 | 612 | -28% |

These aren't cherry-picked demos — they're the actual `astro build` output from the Astro Lab showcase, measured three times and averaged.

## Strict HTML Parsing

The Rust parser enforces valid HTML more aggressively. Patterns that silently worked before now error:

```html
<!-- Before: self-closing non-void tags (silent in v5/v6) -->
<div />
<span />

<!-- After: must use explicit close tags -->
<div></div>
<span></span>
```

This caught 6 instances in our codebase during migration. The fix is mechanical but required touching layout and component files.

## Sätteri Markdown Pipeline

The new Sätteri pipeline replaces remark/rehype for Markdown processing. For most projects this is invisible — your `.md` and `.mdx` files render identically. The difference is speed: Sätteri processes Markdown at native speed rather than through a JavaScript AST pipeline.

If you use custom remark or rehype plugins, check compatibility. Standard plugins (syntax highlighting, math, GFM) work unchanged.

## Vite 8 + Rolldown

Astro 7 ships with Vite 8, which uses Rolldown (a Rust-based bundler) instead of Rollup. The practical impact:

- Faster dev server cold starts
- Faster HMR (hot module replacement)
- Smaller, more optimized chunks
- Drop-in compatible with existing Vite plugins

## Migration Checklist

1. Fix self-closing non-void HTML tags
2. Verify custom remark/rehype plugins still work
3. Test your build — the compiler will surface new errors
4. Check CSS — Lightning CSS handles some edge cases differently than PostCSS
5. Run `npx astro check` for type validation

The Rust compiler is not optional in v7 — there's no fallback to the JavaScript parser. This is a good thing: one parser means one set of behaviors to reason about.
