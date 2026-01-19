import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { FileImage, Video, LayoutGrid, Plus, Monitor, Grid3X3 } from 'lucide-react'
import { AD_FORMATS } from '@/lib/constants'
import { BriefBuilder } from '@/components/creative/BriefBuilder'
import { FormatRecommender } from '@/components/creative/FormatRecommender'
import { CreativeMatrix } from '@/components/creative/CreativeMatrix'
import type { CreativeBrief } from '@/types'

export default function Creative() {
  const [isBriefSheetOpen, setIsBriefSheetOpen] = useState(false)
  const [editingBrief, setEditingBrief] = useState<CreativeBrief | undefined>()
  const [briefs, setBriefs] = useState<CreativeBrief[]>([
    {
      id: '1',
      userId: 'demo',
      name: 'Webinar Promo Video',
      formatType: 'video',
      objective: 'Drive webinar registrations',
      status: 'draft',
      colorPalette: [],
      sceneBreakdown: [],
      carouselSlides: [],
      referenceLinks: [],
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      userId: 'demo',
      name: 'Lead Magnet Carousel',
      formatType: 'carousel',
      objective: 'Promote free guide download',
      status: 'completed',
      colorPalette: [],
      sceneBreakdown: [],
      carouselSlides: [],
      referenceLinks: [],
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ])

  const handleSaveBrief = async (data: Partial<CreativeBrief>) => {
    if (editingBrief) {
      setBriefs(briefs.map(b => b.id === editingBrief.id ? { ...b, ...data } as CreativeBrief : b))
    } else {
      const newBrief: CreativeBrief = {
        id: Date.now().toString(),
        userId: 'demo',
        colorPalette: [],
        sceneBreakdown: [],
        carouselSlides: [],
        referenceLinks: [],
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data,
      } as CreativeBrief
      setBriefs([newBrief, ...briefs])
    }
    setIsBriefSheetOpen(false)
    setEditingBrief(undefined)
  }

  const handleNewBrief = () => {
    setEditingBrief(undefined)
    setIsBriefSheetOpen(true)
  }

  const handleEditBrief = (brief: CreativeBrief) => {
    setEditingBrief(brief)
    setIsBriefSheetOpen(true)
  }

  const getFormatIcon = (format?: string) => {
    switch (format) {
      case 'video':
      case 'reels':
      case 'stories':
        return <Video className="h-4 w-4 text-primary" />
      case 'carousel':
        return <LayoutGrid className="h-4 w-4 text-primary" />
      default:
        return <FileImage className="h-4 w-4 text-primary" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    return `${diffDays} days ago`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Creative Studio</h1>
          <p className="text-muted-foreground">
            Create briefs for designers and plan your creative assets
          </p>
        </div>
        <Button onClick={handleNewBrief}>
          <Plus className="mr-2 h-4 w-4" />
          New Brief
        </Button>
      </div>

      <Tabs defaultValue="briefs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="briefs" className="gap-2">
            <FileImage className="h-4 w-4" />
            Briefs
          </TabsTrigger>
          <TabsTrigger value="matrix" className="gap-2">
            <Grid3X3 className="h-4 w-4" />
            Testing Matrix
          </TabsTrigger>
          <TabsTrigger value="recommender" className="gap-2">
            <Monitor className="h-4 w-4" />
            Format Recommender
          </TabsTrigger>
          <TabsTrigger value="formats" className="gap-2">
            <LayoutGrid className="h-4 w-4" />
            Format Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="briefs" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {briefs.length === 0 ? (
                <Card className="p-12 text-center">
                  <FileImage className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No briefs yet</h3>
                  <p className="mt-2 text-muted-foreground">
                    Create your first creative brief to get started.
                  </p>
                  <Button className="mt-4" onClick={handleNewBrief}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Brief
                  </Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  {briefs.map((brief) => (
                    <Card 
                      key={brief.id} 
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleEditBrief(brief)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="p-2 rounded-lg bg-primary/10">
                              {getFormatIcon(brief.formatType)}
                            </div>
                            <div>
                              <h4 className="font-semibold">{brief.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {brief.objective || 'No objective set'}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {brief.formatType || 'No format'}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  Created {formatDate(brief.createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Badge variant={brief.status === 'completed' ? 'default' : 'secondary'}>
                            {brief.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <p>Hook viewers in the first 3 seconds</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <p>Use text overlays for sound-off viewing</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <p>Keep videos under 30 seconds for best performance</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <p>Use 1:1 or 4:5 aspect ratio for feed</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">•</span>
                    <p>Include clear CTAs in every creative</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Best Practices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="rounded-lg bg-muted p-3">
                    <p className="font-medium">Video Ads</p>
                    <p className="text-muted-foreground text-xs mt-1">
                      15-30 seconds, vertical format, captions required
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="font-medium">Carousel Ads</p>
                    <p className="text-muted-foreground text-xs mt-1">
                      3-5 cards, consistent design, story flow
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="font-medium">Static Images</p>
                    <p className="text-muted-foreground text-xs mt-1">
                      Minimal text, bold visuals, clear CTA
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="matrix" className="space-y-6">
          <CreativeMatrix />
        </TabsContent>

        <TabsContent value="recommender" className="space-y-6">
          <FormatRecommender />
        </TabsContent>

        <TabsContent value="formats" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {AD_FORMATS.map((format) => (
              <Card key={format.value}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {format.value === 'video' ? (
                      <Video className="h-5 w-5 text-primary" />
                    ) : format.value === 'carousel' ? (
                      <LayoutGrid className="h-5 w-5 text-primary" />
                    ) : (
                      <FileImage className="h-5 w-5 text-primary" />
                    )}
                    {format.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Best For</p>
                    <p className="text-sm">
                      {format.value === 'video' && 'Storytelling, demonstrations, testimonials'}
                      {format.value === 'carousel' && 'Multiple benefits, step-by-step, product features'}
                      {format.value === 'single_image' && 'Simple messages, quick testing, retargeting'}
                      {format.value === 'stories' && 'Immersive, full-screen, time-sensitive offers'}
                      {format.value === 'reels' && 'Trending content, entertainment, reach'}
                      {format.value === 'collection' && 'E-commerce, product catalogs'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Specs</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">1:1</Badge>
                      <Badge variant="outline" className="text-xs">4:5</Badge>
                      <Badge variant="outline" className="text-xs">9:16</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Brief Builder Sheet */}
      <Sheet open={isBriefSheetOpen} onOpenChange={setIsBriefSheetOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingBrief ? 'Edit Brief' : 'Create Creative Brief'}</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <BriefBuilder
              brief={editingBrief}
              onSave={handleSaveBrief}
              onCancel={() => setIsBriefSheetOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
