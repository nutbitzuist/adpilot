import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb } from 'lucide-react'

const insights = [
  {
    title: 'CTR Improvement Opportunity',
    description: 'Your lead magnet campaign CTR is 1.2%, which is below the 1.5% benchmark. Consider testing new hooks or creative formats.',
    type: 'optimization',
  },
  {
    title: 'Top Performing Audience',
    description: 'Lookalike audiences based on your email list are outperforming interest targeting by 35% on CPL.',
    type: 'success',
  },
  {
    title: 'Budget Reallocation Suggestion',
    description: 'Your webinar campaign has a 2.1x ROAS. Consider increasing budget by 20% to scale results.',
    type: 'opportunity',
  },
]

export function WeeklyInsight() {
  const insight = insights[Math.floor(Math.random() * insights.length)]

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5 text-primary" />
          Weekly Insight
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h4 className="font-semibold">{insight.title}</h4>
        <p className="mt-1 text-sm text-muted-foreground">{insight.description}</p>
      </CardContent>
    </Card>
  )
}
