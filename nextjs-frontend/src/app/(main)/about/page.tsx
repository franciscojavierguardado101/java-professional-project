import { getAboutPage } from '@/lib/contentful';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'About — JobBoard',
};

export default async function AboutPage() {
  // Fetch from Contentful — null if not configured or no entry exists yet
  const content = await getAboutPage();

  const title = content?.title ?? 'About JobBoard';
  const body = content?.body ?? `JobBoard is a full-stack portfolio project built to demonstrate a modern
Spring Boot REST API paired with a Next.js frontend. It serves as a
real-world example of the Java full-stack development pattern used at
companies hiring in the $98K–$167K range.

The backend is a Spring Boot 3.5 REST API backed by PostgreSQL, handling
full CRUD operations for jobs, companies, and categories. The frontend is
a Next.js 15 application using TypeScript, Tailwind CSS, and shadcn/ui
components.

Static marketing content — like this page — is managed through Contentful
CMS, keeping editorial content decoupled from application code.`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-4xl font-bold text-slate-900">{title}</h1>
      <p className="text-slate-500 mt-2 text-lg">
        Connecting great engineers with great companies.
      </p>

      <Separator className="my-8" />

      <div className="space-y-5 text-slate-700 leading-relaxed">
        {body.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <Separator className="my-8" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-slate-900">10+</p>
          <p className="text-sm text-slate-500">Open Positions</p>
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-slate-900">5</p>
          <p className="text-sm text-slate-500">Top Companies</p>
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-slate-900">5</p>
          <p className="text-sm text-slate-500">Job Categories</p>
        </div>
      </div>
    </div>
  );
}
