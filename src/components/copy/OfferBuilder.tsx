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
import { Separator } from '@/components/ui/separator'
import { 
  Package, 
  Plus, 
  X, 
  Save, 
  Loader2,
  Gift,
  Shield,
  Clock,
  DollarSign,
  Sparkles
} from 'lucide-react'
import type { Offer } from '@/types'

const offerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  offerType: z.string().optional(),
  headline: z.string().optional(),
  description: z.string().optional(),
  price: z.string().optional(),
  totalValue: z.string().optional(),
  guaranteeType: z.string().optional(),
  guaranteeDetails: z.string().optional(),
  urgencyType: z.string().optional(),
  urgencyDetails: z.string().optional(),
  beforeState: z.string().optional(),
  afterState: z.string().optional(),
  timeframe: z.string().optional(),
})

type OfferFormData = z.infer<typeof offerSchema>

const OFFER_TYPES = [
  { value: 'lead_magnet', label: 'Lead Magnet (Free)' },
  { value: 'tripwire', label: 'Tripwire ($7-$47)' },
  { value: 'core_offer', label: 'Core Offer ($97-$997)' },
  { value: 'high_ticket', label: 'High Ticket ($1,000+)' },
  { value: 'subscription', label: 'Subscription/Membership' },
]

const GUARANTEE_TYPES = [
  { value: 'money_back', label: 'Money-Back Guarantee' },
  { value: 'results', label: 'Results Guarantee' },
  { value: 'double_money_back', label: 'Double Money-Back' },
  { value: 'lifetime', label: 'Lifetime Access' },
  { value: 'none', label: 'No Guarantee' },
]

const URGENCY_TYPES = [
  { value: 'deadline', label: 'Deadline' },
  { value: 'limited_spots', label: 'Limited Spots' },
  { value: 'price_increase', label: 'Price Increase' },
  { value: 'bonus_expiry', label: 'Bonus Expiry' },
  { value: 'none', label: 'No Urgency' },
]

interface OfferBuilderProps {
  offer?: Offer
  onSave: (data: Partial<Offer>) => Promise<void>
  onCancel: () => void
}

export function OfferBuilder({ offer, onSave, onCancel }: OfferBuilderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [valueStack, setValueStack] = useState<Array<{ name: string; value: string }>>(
    offer?.valueStack || []
  )
  const [bonuses, setBonuses] = useState<Array<{ name: string; value: string }>>(
    offer?.bonuses || []
  )

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<OfferFormData>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      name: offer?.name || '',
      offerType: offer?.offerType || '',
      headline: offer?.headline || '',
      description: offer?.description || '',
      price: offer?.price || '',
      totalValue: offer?.totalValue || '',
      guaranteeType: offer?.guaranteeType || '',
      guaranteeDetails: offer?.guaranteeDetails || '',
      urgencyType: offer?.urgencyType || '',
      urgencyDetails: offer?.urgencyDetails || '',
      beforeState: offer?.beforeState || '',
      afterState: offer?.afterState || '',
      timeframe: offer?.timeframe || '',
    },
  })

  const onSubmit = async (data: OfferFormData) => {
    setIsLoading(true)
    try {
      await onSave({
        ...data,
        valueStack,
        bonuses,
        status: 'active',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addValueStackItem = () => {
    setValueStack([...valueStack, { name: '', value: '' }])
  }

  const updateValueStackItem = (index: number, field: 'name' | 'value', val: string) => {
    const updated = [...valueStack]
    updated[index][field] = val
    setValueStack(updated)
  }

  const removeValueStackItem = (index: number) => {
    setValueStack(valueStack.filter((_, i) => i !== index))
  }

  const addBonus = () => {
    setBonuses([...bonuses, { name: '', value: '' }])
  }

  const updateBonus = (index: number, field: 'name' | 'value', value: string) => {
    const updated = [...bonuses]
    updated[index][field] = value
    setBonuses(updated)
  }

  const removeBonus = (index: number) => {
    setBonuses(bonuses.filter((_, i) => i !== index))
  }

  const calculateTotalValue = () => {
    const stackTotal = valueStack.reduce((sum, item) => {
      const val = parseFloat(item.value.replace(/[^0-9.]/g, '')) || 0
      return sum + val
    }, 0)
    const bonusTotal = bonuses.reduce((sum, bonus) => {
      const val = parseFloat(bonus.value.replace(/[^0-9.]/g, '')) || 0
      return sum + val
    }, 0)
    return stackTotal + bonusTotal
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Offer Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Offer Name *</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="e.g., 7-Figure Consultant Blueprint"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Offer Type</Label>
              <Select
                value={watch('offerType')}
                onValueChange={(value) => setValue('offerType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {OFFER_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              {...register('headline')}
              placeholder="The compelling headline for your offer"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe what's included in this offer..."
              rows={3}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">
                <DollarSign className="h-4 w-4 inline mr-1" />
                Price
              </Label>
              <Input
                id="price"
                {...register('price')}
                placeholder="$997"
              />
            </div>
            <div className="space-y-2">
              <Label>Total Value</Label>
              <div className="flex items-center gap-2">
                <Input
                  {...register('totalValue')}
                  placeholder="$4,997"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setValue('totalValue', `$${calculateTotalValue().toLocaleString()}`)}
                >
                  Calculate
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Value Stack
          </CardTitle>
          <CardDescription>
            List everything included and its perceived value
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {valueStack.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={item.name}
                onChange={(e) => updateValueStackItem(index, 'name', e.target.value)}
                placeholder="Item name"
                className="flex-1"
              />
              <Input
                value={item.value}
                onChange={(e) => updateValueStackItem(index, 'value', e.target.value)}
                placeholder="$Value"
                className="w-28"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeValueStackItem(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addValueStackItem}>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Bonuses
          </CardTitle>
          <CardDescription>
            Additional bonuses to increase perceived value
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {bonuses.map((bonus, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={bonus.name}
                onChange={(e) => updateBonus(index, 'name', e.target.value)}
                placeholder="Bonus name"
                className="flex-1"
              />
              <Input
                value={bonus.value}
                onChange={(e) => updateBonus(index, 'value', e.target.value)}
                placeholder="$Value"
                className="w-28"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeBonus(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addBonus}>
            <Plus className="mr-2 h-4 w-4" />
            Add Bonus
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Guarantee
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Guarantee Type</Label>
            <Select
              value={watch('guaranteeType')}
              onValueChange={(value) => setValue('guaranteeType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select guarantee" />
              </SelectTrigger>
              <SelectContent>
                {GUARANTEE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="guaranteeDetails">Guarantee Details</Label>
            <Textarea
              id="guaranteeDetails"
              {...register('guaranteeDetails')}
              placeholder="e.g., 30-day money-back guarantee, no questions asked"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Urgency & Scarcity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Urgency Type</Label>
            <Select
              value={watch('urgencyType')}
              onValueChange={(value) => setValue('urgencyType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select urgency" />
              </SelectTrigger>
              <SelectContent>
                {URGENCY_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="urgencyDetails">Urgency Details</Label>
            <Input
              id="urgencyDetails"
              {...register('urgencyDetails')}
              placeholder="e.g., Only 10 spots available"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transformation Promise</CardTitle>
          <CardDescription>
            The before and after state your offer delivers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="beforeState">Before State</Label>
              <Textarea
                id="beforeState"
                {...register('beforeState')}
                placeholder="Where they are now (pain, frustration)..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="afterState">After State</Label>
              <Textarea
                id="afterState"
                {...register('afterState')}
                placeholder="Where they'll be after (results, transformation)..."
                rows={3}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeframe">Timeframe</Label>
            <Input
              id="timeframe"
              {...register('timeframe')}
              placeholder="e.g., In just 90 days"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-4 w-4" />
          {offer ? 'Update Offer' : 'Create Offer'}
        </Button>
      </div>
    </form>
  )
}
