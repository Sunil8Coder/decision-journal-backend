import { json } from '../utils/response';
import type { Env } from '../env';

export async function analyticsRoutes(
  req: Request,
  env: Env,
  pathname: string
) {
  if (req.method !== 'GET' || pathname !== '/api/bias-patterns') return null;

  const { results } = await env.DB.prepare(
    `SELECT biasDetected FROM decisions WHERE biasDetected IS NOT NULL`
  ).all();

  const counter: Record<string, number> = {};

  results.forEach((r: any) => {
    JSON.parse(r.biasDetected).forEach((b: string) => {
      counter[b] = (counter[b] || 0) + 1;
    });
  });

  return json(
    Object.entries(counter).map(([name, count]) => ({
      name,
      count,
      description: `${name} detected ${count} times`,
    }))
  );
}
