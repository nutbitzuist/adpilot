import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, TrendingUp, TrendingDown, Minus, CheckCircle, Target, Lightbulb, ArrowRight } from 'lucide-react'

interface WeeklyMetrics {
  spend: number
  leads: number
  cpl: number
  ctr: number
  roas: number
}

interface ReviewEntry {
  id: string
  weekOf: string
  metrics: WeeklyMetrics
  previousMetrics: WeeklyMetrics
  topPerformer: string
  worstPerformer: string
  keyLearning: string
  nextWeekFocus: string
  notes: string
}

const MOCK_REVIEWS: ReviewEntry[] = [
  {
    id: '1',
    weekOf: '2026-01-13',
    metrics: { spend: 847.5, leads: 67, cpl: 12.65, ctr: 1.8, roas: 3.2 },
    previousMetrics: { spend: 750, leads: 52, cpl: 14.42, ctr: 1.5, roas: 2.8 },
    topPerformer: 'Lead Magnet - Free Guide campaign with story hook',
    worstPerformer: 'Webinar Registration - Question hook variant',
    keyLearning: 'Story hooks outperforming question hooks by 35% on CTR',
    nextWeekFocus: 'Scale story hook creatives, pause underperforming question variants',
    notes: 'Good week overall. CPL down 12% WoW.',
  },
]

export function WeeklyReview() {
  const [reviews, setReviews] = useState<ReviewEntry[]>(MOCK_REVIEWS)
  const [isCreating, setIsCreating] = useState(false)
  const [newReview, setNewReview] = useState<Partial<ReviewEntry>>({
    metrics: { spend: 0, leads: 0, cpl: 0, ctr: 0, roas: 0 },
    previousMetrics: { spend: 0, leads: 0, cpl: 0, ctr: 0, roas: 0 },
  })

  const calculateChange = (current: number, previous: number): { value: number; direction: 'up' | 'down' | 'same' } => {
    if (previous === 0) return { value: 0, direction: 'same' }
    const change = ((current - previous) / previous) * 100
    return {
      value: Math.abs(Math.round(change * 10) / 10),
      direction: change > 1 ? 'up' : change < -1 ? 'down' : 'same',
    }
  }

  const getChangeColor = (direction: string, metric: string) => {
    // For CPL, down is good. For others, up is good.
    const isGoodUp = !['cpl'].includes(metric)
    if (direction === 'same') return '#6B7280'
    if (direction === 'up') return isGoodUp ? '#22C55E' : '#EF4444'
    return isGoodUp ? '#EF4444' : '#22C55E'
  }

  const saveReview = () => {
    if (!newReview.weekOf) return
    
    const review: ReviewEntry = {
      id: Date.now().toString(),
      weekOf: newReview.weekOf,
      metrics: newReview.metrics as WeeklyMetrics,
      previousMetrics: newReview.previousMetrics as WeeklyMetrics,
      topPerformer: newReview.topPerformer || '',
      worstPerformer: newReview.worstPerformer || '',
      keyLearning: newReview.keyLearning || '',
      nextWeekFocus: newReview.nextWeekFocus || '',
      notes: newReview.notes || '',
    }
    
    setReviews([review, ...reviews])
    setNewReview({
      metrics: { spend: 0, leads: 0, cpl: 0, ctr: 0, roas: 0 },
      previousMetrics: { spend: 0, leads: 0, cpl: 0, ctr: 0, roas: 0 },
    })
    setIsCreating(false)
  }

  return (
    <div className="space-y-6">
      <Card style={{ border: '3px solid black', boxShadow: '4px 4px 0px 0px black' }}>
        <CardHeader style={{ borderBottom: '3px solid black', backgroundColor: '#3B82F6' }}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-white">
                <Calendar className="h-5 w-5" />
                Weekly Performance Review
              </CardTitle>
              <CardDescription className="text-white/80">
                Track progress and document learnings week over week
              </CardDescription>
            </div>
            <Button
              onClick={() => setIsCreating(true)}
              style={{ border: '2px solid black', backgroundColor: 'white' }}
            >
              New Review
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Create New Review */}
          {isCreating && (
            <div className="p-4 space-y-4" style={{ border: '2px solid black', backgroundColor: '#EFF6FF' }}>
              <h4 className="font-bold">Create Weekly Review</h4>
              
              <div className="space-y-2">
                <Label>Week Of</Label>
                <input
                  type="date"
                  value={newReview.weekOf || ''}
                  onChange={(e) => setNewReview({ ...newReview, weekOf: e.target.value })}
                  className="w-full p-2"
                  style={{ border: '2px solid black' }}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h5 className="font-bold text-sm">This Week's Metrics</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Spend ($)</Label>
                      <input
                        type="number"
                        value={newReview.metrics?.spend || ''}
                        onChange={(e) => setNewReview({
                          ...newReview,
                          metrics: { ...newReview.metrics!, spend: Number(e.target.value) }
                        })}
                        className="w-full p-1 text-sm"
                        style={{ border: '1px solid black' }}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Leads</Label>
                      <input
                        type="number"
                        value={newReview.metrics?.leads || ''}
                        onChange={(e) => setNewReview({
                          ...newReview,
                          metrics: { ...newReview.metrics!, leads: Number(e.target.value) }
                        })}
                        className="w-full p-1 text-sm"
                        style={{ border: '1px solid black' }}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">CPL ($)</Label>
                      <input
                        type="number"
                        step="0.01"
                        value={newReview.metrics?.cpl || ''}
                        onChange={(e) => setNewReview({
                          ...newReview,
                          metrics: { ...newReview.metrics!, cpl: Number(e.target.value) }
                        })}
                        className="w-full p-1 text-sm"
                        style={{ border: '1px solid black' }}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">CTR (%)</Label>
                      <input
                        type="number"
                        step="0.1"
                        value={newReview.metrics?.ctr || ''}
                        onChange={(e) => setNewReview({
                          ...newReview,
                          metrics: { ...newReview.metrics!, ctr: Number(e.target.value) }
                        })}
                        className="w-full p-1 text-sm"
                        style={{ border: '1px solid black' }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-bold text-sm">Previous Week's Metrics</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Spend ($)</Label>
                      <input
                        type="number"
                        value={newReview.previousMetrics?.spend || ''}
                        onChange={(e) => setNewReview({
                          ...newReview,
                          previousMetrics: { ...newReview.previousMetrics!, spend: Number(e.target.value) }
                        })}
                        className="w-full p-1 text-sm"
                        style={{ border: '1px solid black' }}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Leads</Label>
                      <input
                        type="number"
                        value={newReview.previousMetrics?.leads || ''}
                        onChange={(e) => setNewReview({
                          ...newReview,
                          previousMetrics: { ...newReview.previousMetrics!, leads: Number(e.target.value) }
                        })}
                        className="w-full p-1 text-sm"
                        style={{ border: '1px solid black' }}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">CPL ($)</Label>
                      <input
                        type="number"
                        step="0.01"
                        value={newReview.previousMetrics?.cpl || ''}
                        onChange={(e) => setNewReview({
                          ...newReview,
                          previousMetrics: { ...newReview.previousMetrics!, cpl: Number(e.target.value) }
                        })}
                        className="w-full p-1 text-sm"
                        style={{ border: '1px solid black' }}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">CTR (%)</Label>
                      <input
                        type="number"
                        step="0.1"
                        value={newReview.previousMetrics?.ctr || ''}
                        onChange={(e) => setNewReview({
                          ...newReview,
                          previousMetrics: { ...newReview.previousMetrics!, ctr: Number(e.target.value) }
                        })}
                        className="w-full p-1 text-sm"
                        style={{ border: '1px solid black' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Top Performer</Label>
                  <Textarea
                    value={newReview.topPerformer || ''}
                    onChange={(e) => setNewReview({ ...newReview, topPerformer: e.target.value })}
                    placeholder="Which ad/campaign performed best?"
                    rows={2}
                    style={{ border: '2px solid black' }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Worst Performer</Label>
                  <Textarea
                    value={newReview.worstPerformer || ''}
                    onChange={(e) => setNewReview({ ...newReview, worstPerformer: e.target.value })}
                    placeholder="What underperformed?"
                    rows={2}
                    style={{ border: '2px solid black' }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Key Learning</Label>
                <Textarea
                  value={newReview.keyLearning || ''}
                  onChange={(e) => setNewReview({ ...newReview, keyLearning: e.target.value })}
                  placeholder="What did you learn this week?"
                  rows={2}
                  style={{ border: '2px solid black' }}
                />
              </div>

              <div className="space-y-2">
                <Label>Next Week's Focus</Label>
                <Textarea
                  value={newReview.nextWeekFocus || ''}
                  onChange={(e) => setNewReview({ ...newReview, nextWeekFocus: e.target.value })}
                  placeholder="What will you focus on next week?"
                  rows={2}
                  style={{ border: '2px solid black' }}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={saveReview}
                  style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black', backgroundColor: '#3B82F6', color: 'white' }}
                >
                  Save Review
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsCreating(false)}
                  style={{ border: '2px solid black' }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Review History */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-4"
                style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-lg">
                    Week of {new Date(review.weekOf).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </h4>
                  <Badge style={{ border: '2px solid black' }}>
                    {review.metrics.leads} leads
                  </Badge>
                </div>

                {/* Metrics Comparison */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { key: 'spend', label: 'Spend', prefix: '$', current: review.metrics.spend, previous: review.previousMetrics.spend },
                    { key: 'leads', label: 'Leads', prefix: '', current: review.metrics.leads, previous: review.previousMetrics.leads },
                    { key: 'cpl', label: 'CPL', prefix: '$', current: review.metrics.cpl, previous: review.previousMetrics.cpl },
                    { key: 'ctr', label: 'CTR', prefix: '', suffix: '%', current: review.metrics.ctr, previous: review.previousMetrics.ctr },
                  ].map((metric) => {
                    const change = calculateChange(metric.current, metric.previous)
                    return (
                      <div key={metric.key} className="p-2" style={{ border: '1px solid black', backgroundColor: '#F9FAFB' }}>
                        <p className="text-xs text-muted-foreground">{metric.label}</p>
                        <p className="font-bold">{metric.prefix}{metric.current}{metric.suffix}</p>
                        <div className="flex items-center gap-1" style={{ color: getChangeColor(change.direction, metric.key) }}>
                          {change.direction === 'up' && <TrendingUp className="h-3 w-3" />}
                          {change.direction === 'down' && <TrendingDown className="h-3 w-3" />}
                          {change.direction === 'same' && <Minus className="h-3 w-3" />}
                          <span className="text-xs">{change.value}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Insights */}
                <div className="space-y-2">
                  {review.topPerformer && (
                    <div className="flex items-start gap-2 p-2" style={{ backgroundColor: '#D1FAE5', border: '1px solid black' }}>
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-green-800">Top Performer</p>
                        <p className="text-sm">{review.topPerformer}</p>
                      </div>
                    </div>
                  )}
                  
                  {review.keyLearning && (
                    <div className="flex items-start gap-2 p-2" style={{ backgroundColor: '#FEF3C7', border: '1px solid black' }}>
                      <Lightbulb className="h-4 w-4 text-yellow-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-yellow-800">Key Learning</p>
                        <p className="text-sm">{review.keyLearning}</p>
                      </div>
                    </div>
                  )}
                  
                  {review.nextWeekFocus && (
                    <div className="flex items-start gap-2 p-2" style={{ backgroundColor: '#DBEAFE', border: '1px solid black' }}>
                      <Target className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-blue-800">Next Week Focus</p>
                        <p className="text-sm">{review.nextWeekFocus}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
