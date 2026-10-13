'use client';

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { CollegeEnrollment } from '@/lib/datasets/types';

interface Props {
  data: CollegeEnrollment[];
}

const formatDollar = (v: number) =>
  new Intl.NumberFormat('en-US', {
    style:               'currency',
    currency:            'USD',
    maximumFractionDigits: 0,
  }).format(v);

const formatSize = (v: number) =>
  v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v);

interface TooltipProps {
  active?: boolean;
  payload?: { payload: CollegeEnrollment }[];
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-lg text-sm max-w-[220px]">
      <p className="font-semibold text-slate-900 leading-snug">{d.name}</p>
      <div className="mt-2 space-y-1">
        <p className="text-slate-500">
          Enrollment:{' '}
          <span className="text-slate-800 font-medium">{d.size.toLocaleString()}</span>
        </p>
        <p className="text-slate-500">
          Earnings:{' '}
          <span className="text-violet-600 font-medium">{formatDollar(d.earnings)}</span>
        </p>
      </div>
    </div>
  );
}

export default function EnrollmentScatterChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <ScatterChart margin={{ top: 4, right: 24, bottom: 20, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis
          type="number"
          dataKey="size"
          name="Enrollment"
          tickFormatter={formatSize}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          label={{ value: 'Enrollment Size', position: 'insideBottom', offset: -12, fontSize: 11, fill: '#94a3b8' }}
        />
        <YAxis
          type="number"
          dataKey="earnings"
          name="Earnings"
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          width={52}
        />
        <ZAxis range={[30, 30]} />
        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
        <Scatter data={data} fill="#8b5cf6" fillOpacity={0.65} />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
