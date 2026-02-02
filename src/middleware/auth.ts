import { verifyJWT } from '../auth';
import type { Env } from '../env';

export async function requireAuth(req: Request, env: Env) {
  const auth = req.headers.get('Authorization');
  if (!auth?.startsWith('Bearer ')) return null;

  try {
    return await verifyJWT(auth.replace('Bearer ', ''), env.JWT_SECRET);
  } catch {
    return null;
  }
}
