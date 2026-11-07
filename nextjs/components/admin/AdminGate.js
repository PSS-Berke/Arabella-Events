import { adminConfigured, isAdmin } from '@/lib/admin-auth';
import AdminLogin from '@/components/admin/AdminLogin';

// Shared frame for admin pages. Returns the login form (or a setup note)
// when the visitor isn't logged in, otherwise null so the page renders.
export function AdminShell({ title, action, children }) {
  return (
    <main className="mx-auto w-full max-w-[1100px] px-4 pb-24 pt-10 sm:px-6 md:pt-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h1 className="m-0 font-display text-[30px] font-normal uppercase tracking-[0.16em] text-[#443221] md:text-[34px]">{title}</h1>
        {action}
      </div>
      {children}
    </main>
  );
}

export function adminGate(title) {
  if (!adminConfigured()) {
    return (
      <AdminShell title={title}>
        <p className="text-[15px] font-light text-[#4a3a2c]">
          Admin isn’t set up yet. Add an <code>ADMIN_PASSWORD</code> environment variable in Vercel and redeploy.
        </p>
      </AdminShell>
    );
  }
  if (!isAdmin()) {
    return (
      <AdminShell title="Admin">
        <AdminLogin />
      </AdminShell>
    );
  }
  return null;
}
