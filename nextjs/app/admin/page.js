import { adminConfigured, isAdmin } from '@/lib/admin-auth';
import { leadsConfigured, listLeads } from '@/lib/leads';
import AdminLogin from '@/components/admin/AdminLogin';
import LeadsTable from '@/components/admin/LeadsTable';

// Arabella's private inquiries page. Never cached, never indexed.
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Inquiries | AWE Admin',
  robots: { index: false, follow: false },
};

function Shell({ children }) {
  return (
    <main className="mx-auto w-full max-w-[1100px] px-4 pb-24 pt-10 sm:px-6 md:pt-12">
      <h1 className="m-0 mb-8 font-display text-[30px] font-normal uppercase tracking-[0.16em] text-[#443221] md:text-[34px]">Inquiries</h1>
      {children}
    </main>
  );
}

export default async function AdminPage() {
  if (!adminConfigured()) {
    return (
      <Shell>
        <p className="text-[15px] font-light text-[#4a3a2c]">
          Admin isn’t set up yet. Add an <code>ADMIN_PASSWORD</code> environment variable in Vercel and redeploy.
        </p>
      </Shell>
    );
  }
  if (!isAdmin()) {
    return (
      <Shell>
        <AdminLogin />
      </Shell>
    );
  }
  if (!leadsConfigured()) {
    return (
      <Shell>
        <p className="text-[15px] font-light text-[#4a3a2c]">
          The leads database isn’t connected yet. Connect a Neon database to this project in Vercel → Storage, then redeploy.
        </p>
      </Shell>
    );
  }

  let leads = [];
  let loadError = false;
  try {
    leads = await listLeads();
  } catch (err) {
    console.error('Admin: could not load leads', err);
    loadError = true;
  }

  return (
    <Shell>
      {loadError ? (
        <p role="alert" className="text-[15px] text-[#c0392b]">Couldn’t load inquiries right now. Please refresh in a minute.</p>
      ) : (
        <LeadsTable initialLeads={leads} />
      )}
    </Shell>
  );
}
