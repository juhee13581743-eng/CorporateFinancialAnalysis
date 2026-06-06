// SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { mockCompanies } from '../data/mockCompanies';

export default function SearchBar({ onSelectCompany, selectedCompany }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);
  const containerRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Filter suggestions when query changes
  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = mockCompanies.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.code.includes(query) ||
        c.engName.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered);
  }, [query]);

  // Handle click outside to close suggestion box
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (company) => {
    onSelectCompany(company);
    setQuery('');
    setIsOpen(false);
    setActiveIndex(-1);

    // Save to recent searches
    const updated = [
      company.name,
      ...recentSearches.filter((item) => item !== company.name),
    ].slice(0, 5); // Keep last 5
    setRecentSearches(updated);
    localStorage.setItem('recent_searches', JSON.stringify(updated));
  };

  const handleRecentClick = (name) => {
    const company = mockCompanies.find((c) => c.name === name);
    if (company) {
      handleSelect(company);
    }
  };

  const removeRecentSearch = (e, name) => {
    e.stopPropagation();
    const updated = recentSearches.filter((item) => item !== name);
    setRecentSearches(updated);
    localStorage.setItem('recent_searches', JSON.stringify(updated));
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSelect(suggestions[activeIndex]);
      } else if (suggestions.length > 0) {
        handleSelect(suggestions[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const popularCompanies = ["삼성전자", "SK하이닉스", "현대자동차", "NAVER", "셀트리온"];

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto relative z-50">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          className="w-full pl-11 pr-10 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-lg transition-all duration-200"
          placeholder="기업명 또는 종목코드(6자리)를 입력하세요..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Suggestion Dropdown */}
      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Query Suggestions */}
          {query.trim() !== '' ? (
            suggestions.length > 0 ? (
              <div className="max-h-80 overflow-y-auto">
                <div className="px-4 py-2 text-xs font-semibold text-slate-400 bg-slate-50 uppercase tracking-wider">
                  검색 결과
                </div>
                {suggestions.map((company, index) => (
                  <div
                    key={company.id}
                    className={`px-4 py-3 flex items-center justify-between cursor-pointer transition-colors ${
                      index === activeIndex ? 'bg-brand-50 text-brand-900' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                    onClick={() => handleSelect(company)}
                  >
                    <div>
                      <div className="font-medium">{company.name}</div>
                      <div className="text-xs text-slate-400">{company.engName}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md font-mono">
                        {company.code}
                      </span>
                      <span className="text-xs px-2 py-1 bg-brand-50 text-brand-700 rounded-md">
                        {company.market}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400">
                검색 결과가 없습니다.
              </div>
            )
          ) : (
            // Default panel when query is empty: Recent & Popular
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {/* Recent Searches */}
              <div className="p-4">
                <div className="flex items-center text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  <Clock className="h-3.5 w-3.5 mr-1.5" /> 최근 검색어
                </div>
                {recentSearches.length > 0 ? (
                  <div className="space-y-1">
                    {recentSearches.map((name) => (
                      <div
                        key={name}
                        className="group flex items-center justify-between px-2 py-2 hover:bg-slate-50 rounded-lg cursor-pointer text-slate-700 hover:text-brand-700 text-sm"
                        onClick={() => handleRecentClick(name)}
                      >
                        <span>{name}</span>
                        <button
                          onClick={(e) => removeRecentSearch(e, name)}
                          className="text-slate-300 hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-slate-400 text-sm">
                    최근 검색어가 없습니다.
                  </div>
                )}
              </div>

              {/* Popular Keywords */}
              <div className="p-4">
                <div className="flex items-center text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                  <TrendingUp className="h-3.5 w-3.5 mr-1.5" /> 인기 기업 검색
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularCompanies.map((name) => (
                    <button
                      key={name}
                      onClick={() => handleRecentClick(name)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-brand-50 hover:text-brand-700 text-slate-600 rounded-full text-xs font-medium transition-colors border border-slate-100 hover:border-brand-200"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
