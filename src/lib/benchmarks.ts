export interface BenchmarkRange {
  min: number
  max: number
  good: number
  average: number
}

export interface FunnelBenchmarks {
  cpm: BenchmarkRange
  ctr: BenchmarkRange
  cpl: BenchmarkRange
  cpc: BenchmarkRange
  roas: BenchmarkRange
  cvr?: BenchmarkRange
}

export const BENCHMARKS: Record<string, FunnelBenchmarks> = {
  consulting: {
    cpm: { min: 10, max: 35, good: 15, average: 25 },
    ctr: { min: 0.8, max: 2.5, good: 1.5, average: 1.0 },
    cpl: { min: 10, max: 50, good: 20, average: 35 },
    cpc: { min: 0.5, max: 3, good: 1.5, average: 2.5 },
    roas: { min: 1, max: 5, good: 3, average: 2 },
  },
  lead_magnet: {
    cpm: { min: 10, max: 25, good: 12, average: 18 },
    ctr: { min: 0.8, max: 2.0, good: 1.5, average: 1.0 },
    cpl: { min: 5, max: 25, good: 10, average: 18 },
    cpc: { min: 0.3, max: 2, good: 0.8, average: 1.5 },
    roas: { min: 1, max: 5, good: 3, average: 2 },
  },
  webinar: {
    cpm: { min: 15, max: 35, good: 18, average: 25 },
    ctr: { min: 0.5, max: 1.5, good: 1.2, average: 0.8 },
    cpl: { min: 15, max: 50, good: 25, average: 40 },
    cpc: { min: 0.5, max: 3, good: 1.5, average: 2.5 },
    roas: { min: 1, max: 5, good: 3, average: 2 },
  },
  strategy_call: {
    cpm: { min: 20, max: 50, good: 25, average: 35 },
    ctr: { min: 0.3, max: 1.0, good: 0.8, average: 0.5 },
    cpl: { min: 50, max: 200, good: 80, average: 120 },
    cpc: { min: 1, max: 5, good: 2, average: 3.5 },
    roas: { min: 2, max: 8, good: 5, average: 3 },
  },
  course_launch: {
    cpm: { min: 15, max: 40, good: 20, average: 30 },
    ctr: { min: 0.5, max: 1.5, good: 1.2, average: 0.8 },
    cpl: { min: 20, max: 75, good: 35, average: 55 },
    cpc: { min: 0.5, max: 3, good: 1.2, average: 2 },
    roas: { min: 2, max: 6, good: 4, average: 2.5 },
  },
  ecommerce: {
    cpm: { min: 8, max: 20, good: 10, average: 15 },
    ctr: { min: 1.0, max: 3.0, good: 2.0, average: 1.5 },
    cpl: { min: 10, max: 40, good: 15, average: 25 },
    cpc: { min: 0.3, max: 2, good: 0.8, average: 1.2 },
    roas: { min: 2, max: 6, good: 4, average: 2.5 },
    cvr: { min: 1.5, max: 4.0, good: 3, average: 2 },
  },
}

export type MetricStatus = 'good' | 'average' | 'poor'

export function getMetricStatus(
  value: number,
  benchmark: BenchmarkRange,
  lowerIsBetter = false
): MetricStatus {
  if (lowerIsBetter) {
    if (value <= benchmark.min) return 'good'
    if (value <= benchmark.max) return 'average'
    return 'poor'
  } else {
    if (value >= benchmark.max) return 'good'
    if (value >= benchmark.min) return 'average'
    return 'poor'
  }
}

export interface DiagnosticRule {
  condition: (metrics: CampaignMetrics) => boolean
  diagnosis: string
  fixes: string[]
  priority: 'high' | 'medium' | 'low'
}

export interface CampaignMetrics {
  spend: number
  impressions: number
  clicks: number
  leads: number
  cpm: number
  cpc: number
  ctr: number
  cpl: number
  roas?: number
}

export const DIAGNOSTIC_RULES: DiagnosticRule[] = [
  {
    condition: (m) => m.cpm > 30,
    diagnosis: 'CPM is high - targeting may be too narrow or competitive',
    fixes: [
      'Broaden targeting by adding more interests',
      'Test different audience segments',
      'Try Advantage+ audience',
      'Check if frequency is too high',
    ],
    priority: 'high',
  },
  {
    condition: (m) => m.ctr < 0.8,
    diagnosis: 'CTR is low - ad creative or copy isn\'t compelling',
    fixes: [
      'Test new hooks in the first line',
      'Try different ad formats (video, carousel)',
      'Make the offer clearer',
      'Add social proof or urgency',
    ],
    priority: 'high',
  },
  {
    condition: (m) => m.ctr >= 0.8 && m.ctr < 1.5 && m.cpl > 30,
    diagnosis: 'CTR is okay but CPL is high - landing page may be the issue',
    fixes: [
      'Audit landing page for friction',
      'Ensure message match between ad and page',
      'Simplify the form',
      'Add trust signals to landing page',
    ],
    priority: 'medium',
  },
  {
    condition: (m) => m.cpl > 50,
    diagnosis: 'CPL is high - check funnel bottlenecks',
    fixes: [
      'Diagnose: Is it CPM, CTR, or landing page CVR?',
      'Test different offers',
      'Review audience quality',
      'Consider retargeting warm audiences',
    ],
    priority: 'high',
  },
  {
    condition: (m) => m.cpc > 3,
    diagnosis: 'CPC is high - competition or relevance issue',
    fixes: [
      'Improve ad relevance score',
      'Test different placements',
      'Refine targeting to more engaged users',
      'Try different bidding strategies',
    ],
    priority: 'medium',
  },
]

export function runDiagnostics(metrics: CampaignMetrics): DiagnosticRule[] {
  return DIAGNOSTIC_RULES.filter((rule) => rule.condition(metrics))
}
