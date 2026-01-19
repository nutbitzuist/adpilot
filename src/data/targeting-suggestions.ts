export interface InterestSuggestion {
  name: string
  category: string
  audienceSize?: string
  description?: string
}

export const CONSULTING_INTERESTS: InterestSuggestion[] = [
  { name: 'Business consulting', category: 'Business', audienceSize: '15-20M', description: 'People interested in business consulting services' },
  { name: 'Entrepreneurship', category: 'Business', audienceSize: '100-150M', description: 'Aspiring and active entrepreneurs' },
  { name: 'Small business', category: 'Business', audienceSize: '80-100M', description: 'Small business owners and enthusiasts' },
  { name: 'Marketing strategy', category: 'Marketing', audienceSize: '25-35M', description: 'Marketing professionals and strategists' },
  { name: 'Digital marketing', category: 'Marketing', audienceSize: '50-70M', description: 'Digital marketing practitioners' },
  { name: 'Personal development', category: 'Self-improvement', audienceSize: '200-250M', description: 'Self-improvement seekers' },
  { name: 'Business coach', category: 'Business', audienceSize: '5-10M', description: 'People interested in business coaching' },
  { name: 'Tony Robbins', category: 'Influencers', audienceSize: '10-15M', description: 'Followers of Tony Robbins' },
  { name: 'Gary Vaynerchuk', category: 'Influencers', audienceSize: '8-12M', description: 'Gary Vee followers' },
  { name: 'Russell Brunson', category: 'Influencers', audienceSize: '2-5M', description: 'ClickFunnels/Russell Brunson followers' },
  { name: 'Online courses', category: 'Education', audienceSize: '30-40M', description: 'Online course consumers' },
  { name: 'Leadership', category: 'Business', audienceSize: '50-70M', description: 'Leadership development interest' },
  { name: 'Management', category: 'Business', audienceSize: '80-100M', description: 'Management professionals' },
  { name: 'Sales', category: 'Business', audienceSize: '40-60M', description: 'Sales professionals and enthusiasts' },
  { name: 'Startup company', category: 'Business', audienceSize: '20-30M', description: 'Startup founders and employees' },
  { name: 'Grant Cardone', category: 'Influencers', audienceSize: '5-8M', description: 'Sales training followers' },
  { name: 'Alex Hormozi', category: 'Influencers', audienceSize: '3-5M', description: 'Business scaling enthusiasts' },
  { name: 'Business strategy', category: 'Business', audienceSize: '20-30M', description: 'Strategic business planning' },
  { name: 'Scaling business', category: 'Business', audienceSize: '10-15M', description: 'Business growth focused' },
  { name: 'SaaS', category: 'Technology', audienceSize: '15-25M', description: 'Software as a Service interest' },
  { name: 'B2B marketing', category: 'Marketing', audienceSize: '10-15M', description: 'Business-to-business marketers' },
  { name: 'Content marketing', category: 'Marketing', audienceSize: '20-30M', description: 'Content marketing practitioners' },
  { name: 'Social media marketing', category: 'Marketing', audienceSize: '60-80M', description: 'Social media marketers' },
  { name: 'Facebook advertising', category: 'Marketing', audienceSize: '15-25M', description: 'Facebook ads practitioners' },
  { name: 'Copywriting', category: 'Marketing', audienceSize: '10-15M', description: 'Copywriters and enthusiasts' },
  { name: 'Business intelligence', category: 'Technology', audienceSize: '8-12M', description: 'BI professionals' },
  { name: 'CRM', category: 'Technology', audienceSize: '15-20M', description: 'CRM users and administrators' },
  { name: 'Salesforce', category: 'Technology', audienceSize: '10-15M', description: 'Salesforce users' },
  { name: 'HubSpot', category: 'Technology', audienceSize: '5-10M', description: 'HubSpot users' },
]

export const COURSE_CREATOR_INTERESTS: InterestSuggestion[] = [
  { name: 'Online learning', category: 'Education', audienceSize: '100-150M' },
  { name: 'E-learning', category: 'Education', audienceSize: '50-70M' },
  { name: 'Udemy', category: 'Platforms', audienceSize: '20-30M' },
  { name: 'Coursera', category: 'Platforms', audienceSize: '15-25M' },
  { name: 'Skillshare', category: 'Platforms', audienceSize: '10-15M' },
  { name: 'Self-improvement', category: 'Self-improvement', audienceSize: '150-200M' },
  { name: 'Professional development', category: 'Career', audienceSize: '40-60M' },
  { name: 'Career development', category: 'Career', audienceSize: '30-50M' },
  { name: 'Lifelong learning', category: 'Education', audienceSize: '25-35M' },
  { name: 'Knowledge', category: 'Education', audienceSize: '100-150M' },
]

export const COACHING_INTERESTS: InterestSuggestion[] = [
  { name: 'Life coaching', category: 'Coaching', audienceSize: '10-15M' },
  { name: 'Executive coaching', category: 'Coaching', audienceSize: '5-8M' },
  { name: 'Health coaching', category: 'Coaching', audienceSize: '8-12M' },
  { name: 'Fitness coaching', category: 'Coaching', audienceSize: '15-25M' },
  { name: 'Career coaching', category: 'Coaching', audienceSize: '5-10M' },
  { name: 'Mindset', category: 'Self-improvement', audienceSize: '30-50M' },
  { name: 'Goal setting', category: 'Self-improvement', audienceSize: '20-30M' },
  { name: 'Motivation', category: 'Self-improvement', audienceSize: '100-150M' },
  { name: 'Success', category: 'Self-improvement', audienceSize: '80-120M' },
  { name: 'Personal growth', category: 'Self-improvement', audienceSize: '50-80M' },
]

export const BEHAVIOR_SUGGESTIONS = [
  { name: 'Engaged shoppers', category: 'Purchase behavior' },
  { name: 'Small business owners', category: 'Business' },
  { name: 'Technology early adopters', category: 'Technology' },
  { name: 'Frequent travelers', category: 'Travel' },
  { name: 'Online buyers', category: 'Purchase behavior' },
  { name: 'Mobile device users', category: 'Technology' },
  { name: 'Facebook page admins', category: 'Business' },
  { name: 'Away from hometown', category: 'Travel' },
  { name: 'Commuters', category: 'Lifestyle' },
  { name: 'Close friends of people with birthdays', category: 'Life events' },
]

export const LOOKALIKE_SUGGESTIONS = [
  { name: 'Website visitors (180 days)', description: 'People who visited your website' },
  { name: 'Email list', description: 'Your existing email subscribers' },
  { name: 'Purchasers', description: 'People who have bought from you' },
  { name: 'High-value customers', description: 'Top 25% by purchase value' },
  { name: 'Video viewers (75%)', description: 'People who watched 75% of your videos' },
  { name: 'Lead form submitters', description: 'People who submitted lead forms' },
  { name: 'Page engagers', description: 'People who engaged with your Facebook page' },
  { name: 'Instagram engagers', description: 'People who engaged with your Instagram' },
]

export const EXCLUSION_SUGGESTIONS = [
  { name: 'Existing customers', description: 'Exclude people who already purchased' },
  { name: 'Recent converters (30 days)', description: 'Exclude recent leads/purchases' },
  { name: 'Website visitors (7 days)', description: 'Exclude very recent visitors' },
  { name: 'Email unsubscribers', description: 'Exclude people who unsubscribed' },
  { name: 'Competitors\' employees', description: 'Exclude competitor company employees' },
  { name: 'Current retargeting audiences', description: 'Exclude from prospecting campaigns' },
]

export function getInterestsByIndustry(industry: string): InterestSuggestion[] {
  switch (industry.toLowerCase()) {
    case 'consulting':
      return CONSULTING_INTERESTS
    case 'coaching':
      return COACHING_INTERESTS
    case 'online courses':
    case 'courses':
      return COURSE_CREATOR_INTERESTS
    default:
      return [...CONSULTING_INTERESTS, ...COACHING_INTERESTS, ...COURSE_CREATOR_INTERESTS]
  }
}
