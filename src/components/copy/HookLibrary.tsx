import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Search, Sparkles, MessageSquare, TrendingUp, Zap, BarChart3, BookOpen } from 'lucide-react'

const HOOK_TEMPLATES = {
  question: {
    name: 'Question Hooks',
    icon: MessageSquare,
    color: '#3B82F6',
    templates: [
      { text: 'Are you still {struggling_with_problem}?', placeholder: 'struggling to get clients' },
      { text: 'What if you could {desired_outcome} in {timeframe}?', placeholder: 'double your revenue, 90 days' },
      { text: 'Why do most {avatar_role}s fail at {topic}?', placeholder: 'coaches, scaling' },
      { text: 'Do you ever feel like {pain_point}?', placeholder: "you're working harder but not earning more" },
      { text: 'What would change if you {transformation}?', placeholder: 'had a predictable flow of qualified leads' },
      { text: 'Have you tried everything to {goal} but nothing works?', placeholder: 'grow your business' },
      { text: 'Why is {common_approach} actually hurting your {outcome}?', placeholder: 'posting daily, engagement' },
    ],
  },
  bold_claim: {
    name: 'Bold Claim Hooks',
    icon: Zap,
    color: '#EF4444',
    templates: [
      { text: 'I help {avatar_role}s {outcome} without {common_obstacle}', placeholder: 'consultants, 10x their income, working more hours' },
      { text: '{Number}% of {avatar_role}s don\'t know this about {topic}...', placeholder: '97, business owners, Facebook ads' },
      { text: 'The {topic} industry doesn\'t want you to know this...', placeholder: 'marketing agency' },
      { text: 'After working with {number} clients, here\'s what I discovered...', placeholder: '500+' },
      { text: 'Stop {wrong_action}. Start {right_action}.', placeholder: 'chasing clients, attracting them' },
      { text: 'The real reason your {thing} isn\'t working (it\'s not what you think)', placeholder: 'ads' },
      { text: 'I was wrong about {topic} for {time}. Here\'s the truth.', placeholder: 'content marketing, 5 years' },
    ],
  },
  story: {
    name: 'Story Hooks',
    icon: BookOpen,
    color: '#8B5CF6',
    templates: [
      { text: '3 years ago, I was {relatable_situation}...', placeholder: 'broke and desperate for clients' },
      { text: 'When I first started {journey}, I made every mistake possible...', placeholder: 'my consulting business' },
      { text: 'My client {name} was about to {dramatic_situation}...', placeholder: 'Sarah, give up on her business' },
      { text: 'Nobody believed me when I said {bold_prediction}...', placeholder: 'I could build a 7-figure business in 18 months' },
      { text: 'I still remember the day I {pivotal_moment}...', placeholder: 'landed my first $10K client' },
      { text: 'Last week, something happened that changed everything...', placeholder: '' },
      { text: 'They laughed when I {action}, but then...', placeholder: 'quit my job to start coaching' },
    ],
  },
  pattern_interrupt: {
    name: 'Pattern Interrupt',
    icon: Sparkles,
    color: '#F59E0B',
    templates: [
      { text: 'STOP scrolling if you\'re a {avatar_role}', placeholder: 'business owner who wants more clients' },
      { text: 'This isn\'t another {common_content_type}', placeholder: 'boring marketing tip' },
      { text: 'WARNING: This will change how you think about {topic}', placeholder: 'lead generation' },
      { text: 'Unpopular opinion: {contrarian_view}', placeholder: 'You don\'t need more followers to make money' },
      { text: 'Delete your {common_tool} right now. Here\'s why...', placeholder: 'content calendar' },
      { text: 'I\'m about to make some people angry...', placeholder: '' },
      { text: 'If you\'re {doing_thing}, please stop.', placeholder: 'posting 3x a day hoping for clients' },
    ],
  },
  statistic: {
    name: 'Statistic Hooks',
    icon: BarChart3,
    color: '#10B981',
    templates: [
      { text: '{percentage}% of {avatar_role}s {surprising_stat}', placeholder: '83, coaches, never hit 6 figures' },
      { text: 'The average {avatar_role} {concerning_stat}. Here\'s how to be different.', placeholder: 'consultant, quits within 2 years' },
      { text: 'We analyzed {number} {thing} and found {insight}', placeholder: '10,000 ads, only 3% actually convert' },
      { text: '{number} out of {number} {avatar_role}s {stat}', placeholder: '9, 10, business owners, struggle with lead gen' },
      { text: 'In {timeframe}, {number} clients achieved {result}', placeholder: '6 months, 47, $100K+ revenue' },
      { text: 'I spent {amount} on {thing} so you don\'t have to. Here\'s what works.', placeholder: '$500K, Facebook ads' },
      { text: 'After {number} {thing}, I finally found what works.', placeholder: '1,000 sales calls' },
    ],
  },
  curiosity: {
    name: 'Curiosity Hooks',
    icon: TrendingUp,
    color: '#EC4899',
    templates: [
      { text: 'The {adjective} {thing} that {unexpected_result}', placeholder: 'weird email, got me 47 clients' },
      { text: 'How I {achievement} using {unexpected_method}', placeholder: 'built a 7-figure business, a simple Google Doc' },
      { text: 'The {thing} nobody talks about in {industry}', placeholder: 'strategy, coaching' },
      { text: 'What {successful_person} taught me about {topic}', placeholder: 'my first mentor, pricing' },
      { text: 'The {number} {thing} that changed my {outcome}', placeholder: '3, words, entire business' },
      { text: 'Why I stopped {common_action} (and what I do instead)', placeholder: 'cold outreach' },
      { text: 'The secret behind every {successful_thing}', placeholder: 'viral post' },
    ],
  },
}

export function HookLibrary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)

  const copyToClipboard = (text: string, index: string) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const filterTemplates = (templates: { text: string; placeholder: string }[]) => {
    if (!searchTerm) return templates
    return templates.filter(t => 
      t.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.placeholder.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return (
    <div className="space-y-6">
      <Card style={{ border: '3px solid black', boxShadow: '4px 4px 0px 0px black' }}>
        <CardHeader style={{ borderBottom: '3px solid black', backgroundColor: '#F59E0B' }}>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Hook Library
          </CardTitle>
          <CardDescription className="text-black">
            Proven hook templates to grab attention and stop the scroll
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search hooks..."
                className="pl-10"
                style={{ border: '2px solid black' }}
              />
            </div>
          </div>

          <Tabs defaultValue="question">
            <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0 mb-6">
              {Object.entries(HOOK_TEMPLATES).map(([key, category]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:shadow-none"
                  style={{ 
                    border: '2px solid black', 
                    boxShadow: '2px 2px 0px 0px black',
                    backgroundColor: 'white'
                  }}
                >
                  <category.icon className="h-4 w-4 mr-1" style={{ color: category.color }} />
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(HOOK_TEMPLATES).map(([key, category]) => (
              <TabsContent key={key} value={key} className="space-y-3">
                <div 
                  className="p-3 mb-4"
                  style={{ border: '2px solid black', backgroundColor: category.color + '20' }}
                >
                  <p className="text-sm">
                    <strong>{category.name}</strong> work best for grabbing attention with {
                      key === 'question' ? 'curiosity and relatability' :
                      key === 'bold_claim' ? 'authority and intrigue' :
                      key === 'story' ? 'emotional connection' :
                      key === 'pattern_interrupt' ? 'breaking expectations' :
                      key === 'statistic' ? 'credibility and proof' :
                      'mystery and intrigue'
                    }.
                  </p>
                </div>

                {filterTemplates(category.templates).map((template, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white group hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                    style={{ 
                      border: '2px solid black',
                      boxShadow: '3px 3px 0px 0px black'
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-mono text-sm mb-2">{template.text}</p>
                        {template.placeholder && (
                          <p className="text-xs text-muted-foreground">
                            Example: <span className="italic">{template.placeholder}</span>
                          </p>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(template.text, `${key}-${index}`)}
                        style={{ border: '2px solid black', boxShadow: '2px 2px 0px 0px black' }}
                      >
                        {copiedIndex === `${key}-${index}` ? (
                          '✓ Copied!'
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}

                {filterTemplates(category.templates).length === 0 && (
                  <div className="p-8 text-center text-muted-foreground" style={{ border: '2px dashed black' }}>
                    No hooks match your search
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>

          {/* Pro Tips */}
          <div className="mt-6 p-4" style={{ border: '2px solid black', backgroundColor: '#FEF3C7' }}>
            <h4 className="font-bold mb-2">💡 Hook Writing Tips</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>Be specific:</strong> "47 clients" beats "many clients"</li>
              <li>• <strong>Create tension:</strong> Open a loop that makes them want to know more</li>
              <li>• <strong>Speak their language:</strong> Use words your audience actually uses</li>
              <li>• <strong>Test variations:</strong> Small changes can have big impacts on CTR</li>
              <li>• <strong>Front-load value:</strong> Put the most compelling part first</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
