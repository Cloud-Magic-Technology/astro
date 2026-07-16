import { defineLiveCollection } from 'astro:content';
import { z } from 'astro/zod';
interface ReleaseData {
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  html_url: string;
}

interface LiveDataEntry<T> {
  id: string;
  data: T;
}

const githubReleasesLoader = {
  name: 'github-releases',

  async loadEntry({ filter }: { filter: { id: string } }) {
    try {
      const res = await fetch(
        `https://api.github.com/repos/withastro/astro/releases/tags/${filter.id}`,
        { headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'AstroLab' } }
      );
      if (!res.ok) {
        return { error: new Error(`GitHub API returned ${res.status}`) };
      }
      const release = await res.json() as any;
      return {
        id: release.tag_name,
        data: {
          tag_name: release.tag_name,
          name: release.name || release.tag_name,
          published_at: release.published_at,
          body: release.body || '',
          html_url: release.html_url,
        },
      };
    } catch (e) {
      return { error: e instanceof Error ? e : new Error(String(e)) };
    }
  },

  async loadCollection() {
    try {
      const res = await fetch(
        'https://api.github.com/repos/withastro/astro/releases?per_page=10',
        { headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'AstroLab' } }
      );
      if (!res.ok) {
        return { error: new Error(`GitHub API returned ${res.status}`) };
      }
      const releases = await res.json() as any[];
      const entries: LiveDataEntry<ReleaseData>[] = releases.map((r: any) => ({
        id: r.tag_name,
        data: {
          tag_name: r.tag_name,
          name: r.name || r.tag_name,
          published_at: r.published_at,
          body: r.body || '',
          html_url: r.html_url,
        },
      }));
      return { entries, cacheHint: { maxAge: 300 } };
    } catch (e) {
      return { error: e instanceof Error ? e : new Error(String(e)) };
    }
  },
};

const githubReleases = defineLiveCollection({
  type: 'live',
  loader: githubReleasesLoader as any,
  schema: z.object({
    tag_name: z.string(),
    name: z.string(),
    published_at: z.string(),
    body: z.string(),
    html_url: z.string(),
  }),
});

export const collections = { githubReleases };
