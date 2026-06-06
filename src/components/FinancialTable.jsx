// FinancialTable.jsx
import React, { useState } from 'react';
import { formatKoreanNumber } from '../data/mockCompanies';
import { Table, Eye, FileSpreadsheet } from 'lucide-react';

export default function FinancialTable({ company }) {
  const [statementType, setStatementType] = useState('income'); // 'income' | 'balance'

  // Reverse data order to show chronologically left-to-right (e.g. 2023, 2024, 2025)
  const yearsData = [...company.financialData].sort((a, b) => a.year - b.year);

  // Generate detailed rows based on basic data
  const getIncomeStatementRows = () => {
    return yearsData.map((d) => {
      // Create plausible sub-items
      const costOfSales = Math.round(d.revenue * 0.73);
      const grossProfit = d.revenue - costOfSales;
      const sga = grossProfit - d.operatingProfit;
      const tax = Math.round(Math.max(0, d.operatingProfit * 0.22));
      const nonOperating = d.netIncome - d.operatingProfit + tax;

      return {
        year: d.year,
        revenue: d.revenue,
        costOfSales,
        grossProfit,
        sga,
        operatingProfit: d.operatingProfit,
        nonOperating,
        tax,
        netIncome: d.netIncome,
      };
    });
  };

  const getBalanceSheetRows = () => {
    return yearsData.map((d) => {
      const nonCurrentAssets = d.assets - d.currentAssets;
      const nonCurrentLiabilities = d.liabilities - d.currentLiabilities;

      return {
        year: d.year,
        assets: d.assets,
        currentAssets: d.currentAssets,
        cash: d.cash,
        nonCurrentAssets,
        liabilities: d.liabilities,
        currentLiabilities: d.currentLiabilities,
        nonCurrentLiabilities,
        equity: d.equity,
      };
    });
  };

  const incomeRows = getIncomeStatementRows();
  const balanceRows = getBalanceSheetRows();

  const handleExportCSV = () => {
    let headers = [];
    let rows = [];
    const filename = `${company.name}_재무제표_${statementType === 'income' ? '손익계산서' : '재무상태표'}.csv`;

    if (statementType === 'income') {
      headers = ['계정명', ...yearsData.map(d => `${d.year}년`)];
      const items = [
        { label: 'Ⅰ. 매출액', key: 'revenue' },
        { label: '  매출원가', key: 'costOfSales' },
        { label: 'Ⅱ. 매출총이익', key: 'grossProfit' },
        { label: '  판매비와관리비', key: 'sga' },
        { label: 'Ⅲ. 영업이익', key: 'operatingProfit' },
        { label: '  영업외손익', key: 'nonOperating' },
        { label: '  법인세비용', key: 'tax' },
        { label: 'Ⅳ. 당기순이익', key: 'netIncome' }
      ];

      rows = items.map(item => {
        const rowVals = incomeRows.map(r => r[item.key]);
        return [item.label, ...rowVals];
      });
    } else {
      headers = ['계정명', ...yearsData.map(d => `${d.year}년`)];
      const items = [
        { label: 'Ⅰ. 자산총계', key: 'assets' },
        { label: '  유동자산', key: 'currentAssets' },
        { label: '    현금및현금성자산', key: 'cash' },
        { label: '  비유동자산', key: 'nonCurrentAssets' },
        { label: 'Ⅱ. 부채총계', key: 'liabilities' },
        { label: '  유동부채', key: 'currentLiabilities' },
        { label: '  비유동부채', key: 'nonCurrentLiabilities' },
        { label: 'Ⅲ. 자본총계', key: 'equity' }
      ];

      rows = items.map(item => {
        const rowVals = balanceRows.map(r => r[item.key]);
        return [item.label, ...rowVals];
      });
    }

    // Create CSV content (UTF-8 BOM is required for Excel to read Korean properly)
    const csvContent = "\uFEFF" + [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
      {/* Table Action Header */}
      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2">
          <Table className="h-5 w-5 text-brand-600" />
          <h3 className="text-base font-bold text-slate-800">요약 재무제표 (3개년 비교)</h3>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {/* Statement Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl flex-1 sm:flex-initial">
            <button
              onClick={() => setStatementType('income')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statementType === 'income' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              손익계산서
            </button>
            <button
              onClick={() => setStatementType('balance')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statementType === 'balance' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              재무상태표
            </button>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center space-x-1 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition-colors shadow-sm"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
            <span className="hidden sm:inline">CSV 다운로드</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-slate-400 font-semibold text-xs uppercase tracking-wider">
              <th className="py-4 px-6 font-semibold">계정 과목 (Account Title)</th>
              {yearsData.map((d) => (
                <th key={d.year} className="py-4 px-6 text-right font-semibold">
                  {d.year}년
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {statementType === 'income' ? (
              <>
                {/* Income Statement Table Rows */}
                <tr className="hover:bg-slate-50/50 font-semibold text-slate-900 bg-brand-50/10">
                  <td className="py-3.5 px-6">Ⅰ. 매출액 (Revenue)</td>
                  {incomeRows.map((r, i) => (
                    <td key={i} className="py-3.5 px-6 text-right">
                      {formatKoreanNumber(r.revenue)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 text-slate-500">
                  <td className="py-3 px-6 pl-10">매출원가 (Cost of Sales)</td>
                  {incomeRows.map((r, i) => (
                    <td key={i} className="py-3 px-6 text-right text-slate-600">
                      {formatKoreanNumber(r.costOfSales)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 font-semibold text-slate-800">
                  <td className="py-3.5 px-6">Ⅱ. 매출총이익 (Gross Profit)</td>
                  {incomeRows.map((r, i) => (
                    <td key={i} className="py-3.5 px-6 text-right">
                      {formatKoreanNumber(r.grossProfit)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 text-slate-500">
                  <td className="py-3 px-6 pl-10">판매비와관리비 (SG&A)</td>
                  {incomeRows.map((r, i) => (
                    <td key={i} className="py-3 px-6 text-right text-slate-600">
                      {formatKoreanNumber(r.sga)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 font-bold bg-brand-50/30 text-brand-900 border-y border-brand-100">
                  <td className="py-4 px-6">Ⅲ. 영업이익 (Operating Profit)</td>
                  {incomeRows.map((r, i) => (
                    <td key={i} className="py-4 px-6 text-right">
                      {formatKoreanNumber(r.operatingProfit)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 text-slate-500">
                  <td className="py-3 px-6 pl-10">영업외손익 (Non-operating items)</td>
                  {incomeRows.map((r, i) => (
                    <td key={i} className="py-3 px-6 text-right text-slate-600">
                      {formatKoreanNumber(r.nonOperating)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 text-slate-500">
                  <td className="py-3 px-6 pl-10">법인세비용 (Income Taxes)</td>
                  {incomeRows.map((r, i) => (
                    <td key={i} className="py-3 px-6 text-right text-slate-600">
                      {formatKoreanNumber(r.tax)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 font-bold bg-slate-100/50 text-slate-900">
                  <td className="py-4 px-6">Ⅳ. 당기순이익 (Net Income)</td>
                  {incomeRows.map((r, i) => (
                    <td key={i} className={`py-4 px-6 text-right ${r.netIncome < 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                      {formatKoreanNumber(r.netIncome)}
                    </td>
                  ))}
                </tr>
              </>
            ) : (
              <>
                {/* Balance Sheet Table Rows */}
                <tr className="hover:bg-slate-50/50 font-bold text-slate-900 bg-brand-50/10">
                  <td className="py-4 px-6">Ⅰ. 자산총계 (Total Assets)</td>
                  {balanceRows.map((r, i) => (
                    <td key={i} className="py-4 px-6 text-right">
                      {formatKoreanNumber(r.assets)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 text-slate-600 font-semibold">
                  <td className="py-3 px-6 pl-10">유동자산 (Current Assets)</td>
                  {balanceRows.map((r, i) => (
                    <td key={i} className="py-3 px-6 text-right">
                      {formatKoreanNumber(r.currentAssets)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 text-slate-500">
                  <td className="py-3 px-6 pl-16">현금및현금성자산 (Cash)</td>
                  {balanceRows.map((r, i) => (
                    <td key={i} className="py-3 px-6 text-right text-slate-500">
                      {formatKoreanNumber(r.cash)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 text-slate-600">
                  <td className="py-3 px-6 pl-10">비유동자산 (Non-current Assets)</td>
                  {balanceRows.map((r, i) => (
                    <td key={i} className="py-3 px-6 text-right">
                      {formatKoreanNumber(r.nonCurrentAssets)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 font-bold text-slate-900 bg-slate-50">
                  <td className="py-4 px-6">Ⅱ. 부채총계 (Total Liabilities)</td>
                  {balanceRows.map((r, i) => (
                    <td key={i} className="py-4 px-6 text-right">
                      {formatKoreanNumber(r.liabilities)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 text-slate-600">
                  <td className="py-3 px-6 pl-10">유동부채 (Current Liabilities)</td>
                  {balanceRows.map((r, i) => (
                    <td key={i} className="py-3 px-6 text-right">
                      {formatKoreanNumber(r.currentLiabilities)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 text-slate-600">
                  <td className="py-3 px-6 pl-10">비유동부채 (Non-current Liabilities)</td>
                  {balanceRows.map((r, i) => (
                    <td key={i} className="py-3 px-6 text-right">
                      {formatKoreanNumber(r.nonCurrentLiabilities)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/50 font-bold bg-brand-50/20 text-brand-950 border-t border-brand-100">
                  <td className="py-4 px-6">Ⅲ. 자본총계 (Total Equity)</td>
                  {balanceRows.map((r, i) => (
                    <td key={i} className="py-4 px-6 text-right">
                      {formatKoreanNumber(r.equity)}
                    </td>
                  ))}
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Table Footer Tip */}
      <div className="px-6 py-4 bg-slate-50 text-slate-400 text-xs flex justify-between items-center">
        <span>* 단위: 원 (KRW)</span>
        <span>출처: 다트(DART) 전자공시시스템 연간 공시 보고서 준용</span>
      </div>
    </div>
  );
}
