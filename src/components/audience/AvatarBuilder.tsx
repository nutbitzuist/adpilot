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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  User, 
  Briefcase, 
  Target, 
  MessageSquare, 
  BookOpen,
  ShoppingCart,
  Plus,
  X,
  Save,
  Loader2
} from 'lucide-react'
import { INDUSTRIES, GENDER_OPTIONS, INCOME_LEVELS, EDUCATION_LEVELS, COMPANY_SIZES } from '@/lib/constants'
import type { CustomerAvatar } from '@/types'

const avatarSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  ageRangeStart: z.number().min(18).max(100).optional(),
  ageRangeEnd: z.number().min(18).max(100).optional(),
  gender: z.string().optional(),
  location: z.string().optional(),
  incomeLevel: z.string().optional(),
  education: z.string().optional(),
  jobTitle: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  dailyRoutine: z.string().optional(),
  decisionMakingProcess: z.string().optional(),
  isPrimary: z.boolean().default(false),
})

type AvatarFormData = z.infer<typeof avatarSchema>

interface AvatarBuilderProps {
  avatar?: CustomerAvatar
  onSave: (data: Partial<CustomerAvatar>) => Promise<void>
  onCancel: () => void
}

export function AvatarBuilder({ avatar, onSave, onCancel }: AvatarBuilderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [goals, setGoals] = useState<string[]>(avatar?.goals || [])
  const [frustrations, setFrustrations] = useState<string[]>(avatar?.frustrations || [])
  const [fears, setFears] = useState<string[]>(avatar?.fears || [])
  const [desires, setDesires] = useState<string[]>(avatar?.desires || [])
  const [objections, setObjections] = useState<string[]>(avatar?.objections || [])
  const [whereTheyHangOut, setWhereTheyHangOut] = useState<string[]>(avatar?.whereTheyHangOut || [])
  const [influencers, setInfluencers] = useState<string[]>(avatar?.influencersTheyFollow || [])
  const [booksPodcasts, setBooksPodcasts] = useState<string[]>(avatar?.booksPodcasts || [])
  const [buyingTriggers, setBuyingTriggers] = useState<string[]>(avatar?.buyingTriggers || [])
  const [phrasesTheyUse, setPhrasesTheyUse] = useState<string[]>(avatar?.phrasesTheyUse || [])
  const [painPointLanguage, setPainPointLanguage] = useState<string[]>(avatar?.painPointLanguage || [])

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<AvatarFormData>({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      name: avatar?.name || '',
      ageRangeStart: avatar?.ageRangeStart,
      ageRangeEnd: avatar?.ageRangeEnd,
      gender: avatar?.gender,
      location: avatar?.location,
      incomeLevel: avatar?.incomeLevel,
      education: avatar?.education,
      jobTitle: avatar?.jobTitle,
      industry: avatar?.industry,
      companySize: avatar?.companySize,
      dailyRoutine: avatar?.dailyRoutine,
      decisionMakingProcess: avatar?.decisionMakingProcess,
      isPrimary: avatar?.isPrimary || false,
    },
  })

  const onSubmit = async (data: AvatarFormData) => {
    setIsLoading(true)
    try {
      await onSave({
        ...data,
        goals,
        frustrations,
        fears,
        desires,
        objections,
        whereTheyHangOut,
        influencersTheyFollow: influencers,
        booksPodcasts,
        buyingTriggers,
        phrasesTheyUse,
        painPointLanguage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="demographics" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="demographics" className="text-xs sm:text-sm">
            <User className="h-4 w-4 mr-1 hidden sm:inline" />
            Demographics
          </TabsTrigger>
          <TabsTrigger value="professional" className="text-xs sm:text-sm">
            <Briefcase className="h-4 w-4 mr-1 hidden sm:inline" />
            Professional
          </TabsTrigger>
          <TabsTrigger value="psychographics" className="text-xs sm:text-sm">
            <Target className="h-4 w-4 mr-1 hidden sm:inline" />
            Psychographics
          </TabsTrigger>
          <TabsTrigger value="behavior" className="text-xs sm:text-sm">
            <BookOpen className="h-4 w-4 mr-1 hidden sm:inline" />
            Behavior
          </TabsTrigger>
          <TabsTrigger value="language" className="text-xs sm:text-sm">
            <MessageSquare className="h-4 w-4 mr-1 hidden sm:inline" />
            Language
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[500px] mt-4">
          <TabsContent value="demographics" className="space-y-4 pr-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Define who your ideal customer is</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Avatar Name *</Label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder="e.g., Ambitious Consultant"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="isPrimary"
                      {...register('isPrimary')}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="isPrimary">Set as primary avatar</Label>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Age Range</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        {...register('ageRangeStart', { valueAsNumber: true })}
                        placeholder="25"
                        className="w-20"
                      />
                      <span>to</span>
                      <Input
                        type="number"
                        {...register('ageRangeEnd', { valueAsNumber: true })}
                        placeholder="55"
                        className="w-20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select
                      value={watch('gender')}
                      onValueChange={(value) => setValue('gender', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {GENDER_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      {...register('location')}
                      placeholder="e.g., United States"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Income Level</Label>
                    <Select
                      value={watch('incomeLevel')}
                      onValueChange={(value) => setValue('incomeLevel', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select income level" />
                      </SelectTrigger>
                      <SelectContent>
                        {INCOME_LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Education</Label>
                    <Select
                      value={watch('education')}
                      onValueChange={(value) => setValue('education', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select education" />
                      </SelectTrigger>
                      <SelectContent>
                        {EDUCATION_LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professional" className="space-y-4 pr-4">
            <Card>
              <CardHeader>
                <CardTitle>Professional Profile</CardTitle>
                <CardDescription>Their work and business context</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input
                      {...register('jobTitle')}
                      placeholder="e.g., Business Consultant"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Industry</Label>
                    <Select
                      value={watch('industry')}
                      onValueChange={(value) => setValue('industry', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map((industry) => (
                          <SelectItem key={industry} value={industry.toLowerCase()}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Company Size</Label>
                  <Select
                    value={watch('companySize')}
                    onValueChange={(value) => setValue('companySize', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMPANY_SIZES.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Daily Routine</Label>
                  <Textarea
                    {...register('dailyRoutine')}
                    placeholder="Describe a typical day in their life..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Decision Making Process</Label>
                  <Textarea
                    {...register('decisionMakingProcess')}
                    placeholder="How do they make purchasing decisions?"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="psychographics" className="space-y-4 pr-4">
            <Card>
              <CardHeader>
                <CardTitle>Goals & Motivations</CardTitle>
                <CardDescription>What drives them forward</CardDescription>
              </CardHeader>
              <CardContent>
                <TagInput
                  label="Goals"
                  placeholder="Add a goal..."
                  tags={goals}
                  onTagsChange={setGoals}
                  suggestions={['Scale to 7 figures', 'Build a team', 'Work less hours', 'More freedom', 'Financial security']}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Desires</CardTitle>
                <CardDescription>What they truly want</CardDescription>
              </CardHeader>
              <CardContent>
                <TagInput
                  label="Desires"
                  placeholder="Add a desire..."
                  tags={desires}
                  onTagsChange={setDesires}
                  suggestions={['Financial freedom', 'Recognition', 'Impact', 'Legacy', 'Lifestyle']}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frustrations & Pain Points</CardTitle>
                <CardDescription>What keeps them up at night</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <TagInput
                  label="Frustrations"
                  placeholder="Add a frustration..."
                  tags={frustrations}
                  onTagsChange={setFrustrations}
                  suggestions={['Inconsistent leads', 'Feast or famine', 'No systems', 'Overwhelmed', 'Stuck']}
                />
                <TagInput
                  label="Fears"
                  placeholder="Add a fear..."
                  tags={fears}
                  onTagsChange={setFears}
                  suggestions={['Failure', 'Missing out', 'Burnout', 'Staying stuck', 'Wasting money']}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Objections</CardTitle>
                <CardDescription>Why they might not buy</CardDescription>
              </CardHeader>
              <CardContent>
                <TagInput
                  label="Common Objections"
                  placeholder="Add an objection..."
                  tags={objections}
                  onTagsChange={setObjections}
                  suggestions={['Too expensive', 'No time', 'Tried before', 'Need to think', 'Ask spouse']}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-4 pr-4">
            <Card>
              <CardHeader>
                <CardTitle>Where They Hang Out</CardTitle>
                <CardDescription>Online and offline locations</CardDescription>
              </CardHeader>
              <CardContent>
                <TagInput
                  label="Platforms & Places"
                  placeholder="Add a location..."
                  tags={whereTheyHangOut}
                  onTagsChange={setWhereTheyHangOut}
                  suggestions={['LinkedIn', 'Facebook Groups', 'Podcasts', 'YouTube', 'Conferences', 'Masterminds']}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Influencers They Follow</CardTitle>
                <CardDescription>Thought leaders they trust</CardDescription>
              </CardHeader>
              <CardContent>
                <TagInput
                  label="Influencers"
                  placeholder="Add an influencer..."
                  tags={influencers}
                  onTagsChange={setInfluencers}
                  suggestions={['Tony Robbins', 'Gary Vee', 'Russell Brunson', 'Grant Cardone', 'Alex Hormozi']}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Books & Podcasts</CardTitle>
                <CardDescription>Content they consume</CardDescription>
              </CardHeader>
              <CardContent>
                <TagInput
                  label="Books & Podcasts"
                  placeholder="Add a book or podcast..."
                  tags={booksPodcasts}
                  onTagsChange={setBooksPodcasts}
                  suggestions={['$100M Offers', 'Expert Secrets', 'Building a StoryBrand', 'The 4-Hour Workweek']}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Buying Triggers</CardTitle>
                <CardDescription>What makes them ready to buy</CardDescription>
              </CardHeader>
              <CardContent>
                <TagInput
                  label="Triggers"
                  placeholder="Add a trigger..."
                  tags={buyingTriggers}
                  onTagsChange={setBuyingTriggers}
                  suggestions={['Lost a client', 'Hit a plateau', 'Competitor success', 'New year', 'Life event']}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="language" className="space-y-4 pr-4">
            <Card>
              <CardHeader>
                <CardTitle>Phrases They Use</CardTitle>
                <CardDescription>How they describe their situation</CardDescription>
              </CardHeader>
              <CardContent>
                <TagInput
                  label="Common Phrases"
                  placeholder="Add a phrase..."
                  tags={phrasesTheyUse}
                  onTagsChange={setPhrasesTheyUse}
                  suggestions={['Scale my business', 'Get more clients', 'Systemize', 'Work ON not IN', 'Next level']}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pain Point Language</CardTitle>
                <CardDescription>Words they use to describe problems</CardDescription>
              </CardHeader>
              <CardContent>
                <TagInput
                  label="Pain Language"
                  placeholder="Add pain language..."
                  tags={painPointLanguage}
                  onTagsChange={setPainPointLanguage}
                  suggestions={['Feast or famine', 'Trading time for money', 'Stuck', 'Overwhelmed', 'Spinning wheels']}
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
          {avatar ? 'Update Avatar' : 'Create Avatar'}
        </Button>
      </div>
    </form>
  )
}

interface TagInputProps {
  label: string
  placeholder: string
  tags: string[]
  onTagsChange: (tags: string[]) => void
  suggestions?: string[]
}

function TagInput({ label, placeholder, tags, onTagsChange, suggestions = [] }: TagInputProps) {
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag(inputValue)
    }
  }

  const unusedSuggestions = suggestions.filter((s) => !tags.includes(s))

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button type="button" variant="outline" onClick={() => addTag(inputValue)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="gap-1">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      {unusedSuggestions.length > 0 && (
        <div className="mt-2">
          <p className="text-xs text-muted-foreground mb-1">Suggestions:</p>
          <div className="flex flex-wrap gap-1">
            {unusedSuggestions.slice(0, 5).map((suggestion) => (
              <Badge
                key={suggestion}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => addTag(suggestion)}
              >
                <Plus className="h-3 w-3 mr-1" />
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
