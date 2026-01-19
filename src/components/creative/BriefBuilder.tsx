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
import { 
  Palette, 
  Video, 
  Image, 
  LayoutGrid,
  Plus, 
  X, 
  Save, 
  Loader2,
  FileText,
  Music,
  Type
} from 'lucide-react'
import { AD_FORMATS } from '@/lib/constants'
import type { CreativeBrief, SceneBreakdownItem, CarouselSlide } from '@/types'

const briefSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  formatType: z.string().optional(),
  objective: z.string().optional(),
  targetAudience: z.string().optional(),
  hookConcept: z.string().optional(),
  hookTextOverlay: z.string().optional(),
  bodyConcept: z.string().optional(),
  ctaConcept: z.string().optional(),
  visualStyle: z.string().optional(),
  typographyNotes: z.string().optional(),
  videoLength: z.string().optional(),
  musicStyle: z.string().optional(),
  dimensions: z.string().optional(),
  fileFormat: z.string().optional(),
  referenceNotes: z.string().optional(),
  designerNotes: z.string().optional(),
})

type BriefFormData = z.infer<typeof briefSchema>

const VISUAL_STYLES = [
  { value: 'professional', label: 'Professional/Corporate' },
  { value: 'casual', label: 'Casual/Friendly' },
  { value: 'bold', label: 'Bold/High Energy' },
  { value: 'minimal', label: 'Minimal/Clean' },
  { value: 'ugc', label: 'UGC Style' },
  { value: 'luxury', label: 'Luxury/Premium' },
  { value: 'playful', label: 'Playful/Fun' },
]

const VIDEO_LENGTHS = [
  { value: '15', label: '15 seconds' },
  { value: '30', label: '30 seconds' },
  { value: '60', label: '60 seconds' },
  { value: '90', label: '90 seconds' },
  { value: '120', label: '2 minutes' },
]

const DIMENSIONS = [
  { value: '1:1', label: '1:1 (Square)' },
  { value: '4:5', label: '4:5 (Feed)' },
  { value: '9:16', label: '9:16 (Stories/Reels)' },
  { value: '16:9', label: '16:9 (Landscape)' },
]

interface BriefBuilderProps {
  brief?: CreativeBrief
  onSave: (data: Partial<CreativeBrief>) => Promise<void>
  onCancel: () => void
}

export function BriefBuilder({ brief, onSave, onCancel }: BriefBuilderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [colorPalette, setColorPalette] = useState<string[]>(brief?.colorPalette || [])
  const [referenceLinks, setReferenceLinks] = useState<string[]>(brief?.referenceLinks || [])
  const [scenes, setScenes] = useState<SceneBreakdownItem[]>(brief?.sceneBreakdown || [])
  const [carouselSlides, setCarouselSlides] = useState<CarouselSlide[]>(brief?.carouselSlides || [])

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<BriefFormData>({
    resolver: zodResolver(briefSchema),
    defaultValues: {
      name: brief?.name || '',
      formatType: brief?.formatType || 'video',
      objective: brief?.objective || '',
      targetAudience: brief?.targetAudience || '',
      hookConcept: brief?.hookConcept || '',
      hookTextOverlay: brief?.hookTextOverlay || '',
      bodyConcept: brief?.bodyConcept || '',
      ctaConcept: brief?.ctaConcept || '',
      visualStyle: brief?.visualStyle || '',
      typographyNotes: brief?.typographyNotes || '',
      videoLength: brief?.videoLength || '30',
      musicStyle: brief?.musicStyle || '',
      dimensions: brief?.dimensions || '4:5',
      fileFormat: brief?.fileFormat || '',
      referenceNotes: brief?.referenceNotes || '',
      designerNotes: brief?.designerNotes || '',
    },
  })

  const formatType = watch('formatType')

  const onSubmit = async (data: BriefFormData) => {
    setIsLoading(true)
    try {
      await onSave({
        ...data,
        colorPalette,
        referenceLinks,
        sceneBreakdown: scenes,
        carouselSlides,
        status: 'draft',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addScene = () => {
    setScenes([...scenes, {
      sceneNumber: scenes.length + 1,
      duration: '3s',
      description: '',
      textOverlay: '',
      visualNotes: '',
    }])
  }

  const updateScene = (index: number, field: keyof SceneBreakdownItem, value: string | number) => {
    const updated = [...scenes]
    updated[index] = { ...updated[index], [field]: value }
    setScenes(updated)
  }

  const removeScene = (index: number) => {
    setScenes(scenes.filter((_, i) => i !== index).map((s, i) => ({ ...s, sceneNumber: i + 1 })))
  }

  const addCarouselSlide = () => {
    setCarouselSlides([...carouselSlides, {
      slideNumber: carouselSlides.length + 1,
      headline: '',
      description: '',
      visualNotes: '',
    }])
  }

  const updateCarouselSlide = (index: number, field: keyof CarouselSlide, value: string | number) => {
    const updated = [...carouselSlides]
    updated[index] = { ...updated[index], [field]: value }
    setCarouselSlides(updated)
  }

  const removeCarouselSlide = (index: number) => {
    setCarouselSlides(carouselSlides.filter((_, i) => i !== index).map((s, i) => ({ ...s, slideNumber: i + 1 })))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basics">
            <FileText className="h-4 w-4 mr-1" />
            Basics
          </TabsTrigger>
          <TabsTrigger value="creative">
            <Palette className="h-4 w-4 mr-1" />
            Creative
          </TabsTrigger>
          <TabsTrigger value="content">
            {formatType === 'video' ? <Video className="h-4 w-4 mr-1" /> : <LayoutGrid className="h-4 w-4 mr-1" />}
            Content
          </TabsTrigger>
          <TabsTrigger value="specs">
            <Image className="h-4 w-4 mr-1" />
            Specs
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[500px] mt-4">
          <TabsContent value="basics" className="space-y-4 pr-4">
            <Card>
              <CardHeader>
                <CardTitle>Brief Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Brief Name *</Label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder="e.g., Lead Magnet Video Ad"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Format Type</Label>
                    <Select
                      value={watch('formatType')}
                      onValueChange={(value) => setValue('formatType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {AD_FORMATS.map((format) => (
                          <SelectItem key={format.value} value={format.value}>
                            {format.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objective">Objective</Label>
                  <Input
                    id="objective"
                    {...register('objective')}
                    placeholder="What should this creative achieve?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Textarea
                    id="targetAudience"
                    {...register('targetAudience')}
                    placeholder="Describe who this creative is for..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hook & CTA</CardTitle>
                <CardDescription>The attention-grabbing elements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hookConcept">Hook Concept</Label>
                  <Textarea
                    id="hookConcept"
                    {...register('hookConcept')}
                    placeholder="What's the attention-grabbing element in the first 3 seconds?"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hookTextOverlay">Hook Text Overlay</Label>
                  <Input
                    id="hookTextOverlay"
                    {...register('hookTextOverlay')}
                    placeholder="Text to display in the first 3 seconds"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctaConcept">CTA Concept</Label>
                  <Input
                    id="ctaConcept"
                    {...register('ctaConcept')}
                    placeholder="What action should viewers take?"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="creative" className="space-y-4 pr-4">
            <Card>
              <CardHeader>
                <CardTitle>Visual Style</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Style</Label>
                  <Select
                    value={watch('visualStyle')}
                    onValueChange={(value) => setValue('visualStyle', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      {VISUAL_STYLES.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Color Palette</Label>
                  <div className="flex flex-wrap gap-2">
                    {colorPalette.map((color, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: color }}
                        />
                        <Input
                          value={color}
                          onChange={(e) => {
                            const updated = [...colorPalette]
                            updated[index] = e.target.value
                            setColorPalette(updated)
                          }}
                          className="w-24 h-8 text-xs"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setColorPalette(colorPalette.filter((_, i) => i !== index))}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setColorPalette([...colorPalette, '#000000'])}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="typographyNotes">
                    <Type className="h-4 w-4 inline mr-1" />
                    Typography Notes
                  </Label>
                  <Textarea
                    id="typographyNotes"
                    {...register('typographyNotes')}
                    placeholder="Font preferences, text styling..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>References</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Reference Links</Label>
                  {referenceLinks.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={link}
                        onChange={(e) => {
                          const updated = [...referenceLinks]
                          updated[index] = e.target.value
                          setReferenceLinks(updated)
                        }}
                        placeholder="https://..."
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setReferenceLinks(referenceLinks.filter((_, i) => i !== index))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setReferenceLinks([...referenceLinks, ''])}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Reference
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referenceNotes">Reference Notes</Label>
                  <Textarea
                    id="referenceNotes"
                    {...register('referenceNotes')}
                    placeholder="What to take from the references..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4 pr-4">
            {(formatType === 'video' || formatType === 'reels' || formatType === 'stories') && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="h-5 w-5" />
                      Scene Breakdown
                    </CardTitle>
                    <CardDescription>Plan each scene of your video</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {scenes.map((scene, index) => (
                      <div key={index} className="rounded-lg border p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge>Scene {scene.sceneNumber}</Badge>
                          <div className="flex items-center gap-2">
                            <Input
                              value={scene.duration}
                              onChange={(e) => updateScene(index, 'duration', e.target.value)}
                              placeholder="3s"
                              className="w-16 h-8 text-xs"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeScene(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Textarea
                          value={scene.description}
                          onChange={(e) => updateScene(index, 'description', e.target.value)}
                          placeholder="What happens in this scene..."
                          rows={2}
                        />
                        <div className="grid gap-2 md:grid-cols-2">
                          <Input
                            value={scene.textOverlay || ''}
                            onChange={(e) => updateScene(index, 'textOverlay', e.target.value)}
                            placeholder="Text overlay"
                          />
                          <Input
                            value={scene.visualNotes || ''}
                            onChange={(e) => updateScene(index, 'visualNotes', e.target.value)}
                            placeholder="Visual notes"
                          />
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addScene}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Scene
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Music className="h-5 w-5" />
                      Audio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor="musicStyle">Music Style</Label>
                      <Input
                        id="musicStyle"
                        {...register('musicStyle')}
                        placeholder="e.g., Upbeat, motivational, corporate"
                      />
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {formatType === 'carousel' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LayoutGrid className="h-5 w-5" />
                    Carousel Slides
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {carouselSlides.map((slide, index) => (
                    <div key={index} className="rounded-lg border p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge>Slide {slide.slideNumber}</Badge>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCarouselSlide(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input
                        value={slide.headline || ''}
                        onChange={(e) => updateCarouselSlide(index, 'headline', e.target.value)}
                        placeholder="Slide headline"
                      />
                      <Textarea
                        value={slide.description || ''}
                        onChange={(e) => updateCarouselSlide(index, 'description', e.target.value)}
                        placeholder="Slide description/content"
                        rows={2}
                      />
                      <Input
                        value={slide.visualNotes || ''}
                        onChange={(e) => updateCarouselSlide(index, 'visualNotes', e.target.value)}
                        placeholder="Visual notes for this slide"
                      />
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addCarouselSlide}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Slide
                  </Button>
                </CardContent>
              </Card>
            )}

            {formatType === 'single_image' && (
              <Card>
                <CardHeader>
                  <CardTitle>Image Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bodyConcept">Main Visual Concept</Label>
                    <Textarea
                      id="bodyConcept"
                      {...register('bodyConcept')}
                      placeholder="Describe the main visual..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="specs" className="space-y-4 pr-4">
            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Dimensions</Label>
                    <Select
                      value={watch('dimensions')}
                      onValueChange={(value) => setValue('dimensions', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DIMENSIONS.map((dim) => (
                          <SelectItem key={dim.value} value={dim.value}>
                            {dim.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {(formatType === 'video' || formatType === 'reels' || formatType === 'stories') && (
                    <div className="space-y-2">
                      <Label>Video Length</Label>
                      <Select
                        value={watch('videoLength')}
                        onValueChange={(value) => setValue('videoLength', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {VIDEO_LENGTHS.map((len) => (
                            <SelectItem key={len.value} value={len.value}>
                              {len.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fileFormat">File Format Notes</Label>
                  <Input
                    id="fileFormat"
                    {...register('fileFormat')}
                    placeholder="e.g., MP4, H.264, PNG with transparency"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Designer Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  {...register('designerNotes')}
                  placeholder="Any additional instructions for the designer..."
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
          {brief ? 'Update Brief' : 'Create Brief'}
        </Button>
      </div>
    </form>
  )
}
