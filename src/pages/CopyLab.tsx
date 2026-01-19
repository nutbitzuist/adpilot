import { useState } from 'react'
import { useOffers, useAdCopy } from '@/hooks/useCopy'
import { useAvatars } from '@/hooks/useAudiences'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Package, FileText, Sparkles, BarChart3, Star, Plus, Bookmark, Shield, Zap } from 'lucide-react'
import { OfferBuilder } from '@/components/copy/OfferBuilder'
import { CopyGenerator } from '@/components/copy/CopyGenerator'
import { CopyAnalyzer } from '@/components/copy/CopyAnalyzer'
import { SwipeFile } from '@/components/copy/SwipeFile'
import { HookLibrary } from '@/components/copy/HookLibrary'
import { ComplianceChecker } from '@/components/copy/ComplianceChecker'
import type { Offer, AdCopy } from '@/types'

export default function CopyLab() {
  const { offers, isLoading: offersLoading, createOffer } = useOffers()
  const { copies, isLoading: copiesLoading, createCopy } = useAdCopy()
  const { avatars } = useAvatars()
  const [isOfferSheetOpen, setIsOfferSheetOpen] = useState(false)
  const [editingOffer, setEditingOffer] = useState<Offer | undefined>()

  const handleSaveOffer = async (data: Partial<Offer>) => {
    await createOffer.mutateAsync(data)
    setIsOfferSheetOpen(false)
    setEditingOffer(undefined)
  }

  const handleSaveCopy = async (data: Partial<AdCopy>) => {
    await createCopy.mutateAsync(data)
  }

  const handleNewOffer = () => {
    setEditingOffer(undefined)
    setIsOfferSheetOpen(true)
  }

  const handleEditOffer = (offer: Offer) => {
    setEditingOffer(offer)
    setIsOfferSheetOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Copy Lab</h1>
        <p className="text-muted-foreground">
          Create compelling ad copy and manage your offers
        </p>
      </div>

      <Tabs defaultValue="generator" className="space-y-6">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="generator" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Generator
          </TabsTrigger>
          <TabsTrigger value="hooks" className="gap-2">
            <Zap className="h-4 w-4" />
            Hooks
          </TabsTrigger>
          <TabsTrigger value="swipe" className="gap-2">
            <Bookmark className="h-4 w-4" />
            Swipe File
          </TabsTrigger>
          <TabsTrigger value="compliance" className="gap-2">
            <Shield className="h-4 w-4" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="analyzer" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Analyzer
          </TabsTrigger>
          <TabsTrigger value="offers" className="gap-2">
            <Package className="h-4 w-4" />
            Offers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          <CopyGenerator 
            offers={offers} 
            avatars={avatars} 
            onSaveCopy={handleSaveCopy} 
          />
        </TabsContent>

        <TabsContent value="hooks" className="space-y-6">
          <HookLibrary />
        </TabsContent>

        <TabsContent value="swipe" className="space-y-6">
          <SwipeFile />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <ComplianceChecker />
        </TabsContent>

        <TabsContent value="analyzer" className="space-y-6">
          <CopyAnalyzer />
        </TabsContent>

        <TabsContent value="offers" className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={handleNewOffer}>
              <Plus className="mr-2 h-4 w-4" />
              New Offer
            </Button>
          </div>

          {offersLoading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="h-24 bg-muted" />
                  <CardContent className="h-40 bg-muted/50" />
                </Card>
              ))}
            </div>
          ) : offers.length === 0 ? (
            <Card className="p-12 text-center">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No offers yet</h3>
              <p className="mt-2 text-muted-foreground">
                Create your first offer to start generating targeted copy.
              </p>
              <Button className="mt-4" onClick={handleNewOffer}>
                <Plus className="mr-2 h-4 w-4" />
                Create Offer
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {offers.map((offer) => (
                <Card key={offer.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{offer.name}</CardTitle>
                        <CardDescription>{offer.offerType}</CardDescription>
                      </div>
                      <Badge variant={offer.status === 'active' ? 'default' : 'secondary'}>
                        {offer.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {offer.headline && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Headline</p>
                        <p className="text-sm">{offer.headline}</p>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Price</p>
                        <p className="text-lg font-bold">{offer.price || '-'}</p>
                      </div>
                      {offer.totalValue && (
                        <div className="text-right">
                          <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                          <p className="text-lg font-bold text-primary">{offer.totalValue}</p>
                        </div>
                      )}
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => handleEditOffer(offer)}>
                      Edit Offer
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          {copiesLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ) : copies.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No saved copy yet</h3>
              <p className="mt-2 text-muted-foreground">
                Your saved ad copy will appear here.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {copies.map((copy) => (
                <Card key={copy.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{copy.name}</h4>
                          {copy.isWinner && (
                            <Badge variant="default">
                              <Star className="mr-1 h-3 w-3" />
                              Winner
                            </Badge>
                          )}
                        </div>
                        <div className="mt-2 flex gap-2">
                          {copy.hookType && <Badge variant="outline">{copy.hookType}</Badge>}
                          {copy.tone && <Badge variant="outline">{copy.tone}</Badge>}
                        </div>
                      </div>
                      {copy.overallScore && (
                        <div className="text-right">
                          <p className="text-2xl font-bold">{copy.overallScore}</p>
                          <p className="text-xs text-muted-foreground">Score</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 rounded-lg bg-muted p-4">
                      <p className="text-sm whitespace-pre-wrap">{copy.fullText || copy.hook}</p>
                    </div>
                    {copy.overallScore && (
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Clarity</p>
                          <Progress value={copy.clarityScore} className="h-2 mt-1" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Emotion</p>
                          <Progress value={copy.emotionScore} className="h-2 mt-1" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">CTA Strength</p>
                          <Progress value={copy.ctaStrength} className="h-2 mt-1" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Offer Builder Sheet */}
      <Sheet open={isOfferSheetOpen} onOpenChange={setIsOfferSheetOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingOffer ? 'Edit Offer' : 'Create Offer'}</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <OfferBuilder
              offer={editingOffer}
              onSave={handleSaveOffer}
              onCancel={() => setIsOfferSheetOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
