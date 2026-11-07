import { isAdmin } from '@/lib/admin-auth';
import { deleteLead, setContacted } from '@/lib/leads';

// PATCH { id, contacted } marks a lead contacted or not; DELETE { id } removes it.
// Both require the admin login cookie.
export async function PATCH(request) {
  if (!isAdmin()) return Response.json({ error: 'Please log in again.' }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  try {
    await setContacted(body?.id, body?.contacted);
    return Response.json({ ok: true });
  } catch (err) {
    console.error('Admin: could not update lead', err);
    return Response.json({ error: 'Could not update that inquiry.' }, { status: 400 });
  }
}

export async function DELETE(request) {
  if (!isAdmin()) return Response.json({ error: 'Please log in again.' }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  try {
    await deleteLead(body?.id);
    return Response.json({ ok: true });
  } catch (err) {
    console.error('Admin: could not delete lead', err);
    return Response.json({ error: 'Could not delete that inquiry.' }, { status: 400 });
  }
}
