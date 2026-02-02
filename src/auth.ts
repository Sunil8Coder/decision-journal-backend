export async function verifyJWT(token: string, secret: string) {
  const [header, payload, signature] = token.split('.');
  if (!signature) throw new Error('Invalid token');

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    Uint8Array.from(atob(signature), c => c.charCodeAt(0)),
    encoder.encode(`${header}.${payload}`)
  );

  if (!valid) throw new Error('Invalid signature');

  const decoded = JSON.parse(atob(payload));
  const now = Math.floor(Date.now() / 1000);

  if (decoded.exp < now) throw new Error('Token expired');

  return decoded;
}
