// FinancialChart.jsx
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { calculateFinancialRatios, formatKoreanNumber } from '../data/mockCompanies';
import { BarChart3, LineChart as LineIcon } from 'lucide-react';

export default function FinancialChart({ company }) {
  const [chartType, setChartType] = useState('performance'); // 'performance' | 'ratios'

  // Prepare data for performance chart (in Trillion KRW)
  const perfData = company.financialData.map((d) => ({
    year: `${d.year}년`,
    매출액: d.revenue / 1000000000000, // Trillions
    영업이익: d.operatingProfit / 1000000000000,
    당기순이익: d.netIncome / 1000000000000,
  }));

  // Prepare data for ratios chart
  const ratioData = company.financialData.map((d) => {
    const ratios = calculateFinancialRatios(d);
    return {
      year: `${d.year}년`,
      영업이익률: parseFloat(ratios.operatingMargin.toFixed(2)),
      자기자본이익률_ROE: parseFloat(ratios.roe.toFixed(2)),
      부채비율: parseFloat(ratios.debtRatio.toFixed(2)),
      유동비율: parseFloat(ratios.currentRatio.toFixed(2)),
    };
  });

  const CustomTooltipPerformance = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md p-4 border border-slate-100 shadow-xl rounded-xl">
          <p className="font-semibold text-slate-700 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-6 text-sm py-1">
              <span className="flex items-center text-slate-500">
                <span
                  className="w-2.5 h-2.5 rounded-full mr-2 inline-block"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}
              </span>
              <span className="font-bold text-slate-800">
                {formatKoreanNumber(entry.value * 1000000000000)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomTooltipRatios = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md p-4 border border-slate-100 shadow-xl rounded-xl">
          <p className="font-semibold text-slate-700 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-6 text-sm py-1">
              <span className="flex items-center text-slate-500">
                <span
                  className="w-2.5 h-2.5 rounded-full mr-2 inline-block"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}
              </span>
              <span className="font-bold text-slate-800">{entry.value}%</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">연도별 재무 분석 시각화</h3>
          <p className="text-xs text-slate-400 mt-1">
            {company.name}의 3개년 주요 재무실적 및 핵심 비율 트렌드
          </p>
        </div>
        
        {/* Toggle buttons */}
        <div className="flex bg-slate-100 p-1.5 rounded-xl self-stretch sm:self-auto">
          <button
            onClick={() => setChartType('performance')}
            className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              chartType === 'performance'
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>실적 추이 (매출/이익)</span>
          </button>
          <button
            onClick={() => setChartType('ratios')}
            className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              chartType === 'ratios'
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <LineIcon className="h-4 w-4" />
            <span>재무비율 추이 (%)</span>
          </button>
        </div>
      </div>

      {/* Chart container */}
      <div className="h-80 w-full">
        {chartType === 'performance' ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={perfData}
              margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} />
              
              {/* Dual Y-Axes */}
              <YAxis
                yAxisId="left"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}조`}
                label={{ value: '매출액 (조원)', angle: -90, position: 'insideLeft', offset: -5, fill: '#64748b', fontSize: 11 }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}조`}
                label={{ value: '이익 (조원)', angle: 90, position: 'insideRight', offset: -5, fill: '#64748b', fontSize: 11 }}
              />
              
              <Tooltip content={<CustomTooltipPerformance />} cursor={{ fill: '#f8fafc' }} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              
              {/* Revenue on Left Y-Axis */}
              <Bar
                yAxisId="left"
                dataKey="매출액"
                fill="#bae0fd"
                radius={[4, 4, 0, 0]}
                maxBarSize={60}
              />
              
              {/* Profits on Right Y-Axis */}
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="영업이익"
                stroke="#0f8dec"
                strokeWidth={3}
                activeDot={{ r: 6 }}
                dot={{ strokeWidth: 2, r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="당기순이익"
                stroke="#0c3f6e"
                strokeWidth={3}
                activeDot={{ r: 6 }}
                dot={{ strokeWidth: 2, r: 4 }}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={ratioData}
              margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<CustomTooltipRatios />} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Line
                type="monotone"
                dataKey="영업이익률"
                stroke="#0f8dec"
                strokeWidth={3.5}
                dot={{ strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="자기자본이익률_ROE"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="부채비율"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ strokeWidth: 2, r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="유동비율"
                stroke="#8b5cf6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
