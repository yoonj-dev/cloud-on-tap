import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { CloudBattlegroundHero } from './components/dashboard/CloudBattlegroundHero';
import { CloudSetMenuWorkspace } from './components/dashboard/CloudSetMenuWorkspace';
import { TradingViewCloudComparison } from './components/dashboard/TradingViewCloudComparison';
import { Footer } from './components/layout/Footer';
import { Theme, getInitialTheme, applyThemeToDom, resolveTheme } from './lib/theme';
import { CloudTicker } from './types/cloud';
import { INITIAL_CLOUD_DATA } from './data/cloudData';

export const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState<Theme>(getInitialTheme());
  const [cloudData, setCloudData] = useState(INITIAL_CLOUD_DATA);
  const [activeTicker, setActiveTicker] = useState<CloudTicker>('AMZN');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    applyThemeToDom(themeMode);
    setEffectiveTheme(resolveTheme(themeMode));

    if (themeMode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        applyThemeToDom('auto');
        setEffectiveTheme(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [themeMode]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate real-time micro fluctuations
      setCloudData((prev) => {
        const next = { ...prev };
        const randVariation = (Math.random() - 0.49) * 0.4;
        const current = next.platforms[activeTicker];
        const newPrice = Number((current.currentPrice + randVariation).toFixed(2));
        next.platforms[activeTicker] = {
          ...current,
          currentPrice: newPrice,
          change: Number((newPrice - (current.currentPrice - current.change)).toFixed(2)),
        };
        return next;
      });
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans transition-colors selection:bg-sky-500 selection:text-white">
      <Header 
        currentTheme={themeMode} 
        onThemeChanged={setThemeMode}
        platforms={cloudData.platforms}
        activeTicker={activeTicker}
        onSelectTicker={setActiveTicker}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hyperscale Cloud Overview Hero */}
        <CloudBattlegroundHero 
          data={cloudData}
          activeTicker={activeTicker}
          onSelectTicker={setActiveTicker}
        />

        {/* Set-Menu Deep Analysis Workspace */}
        <CloudSetMenuWorkspace 
          data={cloudData}
          activeTicker={activeTicker}
          onSelectTicker={setActiveTicker}
        />

        {/* Normalized TradingView Comparison */}
        <TradingViewCloudComparison theme={effectiveTheme} />
      </main>

      <Footer />
    </div>
  );
};

export default App;
