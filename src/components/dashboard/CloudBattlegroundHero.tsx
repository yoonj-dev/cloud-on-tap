import React, { useRef, useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Cloud,
} from 'lucide-react';
import { CloudComparisonData, CloudTicker } from '../../types/cloud';

interface CloudBattlegroundHeroProps {
  data: CloudComparisonData;
  activeTicker: CloudTicker;
  onSelectTicker: (t: CloudTicker) => void;
}

export const CloudBattlegroundHero: React.FC<CloudBattlegroundHeroProps> = ({
  data,
  activeTicker,
  onSelectTicker,
}) => {
  const { platforms, totalCloudMarketAnnual } = data;
  const current = platforms[activeTicker];

  const prevPriceRef = useRef<number>(current.currentPrice);
  const [glow, setGlow] = useState<'UP' | 'DOWN' | null>(null);

  useEffect(() => {
    if (prevPriceRef.current !== current.currentPrice && prevPriceRef.current > 0) {
      setGlow(current.currentPrice > prevPriceRef.current ? 'UP' : 'DOWN');
      const timer = setTimeout(() => setGlow(null), 1200);
      prevPriceRef.current = current.currentPrice;
      return () => clearTimeout(timer);
    }
    prevPriceRef.current = current.currentPrice;
  }, [current.currentPrice]);

  return (
    <div className="fintech-card p-4 sm:p-6 space-y-5">
      {/* 1. Header Proportional Market Share Bar */}
      <div className="space-y-2.5 pb-4 border-b border-slate-100 dark:border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Cloud className="w-4 h-4" />
            </span>
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              글로벌 클라우드 {totalCloudMarketAnnual} IaaS/PaaS 영토 전쟁 (Market Dominance)
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-zinc-500">
            빅3 점유율 합계 69.0% 독과점
          </span>
        </div>

        {/* Proportional Dominance Bar */}
        <div className="w-full h-8 rounded-xl overflow-hidden flex shadow-xs border border-slate-200/80 dark:border-zinc-800">
          {(['AMZN', 'MSFT', 'GOOGL'] as CloudTicker[]).map((ticker) => {
            const comp = platforms[ticker];
            const isSelected = activeTicker === ticker;
            const bgClass =
              ticker === 'AMZN'
                ? 'bg-[#FF9900]'
                : ticker === 'MSFT'
                ? 'bg-[#0078D4]'
                : 'bg-[#4285F4]';
            return (
              <button
                key={ticker}
                onClick={() => onSelectTicker(ticker)}
                style={{ width: `${(comp.marketSharePct / 69) * 100}%` }}
                className={`h-full ${bgClass} transition-all relative flex items-center justify-center text-white text-[11px] font-black font-mono cursor-pointer ${
                  isSelected ? 'ring-2 ring-white dark:ring-zinc-900 z-10 scale-[1.01]' : 'opacity-90 hover:opacity-100'
                }`}
                title={`${comp.serviceName}: ${comp.marketSharePct}%`}
              >
                <span>{comp.serviceName.split(' ')[0]} {comp.marketSharePct}%</span>
              </button>
            );
          })}
        </div>

        {/* 3 Platform Legend Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          {(['AMZN', 'MSFT', 'GOOGL'] as CloudTicker[]).map((ticker) => {
            const comp = platforms[ticker];
            const isSelected = activeTicker === ticker;
            return (
              <button
                key={ticker}
                onClick={() => onSelectTicker(ticker)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-50 dark:bg-zinc-800/80 border-slate-400 dark:border-zinc-600 shadow-xs'
                    : 'bg-white dark:bg-zinc-900/40 border-slate-200/60 dark:border-zinc-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: comp.brandColor }} />
                    <span>{comp.serviceName}</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-700 dark:text-zinc-300">
                    점유율 {comp.marketSharePct}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400 mt-1 font-mono">
                  <span>런레이트 {comp.annualRunRate}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">YoY +{comp.yoyGrowth}%</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Selected Platform Live Price Hero Card */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="px-2.5 py-0.5 rounded-lg text-white font-mono font-black text-xs shadow-xs"
              style={{ backgroundColor: current.brandColor }}
            >
              {current.ticker}
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {current.serviceName}
            </span>
            <span className="text-[11px] font-bold text-slate-400 dark:text-zinc-500">
              ({current.parentCompany})
            </span>
          </div>

          {/* Price & Change with Glow Pulse */}
          <div
            className={`inline-flex items-baseline gap-3 p-1.5 -ml-1.5 rounded-xl transition-all duration-300 ${
              glow === 'UP'
                ? 'bg-emerald-500/15 ring-2 ring-emerald-500/50 shadow-md shadow-emerald-500/10'
                : glow === 'DOWN'
                ? 'bg-rose-500/15 ring-2 ring-rose-500/50 shadow-md shadow-rose-500/10'
                : ''
            }`}
          >
            <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
              ${current.currentPrice.toFixed(2)}
            </span>
            <div
              className={`flex items-center gap-1 font-mono text-sm sm:text-base font-bold ${
                current.change >= 0 ? 'text-emerald-500' : 'text-rose-500'
              }`}
            >
              {current.change >= 0 ? (
                <TrendingUp className="w-4 h-4 stroke-[2.5]" />
              ) : (
                <TrendingDown className="w-4 h-4 stroke-[2.5]" />
              )}
              <span>{current.change >= 0 ? '+' : ''}${Math.abs(current.change).toFixed(2)}</span>
              <span>({current.changePercent >= 0 ? '+' : ''}{current.changePercent.toFixed(2)}%)</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-zinc-400 max-w-xl leading-relaxed">
            {current.aiEcosystemSummary}
          </p>
        </div>

        {/* Right: Key Ratios */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 text-xs">
            <span className="text-[10.5px] text-slate-400 dark:text-zinc-500 block">영업이익률 (OPM)</span>
            <span className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400">
              {current.operatingMargin}%
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 text-xs">
            <span className="text-[10.5px] text-slate-400 dark:text-zinc-500 block">YoY 매출 성장률</span>
            <span className="text-sm font-black font-mono text-blue-600 dark:text-blue-400">
              +{current.yoyGrowth}%
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 text-xs">
            <span className="text-[10.5px] text-slate-400 dark:text-zinc-500 block">CapEx 효율비</span>
            <span className="text-sm font-black font-mono text-purple-600 dark:text-purple-400">
              {current.capexEfficiencyRatio.toFixed(2)}x
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 text-xs">
            <span className="text-[10.5px] text-slate-400 dark:text-zinc-500 block">목표가 상방</span>
            <span className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400">
              +{current.targetUpside}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
