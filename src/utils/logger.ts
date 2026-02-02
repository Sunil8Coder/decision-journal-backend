import type { Env } from '../env';

export async function logRequest(
  env: Env,
  data: {
    requestId: string;
    method: string;
    path: string;
    status: number;
    duration: number;
    ip?: string;
    userId?: string;
  }
) {
  // Console log (Cloudflare native)
  console.log(
    JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
    })
  );

  // Persist log (non-blocking)
  try {
    await env.DB.prepare(
      `INSERT INTO request_logs 
       (id, method, path, status, duration, ip, userId, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      data.requestId,
      data.method,
      data.path,
      data.status,
      data.duration,
      data.ip ?? null,
      data.userId ?? null,
      new Date().toISOString()
    ).run();
  } catch (e) {
    console.error('Log insert failed', e);
  }
}
