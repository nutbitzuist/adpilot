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
import { 
  FlaskConical, 
  Plus, 
  X, 
  Save, 
  Loader2,
  Target,
  Lightbulb,
  BarChart3
} from 'lucide-react'
import type { Test, TestVariant, Campaign } from '@/types'

const testSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  campaignId: z.string().optional(),
  hypothesis: z.string().optional(),
  variableType: z.string().optional(),
  variableDetails: z.string().optional(),
  controlDescription: z.string().optional(),
  primaryMetric: z.string().optional(),
  targetImprovement: z.number().optional(),
  minimumSampleSize: z.number().optional(),
  minimumSpend: z.number().optional(),
  startDate: z.string().optional(),
  plannedEndDate: z.string().optional(),
})

type TestFormData = z.infer<typeof testSchema>

const VARIABLE_TYPES = [
  { value: 'hook', label: 'Hook/First Line' },
  { value: 'headline', label: 'Headline' },
  { value: 'body_copy', label: 'Body Copy' },
  { value: 'cta', label: 'Call to Action' },
  { value: 'creative', label: 'Creative/Visual' },
  { value: 'format', label: 'Ad Format' },
  { value: 'audience', label: 'Audience/Targeting' },
  { value: 'offer', label: 'Offer/Angle' },
  { value: 'landing_page', label: 'Landing Page' },
]

const PRIMARY_METRICS = [
  { value: 'ctr', label: 'Click-Through Rate (CTR)' },
  { value: 'cpc', label: 'Cost Per Click (CPC)' },
  { value: 'cpl', label: 'Cost Per Lead (CPL)' },
  { value: 'cvr', label: 'Conversion Rate (CVR)' },
  { value: 'roas', label: 'Return on Ad Spend (ROAS)' },
  { value: 'cpa', label: 'Cost Per Acquisition (CPA)' },
]

interface TestPlannerProps {
  test?: Test
  campaigns: Campaign[]
  onSave: (data: Partial<Test>) => Promise<void>
  onCancel: () => void
}

export function TestPlanner({ test, campaigns, onSave, onCancel }: TestPlannerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [variants, setVariants] = useState<TestVariant[]>(
    test?.variants || [{ name: 'Variant A', description: '' }]
  )

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<TestFormData>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      name: test?.name || '',
      campaignId: test?.campaignId || '',
      hypothesis: test?.hypothesis || '',
      variableType: test?.variableType || '',
      variableDetails: test?.variableDetails || '',
      controlDescription: test?.controlDescription || '',
      primaryMetric: test?.primaryMetric || 'ctr',
      targetImprovement: test?.targetImprovement || 20,
      minimumSampleSize: test?.minimumSampleSize || 1000,
      minimumSpend: test?.minimumSpend || 100,
      startDate: test?.startDate || '',
      plannedEndDate: test?.plannedEndDate || '',
    },
  })

  const onSubmit = async (data: TestFormData) => {
    setIsLoading(true)
    try {
      await onSave({
        ...data,
        variants,
        status: 'planning',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addVariant = () => {
    const nextLetter = String.fromCharCode(65 + variants.length)
    setVariants([...variants, { name: `Variant ${nextLetter}`, description: '' }])
  }

  const updateVariant = (index: number, field: keyof TestVariant, value: string) => {
    const updated = [...variants]
    updated[index] = { ...updated[index], [field]: value }
    setVariants(updated)
  }

  const removeVariant = (index: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter((_, i) => i !== index))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="setup" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="setup">
            <FlaskConical className="h-4 w-4 mr-1" />
            Setup
          </TabsTrigger>
          <TabsTrigger value="variants">
            <Target className="h-4 w-4 mr-1" />
            Variants
          </TabsTrigger>
          <TabsTrigger value="goals">
            <BarChart3 className="h-4 w-4 mr-1" />
            Goals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Test Name *</Label>
                  <Input
                    id="name"
                    {...register('name')}
                    placeholder="e.g., Hook Test - Question vs Statement"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Campaign</Label>
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
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hypothesis">
                  <Lightbulb className="h-4 w-4 inline mr-1" />
                  Hypothesis
                </Label>
                <Textarea
                  id="hypothesis"
                  {...register('hypothesis')}
                  placeholder="I believe that [change] will result in [outcome] because [reason]..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What Are You Testing?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Variable Type</Label>
                <Select
                  value={watch('variableType')}
                  onValueChange={(value) => setValue('variableType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select what you're testing" />
                  </SelectTrigger>
                  <SelectContent>
                    {VARIABLE_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="variableDetails">Variable Details</Label>
                <Textarea
                  id="variableDetails"
                  {...register('variableDetails')}
                  placeholder="Describe specifically what you're changing..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="controlDescription">Control (Original)</Label>
                <Textarea
                  id="controlDescription"
                  {...register('controlDescription')}
                  placeholder="Describe the current/control version..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variants" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Test Variants</span>
                <Button type="button" variant="outline" size="sm" onClick={addVariant}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Variant
                </Button>
              </CardTitle>
              <CardDescription>
                Define the variations you want to test
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {variants.map((variant, index) => (
                <div key={index} className="rounded-lg border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={index === 0 ? 'default' : 'secondary'}>
                        {index === 0 ? 'Control' : `Variant ${index}`}
                      </Badge>
                      <Input
                        value={variant.name}
                        onChange={(e) => updateVariant(index, 'name', e.target.value)}
                        className="max-w-[200px] h-8"
                        placeholder="Variant name"
                      />
                    </div>
                    {variants.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeVariant(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <Textarea
                    value={variant.description}
                    onChange={(e) => updateVariant(index, 'description', e.target.value)}
                    placeholder={index === 0 
                      ? "Describe the control version (what you're currently running)..."
                      : "Describe this variant (what's different from control)..."
                    }
                    rows={3}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Success Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Primary Metric</Label>
                  <Select
                    value={watch('primaryMetric')}
                    onValueChange={(value) => setValue('primaryMetric', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRIMARY_METRICS.map((metric) => (
                        <SelectItem key={metric.value} value={metric.value}>
                          {metric.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetImprovement">Target Improvement (%)</Label>
                  <Input
                    id="targetImprovement"
                    type="number"
                    {...register('targetImprovement', { valueAsNumber: true })}
                    placeholder="20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="minimumSampleSize">Minimum Sample Size</Label>
                  <Input
                    id="minimumSampleSize"
                    type="number"
                    {...register('minimumSampleSize', { valueAsNumber: true })}
                    placeholder="1000"
                  />
                  <p className="text-xs text-muted-foreground">
                    Impressions or clicks per variant
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimumSpend">Minimum Spend ($)</Label>
                  <Input
                    id="minimumSpend"
                    type="number"
                    {...register('minimumSpend', { valueAsNumber: true })}
                    placeholder="100"
                  />
                  <p className="text-xs text-muted-foreground">
                    Per variant before declaring winner
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent>
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
                  <Label htmlFor="plannedEndDate">Planned End Date</Label>
                  <Input
                    id="plannedEndDate"
                    type="date"
                    {...register('plannedEndDate')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-4 w-4" />
          {test ? 'Update Test' : 'Create Test'}
        </Button>
      </div>
    </form>
  )
}
