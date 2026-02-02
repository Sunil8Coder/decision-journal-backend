
import { json } from '../utils/response';
import { requireAuth } from '../middleware/auth';
import * as service from '../services/decision.service';
import type { Env } from '../env';

export async function decisionRoutes(
  req: Request,
  env: Env,
  pathname: string
) {
  const user = await requireAuth(req, env);
  if (!user) return json({ message: 'Unauthorized' }, 401);

  if (req.method === 'POST' && pathname === '/api/decisions') {
    const body = await req.json();
    return json(await service.createDecision(env, body), 201);
  }

  if (req.method === 'GET' && pathname === '/api/decisions') {
    const { results } = await service.getAllDecisions(env);
    return json(results);
  }

  if (req.method === 'GET' && pathname.startsWith('/api/decisions/')) {
    const id = pathname.split('/').pop()!;
    const result = await service.getDecisionById(env, id);
    return result ? json(result) : json({ message: 'Not found' }, 404);
  }

  if (req.method === 'PUT' && pathname.endsWith('/review')) {
    const id = pathname.split('/')[3];
    const body = await req.json();
    await service.reviewDecision(env, id, body);
    return json({ success: true });
  }

  return null;
}
