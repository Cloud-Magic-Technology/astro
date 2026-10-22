import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // @ts-ignore cloudflare:workers is resolved by workerd at runtime
    const { env } = await import('cloudflare:workers') as any;
    const kv = env.SHOWCASE_KV as any;
    const { key, value } = await request.json() as any;
    if (!key || !value) {
      return Response.json({ error: 'key and value required' }, { status: 400 });
    }
    await kv.put(key, value);
    return Response.json({ ok: true, key, value });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
};

export const GET: APIRoute = async ({ url }) => {
  try {
    // @ts-ignore cloudflare:workers is resolved by workerd at runtime
    const { env } = await import('cloudflare:workers') as any;
    const kv = env.SHOWCASE_KV as any;
    const key = url.searchParams.get('key');
    if (!key) {
      return Response.json({ error: 'key query param required' }, { status: 400 });
    }
    const value = await kv.get(key);
    return Response.json({ key, value, found: value !== null });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
};
