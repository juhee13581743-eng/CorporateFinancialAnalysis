import React, { useState, useEffect } from 'react';
import { mockCompanies, formatKoreanNumber, calculateFinancialRatios } from './data/mockCompanies';
import SearchBar from './components/SearchBar';
import RatioCards from './components/RatioCards';
import FinancialChart from './components/FinancialChart';
import FinancialTable from './components/FinancialTable';
import DupontAnalysis from './components/DupontAnalysis';
import DiagnosticsReport from './components/DiagnosticsReport';
import DartApiConfig from './components/DartApiConfig';
import { fetchDartFinancialStatements, parseDartFinancialData } from './utils/dartApi';
import { 
  Building2, 
  ArrowLeft, 
  ExternalLink, 
  TrendingUp, 
  Calendar, 
  FileText, 
  Layers, 
  Settings, 
  BarChart3,
  Award,
  ShieldCheck,
  Globe,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

function App() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [activeTab, setActiveTab] = useState('summary');
  
  // Real-time API States
  const [isLoadingRealData, setIsLoadingRealData] = useState(false);
  const [realData, setRealData] = useState(null);
  const [realDataError, setRealDataError] = useState(null);
  const [isUsingRealData, setIsUsingRealData] = useState(false);
  const [triggerFetchCount, setTriggerFetchCount] = useState(0);

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    setSelectedYear(2024); // Default to 2024 for DART API stability
    setActiveTab('summary');
  };

  const handleBack = () => {
    setSelectedCompany(null);
    setRealData(null);
    setRealDataError(null);
    setIsUsingRealData(false);
  };

  useEffect(() => {
    if (!selectedCompany) return;

    const loadRealData = async () => {
      setIsLoadingRealData(true);
      setRealDataError(null);
      setIsUsingRealData(false);

      try {
        const bsnsYear = 2024;
        let res = await fetchDartFinancialStatements(selectedCompany.dartCode, bsnsYear);

        // If CFS (Consolidated) is not available or empty, try OFS (Separate)
        if (res.status !== "000" || !res.list || res.list.length === 0) {
          console.warn(`CFS data not found or failed (status: ${res.status}). Trying OFS...`);
          res = await fetchDartFinancialStatements(selectedCompany.dartCode, bsnsYear, '', 'OFS');
        }

        if (res.status === "000" && res.list && res.list.length > 0) {
          const parsed = parseDartFinancialData(res.list, bsnsYear, selectedCompany.financialData);
          
          // Verify we have some valid non-zero data parsed
          const hasData = parsed.some(d => d.revenue > 0 || d.assets > 0);
          if (hasData) {
            setRealData(parsed);
            setIsUsingRealData(true);
            setSelectedYear(bsnsYear);
          } else {
            throw new Error("응답이 비어있거나 올바른 재무 계정과목을 찾지 못했습니다.");
          }
        } else {
          throw new Error(res.message || "DART API 응답 오류");
        }
      } catch (err) {
        console.error("Real DART API load failed, falling back to mock data.", err);
        setRealDataError(err.message || "API 연결에 실패했습니다. 키를 확인해주세요.");
        setIsUsingRealData(false);
      } finally {
        setIsLoadingRealData(false);
      }
    };

    loadRealData();
  }, [selectedCompany, triggerFetchCount]);

  // Construct current active company data (either real or mock)
  const currentCompany = selectedCompany ? {
    ...selectedCompany,
    financialData: isUsingRealData && realData ? realData : selectedCompany.financialData
  } : null;

  // Find active financial data
  const activeData = currentCompany
    ? currentCompany.financialData.find((d) => d.year === selectedYear)
    : null;

  // Find previous year data for diffs
  const prevData = currentCompany
    ? currentCompany.financialData.find((d) => d.year === selectedYear - 1)
    : null;

  // Ratios for active year
  const activeRatios = activeData ? calculateFinancialRatios(activeData) : null;

  return (
    <div className="min-height-100svh bg-slate-50 text-slate-800 flex flex-col font-sans antialiased">
      {/* Top Banner Header */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={handleBack}>
            <div className="bg-brand-600 p-2 rounded-xl text-white shadow-md shadow-brand-500/20">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 tracking-tight text-lg">DART</span>
              <span className="font-medium text-slate-500 ml-1.5 text-sm border-l border-slate-200 pl-2 hidden sm:inline">
                기업 재무분석 플랫폼
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-xs">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full font-semibold bg-brand-50 text-brand-700 border border-brand-200/60">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-1.5 animate-pulse"></span>
              공시 데이터 즉시 분석
            </span>
            <a
              href="https://dart.fss.or.kr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-600 flex items-center space-x-1"
            >
              <span>전자공시 바로가기</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center">
        {!currentCompany ? (
          /* Landing/Search Mode */
          <div className="py-12 md:py-20 text-center flex flex-col items-center">
            {/* Trust badge */}
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-brand-50 hover:bg-brand-100 rounded-full border border-brand-100 text-brand-700 text-xs font-semibold mb-6 transition-colors">
              <Globe className="h-3.5 w-3.5" />
              <span>대한민국 10대 상장기업 재무제표 시각화 대시보드</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mb-4">
              기업명을 검색하고 즉시 <br />
              <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                재무비율과 실적
              </span>
              을 분석해보세요
            </h1>
            
            <p className="text-sm md:text-base text-slate-500 max-w-xl mb-10 leading-relaxed">
              다트(DART) 전자공시 시스템의 핵심 3개년 재무제표 데이터를 이용해 영업이익, 당기순이익 트렌드 및 재무 건전성 진단을 실시간 제공합니다.
            </p>

            {/* Centered Search Bar */}
            <div className="w-full mb-12">
              <SearchBar onSelectCompany={handleSelectCompany} />
            </div>

            {/* Quick Informative Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full mt-6">
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm text-left">
                <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl w-10 h-10 flex items-center justify-center font-bold mb-3">01</div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">재무비율 자동 분석</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  유동비율, 부채비율, 영업이익률, ROE 등 핵심 지표를 정량 등급화하여 제공합니다.
                </p>
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm text-left">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl w-10 h-10 flex items-center justify-center font-bold mb-3">02</div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">3개년 트렌드 시각화</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  매출액 대비 영업이익 및 순이익 트렌드를 대화형 차트 디자인으로 시각화합니다.
                </p>
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm text-left">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl w-10 h-10 flex items-center justify-center font-bold mb-3">03</div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">듀퐁 분해 & 진단</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  자기자본이익률(ROE)을 정교하게 해체 분석하여 자본의 근본적인 효율성을 검토합니다.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Dashboard Mode */
          <div className="space-y-6">
            {/* Dashboard Navigation & Profile Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-brand-600 transition-colors bg-white px-4 py-2 border border-slate-200 rounded-xl shadow-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>기업 검색창으로 돌아가기</span>
              </button>

              {/* Minimal Search Bar in header */}
              <div className="w-full md:w-80">
                <SearchBar onSelectCompany={handleSelectCompany} selectedCompany={currentCompany} />
              </div>
            </div>

            {/* DART API Status Banner */}
            {isLoadingRealData ? (
              <div className="bg-brand-50 border border-brand-200/50 rounded-2xl p-4 flex items-center space-x-3 text-brand-700 animate-pulse">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-xs font-bold">DART Open API에서 실시간 공시 재무제표 데이터를 불러오고 있습니다...</span>
              </div>
            ) : isUsingRealData ? (
              <div className="bg-emerald-50 border border-emerald-200/50 rounded-2xl p-4 flex items-center justify-between text-emerald-800">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <div>
                    <span className="text-xs font-bold block">실시간 DART API 연동 성공</span>
                    <span className="text-[10px] text-emerald-600 block mt-0.5">DART 서버에서 직접 조회한 2024년 사업보고서 기준 3개년 실제 재무제표가 대시보드 전체에 반영되었습니다.</span>
                  </div>
                </div>
                <span className="text-[9px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold font-mono">LIVE</span>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200/50 rounded-2xl p-4 flex items-center justify-between text-amber-800">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 animate-bounce" />
                  <div>
                    <span className="text-xs font-bold block">데모용 모의 데이터(Mock) 표시 중</span>
                    <span className="text-[10px] text-amber-600 block mt-0.5">
                      {realDataError ? `오류: ${realDataError}` : "DART Open API 인증키가 올바르지 않거나 연결 설정이 비활성화되었습니다."}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTab('api-settings')}
                  className="text-[10px] px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-bold transition-all border border-amber-200"
                >
                  인증키 설정
                </button>
              </div>
            )}

            {/* Corporate Profile Card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600">
                  <Building2 className="h-8 w-8" />
                </div>
                <div>
                  <div className="flex items-center space-x-2.5">
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">{currentCompany.name}</h2>
                    <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md font-mono">{currentCompany.code}</span>
                    <span className="text-xs px-2 py-0.5 bg-brand-50 text-brand-700 rounded-md">{currentCompany.market}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-400 mt-1">{currentCompany.engName} | {currentCompany.industry}</p>
                  <p className="text-xs text-slate-500 mt-2 max-w-2xl leading-relaxed">{currentCompany.description}</p>
                </div>
              </div>

              {/* Quick links & Year Switcher */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto self-stretch md:self-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                {/* Year Selection dropdown */}
                <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200/80 p-2 rounded-xl">
                  <Calendar className="h-4 w-4 text-slate-400 ml-1" />
                  <span className="text-xs font-bold text-slate-500">기준 연도:</span>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="text-xs font-bold text-slate-800 bg-transparent border-none focus:outline-none cursor-pointer pr-4"
                  >
                    {currentCompany.financialData.map((d) => (
                      <option key={d.year} value={d.year}>
                        {d.year}년
                      </option>
                    ))}
                  </select>
                </div>

                {/* DART Web Link */}
                <a
                  href={`https://dart.fss.or.kr/dsab001/main.do?textCrpNm=${encodeURIComponent(currentCompany.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-brand-600/10"
                >
                  <span>DART 원문 공시</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            {activeData ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">매출액</span>
                  <span className="text-base font-bold text-slate-800 block mt-1">{formatKoreanNumber(activeData.revenue)}</span>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">영업이익</span>
                  <span className={`text-base font-bold block mt-1 ${activeData.operatingProfit < 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                    {formatKoreanNumber(activeData.operatingProfit)}
                  </span>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">당기순이익</span>
                  <span className={`text-base font-bold block mt-1 ${activeData.netIncome < 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                    {formatKoreanNumber(activeData.netIncome)}
                  </span>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">영업이익률</span>
                  <span className={`text-base font-bold block mt-1 ${activeRatios?.operatingMargin < 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                    {activeRatios?.operatingMargin?.toFixed(1) || "0.0"}%
                  </span>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ROE (자기자본이익률)</span>
                  <span className={`text-base font-bold block mt-1 ${activeRatios?.roe < 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                    {activeRatios?.roe?.toFixed(1) || "0.0"}%
                  </span>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">부채비율</span>
                  <span className="text-base font-bold text-slate-800 block mt-1">{activeRatios?.debtRatio?.toFixed(1) || "0.0"}%</span>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center text-xs text-slate-400">
                선택한 연도({selectedYear}년)의 재무 데이터를 불러올 수 없습니다.
              </div>
            )}

            {/* Dashboard Main Tabs Header */}
            <div className="border-b border-slate-200">
              <nav className="flex flex-wrap -mb-px space-x-2 md:space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`flex items-center space-x-1.5 py-4 px-1 border-b-2 font-bold text-sm transition-all ${
                    activeTab === 'summary'
                      ? 'border-brand-600 text-brand-600'
                      : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>종합 분석 요약</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('statements')}
                  className={`flex items-center space-x-1.5 py-4 px-1 border-b-2 font-bold text-sm transition-all ${
                    activeTab === 'statements'
                      ? 'border-brand-600 text-brand-600'
                      : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>상세 재무제표</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('dupont')}
                  className={`flex items-center space-x-1.5 py-4 px-1 border-b-2 font-bold text-sm transition-all ${
                    activeTab === 'dupont'
                      ? 'border-brand-600 text-brand-600'
                      : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Layers className="h-4 w-4" />
                  <span>듀퐁 분석 (ROE 분해)</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('diagnostics')}
                  className={`flex items-center space-x-1.5 py-4 px-1 border-b-2 font-bold text-sm transition-all ${
                    activeTab === 'diagnostics'
                      ? 'border-brand-600 text-brand-600'
                      : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Award className="h-4 w-4" />
                  <span>AI 재무 진단</span>
                </button>

                <button
                  onClick={() => setActiveTab('api-settings')}
                  className={`flex items-center space-x-1.5 py-4 px-1 border-b-2 font-bold text-sm transition-all ${
                    activeTab === 'api-settings'
                      ? 'border-brand-600 text-brand-600'
                      : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>DART API 제어판</span>
                </button>
              </nav>
            </div>

            {/* Dashboard Tab Panels */}
            {activeData && (
              <div className="space-y-6">
                {activeTab === 'summary' && (
                  <>
                    {/* Financial Ratios Panel */}
                    <RatioCards activeFinancialData={activeData} prevFinancialData={prevData} />
                    
                    {/* Performance Chart Panel */}
                    <FinancialChart company={currentCompany} />
                  </>
                )}

                {activeTab === 'statements' && (
                  <FinancialTable company={currentCompany} />
                )}

                {activeTab === 'dupont' && (
                  <DupontAnalysis activeFinancialData={activeData} />
                )}

                {activeTab === 'diagnostics' && (
                  <DiagnosticsReport company={currentCompany} activeFinancialData={activeData} />
                )}

                {activeTab === 'api-settings' && (
                  <DartApiConfig 
                    company={currentCompany} 
                    onKeyChange={() => setTriggerFetchCount(prev => prev + 1)} 
                  />
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-brand-600 p-1.5 rounded-lg text-white">
              <Building2 className="h-4 w-4" />
            </div>
            <span className="font-extrabold text-white">DART Corporate Dashboard</span>
          </div>
          <p className="text-xs leading-relaxed max-w-md mx-auto text-slate-500">
            본 사이트는 DART 전자공시 시스템의 공시 정보에 기반하여 구성된 재무 포털 분석 사이트입니다.
          </p>
          <div className="text-[10px] text-slate-600">
            &copy; {new Date().getFullYear()} DART Financial Analysis Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
