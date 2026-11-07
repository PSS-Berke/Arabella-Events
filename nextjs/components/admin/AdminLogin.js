'use client';
import { useState } from 'react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        window.location.reload();
        return;
      }
      setError(data.error || 'Couldn’t log in. Please try again.');
    } catch {
      setError('Couldn’t log in. Please try again.');
    }
    setBusy(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[360px]">
      <label htmlFor="admin-password" className="mb-2 block text-[11px] font-light uppercase tracking-[0.2em] text-brown">
        Password
      </label>
      <input
        id="admin-password"
        type="password"
        autoComplete="current-password"
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full border border-[#e0d6ca] bg-white px-4 py-3 text-[15px] font-light text-[#443221] outline-none focus:border-[#443221]"
      />
      <button
        type="submit"
        disabled={busy || !password}
        className="mt-5 w-full cursor-pointer border border-[#443221] bg-[#443221] px-8 py-3.5 text-[12px] font-light uppercase tracking-[0.24em] text-white transition-colors hover:bg-transparent hover:text-[#443221] disabled:cursor-default disabled:opacity-50"
      >
        {busy ? 'Logging in…' : 'Log in'}
      </button>
      {error ? <p role="alert" className="m-0 mt-4 text-[14px] text-[#c0392b]">{error}</p> : null}
    </form>
  );
}
