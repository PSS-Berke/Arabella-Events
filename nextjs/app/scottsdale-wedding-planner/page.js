import LocationPage from '@/components/LocationPage';
import { SCOTTSDALE } from '@/lib/locations';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: SCOTTSDALE.title,
  description: SCOTTSDALE.description,
  path: SCOTTSDALE.slug,
});

export default function ScottsdaleWeddingPlanner() {
  return <LocationPage data={SCOTTSDALE} />;
}
