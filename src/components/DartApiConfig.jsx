// DartApiConfig.jsx
import React, { useState, useEffect } from 'react';
import { Settings, Key, AlertTriangle, Play, CheckCircle2, Copy, ExternalLink, Code } from 'lucide-react';
import { DEFAULT_API_KEY } from '../utils/dartApi';

export default function DartApiConfig({ company, onKeyChange }) {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState('fnlttSinglAcntAll');
  const [isLoading, setIsLoading] = useState(false);
  const [simulatedResponse, setSimulatedResponse] = useState(null);
  const [simulatedUrl, setSimulatedUrl] = useState('');

  useEffect(() => {
    const savedKey = localStorage.getItem('dart_api_key') || DEFAULT_API_KEY;
    if (savedKey) {
      setApiKey(savedKey);
      setIsSaved(true);
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (apiKey.trim() === '') {
      localStorage.removeItem('dart_api_key');
      setIsSaved(false);
    } else {
      localStorage.setItem('dart_api_key', apiKey.trim());
      setIsSaved(true);
    }
    if (onKeyChange) {
      onKeyChange();
    }
  };

  const getEndpointInfo = (endpoint, corpCode, companyName) => {
    const maskKey = apiKey || 'YOUR_DART_API_KEY';
    
    switch (endpoint) {
      case 'fnlttSinglAcntAll': // 전체 재무제표
        return {
          name: '단일회사 전체 재무제표 조회 (fnlttSinglAcntAll)',
          url: `https://opendart.fss.or.kr/api/fnlttSinglAcntAll.json?crtfc_key=${maskKey}&corp_code=${corpCode}&bsns_year=2024&reprt_code=11011&fs_div=CFS`,
          description: '선택한 기업의 사업보고서(11011) 내 전체 재무제표(연결재무제표 기준 CFS)를 호출합니다.',
          mockResponse: {
            status: "000",
            message: "정상",
            list: [
              { rcept_no: "20250315000123", reprt_code: "11011", bsns_year: "2024", corp_code: corpCode, stock_code: company.code, fs_div: "CFS", fs_nm: "연결재무제표", sj_div: "IS", sj_nm: "손익계산서", account_id: "ifrs-full_Revenue", account_nm: "매출액", account_detail: "-", thstrm_nm: "당기(2024년)", thstrm_amount: (company.financialData[1].revenue).toString(), thstrm_add_amount: "-" },
              { rcept_no: "20250315000123", reprt_code: "11011", bsns_year: "2024", corp_code: corpCode, stock_code: company.code, fs_div: "CFS", fs_nm: "연결재무제표", sj_div: "IS", sj_nm: "손익계산서", account_id: "ifrs-full_OperatingIncomeLoss", account_nm: "영업이익", account_detail: "-", thstrm_nm: "당기(2024년)", thstrm_amount: (company.financialData[1].operatingProfit).toString(), thstrm_add_amount: "-" },
              { rcept_no: "20250315000123", reprt_code: "11011", bsns_year: "2024", corp_code: corpCode, stock_code: company.code, fs_div: "CFS", fs_nm: "연결재무제표", sj_div: "IS", sj_nm: "손익계산서", account_id: "ifrs-full_ProfitLoss", account_nm: "당기순이익", account_detail: "-", thstrm_nm: "당기(2024년)", thstrm_amount: (company.financialData[1].netIncome).toString(), thstrm_add_amount: "-" }
            ]
          }
        };
      case 'corpCode': // 고유번호 조회
        return {
          name: 'DART 고유번호 검색 (corpCode XML/ZIP)',
          url: `https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key=${maskKey}`,
          description: '국내 상장사 및 공시대상 법인의 8자리 DART 고유번호 리스트를 다운로드합니다.',
          mockResponse: {
            result: {
              list: [
                { corp_code: corpCode, corp_name: companyName, stock_code: company.code, modify_date: "20250110" }
              ]
            }
          }
        };
      default:
        return {};
    }
  };

  const handleSimulate = () => {
    setIsLoading(true);
    const info = getEndpointInfo(selectedEndpoint, company.dartCode, company.name);
    setSimulatedUrl(info.url);
    
    setTimeout(() => {
      setSimulatedResponse(info.mockResponse);
      setIsLoading(false);
    }, 800);
  };

  const info = getEndpointInfo(selectedEndpoint, company.dartCode, company.name);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-brand-600" />
          <h3 className="text-lg font-bold text-slate-800">DART Open API 연동 제어판</h3>
        </div>
        <span className="text-[10px] px-2 py-1 bg-amber-50 text-amber-700 rounded-md border border-amber-200 font-semibold">
          개발자용 도구
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Key configuration */}
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">API 키 설정</h4>
            <form onSubmit={handleSave} className="space-y-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                    setIsSaved(false);
                  }}
                  placeholder="DART API 인증키 입력"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
                />
              </div>
              <div className="flex items-center justify-between">
                <a
                  href="https://opendart.fss.or.kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-brand-600 hover:underline flex items-center"
                >
                  DART API 키 신청하기 <ExternalLink className="h-2.5 w-2.5 ml-0.5" />
                </a>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    isSaved
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                      : 'bg-brand-600 hover:bg-brand-700 text-white'
                  }`}
                >
                  {isSaved ? '인증키 저장됨' : '인증키 저장'}
                </button>
              </div>
            </form>
          </div>

          {/* CORS explanation warning */}
          <div className="bg-amber-50/40 border border-amber-100 rounded-2xl p-4">
            <h5 className="text-xs font-bold text-amber-800 flex items-center mb-1.5">
              <AlertTriangle className="h-4 w-4 mr-1 text-amber-600 shrink-0" /> CORS 브라우저 제약 안내
            </h5>
            <p className="text-[11px] text-amber-700 leading-relaxed">
              DART Open API는 보안상의 이유로 **브라우저에서의 직접적인 비동기 호출(Ajax) 시 CORS 에러**를 발생시킵니다.
              실제 상용 서비스 개발 시에는 **Next.js API Routes**나 **Node.js Express 백엔드 서버**를 프록시로 구축하여 호출해야 합니다.
            </p>
          </div>
        </div>

        {/* Right column (colspan=2): Simulator console */}
        <div className="lg:col-span-2 border border-slate-100 rounded-2xl p-5 bg-slate-50/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">DART API 요청 시뮬레이터</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">인증키와 고유번호를 통한 요청 규격 테스트</p>
            </div>
            
            <select
              value={selectedEndpoint}
              onChange={(e) => setSelectedEndpoint(e.target.value)}
              className="text-xs px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 focus:outline-none"
            >
              <option value="fnlttSinglAcntAll">단일회사 전체 재무제표</option>
              <option value="corpCode">DART 고유번호 (XML)</option>
            </select>
          </div>

          <div className="space-y-4">
            {/* Request URL Box */}
            <div className="bg-white border border-slate-200/60 p-3 rounded-xl">
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                <span>REQUEST URL</span>
                <span className="font-semibold text-brand-600">GET</span>
              </div>
              <div className="font-mono text-[10px] text-slate-600 break-all select-all">
                {info.url}
              </div>
            </div>

            {/* Simulated execution trigger */}
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-400">
                선택 기업: <strong>{company.name} ({company.code})</strong> | DART 고유번호: <strong>{company.dartCode}</strong>
              </span>
              <button
                onClick={handleSimulate}
                disabled={isLoading}
                className="flex items-center space-x-1 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors shadow-sm disabled:opacity-50"
              >
                <Play className="h-3 w-3 fill-current" />
                <span>{isLoading ? '호출 중...' : '시뮬레이션 호출'}</span>
              </button>
            </div>

            {/* Code Response Output */}
            <div className="bg-slate-900 text-slate-300 rounded-xl overflow-hidden border border-slate-800">
              <div className="px-4 py-2 bg-slate-950 flex items-center justify-between border-b border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 flex items-center">
                  <Code className="h-3.5 w-3.5 mr-1" /> RESPONSE BODY (JSON)
                </span>
                {simulatedResponse && (
                  <span className="text-[10px] font-semibold text-emerald-500 flex items-center">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> 200 OK
                  </span>
                )}
              </div>
              <pre className="p-4 text-[10px] font-mono overflow-x-auto max-h-56 leading-normal select-all">
                {simulatedResponse
                  ? JSON.stringify(simulatedResponse, null, 2)
                  : `// [시뮬레이션 호출] 버튼을 클릭하면 DART API 실제 전송 규격과\n// 동일한 모의 응답 데이터(JSON)가 이곳에 출력됩니다.`
                }
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
