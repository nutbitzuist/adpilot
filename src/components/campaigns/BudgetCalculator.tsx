import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calculator, DollarSign, Target, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

interface BudgetMetrics {
  dailyBudget: number
  monthlyBudget: number
  expectedCPM: number
  expectedCTR: number
  expectedCVR: number
  targetCPA: number
  estimatedImpressions: number
  estimatedClicks: number
  estimatedConversions: number
  estimatedCPL: number
  recommendedBudget: number
  budgetHealth: 'low' | 'optimal' | 'high'
}

const CAMPAIGN_TYPES = [
  { value: 'lead_magnet', label: 'Lead Magnet', avgCPM: 15, avgCTR: 1.5, avgCVR: 25 },
  { value: 'webinar', label: 'Webinar Registration', avgCPM: 20, avgCTR: 1.2, avgCVR: 20 },
  { value: 'strategy_call', label: 'Strategy Call', avgCPM: 25, avgCTR: 0.8, avgCVR: 10 },
  { value: 'course_sale', label: 'Course Sale', avgCPM: 22, avgCTR: 1.0, avgCVR: 3 },
  { value: 'awareness', label: 'Brand Awareness', avgCPM: 12, avgCTR: 0.5, avgCVR: 0 },
]

export function BudgetCalculator() {
  const [campaignType, setCampaignType] = useState('lead_magnet')
  const [dailyBudget, setDailyBudget] = useState(50)
  const [targetConversions, setTargetConversions] = useState(10)
  const [targetCPA, setTargetCPA] = useState(25)
  const [customCPM, setCustomCPM] = useState<number | null>(null)
  const [customCTR, setCustomCTR] = useState<number | null>(null)
  const [customCVR, setCustomCVR] = useState<number | null>(null)
  const [metrics, setMetrics] = useState<BudgetMetrics | null>(null)

  useEffect(() => {
    calculateMetrics()
  }, [campaignType, dailyBudget, targetConversions, targetCPA, customCPM, customCTR, customCVR])

  const calculateMetrics = () => {
    const typeConfig = CAMPAIGN_TYPES.find(t => t.value === campaignType)
    if (!typeConfig) return

    const cpm = customCPM ?? typeConfig.avgCPM
    const ctr = customCTR ?? typeConfig.avgCTR
    const cvr = customCVR ?? typeConfig.avgCVR

    const monthlyBudget = dailyBudget * 30
    const estimatedImpressions = (dailyBudget / cpm) * 1000
    const estimatedClicks = estimatedImpressions * (ctr / 100)
    const estimatedConversions = cvr > 0 ? estimatedClicks * (cvr / 100) : 0
    const estimatedCPL = estimatedConversions > 0 ? dailyBudget / estimatedConversions : 0

    // Calculate recommended budget based on target conversions
    const requiredClicks = cvr > 0 ? (targetConversions / (cvr / 100)) : 0
    const requiredImpressions = ctr > 0 ? (requiredClicks / (ctr / 100)) : 0
    const recommendedBudget = (requiredImpressions / 1000) * cpm

    // Determine budget health
    let budgetHealth: 'low' | 'optimal' | 'high' = 'optimal'
    if (dailyBudget < recommendedBudget * 0.5) {
      budgetHealth = 'low'
    } else if (dailyBudget > recommendedBudget * 2) {
      budgetHealth = 'high'
    }

    setMetrics({
      dailyBudget,
      monthlyBudget,
      expectedCPM: cpm,
      expectedCTR: ctr,
      expectedCVR: cvr,
      targetCPA,
      estimatedImpressions: Math.round(estimatedImpressions),
      estimatedClicks: Math.round(estimatedClicks),
      estimatedConversions: Math.round(estimatedConversions * 10) / 10,
      estimatedCPL: Math.round(estimatedCPL * 100) / 100,
      recommendedBudget: Math.round(recommendedBudget),
      budgetHealth,
    })
  }

  const getBudgetHealthColor = (health: string) => {
    switch (health) {
      case 'low': return '#EF4444'
      case 'optimal': return '#22C55E'
      case 'high': return '#F59E0B'
      default: return '#6B7280'
    }
  }

  return (
    <div className="space-y-6">
      <Card style={{ border: '3px solid black', boxShadow: '4px 4px 0px 0px black' }}>
        <CardHeader style={{ borderBottom: '3px solid black', backgroundColor: '#F59E0B' }}>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Budget Calculator
          </CardTitle>
          <CardDescription className="text-black">
            Plan your ad spend and forecast results based on industry benchmarks
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Campaign Type Selection */}
          <div className="space-y-2">
            <Label>Campaign Type</Label>
            <Select value={campaignType} onValueChange={setCampaignType}>
              <SelectTrigger style={{ border: '2px solid black' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CAMPAIGN_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Budget Input */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Daily Budget: ${dailyBudget}</Label>
              <Slider
                value={[dailyBudget]}
                onValueChange={(values: number[]) => setDailyBudget(values[0])}
                min={10}
                max={500}
                step={10}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$10/day</span>
                <span>$500/day</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Target Daily Conversions</Label>
                <Input
                  type="number"
                  value={targetConversions}
                  onChange={(e) => setTargetConversions(Number(e.target.value))}
                  style={{ border: '2px solid black' }}
                />
              </div>
              <div className="space-y-2">
                <Label>Target CPA ($)</Label>
                <Input
                  type="number"
                  value={targetCPA}
                  onChange={(e) => setTargetCPA(Number(e.target.value))}
                  style={{ border: '2px solid black' }}
                />
              </div>
            </div>
          </div>

          {/* Custom Metrics Override */}
          <div className="p-4" style={{ border: '2px solid black', backgroundColor: '#F3F4F6' }}>
            <h4 className="font-bold mb-3">Custom Metrics (Optional)</h4>
            <p className="text-xs text-muted-foreground mb-3">Override benchmarks with your actual data</p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>CPM ($)</Label>
                <Input
                  type="number"
                  placeholder={CAMPAIGN_TYPES.find(t => t.value === campaignType)?.avgCPM.toString()}
                  value={customCPM ?? ''}
                  onChange={(e) => setCustomCPM(e.target.value ? Number(e.target.value) : null)}
                  style={{ border: '2px solid black' }}
                />
              </div>
              <div className="space-y-2">
                <Label>CTR (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder={CAMPAIGN_TYPES.find(t => t.value === campaignType)?.avgCTR.toString()}
                  value={customCTR ?? ''}
                  onChange={(e) => setCustomCTR(e.target.value ? Number(e.target.value) : null)}
                  style={{ border: '2px solid black' }}
                />
              </div>
              <div className="space-y-2">
                <Label>CVR (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder={CAMPAIGN_TYPES.find(t => t.value === campaignType)?.avgCVR.toString()}
                  value={customCVR ?? ''}
                  onChange={(e) => setCustomCVR(e.target.value ? Number(e.target.value) : null)}
                  style={{ border: '2px solid black' }}
                />
              </div>
            </div>
          </div>

          {/* Results */}
          {metrics && (
            <div className="space-y-4">
              {/* Budget Health */}
              <div 
                className="p-4 flex items-center justify-between"
                style={{ 
                  border: '3px solid black',
                  backgroundColor: getBudgetHealthColor(metrics.budgetHealth) + '20'
                }}
              >
                <div className="flex items-center gap-3">
                  {metrics.budgetHealth === 'optimal' ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-6 w-6" style={{ color: getBudgetHealthColor(metrics.budgetHealth) }} />
                  )}
                  <div>
                    <p className="font-bold">Budget Health: {metrics.budgetHealth.toUpperCase()}</p>
                    <p className="text-sm">
                      {metrics.budgetHealth === 'low' && 'Consider increasing budget for better results'}
                      {metrics.budgetHealth === 'optimal' && 'Your budget is well-aligned with your goals'}
                      {metrics.budgetHealth === 'high' && 'You may be overspending for your targets'}
                    </p>
                  </div>
                </div>
                <Badge 
                  style={{ 
                    border: '2px solid black',
                    backgroundColor: getBudgetHealthColor(metrics.budgetHealth),
                    color: 'white'
                  }}
                >
                  Recommended: ${metrics.recommendedBudget}/day
                </Badge>
              </div>

              {/* Metrics Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4" style={{ border: '2px solid black', backgroundColor: '#DBEAFE' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm font-medium">Monthly Budget</span>
                  </div>
                  <p className="text-2xl font-bold">${metrics.monthlyBudget.toLocaleString()}</p>
                </div>
                
                <div className="p-4" style={{ border: '2px solid black', backgroundColor: '#FEF3C7' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="h-4 w-4" />
                    <span className="text-sm font-medium">Est. Daily Impressions</span>
                  </div>
                  <p className="text-2xl font-bold">{metrics.estimatedImpressions.toLocaleString()}</p>
                </div>
                
                <div className="p-4" style={{ border: '2px solid black', backgroundColor: '#EDE9FE' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">Est. Daily Clicks</span>
                  </div>
                  <p className="text-2xl font-bold">{metrics.estimatedClicks.toLocaleString()}</p>
                </div>
                
                <div className="p-4" style={{ border: '2px solid black', backgroundColor: '#D1FAE5' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Est. Daily Conversions</span>
                  </div>
                  <p className="text-2xl font-bold">{metrics.estimatedConversions}</p>
                </div>
              </div>

              {/* CPA Analysis */}
              <div className="p-4" style={{ border: '2px solid black' }}>
                <h4 className="font-bold mb-3">Cost Analysis</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated CPL/CPA</p>
                    <p className="text-xl font-bold">${metrics.estimatedCPL.toFixed(2)}</p>
                    {metrics.estimatedCPL > targetCPA && (
                      <Badge variant="destructive" style={{ border: '1px solid black' }}>
                        Above target
                      </Badge>
                    )}
                    {metrics.estimatedCPL <= targetCPA && metrics.estimatedCPL > 0 && (
                      <Badge style={{ border: '1px solid black', backgroundColor: '#22C55E', color: 'white' }}>
                        Within target
                      </Badge>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Target CPA</p>
                    <p className="text-xl font-bold">${targetCPA}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Conversions</p>
                    <p className="text-xl font-bold">{Math.round(metrics.estimatedConversions * 30)}</p>
                  </div>
                </div>
              </div>

              {/* Benchmarks Used */}
              <div className="p-4" style={{ border: '2px solid black', backgroundColor: '#F9FAFB' }}>
                <h4 className="font-bold mb-2">Metrics Used</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" style={{ border: '2px solid black' }}>
                    CPM: ${metrics.expectedCPM}
                  </Badge>
                  <Badge variant="outline" style={{ border: '2px solid black' }}>
                    CTR: {metrics.expectedCTR}%
                  </Badge>
                  <Badge variant="outline" style={{ border: '2px solid black' }}>
                    CVR: {metrics.expectedCVR}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Based on {customCPM || customCTR || customCVR ? 'your custom metrics' : 'industry benchmarks for ' + CAMPAIGN_TYPES.find(t => t.value === campaignType)?.label}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
