export interface CopyFramework {
  id: string
  name: string
  description: string
  structure: FrameworkSection[]
  bestFor: string[]
}

export interface FrameworkSection {
  name: string
  description: string
  placeholder: string
}

export const COPY_FRAMEWORKS: CopyFramework[] = [
  {
    id: 'pas',
    name: 'PAS (Problem-Agitate-Solution)',
    description: 'Classic framework that identifies a problem, agitates the pain, then presents your solution',
    structure: [
      { name: 'Problem', description: 'Identify the core problem your audience faces', placeholder: 'Are you struggling to get consistent leads for your coaching business?' },
      { name: 'Agitate', description: 'Twist the knife - make them feel the pain', placeholder: 'Every month you\'re wondering where your next client will come from. The uncertainty is exhausting...' },
      { name: 'Solution', description: 'Present your offer as the answer', placeholder: 'Our Client Attraction System gives you a predictable flow of qualified leads every single week.' },
    ],
    bestFor: ['Lead generation', 'Problem-aware audiences', 'Service businesses'],
  },
  {
    id: 'aida',
    name: 'AIDA (Attention-Interest-Desire-Action)',
    description: 'Guides the reader through a journey from awareness to action',
    structure: [
      { name: 'Attention', description: 'Grab attention with a bold hook', placeholder: 'I went from $3k to $47k months in 90 days...' },
      { name: 'Interest', description: 'Build interest with relevant details', placeholder: 'And I did it without working more hours, hiring a team, or running complicated funnels.' },
      { name: 'Desire', description: 'Create desire by painting the outcome', placeholder: 'Imagine waking up to notifications of new clients who are excited to work with you...' },
      { name: 'Action', description: 'Clear call to action', placeholder: 'Click below to book your free strategy call and see if this system is right for you.' },
    ],
    bestFor: ['Brand awareness', 'New audiences', 'Product launches'],
  },
  {
    id: 'bab',
    name: 'BAB (Before-After-Bridge)',
    description: 'Shows the transformation from current state to desired state',
    structure: [
      { name: 'Before', description: 'Describe their current painful situation', placeholder: 'Right now, you\'re spending hours creating content that gets crickets...' },
      { name: 'After', description: 'Paint the picture of their ideal outcome', placeholder: 'Imagine having a steady stream of dream clients reaching out to YOU, ready to buy.' },
      { name: 'Bridge', description: 'Your offer is the bridge between the two', placeholder: 'The Content to Clients Blueprint shows you exactly how to make this happen in 30 days.' },
    ],
    bestFor: ['Transformation offers', 'Coaching/consulting', 'Course sales'],
  },
  {
    id: 'pppp',
    name: '4Ps (Picture-Promise-Prove-Push)',
    description: 'Visual storytelling combined with proof and urgency',
    structure: [
      { name: 'Picture', description: 'Paint a vivid picture of the outcome', placeholder: 'Picture yourself checking your phone and seeing 5 new strategy call bookings...' },
      { name: 'Promise', description: 'Make a clear promise', placeholder: 'I\'ll show you how to generate 10+ qualified leads per week without paid ads.' },
      { name: 'Prove', description: 'Back it up with proof', placeholder: 'Sarah used this exact system to book 23 calls in her first month. Mike hit $50k in 60 days.' },
      { name: 'Push', description: 'Create urgency to act now', placeholder: 'But I\'m only taking 5 new clients this month. Click below before spots fill up.' },
    ],
    bestFor: ['High-ticket offers', 'Limited availability', 'Proven offers'],
  },
  {
    id: 'quest',
    name: 'QUEST (Qualify-Understand-Educate-Stimulate-Transition)',
    description: 'Longer format that qualifies and educates before selling',
    structure: [
      { name: 'Qualify', description: 'Call out your ideal customer', placeholder: 'This is for coaches and consultants who are great at what they do but struggle with marketing.' },
      { name: 'Understand', description: 'Show you understand their situation', placeholder: 'I know what it\'s like to have an amazing offer but no consistent way to get it in front of the right people.' },
      { name: 'Educate', description: 'Teach something valuable', placeholder: 'Here\'s what most people get wrong: They focus on tactics instead of building a system...' },
      { name: 'Stimulate', description: 'Create emotional engagement', placeholder: 'What would it mean for your business to have a reliable way to attract clients every single month?' },
      { name: 'Transition', description: 'Smoothly transition to your offer', placeholder: 'If you\'re ready to build that system, I\'d love to show you how. Click below to learn more.' },
    ],
    bestFor: ['Educational content', 'Cold audiences', 'Complex offers'],
  },
]

export const CTA_TEMPLATES = [
  { text: 'Learn More', type: 'soft', bestFor: ['Awareness', 'Education'] },
  { text: 'Get Started', type: 'medium', bestFor: ['Free trials', 'Low commitment'] },
  { text: 'Book Your Call', type: 'strong', bestFor: ['High-ticket', 'Services'] },
  { text: 'Claim Your Spot', type: 'urgent', bestFor: ['Limited availability', 'Events'] },
  { text: 'Download Now', type: 'medium', bestFor: ['Lead magnets', 'Resources'] },
  { text: 'Watch the Training', type: 'soft', bestFor: ['Webinars', 'Video content'] },
  { text: 'Join the Waitlist', type: 'soft', bestFor: ['Pre-launch', 'Exclusivity'] },
  { text: 'Start Free Trial', type: 'medium', bestFor: ['SaaS', 'Subscriptions'] },
  { text: 'Get Instant Access', type: 'strong', bestFor: ['Digital products', 'Courses'] },
  { text: 'Reserve Your Seat', type: 'urgent', bestFor: ['Webinars', 'Events'] },
]

export function getFrameworkById(id: string): CopyFramework | undefined {
  return COPY_FRAMEWORKS.find(f => f.id === id)
}
