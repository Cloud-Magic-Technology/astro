import { FetchState, astro } from 'astro/fetch';

export default {
  async fetch(request: Request): Promise<Response> {
    const start = performance.now();
    const state = new FetchState(request);

    const response = await astro(state);

    const duration = (performance.now() - start).toFixed(2);
    response.headers.set('X-Response-Time', `${duration}ms`);
    response.headers.set('X-Powered-By', 'Astro-Lab');

    const url = new URL(request.url);
    console.log(JSON.stringify({
      method: request.method,
      path: url.pathname,
      status: response.status,
      duration_ms: parseFloat(duration),
      timestamp: new Date().toISOString(),
    }));

    return response;
  },
};
