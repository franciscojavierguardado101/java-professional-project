import { BioHero } from '@/modules/bio';

export const metadata = {
  title: 'About — Francisco Guardado',
  description: 'Full Stack Developer — Spring Boot, Next.js, PostgreSQL, TypeScript.',
};

export default function BioPage() {
  return <BioHero />;
}
