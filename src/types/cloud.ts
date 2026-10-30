export type CloudTicker = 'AMZN' | 'MSFT' | 'GOOGL';

export interface CloudPlatformMetrics {
  ticker: CloudTicker;
  serviceName: string; // AWS, Azure, Google Cloud
  parentCompany: string;
  brandColor: string;
  badgeBg: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  marketCap: string;
  trailingPE: number;
  forwardPE: number;
  targetPrice: number;
  targetUpside: number;
  
  // Cloud metrics
  marketSharePct: number; // e.g. 31.0
  annualRunRate: string; // e.g. '$110B'
  quarterlyRevenue: string; // e.g. '$27.5B'
  yoyGrowth: number; // e.g. 19.1
  operatingMargin: number; // e.g. 38.1
  capexAnnualRunRate: string; // e.g. '$75B'
  capexEfficiencyRatio: number; // Revenue / CapEx ratio
  aiMoatModel: string; // Bedrock & Claude, OpenAI & Copilot, Gemini & TPU
  aiEcosystemSummary: string;
}

export interface CloudComparisonData {
  asOfDate: string;
  totalCloudMarketAnnual: string; // e.g. '$320B'
  platforms: Record<CloudTicker, CloudPlatformMetrics>;
}
