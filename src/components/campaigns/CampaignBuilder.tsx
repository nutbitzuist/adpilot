import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  Megaphone, 
  Target, 
  DollarSign,
  Calendar,
  Plus, 
  X, 
  Save, 
  Loader2,
  Layers,
  Settings
} from 'lucide-react'
import { CAMPAIGN_OBJECTIVES, FUNNEL_STAGES } from '@/lib/constants'
import type { Campaign, AdSet, Offer, TargetingStrategy } from '@/types'

const campaignSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  objective: z.string().optional(),
  funnelStage: z.string().optional(),
  offerId: z.string().optional(),
  targetingStrategyId: z.string().optional(),
  campaignType: z.string().optional(),
  dailyBudget: z.number().optional(),
  totalBudget: z.number().optional(),
  budgetType: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  notes: z.string().optional(),
})

type CampaignFormData = z.infer<typeof campaignSchema>

const CAMPAIGN_TYPES = [
  { value: 'prospecting', label: 'Prospecting (Cold)' },
  { value: 'retargeting', label: 'Retargeting (Warm)' },
  { value: 'lookalike', label: 'Lookalike' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'conversion', label: 'Conversion' },
]

const BUDGET_TYPES = [
  { value: 'daily', label: 'Daily Budget' },
  { value: 'lifetime', label: 'Lifetime Budget' },
  { value: 'cbo', label: 'Campaign Budget Optimization' },
]

interface CampaignBuilderProps {
  campaign?: Campaign
  offers: Offer[]
  targetingStrategies: TargetingStrategy[]
  onSave: (data: Partial<Campaign>) => Promise<void>
  onCancel: () => void
}

export function CampaignBuilder({ 
  campaign, 
  offers, 
  targetingStrategies, 
  onSave, 
  onCancel 
}: CampaignBuilderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [adSets, setAdSets] = useState<AdSet[]>(campaign?.adSets || [])

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: campaign?.name || '',
      objective: campaign?.objective || 'leads',
      funnelStage: campaign?.funnelStage || 'Consideration',
      offerId: campaign?.offerId || '',
      targetingStrategyId: campaign?.targetingStrategyId || '',
      campaignType: campaign?.campaignType || 'prospecting',
      dailyBudget: campaign?.dailyBudget,
      totalBudget: campaign?.totalBudget,
      budgetType: campaign?.budgetType || 'daily',
      startDate: campaign?.startDate || '',
      endDate: campaign?.endDate || '',
      notes: campaign?.notes || '',
    },
  })

  const budgetType = watch('budgetType')

  const onSubmit = async (data: CampaignFormData) => {
    setIsLoading(true)
    try {
      await onSave({
        ...data,
        adSets,
        status: campaign?.status || 'planning',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addAdSet = () => {
    setAdSets([...adSets, {
      name: `Ad Set ${adSets.length + 1}`,
      targeting: '',
      budget: undefined,
      schedule: '',
    }])
  }

  const updateAdSet = (index: number, field: keyof AdSet, value: string | number | undefined) => {
    const updated = [...adSets]
    updated[index] = { ...updated[index], [field]: value }
    setAdSets(updated)
  }

  const removeAdSet = (index: number) => {
    setAdSets(adSets.filter((_, i) => i !== index))
  }

  const selectedOffer = offers.find(o => o.id === watch('offerId'))
  const selectedStrategy = targetingStrategies.find(s => s.id === watch('targetingStrategyId'))

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basics">
            <Megaphone className="h-4 w-4 mr-1" />
            Basics
          </TabsTrigger>
          <TabsTrigger value="targeting">
            <Target className="h-4 w-4 mr-1" />
            Targeting
          </TabsTrigger>
          <TabsTrigger value="budget">
            <DollarSign className="h-4 w-4 mr-1" />
            Budget
          </TabsTrigger>
          <TabsTrigger value="adsets">
            <Layers className="h-4 w-4 mr-1" />
            Ad Sets
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[500px] mt-4">
          <TabsContent value="basics" className="space-y-4 pr-4">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name *</Label>
                  <Input
                    id="name"
                    {...register('name')}
                    placeholder="e.g., Lead Magnet - January 2024"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Objective</Label>
                    <Select
                      value={watch('objective')}
                      onValueChange={(value) => setValue('objective', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CAMPAIGN_OBJECTIVES.map((obj) => (
                          <SelectItem key={obj.value} value={obj.value}>
                            {obj.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Funnel Stage</Label>
                    <Select
                      value={watch('funnelStage')}
                      onValueChange={(value) => setValue('funnelStage', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FUNNEL_STAGES.map((stage) => (
                          <SelectItem key={stage} value={stage}>
                            {stage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Campaign Type</Label>
                  <Select
                    value={watch('campaignType')}
                    onValueChange={(value) => setValue('campaignType', value)}
                  >
                    <SelectTrigger>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Linked Offer</CardTitle>
                <CardDescription>Connect this campaign to an offer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Offer</Label>
                  <Select
                    value={watch('offerId')}
                    onValueChange={(value) => setValue('offerId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an offer" />
                    </SelectTrigger>
                    <SelectContent>
                      {offers.map((offer) => (
                        <SelectItem key={offer.id} value={offer.id}>
                          {offer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedOffer && (
                  <div className="rounded-lg bg-muted p-3">
                    <p className="font-medium">{selectedOffer.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedOffer.offerType}</p>
                    {selectedOffer.price && (
                      <p className="text-sm mt-1">Price: {selectedOffer.price}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  {...register('notes')}
                  placeholder="Campaign notes, goals, or reminders..."
                  rows={3}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="targeting" className="space-y-4 pr-4">
            <Card>
              <CardHeader>
                <CardTitle>Targeting Strategy</CardTitle>
                <CardDescription>Link a saved targeting strategy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Strategy</Label>
                  <Select
                    value={watch('targetingStrategyId')}
                    onValueChange={(value) => setValue('targetingStrategyId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a targeting strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      {targetingStrategies.map((strategy) => (
                        <SelectItem key={strategy.id} value={strategy.id}>
                          {strategy.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedStrategy && (
                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{selectedStrategy.name}</h4>
                      <Badge variant={selectedStrategy.status === 'active' ? 'default' : 'secondary'}>
                        {selectedStrategy.status}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Age: {selectedStrategy.ageMin} - {selectedStrategy.ageMax}
                    </div>

                    {selectedStrategy.interests.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Interests:</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedStrategy.interests.slice(0, 5).map((interest, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                          {selectedStrategy.interests.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{selectedStrategy.interests.length - 5} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedStrategy.locations.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Locations:</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedStrategy.locations.map((loc, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {loc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="space-y-4 pr-4">
            <Card>
              <CardHeader>
                <CardTitle>Budget Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Budget Type</Label>
                  <Select
                    value={watch('budgetType')}
                    onValueChange={(value) => setValue('budgetType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {BUDGET_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {(budgetType === 'daily' || budgetType === 'cbo') && (
                    <div className="space-y-2">
                      <Label htmlFor="dailyBudget">Daily Budget ($)</Label>
                      <Input
                        id="dailyBudget"
                        type="number"
                        {...register('dailyBudget', { valueAsNumber: true })}
                        placeholder="50"
                      />
                    </div>
                  )}

                  {budgetType === 'lifetime' && (
                    <div className="space-y-2">
                      <Label htmlFor="totalBudget">Total Budget ($)</Label>
                      <Input
                        id="totalBudget"
                        type="number"
                        {...register('totalBudget', { valueAsNumber: true })}
                        placeholder="1000"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      {...register('startDate')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date (Optional)</Label>
                    <Input
                      id="endDate"
                      type="date"
                      {...register('endDate')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="adsets" className="space-y-4 pr-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Layers className="h-5 w-5" />
                    Ad Sets
                  </span>
                  <Button type="button" variant="outline" size="sm" onClick={addAdSet}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Ad Set
                  </Button>
                </CardTitle>
                <CardDescription>
                  Organize your ads into ad sets with different targeting or budgets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {adSets.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Layers className="mx-auto h-12 w-12 mb-4" />
                    <p>No ad sets yet</p>
                    <p className="text-sm">Add ad sets to organize your campaign</p>
                  </div>
                ) : (
                  adSets.map((adSet, index) => (
                    <div key={index} className="rounded-lg border p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Input
                          value={adSet.name}
                          onChange={(e) => updateAdSet(index, 'name', e.target.value)}
                          className="max-w-xs font-medium"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAdSet(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-xs">Targeting Notes</Label>
                          <Input
                            value={adSet.targeting || ''}
                            onChange={(e) => updateAdSet(index, 'targeting', e.target.value)}
                            placeholder="e.g., Interest stack A"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Budget ($)</Label>
                          <Input
                            type="number"
                            value={adSet.budget || ''}
                            onChange={(e) => updateAdSet(index, 'budget', e.target.value ? Number(e.target.value) : undefined)}
                            placeholder="Optional"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-xs">Schedule Notes</Label>
                        <Input
                          value={adSet.schedule || ''}
                          onChange={(e) => updateAdSet(index, 'schedule', e.target.value)}
                          placeholder="e.g., Mon-Fri 9am-5pm"
                        />
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </ScrollArea>
      </Tabs>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-4 w-4" />
          {campaign ? 'Update Campaign' : 'Create Campaign'}
        </Button>
      </div>
    </form>
  )
}
