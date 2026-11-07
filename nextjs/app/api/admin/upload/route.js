import { handleUpload } from '@vercel/blob/client';
import { isAdmin } from '@/lib/admin-auth';

// Issues upload tokens so /admin/blog can send photos straight from the
// browser to Vercel Blob (no size limit from passing through this server).
export async function POST(request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json({ error: 'Photo uploads aren’t set up yet. Connect a Blob store in Vercel → Storage.' }, { status: 503 });
  }
  const body = await request.json().catch(() => null);
  if (!body) return Response.json({ error: 'Invalid request.' }, { status: 400 });
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Only the logged-in admin may upload, and only into blog/.
        if (!isAdmin()) throw new Error('Please log in again.');
        if (!pathname.startsWith('blog/')) throw new Error('Invalid upload path.');
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          maximumSizeInBytes: 25 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
    });
    return Response.json(result);
  } catch (err) {
    return Response.json({ error: err.message || 'Upload failed.' }, { status: 400 });
  }
}
