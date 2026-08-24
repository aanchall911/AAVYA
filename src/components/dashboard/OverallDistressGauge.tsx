import React from 'react';
import { SYSTEM_METRICS } from '../../data/mockData';

export const OverallDistressGauge: React.FC = () => {
  const score = SYSTEM_METRICS.averageDistressScore; // 62
  const angle = (score / 100) * 180 - 90; // -90 deg (left) to +90 deg (right)

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between h-[280px]">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-900 tracking-tight">
          District Well-being Index
        </h3>
        <span className="text-[10px] font-mono font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
          N=1,248 cases
        </span>
      </div>

      {/* SVG Semi-Circle Calibrated Speedometer Gauge */}
      <div className="relative flex flex-col items-center justify-center my-auto">
        <svg viewBox="0 0 240 130" className="w-56 h-30 overflow-visible">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />    {/* Low Risk Emerald */}
              <stop offset="45%" stopColor="#10b981" />
              <stop offset="55%" stopColor="#f59e0b" />   {/* Moderate Risk Amber */}
              <stop offset="75%" stopColor="#f97316" />
              <stop offset="88%" stopColor="#ef4444" />   {/* High Risk Crimson */}
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
          </defs>

          {/* Background Track Arc */}
          <path
            d="M 25 115 A 95 95 0 0 1 215 115"
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Colored Active Arc */}
          <path
            d="M 25 115 A 95 95 0 0 1 215 115"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray="298"
            strokeDashoffset="0"
          />

          {/* Calibrated Tick Marks */}
          {[
            { val: 0, ang: -90, x: 25, y: 128 },
            { val: 20, ang: -54, x: 42, y: 72 },
            { val: 40, ang: -18, x: 80, y: 35 },
            { val: 60, ang: 18, x: 140, y: 35 },
            { val: 80, ang: 54, x: 184, y: 72 },
            { val: 100, ang: 90, x: 215, y: 128 }
          ].map((t) => (
            <text
              key={t.val}
              x={t.x}
              y={t.y}
              textAnchor="middle"
              className="text-[9px] font-mono fill-slate-400 font-medium select-none"
            >
              {t.val}
            </text>
          ))}

          {/* Needle Center Pin */}
          <circle cx="120" cy="115" r="7" fill="#0f172a" />
          <circle cx="120" cy="115" r="2.5" fill="#ffffff" />

          {/* Needle Arrow */}
          <g transform={`rotate(${angle}, 120, 115)`}>
            <polygon points="117,115 120,30 123,115" fill="#0f172a" />
          </g>
        </svg>

        {/* Center Numbers */}
        <div className="text-center mt-[-14px]">
          <div className="text-2xl font-bold text-slate-900 tracking-tight flex items-baseline justify-center gap-1">
            <span>{score}</span>
            <span className="text-xs font-semibold text-slate-400">/ 100</span>
          </div>
          <p className="text-[10px] font-semibold text-slate-600">
            Average Distress Index
          </p>
        </div>
      </div>

      {/* Legend list */}
      <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
            <span className="text-slate-600">Low (0-39)</span>
          </div>
          <span className="font-semibold text-slate-800">{SYSTEM_METRICS.distressBreakdown.low.count}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-amber-500"></span>
            <span className="text-slate-600">Moderate (40-69)</span>
          </div>
          <span className="font-semibold text-slate-800">{SYSTEM_METRICS.distressBreakdown.moderate.count}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-xs bg-rose-600"></span>
            <span className="text-slate-600">High / Critical (70-100)</span>
          </div>
          <span className="font-semibold text-slate-800">{SYSTEM_METRICS.distressBreakdown.high.count}</span>
        </div>
      </div>

    </div>
  );
};
