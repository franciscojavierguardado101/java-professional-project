import { getCompanies } from '@/lib/api';
import { Company } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const metadata = {
  title: 'Companies — JobBoard',
};

export default async function CompaniesPage() {
  let companies: Company[] = [];
  let apiError = false;

  try {
    companies = await getCompanies();
  } catch {
    apiError = true;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Companies</h1>
        <p className="text-slate-500 mt-1">{companies.length} companies hiring now</p>
      </div>

      {apiError ? (
        <div className="text-center py-16 text-slate-500">
          Could not load companies. Make sure the Spring Boot API is running on port 8080.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company) => (
            <Link key={company.id} href={`/companies/${company.id}`}>
              <Card className="hover:shadow-md hover:border-slate-300 transition-all cursor-pointer h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    {company.logoUrl ? (
                      <Image
                        src={company.logoUrl}
                        alt={company.name}
                        width={48}
                        height={48}
                        className="rounded-lg object-contain flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-lg flex-shrink-0">
                        {company.name.charAt(0)}
                      </div>
                    )}
                    <h2 className="font-semibold text-slate-900">{company.name}</h2>
                  </div>
                </CardHeader>
                <CardContent>
                  {company.description && (
                    <p className="text-sm text-slate-500 line-clamp-2">{company.description}</p>
                  )}
                  {company.website && (
                    <p className="text-xs text-blue-500 mt-2 truncate">{company.website}</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
