import LocationPage from '@/components/LocationPage';
import { SEDONA } from '@/lib/locations';
import { pageMeta, OG } from '@/lib/seo';

export const metadata = pageMeta({
  title: SEDONA.title,
  description: SEDONA.description,
  path: SEDONA.slug,
  image: OG.sedona,
});

export default function SedonaWeddingPlanner() {
  return <LocationPage data={SEDONA} />;
}
