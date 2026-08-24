import React, { useState } from 'react';
import { SYSTEM_METRICS } from '../../data/mockData';

export const DistressTrendChart: React.FC = () => {
  const [hoverPoint, setHoverPoint] = useState<{ date: string; avgScore: number; highRiskCases: number } | null>(null);

  const data = SYSTEM_METRICS.trend30Days;
  const width = 360;
  const height = 140;
  const paddingLeft = 30;
  const paddingBottom = 25;
  const paddingTop = 10;
  const paddingRight = 10;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const getX = (index: number) => paddingLeft + (index / (data.length - 1)) * chartWidth;
  const getY = (val: number) => paddingTop + chartHeight - (val / 100) * chartHeight;

  // Build SVG path strings
  const avgPath = data.reduce((acc, pt, i) => {
    const x = getX(i);
    const y = getY(pt.avgScore);
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  const highRiskPath = data.reduce((acc, pt, i) => {
    const x = getX(i);
    const y = getY(pt.highRiskCases);
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between h-[280px]">
      
      {/* Chart Title & Legend */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-800 tracking-tight">
          Distress Trend (Last 30 Days)
        </h3>

        <div className="flex items-center gap-3 text-[11px] font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-0.5 bg-blue-600 rounded-full"></span>
            <span className="text-slate-600">Average Score</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-0.5 bg-rose-500 rounded-full"></span>
            <span className="text-slate-600">High Risk Cases</span>
          </div>
        </div>
      </div>

      {/* SVG Multi-Line Chart */}
      <div className="relative my-auto w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
          
          {/* Y Axis Grid lines */}
          {[0, 25, 50, 75, 100].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[9px] fill-slate-400 font-mono"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Average Score Line (Blue) */}
          <path
            d={avgPath}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* High Risk Cases Line (Red) */}
          <path
            d={highRiskPath}
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="4 2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points with Hover */}
          {data.map((pt, i) => {
            const x = getX(i);
            const yAvg = getY(pt.avgScore);
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={yAvg}
                  r="3.5"
                  className="fill-white stroke-blue-600 stroke-2 hover:scale-150 transition-transform cursor-pointer"
                  onMouseEnter={() => setHoverPoint(pt)}
                  onMouseLeave={() => setHoverPoint(null)}
                />
              </g>
            );
          })}

          {/* X Axis Labels matching screenshot (08 Apr, 15 Apr, 22 Apr, 29 Apr, 06 May) */}
          {data.filter((_, idx) => idx % 2 === 0).map((pt, idx) => {
            const originalIndex = idx * 2;
            const x = getX(originalIndex);
            return (
              <text
                key={pt.date}
                x={x}
                y={height - 4}
                textAnchor="middle"
                className="text-[9px] fill-slate-400 font-sans"
              >
                {pt.date}
              </text>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoverPoint && (
          <div className="absolute top-2 right-2 bg-slate-900/90 backdrop-blur-xs text-white p-2 rounded-lg text-[10px] shadow-lg pointer-events-none z-10 font-mono">
            <div className="font-bold text-blue-300">{hoverPoint.date}</div>
            <div>Avg Distress: <span className="text-white font-bold">{hoverPoint.avgScore}/100</span></div>
            <div>High Risk: <span className="text-rose-300 font-bold">{hoverPoint.highRiskCases}</span></div>
          </div>
        )}
      </div>

    </div>
  );
};
