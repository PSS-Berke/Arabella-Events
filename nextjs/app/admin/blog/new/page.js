import { adminGate } from '@/components/admin/AdminGate';
import PostEditor from '@/components/admin/PostEditor';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'New post | AWE Admin', robots: { index: false, follow: false } };

export default function NewPostPage() {
  const gate = adminGate('New post');
  if (gate) return gate;
  return <PostEditor initial={null} />;
}
