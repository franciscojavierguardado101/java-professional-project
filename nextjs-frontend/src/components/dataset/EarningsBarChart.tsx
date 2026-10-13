'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { CollegeEarning } from '@/lib/datasets/types';

interface Props {
  data: CollegeEarning[];
}

const COLORS = [
  '#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd',
  '#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd',
  '#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd',
];

const formatDollar = (v: number) =>
  new Intl.NumberFormat('en-US', {
    style:               'currency',
    currency:            'USD',
    maximumFractionDigits: 0,
  }).format(v);

const formatAxisDollar = (v: number) => `$${(v / 1000).toFixed(0)}K`;

const truncate = (s: string, max = 28) =>
  s.length > max ? `${s.slice(0, max)}…` : s;

interface TooltipProps {
  active?: boolean;
  payload?: { value: number; payload: CollegeEarning }[];
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const { name, earnings } = payload[0].payload;
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-lg text-sm max-w-xs">
      <p className="font-semibold text-slate-900 leading-snug">{name}</p>
      <p className="mt-1 text-blue-600 font-medium">{formatDollar(earnings)}</p>
      <p className="text-slate-400 text-xs mt-0.5">median earnings · 10 yrs after enrollment</p>
    </div>
  );
}

export default function EarningsBarChart({ data }: Props) {
  const chartHeight = Math.max(400, data.length * 42);

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 4, right: 24, bottom: 4, left: 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
        <XAxis
          type="number"
          tickFormatter={formatAxisDollar}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={200}
          tick={{ fontSize: 11, fill: '#64748b' }}
          tickFormatter={truncate}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
        <Bar dataKey="earnings" radius={[0, 6, 6, 0]} maxBarSize={28}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
