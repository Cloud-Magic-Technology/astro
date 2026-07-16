// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';
import vue from '@astrojs/vue';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import { cacheCloudflare } from '@astrojs/cloudflare/cache';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), vue(), svelte(), mdx()],

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-sans',
      weights: [400, 500, 600, 700],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: [400, 500, 700],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],

  security: {
    checkOrigin: true,
  },

  cache: {
    provider: cacheCloudflare(),
  },

  routeRules: {
    '/api/stats': { maxAge: 60, swr: 30 },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});
