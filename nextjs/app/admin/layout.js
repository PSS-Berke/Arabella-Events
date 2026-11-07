import { isAdmin } from '@/lib/admin-auth';
import AdminNav from '@/components/admin/AdminNav';

// Private admin area: its own bar instead of the site menu (see SiteChrome).
export const metadata = { robots: { index: false, follow: false } };

export default function AdminLayout({ children }) {
  const authed = isAdmin();
  return (
    <div className="min-h-screen bg-[#faf7f3] text-[#443221]">
      {authed ? <AdminNav /> : null}
      {children}
    </div>
  );
}
