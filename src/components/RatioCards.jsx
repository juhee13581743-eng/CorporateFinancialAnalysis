// RatioCards.jsx
import React from 'react';
import { calculateFinancialRatios } from '../data/mockCompanies';
import { TrendingUp, Award, ShieldAlert, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function RatioCards({ activeFinancialData, prevFinancialData }) {
  const currentRatios = calculateFinancialRatios(activeFinancialData);
  const prevRatios = prevFinancialData ? calculateFinancialRatios(prevFinancialData) : null;

  const getStatusColor = (value, type) => {
    switch (type) {
      case 'operatingMargin':
        if (value >= 15) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
        if (value >= 5) return 'text-blue-600 bg-blue-50 border-blue-200';
        if (value >= 0) return 'text-amber-600 bg-amber-50 border-amber-200';
        return 'text-rose-600 bg-rose-50 border-rose-200';
      case 'roe':
        if (value >= 15) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
        if (value >= 8) return 'text-blue-600 bg-blue-50 border-blue-200';
        if (value >= 0) return 'text-amber-600 bg-amber-50 border-amber-200';
        return 'text-rose-600 bg-rose-50 border-rose-200';
      case 'debtRatio':
        if (value <= 50) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
        if (value <= 100) return 'text-blue-600 bg-blue-50 border-blue-200';
        if (value <= 200) return 'text-amber-600 bg-amber-50 border-amber-200';
        return 'text-rose-600 bg-rose-50 border-rose-200';
      case 'currentRatio':
        if (value >= 150) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
        if (value >= 100) return 'text-blue-600 bg-blue-50 border-blue-200';
        if (value >= 70) return 'text-amber-600 bg-amber-50 border-amber-200';
        return 'text-rose-600 bg-rose-50 border-rose-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getStatusText = (value, type) => {
    switch (type) {
      case 'operatingMargin':
        if (value >= 15) return '매우 높음 (수익성 우수)';
        if (value >= 5) return '보통 (수익성 양호)';
        if (value >= 0) return '낮음 (저수익성)';
        return '적자 (영업손실)';
      case 'roe':
        if (value >= 15) return '자본효율 매우 우수';
        if (value >= 8) return '자본효율 양호';
        if (value >= 0) return '자본효율 낮음';
        return '자본 잠식 위험 / 순손실';
      case 'debtRatio':
        if (value <= 50) return '극히 안전함';
        if (value <= 100) return '안전한 재무 구조';
        if (value <= 200) return '보통 (적정 레버리지)';
        return '경고 (부채 위험 부담)';
      case 'currentRatio':
        if (value >= 150) return '단기 채무상환력 매우 높음';
        if (value >= 100) return '양호한 유동성';
        if (value >= 70) return '보통 수준';
        return '경고 (유동성 부족)';
      default:
        return '';
    }
  };

  const renderDiff = (current, prev) => {
    if (!prev) return null;
    const diff = current - prev;
    const isIncrease = diff >= 0;
    
    return (
      <span className={`inline-flex items-center text-xs font-semibold ${isIncrease ? 'text-emerald-600' : 'text-rose-600'} mt-1`}>
        {isIncrease ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
        {Math.abs(diff).toFixed(2)}%p 전년 대비
      </span>
    );
  };

  const cards = [
    {
      title: '영업이익률 (Operating Margin)',
      value: currentRatios.operatingMargin,
      prevValue: prevRatios?.operatingMargin,
      type: 'operatingMargin',
      description: '매출액 중 영업 활동을 통해 벌어들인 이익 비율',
      icon: <TrendingUp className="h-5 w-5" />,
      unit: '%',
      formatter: (v) => v.toFixed(2),
    },
    {
      title: '자기자본이익률 (ROE)',
      value: currentRatios.roe,
      prevValue: prevRatios?.roe,
      type: 'roe',
      description: '주주 지분(자기자본)을 활용한 자본 회수 효율성',
      icon: <Award className="h-5 w-5" />,
      unit: '%',
      formatter: (v) => v.toFixed(2),
    },
    {
      title: '부채비율 (Debt-to-Equity)',
      value: currentRatios.debtRatio,
      prevValue: prevRatios?.debtRatio,
      type: 'debtRatio',
      description: '자기자본 대비 타인자본(부채)의 의존도',
      icon: <ShieldAlert className="h-5 w-5" />,
      unit: '%',
      formatter: (v) => v.toFixed(2),
    },
    {
      title: '유동비율 (Current Ratio)',
      value: currentRatios.currentRatio,
      prevValue: prevRatios?.currentRatio,
      type: 'currentRatio',
      description: '1년 내 갚아야 할 부채 대비 현금화 가능한 자산 비율',
      icon: <Zap className="h-5 w-5" />,
      unit: '%',
      formatter: (v) => v.toFixed(2),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const colorClass = getStatusColor(card.value, card.type);
        const statusText = getStatusText(card.value, card.type);
        
        return (
          <div
            key={card.title}
            className="premium-card premium-card-hover rounded-2xl p-5 border border-slate-100 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`p-2 rounded-xl ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]}`}>
                  {card.icon}
                </div>
              </div>

              <div className="flex items-baseline space-x-1 mt-2">
                <span className="text-3xl font-bold tracking-tight text-slate-800">
                  {card.formatter(card.value)}
                </span>
                <span className="text-sm font-semibold text-slate-500">{card.unit}</span>
              </div>
              
              <div className="flex flex-col mt-1">
                {renderDiff(card.value, card.prevValue)}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border ${colorClass}`}>
                {statusText}
              </span>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
