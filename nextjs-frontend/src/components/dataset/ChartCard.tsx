interface ChartCardProps {
  title: string;
  description: string;
  source: string;
  sourceUrl: string;
  children: React.ReactNode;
}

export default function ChartCard({
  title,
  description,
  source,
  sourceUrl,
  children,
}: ChartCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>

      <div className="px-2 py-6 sm:px-6">{children}</div>

      <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
        <p className="text-xs text-slate-400">
          Source:{' '}
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {source}
          </a>
        </p>
      </div>
    </div>
  );
}
