'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { GdpDataPoint } from '@/lib/datasets/types';

interface Props {
  data: GdpDataPoint[];
}

const formatDollar = (v: number) =>
  new Intl.NumberFormat('en-US', {
    style:               'currency',
    currency:            'USD',
    maximumFractionDigits: 0,
  }).format(v);

const formatAxisDollar = (v: number) => `$${(v / 1000).toFixed(0)}K`;

interface TooltipProps {
  active?: boolean;
  payload?: { value: number; payload: GdpDataPoint }[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-lg text-sm">
      <p className="font-semibold text-slate-900">{label}</p>
      <p className="mt-1 text-emerald-600 font-medium">{formatDollar(payload[0].value)}</p>
      <p className="text-slate-400 text-xs mt-0.5">GDP per capita (current USD)</p>
    </div>
  );
}

export default function GdpLineChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <LineChart data={data} margin={{ top: 4, right: 24, bottom: 4, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          interval={2}
        />
        <YAxis
          tickFormatter={formatAxisDollar}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          width={52}
        />
        {/* Mark the COVID-19 recession year */}
        <ReferenceLine
          x="2020"
          stroke="#fca5a5"
          strokeDasharray="4 4"
          label={{ value: 'COVID-19', position: 'top', fontSize: 10, fill: '#ef4444' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="gdp"
          stroke="#10b981"
          strokeWidth={2.5}
          dot={{ r: 3, fill: '#10b981', strokeWidth: 0 }}
          activeDot={{ r: 5, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
