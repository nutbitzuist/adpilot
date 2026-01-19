export interface FunnelStage {
  name: string
  objective: string
  budgetPct: number
  description: string
  suggestedAudiences: string[]
  suggestedFormats: string[]
}

export interface FunnelTemplate {
  id: string
  name: string
  description: string
  bestFor: string[]
  stages: FunnelStage[]
  totalBudgetSuggestion: string
  timeframe: string
}

export const FUNNEL_TEMPLATES: FunnelTemplate[] = [
  {
    id: 'lead_magnet_webinar',
    name: 'Lead Magnet → Webinar → Offer',
    description: 'Classic funnel for course creators and coaches. Capture leads with a free resource, nurture with a webinar, then sell.',
    bestFor: ['Course creators', 'Coaches', 'Info products'],
    stages: [
      {
        name: 'Lead Magnet',
        objective: 'leads',
        budgetPct: 40,
        description: 'Capture email addresses with a valuable free resource',
        suggestedAudiences: ['Cold - Interest targeting', 'Lookalike - Email list'],
        suggestedFormats: ['Single image', 'Carousel', 'Video'],
      },
      {
        name: 'Webinar Registration',
        objective: 'leads',
        budgetPct: 30,
        description: 'Get lead magnet subscribers to register for your webinar',
        suggestedAudiences: ['Warm - Lead magnet downloaders', 'Lookalike - Webinar registrants'],
        suggestedFormats: ['Video', 'Single image'],
      },
      {
        name: 'Sales',
        objective: 'conversions',
        budgetPct: 30,
        description: 'Convert webinar attendees into customers',
        suggestedAudiences: ['Hot - Webinar attendees', 'Hot - Sales page visitors'],
        suggestedFormats: ['Video testimonials', 'Carousel'],
      },
    ],
    totalBudgetSuggestion: '$3,000 - $10,000/month',
    timeframe: '30-60 days to optimize',
  },
  {
    id: 'direct_to_call',
    name: 'Direct to Strategy Call',
    description: 'Shorter funnel for high-ticket services. Build awareness, then drive directly to booking calls.',
    bestFor: ['Consultants', 'Agencies', 'High-ticket coaches'],
    stages: [
      {
        name: 'Awareness',
        objective: 'video_views',
        budgetPct: 30,
        description: 'Build awareness and warm up cold audiences with valuable content',
        suggestedAudiences: ['Cold - Interest targeting', 'Cold - Lookalike audiences'],
        suggestedFormats: ['Video content', 'Reels'],
      },
      {
        name: 'Consideration',
        objective: 'traffic',
        budgetPct: 30,
        description: 'Drive traffic to case studies, testimonials, or educational content',
        suggestedAudiences: ['Warm - Video viewers (50%+)', 'Warm - Page engagers'],
        suggestedFormats: ['Carousel', 'Single image'],
      },
      {
        name: 'Conversion',
        objective: 'leads',
        budgetPct: 40,
        description: 'Drive qualified leads to book strategy calls',
        suggestedAudiences: ['Hot - Website visitors', 'Hot - High-intent engagers'],
        suggestedFormats: ['Video testimonials', 'Single image'],
      },
    ],
    totalBudgetSuggestion: '$2,000 - $5,000/month',
    timeframe: '14-30 days to optimize',
  },
  {
    id: 'challenge_launch',
    name: 'Free Challenge → Offer',
    description: 'Build engagement and community with a free challenge, then launch your offer to participants.',
    bestFor: ['Course launches', 'Membership sites', 'Community builders'],
    stages: [
      {
        name: 'Challenge Registration',
        objective: 'leads',
        budgetPct: 50,
        description: 'Get people to sign up for your free challenge',
        suggestedAudiences: ['Cold - Interest targeting', 'Lookalike - Past participants'],
        suggestedFormats: ['Video', 'Carousel', 'Reels'],
      },
      {
        name: 'Challenge Engagement',
        objective: 'engagement',
        budgetPct: 20,
        description: 'Keep participants engaged throughout the challenge',
        suggestedAudiences: ['Warm - Challenge registrants'],
        suggestedFormats: ['Video reminders', 'Stories'],
      },
      {
        name: 'Offer Launch',
        objective: 'conversions',
        budgetPct: 30,
        description: 'Convert engaged participants into customers',
        suggestedAudiences: ['Hot - Active participants', 'Hot - Challenge completers'],
        suggestedFormats: ['Video testimonials', 'Carousel'],
      },
    ],
    totalBudgetSuggestion: '$2,000 - $8,000 per launch',
    timeframe: '2-4 week campaign',
  },
  {
    id: 'ecommerce_standard',
    name: 'E-commerce Standard',
    description: 'Standard e-commerce funnel with prospecting, retargeting, and retention.',
    bestFor: ['E-commerce', 'Physical products', 'DTC brands'],
    stages: [
      {
        name: 'Prospecting',
        objective: 'traffic',
        budgetPct: 50,
        description: 'Drive new visitors to your store',
        suggestedAudiences: ['Cold - Interest targeting', 'Lookalike - Purchasers'],
        suggestedFormats: ['Video', 'Carousel', 'Collection'],
      },
      {
        name: 'Retargeting',
        objective: 'conversions',
        budgetPct: 35,
        description: 'Convert visitors who didn\'t purchase',
        suggestedAudiences: ['Warm - Add to cart', 'Warm - Product viewers'],
        suggestedFormats: ['Dynamic product ads', 'Carousel'],
      },
      {
        name: 'Retention',
        objective: 'conversions',
        budgetPct: 15,
        description: 'Drive repeat purchases from existing customers',
        suggestedAudiences: ['Hot - Past purchasers', 'Hot - VIP customers'],
        suggestedFormats: ['Single image', 'Carousel'],
      },
    ],
    totalBudgetSuggestion: '$5,000 - $50,000/month',
    timeframe: 'Ongoing optimization',
  },
]

export function getFunnelTemplateById(id: string): FunnelTemplate | undefined {
  return FUNNEL_TEMPLATES.find(f => f.id === id)
}

export function calculateStageBudgets(template: FunnelTemplate, totalBudget: number): { stage: string; budget: number }[] {
  return template.stages.map(stage => ({
    stage: stage.name,
    budget: (stage.budgetPct / 100) * totalBudget,
  }))
}
