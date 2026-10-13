'use client';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ResponsiveContainer,
} from 'recharts';
import type { ExoplanetYearCount } from '@/lib/nasa/types';

interface TooltipProps {
  active?:  boolean;
  payload?: { value: number }[];
  label?:   string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3 shadow-xl text-sm">
      <p className="text-slate-400 text-xs">{label}</p>
      <p className="text-purple-300 font-semibold mt-0.5">
        {payload[0].value} exoplanets confirmed
      </p>
    </div>
  );
}

export default function ExoplanetChart({ data }: { data: ExoplanetYearCount[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
        <defs>
          <linearGradient id="exoGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#a855f7" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#a855f7" stopOpacity={0}   />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          interval={4}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        {/* Kepler Space Telescope launch — caused the discovery explosion */}
        <ReferenceLine
          x={2009}
          stroke="#f59e0b"
          strokeDasharray="4 4"
          label={{ value: 'Kepler', position: 'top', fontSize: 10, fill: '#f59e0b' }}
        />
        <ReferenceLine
          x={2018}
          stroke="#10b981"
          strokeDasharray="4 4"
          label={{ value: 'TESS', position: 'top', fontSize: 10, fill: '#10b981' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="total"
          stroke="#a855f7"
          strokeWidth={2.5}
          fill="url(#exoGradient)"
          dot={false}
          activeDot={{ r: 4, fill: '#a855f7', stroke: '#1e1b4b', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
