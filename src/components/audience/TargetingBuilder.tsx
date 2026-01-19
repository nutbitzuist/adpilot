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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Target, 
  Users, 
  Globe, 
  Sparkles,
  Plus,
  X,
  Save,
  Loader2,
  Search
} from 'lucide-react'
import { 
  CONSULTING_INTERESTS, 
  BEHAVIOR_SUGGESTIONS, 
  LOOKALIKE_SUGGESTIONS,
  EXCLUSION_SUGGESTIONS 
} from '@/data/targeting-suggestions'
import type { TargetingStrategy, CustomerAvatar } from '@/types'

const targetingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  ageMin: z.number().min(18).max(65).optional(),
  ageMax: z.number().min(18).max(65).optional(),
  layeringNotes: z.string().optional(),
  estimatedAudienceSize: z.string().optional(),
})

type TargetingFormData = z.infer<typeof targetingSchema>

interface TargetingBuilderProps {
  strategy?: TargetingStrategy
  avatar?: CustomerAvatar
  onSave: (data: Partial<TargetingStrategy>) => Promise<void>
  onCancel: () => void
}

export function TargetingBuilder({ strategy, avatar, onSave, onCancel }: TargetingBuilderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [interests, setInterests] = useState<string[]>(strategy?.interests || [])
  const [behaviors, setBehaviors] = useState<string[]>(strategy?.behaviors || [])
  const [genders, setGenders] = useState<string[]>(strategy?.genders || ['all'])
  const [locations, setLocations] = useState<string[]>(strategy?.locations || ['United States'])
  const [languages, setLanguages] = useState<string[]>(strategy?.languages || ['English'])
  const [customAudiences, setCustomAudiences] = useState<string[]>(strategy?.customAudiences || [])
  const [lookalikesSources, setLookalikesSources] = useState<string[]>(strategy?.lookalikesSources || [])
  const [exclusions, setExclusions] = useState<string[]>(strategy?.exclusions || [])
  const [interestSearch, setInterestSearch] = useState('')

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<TargetingFormData>({
    resolver: zodResolver(targetingSchema),
    defaultValues: {
      name: strategy?.name || (avatar ? `${avatar.name} - Cold Audience` : ''),
      ageMin: strategy?.ageMin || avatar?.ageRangeStart || 25,
      ageMax: strategy?.ageMax || avatar?.ageRangeEnd || 55,
      layeringNotes: strategy?.layeringNotes || '',
      estimatedAudienceSize: strategy?.estimatedAudienceSize || '',
    },
  })

  const onSubmit = async (data: TargetingFormData) => {
    setIsLoading(true)
    try {
      await onSave({
        ...data,
        avatarId: avatar?.id,
        interests,
        behaviors,
        genders,
        locations,
        languages,
        customAudiences,
        lookalikesSources,
        exclusions,
        status: 'active',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredInterests = CONSULTING_INTERESTS.filter(
    (i) => i.name.toLowerCase().includes(interestSearch.toLowerCase()) && !interests.includes(i.name)
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Strategy Name *</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="e.g., Consultant Cold Audience"
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Estimated Audience Size</Label>
          <Select
            value={watch('estimatedAudienceSize')}
            onValueChange={(value) => setValue('estimatedAudienceSize', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="< 100K">Less than 100K</SelectItem>
              <SelectItem value="100K - 500K">100K - 500K</SelectItem>
              <SelectItem value="500K - 1M">500K - 1M</SelectItem>
              <SelectItem value="1M - 5M">1M - 5M</SelectItem>
              <SelectItem value="5M - 10M">5M - 10M</SelectItem>
              <SelectItem value="> 10M">More than 10M</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="interests" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="interests">
            <Sparkles className="h-4 w-4 mr-1" />
            Interests
          </TabsTrigger>
          <TabsTrigger value="demographics">
            <Users className="h-4 w-4 mr-1" />
            Demographics
          </TabsTrigger>
          <TabsTrigger value="audiences">
            <Target className="h-4 w-4 mr-1" />
            Audiences
          </TabsTrigger>
          <TabsTrigger value="exclusions">
            <X className="h-4 w-4 mr-1" />
            Exclusions
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[400px] mt-4">
          <TabsContent value="interests" className="space-y-4 pr-4">
            <Card>
              <CardHeader>
                <CardTitle>Interest Targeting</CardTitle>
                <CardDescription>
                  Select interests that match your ideal customer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={interestSearch}
                    onChange={(e) => setInterestSearch(e.target.value)}
                    placeholder="Search interests..."
                    className="pl-10"
                  />
                </div>

                {interests.length > 0 && (
                  <div>
                    <Label className="text-sm">Selected Interests ({interests.length})</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {interests.map((interest, index) => (
                        <Badge key={index} variant="default" className="gap-1">
                          {interest}
                          <button
                            type="button"
                            onClick={() => setInterests(interests.filter((_, i) => i !== index))}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Separator />

                <div>
                  <Label className="text-sm">Available Interests</Label>
                  <div className="grid gap-2 mt-2 max-h-48 overflow-y-auto">
                    {filteredInterests.slice(0, 20).map((interest) => (
                      <div
                        key={interest.name}
                        className="flex items-center justify-between p-2 rounded-lg border hover:bg-muted/50 cursor-pointer"
                        onClick={() => setInterests([...interests, interest.name])}
                      >
                        <div>
                          <p className="text-sm font-medium">{interest.name}</p>
                          <p className="text-xs text-muted-foreground">{interest.category}</p>
                        </div>
                        <Button type="button" variant="ghost" size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Behaviors</CardTitle>
                <CardDescription>Target based on user behaviors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {behaviors.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {behaviors.map((behavior, index) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                          {behavior}
                          <button
                            type="button"
                            onClick={() => setBehaviors(behaviors.filter((_, i) => i !== index))}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {BEHAVIOR_SUGGESTIONS.filter((b) => !behaviors.includes(b.name)).map((behavior) => (
                      <Badge
                        key={behavior.name}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => setBehaviors([...behaviors, behavior.name])}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        {behavior.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-4 pr-4">
            <Card>
              <CardHeader>
                <CardTitle>Age Range</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="space-y-2">
                    <Label>Min Age</Label>
                    <Input
                      type="number"
                      {...register('ageMin', { valueAsNumber: true })}
                      className="w-24"
                    />
                  </div>
                  <span className="pt-6">to</span>
                  <div className="space-y-2">
                    <Label>Max Age</Label>
                    <Input
                      type="number"
                      {...register('ageMax', { valueAsNumber: true })}
                      className="w-24"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gender</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {['all', 'male', 'female'].map((gender) => (
                    <Badge
                      key={gender}
                      variant={genders.includes(gender) ? 'default' : 'outline'}
                      className="cursor-pointer capitalize"
                      onClick={() => {
                        if (gender === 'all') {
                          setGenders(['all'])
                        } else {
                          const newGenders = genders.filter((g) => g !== 'all')
                          if (newGenders.includes(gender)) {
                            setGenders(newGenders.filter((g) => g !== gender))
                          } else {
                            setGenders([...newGenders, gender])
                          }
                        }
                      }}
                    >
                      {gender}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <Globe className="h-4 w-4 inline mr-2" />
                  Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TagInputSimple
                  tags={locations}
                  onTagsChange={setLocations}
                  placeholder="Add location..."
                  suggestions={['United States', 'Canada', 'United Kingdom', 'Australia']}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <TagInputSimple
                  tags={languages}
                  onTagsChange={setLanguages}
                  placeholder="Add language..."
                  suggestions={['English', 'Spanish', 'French', 'German']}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audiences" className="space-y-4 pr-4">
            <Card>
              <CardHeader>
                <CardTitle>Custom Audiences</CardTitle>
                <CardDescription>Your uploaded audience lists</CardDescription>
              </CardHeader>
              <CardContent>
                <TagInputSimple
                  tags={customAudiences}
                  onTagsChange={setCustomAudiences}
                  placeholder="Add custom audience..."
                  suggestions={['Email List', 'Website Visitors', 'App Users', 'Customer List']}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lookalike Sources</CardTitle>
                <CardDescription>Create lookalikes from these sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lookalikesSources.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {lookalikesSources.map((source, index) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                          {source}
                          <button
                            type="button"
                            onClick={() => setLookalikesSources(lookalikesSources.filter((_, i) => i !== index))}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {LOOKALIKE_SUGGESTIONS.filter((l) => !lookalikesSources.includes(l.name)).map((source) => (
                      <Badge
                        key={source.name}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => setLookalikesSources([...lookalikesSources, source.name])}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        {source.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exclusions" className="space-y-4 pr-4">
            <Card>
              <CardHeader>
                <CardTitle>Audience Exclusions</CardTitle>
                <CardDescription>Exclude these audiences from targeting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {exclusions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exclusions.map((exclusion, index) => (
                        <Badge key={index} variant="destructive" className="gap-1">
                          {exclusion}
                          <button
                            type="button"
                            onClick={() => setExclusions(exclusions.filter((_, i) => i !== index))}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {EXCLUSION_SUGGESTIONS.filter((e) => !exclusions.includes(e.name)).map((exclusion) => (
                      <Badge
                        key={exclusion.name}
                        variant="outline"
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => setExclusions([...exclusions, exclusion.name])}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        {exclusion.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Layering Notes</CardTitle>
                <CardDescription>Notes on how to layer these audiences</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  {...register('layeringNotes')}
                  placeholder="e.g., Layer interests with behaviors for higher quality..."
                  rows={4}
                />
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
          {strategy ? 'Update Strategy' : 'Create Strategy'}
        </Button>
      </div>
    </form>
  )
}

interface TagInputSimpleProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  placeholder: string
  suggestions?: string[]
}

function TagInputSimple({ tags, onTagsChange, placeholder, suggestions = [] }: TagInputSimpleProps) {
  const [inputValue, setInputValue] = useState('')

  const addTag = (tag: string) => {
    const trimmed = tag.trim()
    if (trimmed && !tags.includes(trimmed)) {
      onTagsChange([...tags, trimmed])
    }
    setInputValue('')
  }

  const removeTag = (index: number) => {
    onTagsChange(tags.filter((_, i) => i !== index))
  }

  const unusedSuggestions = suggestions.filter((s) => !tags.includes(s))

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTag(inputValue)
            }
          }}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button type="button" variant="outline" onClick={() => addTag(inputValue)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="gap-1">
              {tag}
              <button type="button" onClick={() => removeTag(index)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      {unusedSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {unusedSuggestions.map((suggestion) => (
            <Badge
              key={suggestion}
              variant="outline"
              className="cursor-pointer text-xs hover:bg-primary hover:text-primary-foreground"
              onClick={() => addTag(suggestion)}
            >
              <Plus className="h-3 w-3 mr-1" />
              {suggestion}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
