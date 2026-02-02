import { json } from '../utils/response';
import { signJWT } from '../auth';
import type { Env } from '../env';

export async function authRoutes(
  req: Request,
  env: Env,
  pathname: string
): Promise<Response | null> {
  // ---- LOGIN ----
  if (req.method === 'POST' && pathname === '/api/login') {
    const body = await req.json();
    const email = body?.email;

    if (!email) {
      return json({ message: 'Email is required' }, 400);
    }

    const token = await signJWT(
      {
        sub: crypto.randomUUID(),
        email,
        iss: env.JWT_ISSUER,
        aud: env.JWT_AUDIENCE,
      },
      env.JWT_SECRET
    );

    return json({ token });
  }

  return null;
}
