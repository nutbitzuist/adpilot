import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, X, Users, Target, TrendingUp, Zap } from 'lucide-react'
import { LOOKALIKE_SUGGESTIONS } from '@/data/targeting-suggestions'

interface LookalikeAudience {
  id: string
  sourceAudience: string
  sourceType: string
  percentage: number
  country: string
  estimatedSize: string
  strategy: 'narrow' | 'balanced' | 'broad'
}

interface LookalikeBuilderProps {
  lookalikes?: LookalikeAudience[]
  onChange?: (lookalikes: LookalikeAudience[]) => void
}

const SOURCE_TYPES = [
  { value: 'customer_list', label: 'Customer List' },
  { value: 'website_visitors', label: 'Website Visitors' },
  { value: 'video_viewers', label: 'Video Viewers' },
  { value: 'page_engagers', label: 'Page Engagers' },
  { value: 'lead_form', label: 'Lead Form Submitters' },
  { value: 'purchasers', label: 'Purchasers' },
  { value: 'high_value', label: 'High-Value Customers' },
]

const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'GLOBAL', label: 'Global' },
]

const estimateSize = (percentage: number, country: string): string => {
  const baseSize = country === 'US' ? 230 : country === 'GLOBAL' ? 1000 : 50
  const size = (baseSize * percentage) / 100
  if (size < 1) return `${Math.round(size * 1000)}K`
  return `${size.toFixed(1)}M`
}

export function LookalikeBuilder({ lookalikes: initialLookalikes = [], onChange }: LookalikeBuilderProps) {
  const [lookalikes, setLookalikes] = useState<LookalikeAudience[]>(initialLookalikes)
  const [newLookalike, setNewLookalike] = useState<Partial<LookalikeAudience>>({
    sourceType: 'customer_list',
    percentage: 1,
    country: 'US',
    strategy: 'narrow',
  })

  const addLookalike = () => {
    if (!newLookalike.sourceAudience) return
    
    const lookalike: LookalikeAudience = {
      id: Date.now().toString(),
      sourceAudience: newLookalike.sourceAudience,
      sourceType: newLookalike.sourceType || 'customer_list',
      percentage: newLookalike.percentage || 1,
      country: newLookalike.country || 'US',
      estimatedSize: estimateSize(newLookalike.percentage || 1, newLookalike.country || 'US'),
      strategy: newLookalike.strategy || 'narrow',
    }
    
    const updated = [...lookalikes, lookalike]
    setLookalikes(updated)
    onChange?.(updated)
    setNewLookalike({ sourceType: 'customer_list', percentage: 1, country: 'US', strategy: 'narrow' })
  }

  const removeLookalike = (id: string) => {
    const updated = lookalikes.filter(l => l.id !== id)
    setLookalikes(updated)
    onChange?.(updated)
  }

  const addSuggestion = (suggestion: { name: string; description: string }) => {
    const lookalike: LookalikeAudience = {
      id: Date.now().toString(),
      sourceAudience: suggestion.name,
      sourceType: 'custom',
      percentage: 1,
      country: 'US',
      estimatedSize: estimateSize(1, 'US'),
      strategy: 'narrow',
    }
    const updated = [...lookalikes, lookalike]
    setLookalikes(updated)
    onChange?.(updated)
  }

  const getStrategyColor = (strategy: string) => {
    switch (strategy) {
      case 'narrow': return '#22C55E'
      case 'balanced': return '#EAB308'
      case 'broad': return '#EF4444'
      default: return '#6B7280'
    }
  }

  return (
    <div className="space-y-6">
      <Card style={{ border: '3px solid black', boxShadow: '4px 4px 0px 0px black' }}>
        <CardHeader style={{ borderBottom: '3px solid black', backgroundColor: '#7C3AED' }}>
          <CardTitle className="flex items-center gap-2 text-white">
            <Users className="h-5 w-5" />
            Lookalike Audience Builder
          </CardTitle>
          <CardDescription className="text-white/80">
            Create lookalike audiences to find new customers similar to your best ones
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Strategy Guide */}
          <div className="grid gap-3 md:grid-cols-3">
            <div className="p-3" style={{ border: '2px solid black', backgroundColor: '#DCFCE7' }}>
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-green-600" />
                <span className="font-bold text-sm">1% - Narrow</span>
              </div>
              <p className="text-xs">Most similar to source. Best for high-ticket offers.</p>
            </div>
            <div className="p-3" style={{ border: '2px solid black', backgroundColor: '#FEF9C3' }}>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-yellow-600" />
                <span className="font-bold text-sm">1-5% - Balanced</span>
              </div>
              <p className="text-xs">Good balance of quality and reach. Best for lead gen.</p>
            </div>
            <div className="p-3" style={{ border: '2px solid black', backgroundColor: '#FEE2E2' }}>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-red-600" />
                <span className="font-bold text-sm">5-10% - Broad</span>
              </div>
              <p className="text-xs">Maximum reach. Best for awareness campaigns.</p>
            </div>
          </div>

          {/* Add New Lookalike */}
          <div className="space-y-4 p-4" style={{ border: '2px solid black', backgroundColor: '#f5f5f5' }}>
            <h4 className="font-bold">Create Lookalike Audience</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Source Type</Label>
                <Select
                  value={newLookalike.sourceType}
                  onValueChange={(value) => setNewLookalike({ ...newLookalike, sourceType: value })}
                >
                  <SelectTrigger style={{ border: '2px solid black' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SOURCE_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Select
                  value={newLookalike.country}
                  onValueChange={(value) => setNewLookalike({ ...newLookalike, country: value })}
                >
                  <SelectTrigger style={{ border: '2px solid black' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Source Audience Name</Label>
              <Input
                value={newLookalike.sourceAudience || ''}
                onChange={(e) => setNewLookalike({ ...newLookalike, sourceAudience: e.target.value })}
                placeholder="e.g., All purchasers last 365 days"
                style={{ border: '2px solid black' }}
              />
            </div>
            <div className="space-y-2">
              <Label>Lookalike Percentage: {newLookalike.percentage}%</Label>
              <Slider
                value={[newLookalike.percentage || 1]}
                onValueChange={(values: number[]) => setNewLookalike({ ...newLookalike, percentage: values[0] })}
                min={1}
                max={10}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1% (Most Similar)</span>
                <span>10% (Broadest Reach)</span>
              </div>
              <p className="text-sm">
                Estimated Size: <strong>{estimateSize(newLookalike.percentage || 1, newLookalike.country || 'US')}</strong>
              </p>
            </div>
            <Button 
              onClick={addLookalike}
              disabled={!newLookalike.sourceAudience}
              style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black', backgroundColor: '#7C3AED', color: 'white' }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Lookalike
            </Button>
          </div>

          {/* Current Lookalikes */}
          {lookalikes.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-bold">Your Lookalike Audiences ({lookalikes.length})</h4>
              <div className="space-y-2">
                {lookalikes.map((lookalike) => (
                  <div
                    key={lookalike.id}
                    className="flex items-center justify-between p-3 bg-white"
                    style={{ border: '2px solid black' }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 flex items-center justify-center font-bold text-white"
                        style={{ border: '2px solid black', backgroundColor: getStrategyColor(lookalike.strategy) }}
                      >
                        {lookalike.percentage}%
                      </div>
                      <div>
                        <p className="font-bold">{lookalike.sourceAudience}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" style={{ border: '2px solid black' }}>
                            {lookalike.country}
                          </Badge>
                          <Badge variant="outline" style={{ border: '2px solid black' }}>
                            ~{lookalike.estimatedSize}
                          </Badge>
                          <Badge style={{ border: '2px solid black', backgroundColor: getStrategyColor(lookalike.strategy), color: 'white' }}>
                            {lookalike.percentage <= 2 ? 'Narrow' : lookalike.percentage <= 5 ? 'Balanced' : 'Broad'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLookalike(lookalike.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stacking Strategy */}
          <div className="p-4" style={{ border: '2px solid black', backgroundColor: '#EDE9FE' }}>
            <h4 className="font-bold mb-2">💡 Pro Tip: Lookalike Stacking</h4>
            <p className="text-sm mb-3">
              Create multiple lookalikes at different percentages (1%, 1-2%, 2-5%) and test them in separate ad sets to find your sweet spot.
            </p>
            <div className="flex gap-2 flex-wrap">
              {LOOKALIKE_SUGGESTIONS.slice(0, 4).map((suggestion, index) => {
                const isAdded = lookalikes.some(l => l.sourceAudience === suggestion.name)
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => !isAdded && addSuggestion(suggestion)}
                    disabled={isAdded}
                    style={{ border: '2px solid black', boxShadow: isAdded ? 'none' : '2px 2px 0px 0px black' }}
                  >
                    {isAdded ? '✓ ' : '+ '}{suggestion.name}
                  </Button>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
