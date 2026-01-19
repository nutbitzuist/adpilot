export type { Database, Json } from './database'

export interface User {
  id: string
  email: string
  fullName?: string
  companyName?: string
  industry?: string
}

export interface CustomerAvatar {
  id: string
  userId: string
  name: string
  ageRangeStart?: number
  ageRangeEnd?: number
  gender?: string
  location?: string
  incomeLevel?: string
  education?: string
  jobTitle?: string
  industry?: string
  companySize?: string
  goals: string[]
  frustrations: string[]
  fears: string[]
  desires: string[]
  objections: string[]
  whereTheyHangOut: string[]
  influencersTheyFollow: string[]
  booksPodcasts: string[]
  buyingTriggers: string[]
  phrasesTheyUse: string[]
  painPointLanguage: string[]
  dailyRoutine?: string
  decisionMakingProcess?: string
  isPrimary: boolean
  createdAt: string
  updatedAt: string
}

export interface TargetingStrategy {
  id: string
  userId: string
  avatarId?: string
  name: string
  interests: string[]
  behaviors: string[]
  ageMin?: number
  ageMax?: number
  genders: string[]
  locations: string[]
  languages: string[]
  customAudiences: string[]
  lookalikesSources: string[]
  exclusions: string[]
  layeringNotes?: string
  performanceNotes?: string
  estimatedAudienceSize?: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface Offer {
  id: string
  userId: string
  name: string
  offerType?: string
  headline?: string
  description?: string
  price?: string
  valueStack: ValueStackItem[]
  totalValue?: string
  bonuses: Bonus[]
  guaranteeType?: string
  guaranteeDetails?: string
  urgencyType?: string
  urgencyDetails?: string
  beforeState?: string
  afterState?: string
  timeframe?: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface ValueStackItem {
  name: string
  value: string
  description?: string
}

export interface Bonus {
  name: string
  value: string
  description?: string
}

export interface AdCopy {
  id: string
  userId: string
  offerId?: string
  campaignId?: string
  name: string
  copyType?: string
  hook?: string
  body?: string
  cta?: string
  fullText?: string
  hookType?: string
  tone?: string
  length?: string
  clarityScore?: number
  emotionScore?: number
  ctaStrength?: number
  overallScore?: number
  performanceNotes?: string
  isWinner: boolean
  tags: string[]
  status: string
  createdAt: string
  updatedAt: string
}

export interface SwipeFileEntry {
  id: string
  userId: string
  source?: string
  sourceUrl?: string
  screenshotUrl?: string
  primaryText?: string
  headline?: string
  description?: string
  hookType?: string
  whyItWorks?: string
  industry?: string
  formatType?: string
  tags: string[]
  createdAt: string
}

export interface CreativeBrief {
  id: string
  userId: string
  campaignId?: string
  name: string
  formatType?: string
  objective?: string
  targetAudience?: string
  hookConcept?: string
  hookTextOverlay?: string
  bodyConcept?: string
  ctaConcept?: string
  visualStyle?: string
  colorPalette: string[]
  typographyNotes?: string
  videoLength?: string
  sceneBreakdown: SceneBreakdownItem[]
  musicStyle?: string
  carouselSlides: CarouselSlide[]
  dimensions?: string
  fileFormat?: string
  referenceLinks: string[]
  referenceNotes?: string
  status: string
  designerNotes?: string
  createdAt: string
  updatedAt: string
}

export interface SceneBreakdownItem {
  sceneNumber: number
  duration: string
  description: string
  textOverlay?: string
  visualNotes?: string
}

export interface CarouselSlide {
  slideNumber: number
  headline?: string
  description?: string
  visualNotes?: string
}

export interface Campaign {
  id: string
  userId: string
  name: string
  objective?: string
  funnelStage?: string
  offerId?: string
  targetingStrategyId?: string
  campaignType?: string
  dailyBudget?: number
  totalBudget?: number
  budgetType?: string
  startDate?: string
  endDate?: string
  adSets: AdSet[]
  status: string
  metaCampaignId?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface AdSet {
  name: string
  targeting?: string
  budget?: number
  schedule?: string
}

export interface CampaignAd {
  id: string
  campaignId: string
  name: string
  adSetName?: string
  copyId?: string
  creativeBriefId?: string
  formatType?: string
  creativeUrl?: string
  landingPageUrl?: string
  utmParameters: Record<string, string>
  status: string
  metaAdId?: string
  createdAt: string
  updatedAt: string
}

export interface CampaignMetrics {
  id: string
  userId: string
  campaignId: string
  date: string
  periodType: string
  spend: number
  impressions: number
  reach: number
  frequency: number
  clicks: number
  linkClicks: number
  leads: number
  purchases: number
  registrations: number
  addToCarts: number
  revenue: number
  cpm: number
  cpc: number
  ctr: number
  cpl: number
  cpa: number
  roas: number
  notes?: string
  createdAt: string
}

export interface Test {
  id: string
  userId: string
  campaignId?: string
  name: string
  hypothesis?: string
  variableType?: string
  variableDetails?: string
  controlDescription?: string
  controlAdId?: string
  variants: TestVariant[]
  primaryMetric?: string
  targetImprovement?: number
  minimumSampleSize?: number
  minimumSpend?: number
  startDate?: string
  plannedEndDate?: string
  actualEndDate?: string
  status: string
  winner?: string
  statisticalSignificance?: number
  resultsSummary?: string
  keyLearning?: string
  applyToFuture?: string
  createdAt: string
  updatedAt: string
}

export interface TestVariant {
  name: string
  description: string
  adId?: string
}

export interface TestResult {
  id: string
  testId: string
  variantName: string
  spend: number
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cvr: number
  cpa: number
  createdAt: string
  updatedAt: string
}

export interface Learning {
  id: string
  userId: string
  category?: string
  title: string
  description?: string
  source?: string
  testId?: string
  campaignId?: string
  impactLevel?: string
  tags: string[]
  createdAt: string
}

export interface SignificanceResult {
  controlRate: string
  variantRate: string
  lift: string
  confidence: number
  winner: 'control' | 'variant' | 'inconclusive'
}
