// Password login for the /admin page (server only). One shared password in
// the ADMIN_PASSWORD env var; a signed cookie keeps Arabella logged in for 30
// days. Changing ADMIN_PASSWORD in Vercel logs everyone out.
import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'awe_admin';
export const SESSION_DAYS = 30;

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function sign(value) {
  return createHmac('sha256', process.env.ADMIN_PASSWORD).update(`awe-admin:${value}`).digest('hex');
}

function safeEqual(a, b) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function passwordMatches(input) {
  if (!adminConfigured() || typeof input !== 'string' || !input) return false;
  // Compare fixed-length digests so the check takes the same time either way.
  const digest = (s) => createHmac('sha256', 'awe-admin-compare').update(s).digest('hex');
  return safeEqual(digest(input), digest(process.env.ADMIN_PASSWORD));
}

export function newSessionValue() {
  const expires = String(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  return `${expires}.${sign(expires)}`;
}

export function isAdmin() {
  if (!adminConfigured()) return false;
  const value = cookies().get(ADMIN_COOKIE)?.value;
  if (!value) return false;
  const [expires, signature] = value.split('.');
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  return safeEqual(signature, sign(expires));
}
