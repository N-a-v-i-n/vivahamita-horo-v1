import React from 'react';
import { MatchingResult } from '../../types/astrology';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface Props {
  data: MatchingResult;
  lang: string;
}

export const VisualDashboard: React.FC<Props> = ({ data, lang }) => {
  const percentage = data.overallPercentage || 0;
  
  const chartData = (data.ashtaKoota || []).map(k => ({
    subject: k.localizedKoota || k.koota,
    A: (k.obtainedPoints / k.maxPoints) * 100,
    fullMark: 100
  }));

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorClass = percentage >= 70 ? 'text-emerald-500' : percentage >= 50 ? 'text-amber-500' : 'text-rose-500';

  return (
    <div className="flex flex-col mb-2 border-b border-stone-300 pb-2 relative w-full">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-serif font-medium text-stone-800 tracking-wide uppercase">
          Compatibility Dashboard
        </h2>
      </div>

      <div className="flex-1 w-full mx-auto flex flex-col md:flex-row gap-8 items-center justify-center">
        
        {/* Premium SVG Circular Gauge */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-between">
          <div className="flex-1 w-full flex items-center space-x-4 mb-2 md:mb-0">
            {/* Background Track with soft glow shadow */}
            <div className="absolute inset-4 rounded-full shadow-[inset_0_4px_20px_rgb(0,0,0,0.03)] pointer-events-none"></div>
            
            <svg className="w-full h-full transform -rotate-90 absolute top-0 left-0">
              <circle
                cx="128"
                cy="128"
                r={radius}
                stroke="currentColor"
                strokeWidth="18"
                fill="transparent"
                className="text-stone-100"
              />
              <circle
                cx="128"
                cy="128"
                r={radius}
                stroke="currentColor"
                strokeWidth="18"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className={colorClass}
                style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
              />
            </svg>
            
            <div className="text-center z-10 flex flex-col items-center mt-2">
              <span className={`text-5xl font-light tracking-tighter ${colorClass}`}>
                {percentage.toFixed(0)}%
              </span>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">
                Match
              </span>
            </div>
          </div>
        </div>

        {/* Premium Radar Chart */}
        <div className="flex-1 w-full h-[300px] flex flex-col">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
              <PolarGrid stroke="#f5f5f4" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#78716c', fontSize: 10, fontWeight: 500 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Score"
                dataKey="A"
                stroke={percentage >= 50 ? "#10b981" : "#f43f5e"}
                fill={percentage >= 50 ? "#10b981" : "#f43f5e"}
                fillOpacity={0.15}
                isAnimationActive={false}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};
