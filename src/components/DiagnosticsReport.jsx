// DiagnosticsReport.jsx
import React from 'react';
import { calculateFinancialRatios } from '../data/mockCompanies';
import { FileText, ShieldCheck, AlertCircle, HelpCircle } from 'lucide-react';

export default function DiagnosticsReport({ company, activeFinancialData }) {
  const ratios = calculateFinancialRatios(activeFinancialData);
  
  // Calculate dynamic financial grade
  const calculateGrade = () => {
    let score = 0;
    
    // 1. Operating Margin
    if (ratios.operatingMargin >= 15) score += 4;
    else if (ratios.operatingMargin >= 5) score += 3;
    else if (ratios.operatingMargin >= 0) score += 2;
    else score += 1;
    
    // 2. ROE
    if (ratios.roe >= 15) score += 4;
    else if (ratios.roe >= 8) score += 3;
    else if (ratios.roe >= 0) score += 2;
    else score += 1;

    // 3. Debt Ratio
    if (ratios.debtRatio <= 50) score += 4;
    else if (ratios.debtRatio <= 100) score += 3;
    else if (ratios.debtRatio <= 200) score += 2;
    else score += 1;

    // 4. Current Ratio
    if (ratios.currentRatio >= 150) score += 4;
    else if (ratios.currentRatio >= 100) score += 3;
    else if (ratios.currentRatio >= 70) score += 2;
    else score += 1;

    if (score >= 15) return { grade: 'A+', label: '최우수 (Excellent)', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
    if (score >= 13) return { grade: 'A', label: '우수 (Very Good)', color: 'text-blue-600 bg-blue-50 border-blue-200' };
    if (score >= 11) return { grade: 'B+', label: '양호 (Good)', color: 'text-sky-600 bg-sky-50 border-sky-200' };
    if (score >= 9) return { grade: 'B', label: '보통 (Average)', color: 'text-amber-600 bg-amber-50 border-amber-200' };
    if (score >= 7) return { grade: 'C+', label: '주의 필요 (Fair)', color: 'text-orange-600 bg-orange-50 border-orange-200' };
    if (score >= 5) return { grade: 'C', label: '취약 (Weak)', color: 'text-rose-500 bg-rose-50 border-rose-100' };
    return { grade: 'D', label: '매우 취약 (Critical)', color: 'text-rose-700 bg-rose-50 border-rose-300' };
  };

  const gradeInfo = calculateGrade();

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <FileText className="h-5 w-5 text-brand-600" />
        <h3 className="text-lg font-bold text-slate-800">재무 진단 보고서 (Financial Diagnostics)</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Score Grade Card */}
        <div className={`border rounded-2xl p-6 flex flex-col items-center justify-center text-center ${gradeInfo.color} relative overflow-hidden`}>
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-20 h-20 rounded-full opacity-10 bg-current"></div>
          
          <span className="text-xs font-bold uppercase tracking-wider opacity-85 mb-2">
            종합 재무 건전성 등급
          </span>
          <div className="text-6xl font-black tracking-tighter mb-2">{gradeInfo.grade}</div>
          <span className="text-sm font-semibold">{gradeInfo.label}</span>
          
          <div className="mt-6 pt-4 border-t border-current/20 w-full text-xs opacity-75">
            수익성(2) 및 안정성(2) 지표를<br />
            종합 가중치 평가한 자체 진단 스코어
          </div>
        </div>

        {/* Right Side: Assessments */}
        <div className="lg:col-span-2 space-y-5">
          {/* Diagnostic Verdict */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center">
              <ShieldCheck className="h-4 w-4 mr-1.5 text-brand-600" /> 종합 의견 및 분석 소견
            </h4>
            <p className="text-xs text-slate-600 bg-slate-50 p-4 rounded-xl leading-relaxed border border-slate-100">
              {company.diagnosticComments}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-slate-100 p-4 rounded-xl">
              <h5 className="text-xs font-bold text-slate-700 mb-1.5">수익성 평가</h5>
              <ul className="text-xs text-slate-500 space-y-1.5 list-disc list-inside">
                <li>
                  영업이익률: <span className="font-semibold text-slate-700">{ratios.operatingMargin.toFixed(1)}%</span>
                  {ratios.operatingMargin >= 10 ? ' (업계 우수)' : ' (보통)'}
                </li>
                <li>
                  자기자본이익률(ROE): <span className="font-semibold text-slate-700">{ratios.roe.toFixed(1)}%</span>
                  {ratios.roe >= 10 ? ' (효율적인 자본 운용)' : ' (자본 대 효율 낮음)'}
                </li>
              </ul>
            </div>

            <div className="border border-slate-100 p-4 rounded-xl">
              <h5 className="text-xs font-bold text-slate-700 mb-1.5">안정성 평가</h5>
              <ul className="text-xs text-slate-500 space-y-1.5 list-disc list-inside">
                <li>
                  부채비율: <span className="font-semibold text-slate-700">{ratios.debtRatio.toFixed(1)}%</span>
                  {ratios.debtRatio <= 100 ? ' (타인 자본 의존도 매우 낮음)' : ' (레버리지 모니터링 필요)'}
                </li>
                <li>
                  유동비율: <span className="font-semibold text-slate-700">{ratios.currentRatio.toFixed(1)}%</span>
                  {ratios.currentRatio >= 100 ? ' (충분한 유동성 확보)' : ' (단기 유동성 유의)'}
                </li>
              </ul>
            </div>
          </div>

          {/* Warning Note */}
          <div className="flex items-start space-x-2 text-[10px] text-slate-400 bg-amber-50/20 p-3 rounded-lg border border-amber-100/50">
            <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              본 진단 보고서는 모의 데이터베이스에 기초하여 자동 계산된 정량 분석자료입니다. DART 전자공시 시스템의 분기/반기 보고서 및 주석 정보에 수록된 세부 항목(우발채무, 금융 계약 내용 등)을 함께 참작하는 것을 권장합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
