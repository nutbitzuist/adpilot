export interface HookTemplate {
  id: string
  category: string
  template: string
  example: string
  variables: string[]
}

export const HOOK_TEMPLATES: Record<string, HookTemplate[]> = {
  question: [
    {
      id: 'q1',
      category: 'question',
      template: 'Are you still struggling with {problem}?',
      example: 'Are you still struggling with getting consistent leads?',
      variables: ['problem'],
    },
    {
      id: 'q2',
      category: 'question',
      template: 'What if you could {outcome} in {timeframe}?',
      example: 'What if you could double your revenue in 90 days?',
      variables: ['outcome', 'timeframe'],
    },
    {
      id: 'q3',
      category: 'question',
      template: 'Why do most {avatar}s fail at {topic}?',
      example: 'Why do most consultants fail at scaling past 6 figures?',
      variables: ['avatar', 'topic'],
    },
    {
      id: 'q4',
      category: 'question',
      template: 'Want to know the secret to {outcome}?',
      example: 'Want to know the secret to booking 10+ calls per week?',
      variables: ['outcome'],
    },
    {
      id: 'q5',
      category: 'question',
      template: 'Tired of {pain_point}?',
      example: 'Tired of chasing clients who ghost you?',
      variables: ['pain_point'],
    },
  ],
  bold_claim: [
    {
      id: 'b1',
      category: 'bold_claim',
      template: 'I help {avatar}s {outcome} without {obstacle}',
      example: 'I help coaches hit $50k months without burning out',
      variables: ['avatar', 'outcome', 'obstacle'],
    },
    {
      id: 'b2',
      category: 'bold_claim',
      template: 'The {industry} doesn\'t want you to know this...',
      example: 'The marketing industry doesn\'t want you to know this...',
      variables: ['industry'],
    },
    {
      id: 'b3',
      category: 'bold_claim',
      template: 'This {thing} generated {result} in {timeframe}',
      example: 'This simple funnel generated $127k in 30 days',
      variables: ['thing', 'result', 'timeframe'],
    },
    {
      id: 'b4',
      category: 'bold_claim',
      template: '{Number} {avatar}s can\'t be wrong',
      example: '2,847 business owners can\'t be wrong',
      variables: ['number', 'avatar'],
    },
  ],
  story: [
    {
      id: 's1',
      category: 'story',
      template: '{Timeframe} ago, I was {situation}...',
      example: '3 years ago, I was working 80-hour weeks for $5k months...',
      variables: ['timeframe', 'situation'],
    },
    {
      id: 's2',
      category: 'story',
      template: 'My client was about to {negative_outcome} until...',
      example: 'My client was about to shut down her business until...',
      variables: ['negative_outcome'],
    },
    {
      id: 's3',
      category: 'story',
      template: 'I made every mistake in the book with {topic}...',
      example: 'I made every mistake in the book with Facebook ads...',
      variables: ['topic'],
    },
    {
      id: 's4',
      category: 'story',
      template: 'When I first started {activity}, I thought {misconception}',
      example: 'When I first started coaching, I thought I needed thousands of followers',
      variables: ['activity', 'misconception'],
    },
  ],
  pattern_interrupt: [
    {
      id: 'p1',
      category: 'pattern_interrupt',
      template: 'STOP scrolling if you\'re a {avatar}',
      example: 'STOP scrolling if you\'re a course creator',
      variables: ['avatar'],
    },
    {
      id: 'p2',
      category: 'pattern_interrupt',
      template: 'This isn\'t another {content_type}',
      example: 'This isn\'t another "get rich quick" scheme',
      variables: ['content_type'],
    },
    {
      id: 'p3',
      category: 'pattern_interrupt',
      template: 'WARNING: Don\'t {action} until you read this',
      example: 'WARNING: Don\'t launch another ad until you read this',
      variables: ['action'],
    },
    {
      id: 'p4',
      category: 'pattern_interrupt',
      template: 'Unpopular opinion: {controversial_statement}',
      example: 'Unpopular opinion: You don\'t need a huge audience to make 6 figures',
      variables: ['controversial_statement'],
    },
  ],
  statistic: [
    {
      id: 'st1',
      category: 'statistic',
      template: '{percentage}% of {avatar}s {surprising_stat}',
      example: '83% of consultants never break $100k/year',
      variables: ['percentage', 'avatar', 'surprising_stat'],
    },
    {
      id: 'st2',
      category: 'statistic',
      template: 'We analyzed {number} {thing} and found...',
      example: 'We analyzed 10,000 Facebook ads and found...',
      variables: ['number', 'thing'],
    },
    {
      id: 'st3',
      category: 'statistic',
      template: 'Only {number} in {total} {avatar}s {achievement}',
      example: 'Only 1 in 10 coaches ever hit $10k months',
      variables: ['number', 'total', 'avatar', 'achievement'],
    },
  ],
  social_proof: [
    {
      id: 'sp1',
      category: 'social_proof',
      template: '"I went from {before} to {after}" - {name}',
      example: '"I went from $3k to $27k months" - Sarah M.',
      variables: ['before', 'after', 'name'],
    },
    {
      id: 'sp2',
      category: 'social_proof',
      template: 'How {name} {achievement} in {timeframe}',
      example: 'How Mike built a 6-figure coaching business in 8 months',
      variables: ['name', 'achievement', 'timeframe'],
    },
  ],
}

export const HOOK_CATEGORIES = [
  { value: 'question', label: 'Question', description: 'Engage curiosity with a question' },
  { value: 'bold_claim', label: 'Bold Claim', description: 'Make a strong, attention-grabbing statement' },
  { value: 'story', label: 'Story', description: 'Open with a relatable narrative' },
  { value: 'pattern_interrupt', label: 'Pattern Interrupt', description: 'Stop the scroll with unexpected content' },
  { value: 'statistic', label: 'Statistic', description: 'Lead with compelling data' },
  { value: 'social_proof', label: 'Social Proof', description: 'Showcase results and testimonials' },
]

export function getTemplatesByCategory(category: string): HookTemplate[] {
  return HOOK_TEMPLATES[category] || []
}

export function getAllTemplates(): HookTemplate[] {
  return Object.values(HOOK_TEMPLATES).flat()
}
