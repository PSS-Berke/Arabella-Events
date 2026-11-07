import { cookies } from 'next/headers';
import { ADMIN_COOKIE, SESSION_DAYS, adminConfigured, newSessionValue, passwordMatches } from '@/lib/admin-auth';

// POST { password } logs in; DELETE logs out.
export async function POST(request) {
  if (!adminConfigured()) {
    return Response.json({ error: 'Admin login is not set up yet.' }, { status: 503 });
  }
  const body = await request.json().catch(() => ({}));
  if (!passwordMatches(body?.password)) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    return Response.json({ error: 'That password isn’t right.' }, { status: 401 });
  }
  cookies().set(ADMIN_COOKIE, newSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
  return Response.json({ ok: true });
}

export async function DELETE() {
  cookies().delete(ADMIN_COOKIE);
  return Response.json({ ok: true });
}
