// DupontAnalysis.jsx
import React from 'react';
import { calculateFinancialRatios } from '../data/mockCompanies';
import { Shield, Sparkles, Activity, Layers } from 'lucide-react';

export default function DupontAnalysis({ activeFinancialData }) {
  const ratios = calculateFinancialRatios(activeFinancialData);
  
  const roe = ratios.roe;
  const netMargin = ratios.netMargin;
  const assetTurnover = ratios.assetTurnover;
  const equityMultiplier = ratios.equityMultiplier;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="h-5 w-5 text-brand-600" />
        <h3 className="text-lg font-bold text-slate-800">듀퐁 분석 (DuPont Analysis)</h3>
      </div>
      <p className="text-xs text-slate-400 mb-8 leading-relaxed">
        듀퐁 분석은 기업의 최종 자본 효율성 지표인 **ROE(자기자본이익률)**를 수익성(순이익률), 활동성(자산회전율), 재무안정성(자기자본배수)의 3대 핵심 성과 요소로 해체하여 분석하는 기법입니다.
      </p>

      {/* Diagram container */}
      <div className="flex flex-col items-center">
        {/* Level 1: ROE (Root) */}
        <div className="w-full max-w-xs bg-brand-600 text-white rounded-2xl p-4 shadow-md text-center border border-brand-700 relative">
          <div className="text-[10px] font-bold tracking-widest text-brand-200 uppercase mb-1">
            자기자본이익률 (ROE)
          </div>
          <div className="text-3xl font-extrabold">{roe.toFixed(2)}%</div>
          <div className="text-[11px] text-brand-100 mt-1.5 font-medium">
            최종 주주 자본투자 효율성
          </div>
        </div>

        {/* Tree connectors (vertical line) */}
        <div className="w-0.5 h-8 bg-brand-200 my-1"></div>

        {/* Multiplication text */}
        <div className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-200 shadow-sm z-10">
          아래 3개 지표의 상호 곱(=)으로 결정
        </div>

        <div className="w-0.5 h-8 bg-brand-200 my-1"></div>

        {/* Level 2: The Three Components */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-2 relative">
          {/* Component 1: Net Profit Margin */}
          <div className="bg-slate-50/50 hover:bg-brand-50/20 border border-slate-200/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:border-brand-300">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="p-1.5 bg-rose-50 text-rose-600 rounded-lg">
                  <Shield className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-500">당기순이익률 (Profitability)</span>
              </div>
              <div className="text-2xl font-extrabold text-slate-800">{netMargin.toFixed(2)}%</div>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                매출 1원당 남긴 순이익. 기업의 가격 결정력 및 비용 통제 능력을 측정합니다.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between text-[10px] text-slate-400 font-mono">
              <span>당기순이익 / 매출액</span>
            </div>
          </div>

          {/* Component 2: Asset Turnover */}
          <div className="bg-slate-50/50 hover:bg-brand-50/20 border border-slate-200/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:border-brand-300">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                  <Activity className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-500">총자산회전율 (Efficiency)</span>
              </div>
              <div className="text-2xl font-extrabold text-slate-800">{assetTurnover.toFixed(2)}회</div>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                보유 자산 대비 매출 창출 빈도. 공장 설비나 자산을 얼마나 효율적으로 가동하는지 나타냅니다.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between text-[10px] text-slate-400 font-mono">
              <span>매출액 / 총자산</span>
            </div>
          </div>

          {/* Component 3: Equity Multiplier */}
          <div className="bg-slate-50/50 hover:bg-brand-50/20 border border-slate-200/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:border-brand-300">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
                  <Layers className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-500">자기자본배수 (Leverage)</span>
              </div>
              <div className="text-2xl font-extrabold text-slate-800">{equityMultiplier.toFixed(2)}배</div>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                총자산이 주주지분의 몇 배인지 나타내는 지표. 부채 활용도(레버리지)를 의미합니다.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between text-[10px] text-slate-400 font-mono">
              <span>총자산 / 자기자본</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mathematical validation box */}
      <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span className="font-semibold text-slate-600">수식 확인:</span>
        <span className="font-mono">
          {netMargin.toFixed(4)}% (순이익률) × {assetTurnover.toFixed(4)}회 (회전율) × {equityMultiplier.toFixed(4)}배 (레버리지) = <strong className="text-brand-600 font-bold">{roe.toFixed(2)}% (ROE)</strong>
        </span>
      </div>
    </div>
  );
}
