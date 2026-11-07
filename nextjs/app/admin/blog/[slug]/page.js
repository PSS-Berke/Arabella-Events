import { notFound } from 'next/navigation';
import { adminGate } from '@/components/admin/AdminGate';
import PostEditor from '@/components/admin/PostEditor';
import { getPostForEdit } from '@/lib/posts';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Edit post | AWE Admin', robots: { index: false, follow: false } };

export default async function EditPostPage({ params }) {
  const gate = adminGate('Edit post');
  if (gate) return gate;
  const post = await getPostForEdit(params.slug);
  if (!post) notFound();
  return <PostEditor initial={post} />;
}
