export const APP_NAME = 'AdPilot'

export const INDUSTRIES = [
  'Consulting',
  'Coaching',
  'Online Courses',
  'Agency',
  'E-commerce',
  'SaaS',
  'Real Estate',
  'Finance',
  'Health & Wellness',
  'Other',
] as const

export const FUNNEL_STAGES = [
  'Awareness',
  'Consideration',
  'Conversion',
  'Retention',
] as const

export const CAMPAIGN_OBJECTIVES = [
  { value: 'awareness', label: 'Brand Awareness' },
  { value: 'traffic', label: 'Traffic' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'leads', label: 'Lead Generation' },
  { value: 'app_promotion', label: 'App Promotion' },
  { value: 'sales', label: 'Sales' },
] as const

export const CAMPAIGN_STATUSES = [
  { value: 'planning', label: 'Planning', color: 'bg-gray-500' },
  { value: 'draft', label: 'Draft', color: 'bg-yellow-500' },
  { value: 'active', label: 'Active', color: 'bg-green-500' },
  { value: 'paused', label: 'Paused', color: 'bg-orange-500' },
  { value: 'completed', label: 'Completed', color: 'bg-blue-500' },
  { value: 'archived', label: 'Archived', color: 'bg-gray-400' },
] as const

export const AD_FORMATS = [
  { value: 'single_image', label: 'Single Image' },
  { value: 'carousel', label: 'Carousel' },
  { value: 'video', label: 'Video' },
  { value: 'collection', label: 'Collection' },
  { value: 'stories', label: 'Stories' },
  { value: 'reels', label: 'Reels' },
] as const

export const COPY_TONES = [
  'Professional',
  'Conversational',
  'Urgent',
  'Empathetic',
  'Authoritative',
  'Playful',
  'Inspirational',
] as const

export const COPY_LENGTHS = [
  { value: 'short', label: 'Short (< 125 chars)' },
  { value: 'medium', label: 'Medium (125-250 chars)' },
  { value: 'long', label: 'Long (250+ chars)' },
] as const

export const GENDER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
] as const

export const INCOME_LEVELS = [
  'Under $25,000',
  '$25,000 - $50,000',
  '$50,000 - $75,000',
  '$75,000 - $100,000',
  '$100,000 - $150,000',
  '$150,000+',
] as const

export const EDUCATION_LEVELS = [
  'High School',
  'Some College',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Doctorate',
] as const

export const COMPANY_SIZES = [
  'Solo/Freelancer',
  '2-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '500+ employees',
] as const
