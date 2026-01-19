import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { 
  DollarSign, 
  Eye, 
  MousePointer, 
  UserPlus, 
  ShoppingCart,
  Save,
  Loader2,
  Calculator
} from 'lucide-react'
import type { CampaignMetrics, Campaign } from '@/types'

const metricsSchema = z.object({
  campaignId: z.string().min(1, 'Campaign is required'),
  date: z.string().min(1, 'Date is required'),
  periodType: z.string().default('daily'),
  spend: z.number().min(0),
  impressions: z.number().min(0),
  reach: z.number().min(0),
  clicks: z.number().min(0),
  linkClicks: z.number().min(0),
  leads: z.number().min(0),
  purchases: z.number().min(0),
  revenue: z.number().min(0),
  notes: z.string().optional(),
})

type MetricsFormData = z.infer<typeof metricsSchema>

interface MetricsInputProps {
  campaigns: Campaign[]
  onSave: (data: Partial<CampaignMetrics>) => Promise<void>
  onCancel?: () => void
}

export function MetricsInput({ campaigns, onSave, onCancel }: MetricsInputProps) {
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<MetricsFormData>({
    resolver: zodResolver(metricsSchema),
    defaultValues: {
      campaignId: '',
      date: new Date().toISOString().split('T')[0],
      periodType: 'daily',
      spend: 0,
      impressions: 0,
      reach: 0,
      clicks: 0,
      linkClicks: 0,
      leads: 0,
      purchases: 0,
      revenue: 0,
      notes: '',
    },
  })

  const spend = watch('spend') || 0
  const impressions = watch('impressions') || 0
  const clicks = watch('clicks') || 0
  const linkClicks = watch('linkClicks') || 0
  const leads = watch('leads') || 0
  const purchases = watch('purchases') || 0
  const revenue = watch('revenue') || 0

  const cpm = impressions > 0 ? (spend / impressions) * 1000 : 0
  const cpc = clicks > 0 ? spend / clicks : 0
  const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0
  const cpl = leads > 0 ? spend / leads : 0
  const cpa = purchases > 0 ? spend / purchases : 0
  const roas = spend > 0 ? revenue / spend : 0

  const onSubmit = async (data: MetricsFormData) => {
    setIsLoading(true)
    try {
      await onSave({
        ...data,
        frequency: impressions > 0 && data.reach > 0 ? impressions / data.reach : 0,
        cpm,
        cpc,
        ctr,
        cpl,
        cpa,
        roas,
        registrations: 0,
        addToCarts: 0,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign & Date</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Campaign *</Label>
              <Select
                value={watch('campaignId')}
                onValueChange={(value) => setValue('campaignId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select campaign" />
                </SelectTrigger>
                <SelectContent>
                  {campaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.campaignId && (
                <p className="text-sm text-destructive">{errors.campaignId.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Date *</Label>
              <Input
                type="date"
                {...register('date')}
              />
            </div>
            <div className="space-y-2">
              <Label>Period Type</Label>
              <Select
                value={watch('periodType')}
                onValueChange={(value) => setValue('periodType', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Spend & Reach
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Ad Spend ($)</Label>
              <Input
                type="number"
                step="0.01"
                {...register('spend', { valueAsNumber: true })}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label>Impressions</Label>
              <Input
                type="number"
                {...register('impressions', { valueAsNumber: true })}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Reach</Label>
              <Input
                type="number"
                {...register('reach', { valueAsNumber: true })}
                placeholder="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MousePointer className="h-5 w-5" />
            Engagement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>All Clicks</Label>
              <Input
                type="number"
                {...register('clicks', { valueAsNumber: true })}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Link Clicks</Label>
              <Input
                type="number"
                {...register('linkClicks', { valueAsNumber: true })}
                placeholder="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Conversions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Leads</Label>
              <Input
                type="number"
                {...register('leads', { valueAsNumber: true })}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Purchases</Label>
              <Input
                type="number"
                {...register('purchases', { valueAsNumber: true })}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Revenue ($)</Label>
              <Input
                type="number"
                step="0.01"
                {...register('revenue', { valueAsNumber: true })}
                placeholder="0.00"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Calculated Metrics
          </CardTitle>
          <CardDescription>Auto-calculated based on your inputs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-lg bg-muted p-3 text-center">
              <p className="text-xs text-muted-foreground">CPM</p>
              <p className="text-lg font-semibold">${cpm.toFixed(2)}</p>
            </div>
            <div className="rounded-lg bg-muted p-3 text-center">
              <p className="text-xs text-muted-foreground">CPC</p>
              <p className="text-lg font-semibold">${cpc.toFixed(2)}</p>
            </div>
            <div className="rounded-lg bg-muted p-3 text-center">
              <p className="text-xs text-muted-foreground">CTR</p>
              <p className="text-lg font-semibold">{ctr.toFixed(2)}%</p>
            </div>
            <div className="rounded-lg bg-muted p-3 text-center">
              <p className="text-xs text-muted-foreground">CPL</p>
              <p className="text-lg font-semibold">${cpl.toFixed(2)}</p>
            </div>
            <div className="rounded-lg bg-muted p-3 text-center">
              <p className="text-xs text-muted-foreground">CPA</p>
              <p className="text-lg font-semibold">${cpa.toFixed(2)}</p>
            </div>
            <div className="rounded-lg bg-muted p-3 text-center">
              <p className="text-xs text-muted-foreground">ROAS</p>
              <p className="text-lg font-semibold">{roas.toFixed(2)}x</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            {...register('notes')}
            placeholder="Any observations or notes about this period..."
            rows={3}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-4 w-4" />
          Save Metrics
        </Button>
      </div>
    </form>
  )
}
