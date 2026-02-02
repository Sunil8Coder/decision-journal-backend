import type { Env } from './env';
import { decisionRoutes } from './routes/decision.routes';
import { analyticsRoutes } from './routes/analytics.routes';
import { authRoutes } from './routes/auth.routes'; // ✅ NEW
import { logRequest } from './utils/logger';

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const start = Date.now();
    const requestId = crypto.randomUUID();
    const { pathname } = new URL(req.url);
    let res: Response | null = null;

    try {
      res =
        (await authRoutes(req, env, pathname)) ||
        (await decisionRoutes(req, env, pathname)) ||
        (await analyticsRoutes(req, env, pathname)) ||
        new Response('Not Found', { status: 404 });

      return res;
    } finally {
      await logRequest(env, {
        requestId,
        method: req.method,
        path: pathname,
        status: res?.status ?? 500,
        duration: Date.now() - start,
        ip: req.headers.get('cf-connecting-ip') ?? undefined,
      });
    }
  },
};
