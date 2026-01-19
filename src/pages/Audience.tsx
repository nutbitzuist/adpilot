import { useState } from 'react'
import { useAvatars, useTargetingStrategies } from '@/hooks/useAudiences'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Plus, Users, Target, Shield, UserPlus } from 'lucide-react'
import { CONSULTING_INTERESTS } from '@/data/targeting-suggestions'
import { AvatarBuilder } from '@/components/audience/AvatarBuilder'
import { AvatarCard } from '@/components/audience/AvatarCard'
import { TargetingBuilder } from '@/components/audience/TargetingBuilder'
import { ExclusionMatrix } from '@/components/audience/ExclusionMatrix'
import { LookalikeBuilder } from '@/components/audience/LookalikeBuilder'
import type { CustomerAvatar } from '@/types'

export default function Audience() {
  const { avatars, isLoading: avatarsLoading, createAvatar, updateAvatar, deleteAvatar } = useAvatars()
  const { strategies, isLoading: strategiesLoading, createStrategy } = useTargetingStrategies()
  const [isAvatarSheetOpen, setIsAvatarSheetOpen] = useState(false)
  const [isTargetingSheetOpen, setIsTargetingSheetOpen] = useState(false)
  const [editingAvatar, setEditingAvatar] = useState<CustomerAvatar | undefined>()
  const [targetingForAvatar, setTargetingForAvatar] = useState<CustomerAvatar | undefined>()

  const handleSaveAvatar = async (data: Partial<CustomerAvatar>) => {
    if (editingAvatar) {
      await updateAvatar.mutateAsync({ id: editingAvatar.id, ...data })
    } else {
      await createAvatar.mutateAsync(data)
    }
    setIsAvatarSheetOpen(false)
    setEditingAvatar(undefined)
  }

  const handleEditAvatar = (avatar: CustomerAvatar) => {
    setEditingAvatar(avatar)
    setIsAvatarSheetOpen(true)
  }

  const handleDeleteAvatar = async (id: string) => {
    if (confirm('Are you sure you want to delete this avatar?')) {
      await deleteAvatar.mutateAsync(id)
    }
  }

  const handleDuplicateAvatar = async (avatar: CustomerAvatar) => {
    const { id, createdAt, updatedAt, ...rest } = avatar
    await createAvatar.mutateAsync({ ...rest, name: `${avatar.name} (Copy)` })
  }

  const handleCreateTargeting = (avatar: CustomerAvatar) => {
    setTargetingForAvatar(avatar)
    setIsTargetingSheetOpen(true)
  }

  const handleSaveTargeting = async (data: any) => {
    await createStrategy.mutateAsync(data)
    setIsTargetingSheetOpen(false)
    setTargetingForAvatar(undefined)
  }

  const handleNewAvatar = () => {
    setEditingAvatar(undefined)
    setIsAvatarSheetOpen(true)
  }

  const handleNewTargeting = () => {
    setTargetingForAvatar(undefined)
    setIsTargetingSheetOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Audience Intelligence</h1>
          <p className="text-muted-foreground">
            Build customer avatars and plan your targeting strategies
          </p>
        </div>
      </div>

      <Tabs defaultValue="avatars" className="space-y-6">
        <TabsList>
          <TabsTrigger value="avatars" className="gap-2">
            <Users className="h-4 w-4" />
            Avatars
          </TabsTrigger>
          <TabsTrigger value="targeting" className="gap-2">
            <Target className="h-4 w-4" />
            Targeting
          </TabsTrigger>
          <TabsTrigger value="lookalikes" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Lookalikes
          </TabsTrigger>
          <TabsTrigger value="exclusions" className="gap-2">
            <Shield className="h-4 w-4" />
            Exclusions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="avatars" className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={handleNewAvatar}>
              <Plus className="mr-2 h-4 w-4" />
              New Avatar
            </Button>
          </div>

          {avatarsLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="h-24 bg-muted" />
                  <CardContent className="h-32 bg-muted/50" />
                </Card>
              ))}
            </div>
          ) : avatars.length === 0 ? (
            <Card className="p-12 text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No avatars yet</h3>
              <p className="mt-2 text-muted-foreground">
                Create your first customer avatar to better understand your target audience.
              </p>
              <Button className="mt-4" onClick={handleNewAvatar}>
                <Plus className="mr-2 h-4 w-4" />
                Create Avatar
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {avatars.map((avatar) => (
                <AvatarCard
                  key={avatar.id}
                  avatar={avatar}
                  onEdit={handleEditAvatar}
                  onDelete={handleDeleteAvatar}
                  onDuplicate={handleDuplicateAvatar}
                  onCreateTargeting={handleCreateTargeting}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="targeting" className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={handleNewTargeting}>
              <Plus className="mr-2 h-4 w-4" />
              New Strategy
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Targeting Strategies</CardTitle>
                  <CardDescription>
                    Your saved audience targeting configurations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {strategiesLoading ? (
                    <div className="space-y-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="h-20 animate-pulse rounded-lg bg-muted" />
                      ))}
                    </div>
                  ) : strategies.length === 0 ? (
                    <div className="py-8 text-center">
                      <Target className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-4 text-muted-foreground">No targeting strategies yet</p>
                      <Button className="mt-4" variant="outline" onClick={handleNewTargeting}>
                        Create Strategy
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {strategies.map((strategy) => (
                        <div key={strategy.id} className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{strategy.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {strategy.interests.length} interests • {strategy.ageMin}-{strategy.ageMax} years
                              </p>
                            </div>
                            <Badge variant={strategy.status === 'active' ? 'default' : 'secondary'}>
                              {strategy.status}
                            </Badge>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {strategy.interests.slice(0, 5).map((interest, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                            {strategy.interests.length > 5 && (
                              <Badge variant="outline" className="text-xs">
                                +{strategy.interests.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Interest Suggestions</CardTitle>
                  <CardDescription>
                    Popular interests for your industry
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {CONSULTING_INTERESTS.slice(0, 10).map((interest) => (
                      <div
                        key={interest.name}
                        className="flex items-center justify-between rounded-lg border p-2 text-sm hover:bg-muted/50"
                      >
                        <div>
                          <p className="font-medium">{interest.name}</p>
                          <p className="text-xs text-muted-foreground">{interest.category}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="lookalikes" className="space-y-6">
          <LookalikeBuilder />
        </TabsContent>

        <TabsContent value="exclusions" className="space-y-6">
          <ExclusionMatrix />
        </TabsContent>
      </Tabs>

      {/* Avatar Builder Sheet */}
      <Sheet open={isAvatarSheetOpen} onOpenChange={setIsAvatarSheetOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingAvatar ? 'Edit Avatar' : 'Create Customer Avatar'}</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <AvatarBuilder
              avatar={editingAvatar}
              onSave={handleSaveAvatar}
              onCancel={() => setIsAvatarSheetOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Targeting Builder Sheet */}
      <Sheet open={isTargetingSheetOpen} onOpenChange={setIsTargetingSheetOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {targetingForAvatar 
                ? `Create Targeting for ${targetingForAvatar.name}` 
                : 'Create Targeting Strategy'}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <TargetingBuilder
              avatar={targetingForAvatar}
              onSave={handleSaveTargeting}
              onCancel={() => setIsTargetingSheetOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
