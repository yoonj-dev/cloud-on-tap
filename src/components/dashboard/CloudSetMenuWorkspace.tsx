import React, { useState } from 'react';
import { 
  TrendingUp, 
  Cpu, 
  Coins, 
  ShieldCheck, 
  Activity, 
  BarChart3, 
  Layers, 
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { CloudComparisonData, CloudTicker, CloudPlatformMetrics } from '../../types/cloud';

interface CloudSetMenuWorkspaceProps {
  data: CloudComparisonData;
  activeTicker: CloudTicker;
  onSelectTicker: (t: CloudTicker) => void;
}

export const CloudSetMenuWorkspace: React.FC<CloudSetMenuWorkspaceProps> = ({
  data,
  activeTicker,
  onSelectTicker,
}) => {
  const [activeTab, setActiveTab] = useState<'dominance' | 'capex' | 'opm' | 'ai'>('dominance');
  const platformsList = Object.values(data.platforms);
  const current = data.platforms[activeTicker];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm mb-8">
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-zinc-100 dark:border-zinc-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
              Hyperscale Analytics
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Set-Menu Workspace
            </span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
            Cloud 3강 심층 전술 비교실
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
            전 세계 IaaS/PaaS 시장({data.totalCloudMarketAnnual})을 독식하는 Big 3의 실적·CapEx 효율·마진 정밀 분석
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('dominance')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'dominance'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            점유율 & 규모
          </button>
          <button
            onClick={() => setActiveTab('capex')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'capex'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            CapEx & 자본 효율
          </button>
          <button
            onClick={() => setActiveTab('opm')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'opm'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            영업이익률(OPM)
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'ai'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            AI 생태계 & Moat
          </button>
        </div>
      </div>

      {/* Tab 1: Dominance & Scale */}
      {activeTab === 'dominance' && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platformsList.map((item: CloudPlatformMetrics) => (
              <div
                key={item.ticker}
                onClick={() => onSelectTicker(item.ticker)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  activeTicker === item.ticker
                    ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/20 shadow-sm'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">{item.serviceName}</span>
                  <span className="text-xs px-2 py-0.5 rounded font-semibold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
                    점유율 {item.marketSharePct}%
                  </span>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 mb-3">
                  <div 
                    className="h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${item.marketSharePct}%`, backgroundColor: item.brandColor }}
                  />
                </div>
                <div className="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400">
                  <span>연간 런레이트</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">{item.annualRunRate}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  <span>전년비 성장률(YoY)</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">+{item.yoyGrowth}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              IaaS/PaaS 하이퍼스케일러 시장 총평
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              글로벌 클라우드 인프라 시장은 연간 3,150억 달러를 돌파했으며 상위 3사(AWS, Azure, GCP)가 전체의 70% 이상을 장악하는 3각 과점 구조입니다.
              AWS는 1위의 수성 규모($1,100억 런레이트)를 무기로 안정적 현금흐름을 창출하고 있으며, Azure는 OpenAI 독점 파트너십과 M365 번들링으로 YoY +29%의 맹렬한 추격전을 벌이고 있습니다. GCP는 흑자 전환 이후 AI 하이퍼컴퓨터(TPU v5p/v6e) 인프라 수요 급증으로 +35%라는 Big 3 최고 성장률을 구가하고 있습니다.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: CapEx & Capital Efficiency */}
      {activeTab === 'capex' && (
        <div className="mt-6 space-y-6">
          <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="p-3 font-semibold">클라우드 플랫폼 (티커)</th>
                  <th className="p-3 font-semibold">모회사 연간 CapEx</th>
                  <th className="p-3 font-semibold">CapEx 효율비율 (매출/CapEx)</th>
                  <th className="p-3 font-semibold">AI 가속기 & 모델 Moat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {platformsList.map((row: CloudPlatformMetrics) => (
                  <tr key={row.ticker} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40">
                    <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: row.brandColor }} />
                      {row.serviceName} ({row.ticker})
                    </td>
                    <td className="p-3 text-zinc-700 dark:text-zinc-300 font-mono font-medium">{row.capexAnnualRunRate}</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-mono font-bold">{row.capexEfficiencyRatio}x</td>
                    <td className="p-3 text-zinc-600 dark:text-zinc-400">{row.aiMoatModel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1 flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-emerald-500" />
                원전 및 기저부하 전력(Power Purchase) 전쟁
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Big 3의 CapEx 경쟁은 GPU 구매를 넘어 차세대 소형 모듈 원자로(SMR) 및 중단 없는 기저 전력 선점으로 확대되었습니다.
                Amazon은 Talen Energy의 Cumulus 데이터센터(960MW)를 직접 매입했고, Microsoft는 쓰리마일 섬 1호기(835MW) 20년 전력 구매 계약(Constellation Energy)을 체결했으며, Google은 Kairos Power와 500MW 규모의 SMR 구매 계약을 선제 체결했습니다.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-sky-500" />
                엔비디아 종속 탈피 (ASIC 인하우스화)
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                AWS Trainium2/Inferentia2, Google TPU v5p/Trillium, Microsoft Maia 100은 엔비디아 블랙웰(B200) 의존도를 낮추고 추론 비용을 40~60% 절감하는 핵심 레버리지입니다. 3사 중 구글의 TPU 생태계가 제미나이 100% 학습/서빙으로 가장 성숙해 있으며, AWS는 Anthropic과 손잡고 Trainium 클러스터를 대규모 가동 중입니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Operating Margin (OPM) */}
      {activeTab === 'opm' && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platformsList.map((item: CloudPlatformMetrics) => (
              <div 
                key={item.ticker}
                className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">{item.serviceName}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
                    OPM {item.operatingMargin}%
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                    <span>최근 분기 매출</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{item.quarterlyRevenue}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                    <span>전년비 성장률(YoY)</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">+{item.yoyGrowth}%</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    목표주가: ${item.targetPrice} (상승여력 +{item.targetUpside}%)
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50">
            <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-200 mb-1 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              마진 구조 비교 (Margin Dynamics)
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Azure(45%)</strong>는 Office 365 엔터프라이즈 고객 기반의 고마진 SaaS/PaaS 교차 판매를 통해 최고 수준의 OPM을 유지하고 있습니다.
              <strong>AWS(38.1%)</strong>는 서버 감가상각 내용연수 5년→6년 연장 효과와 인프라 최적화로 마진을 38%대까지 복원했습니다.
              <strong>GCP(11.7%)</strong>는 과거 수년간의 적자 구조를 완전히 탈피하여 스케일 효과가 본격 발현되는 이익 레버리지 폭발 구간에 진입했습니다.
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: AI Ecosystem & Moat */}
      {activeTab === 'ai' && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platformsList.map((eco: CloudPlatformMetrics) => (
              <div 
                key={eco.ticker}
                className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{eco.serviceName}</span>
                    <span className="text-xs px-2 py-0.5 rounded font-mono font-semibold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
                      {eco.ticker}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs mb-4">
                    <div>
                      <span className="text-zinc-500 dark:text-zinc-400 block mb-0.5 font-medium">핵심 AI 아키텍처</span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">{eco.aiMoatModel}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 dark:text-zinc-400 block mb-0.5 font-medium">전략적 Moat</span>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{eco.aiEcosystemSummary}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
                  <span className="text-[11px] font-medium text-sky-600 dark:text-sky-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    밸류에이션: Fwd P/E {eco.forwardPE}x · 시가총액 {eco.marketCap}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Provider Quick Profile Box */}
      <div className="mt-6 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-500" />
            선택된 플랫폼: {current.serviceName} ({current.parentCompany})
          </h4>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            Ticker: {current.ticker}
          </span>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
          {current.aiEcosystemSummary}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="p-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[11px] text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-1.5">
            <ArrowUpRight className="w-3 h-3 text-sky-500 shrink-0" />
            <span>점유율: {current.marketSharePct}%</span>
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[11px] text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-1.5">
            <ArrowUpRight className="w-3 h-3 text-sky-500 shrink-0" />
            <span>런레이트: {current.annualRunRate}</span>
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[11px] text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-1.5">
            <ArrowUpRight className="w-3 h-3 text-sky-500 shrink-0" />
            <span>영업마진: {current.operatingMargin}%</span>
          </div>
          <div className="p-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[11px] text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-1.5">
            <ArrowUpRight className="w-3 h-3 text-sky-500 shrink-0" />
            <span>YoY 성장: +{current.yoyGrowth}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
