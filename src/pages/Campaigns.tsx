import { useState } from 'react'
import { useCampaigns } from '@/hooks/useCampaigns'
import { useOffers } from '@/hooks/useCopy'
import { useTargetingStrategies } from '@/hooks/useAudiences'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Megaphone, GitBranch, Calculator, Plus, Play, Pause, MoreVertical, Rocket } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { CAMPAIGN_STATUSES } from '@/lib/constants'
import { CampaignBuilder } from '@/components/campaigns/CampaignBuilder'
import { FunnelMapper } from '@/components/campaigns/FunnelMapper'
import { BudgetCalculator } from '@/components/campaigns/BudgetCalculator'
import { LaunchChecklist } from '@/components/campaigns/LaunchChecklist'
import type { Campaign } from '@/types'

export default function Campaigns() {
  const { campaigns, isLoading, createCampaign } = useCampaigns()
  const { offers } = useOffers()
  const { strategies } = useTargetingStrategies()
  const [isCampaignSheetOpen, setIsCampaignSheetOpen] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState<Campaign | undefined>()
  const [targetLeads, setTargetLeads] = useState(100)
  const [expectedCpl, setExpectedCpl] = useState(15)

  const handleSaveCampaign = async (data: Partial<Campaign>) => {
    await createCampaign.mutateAsync(data)
    setIsCampaignSheetOpen(false)
    setEditingCampaign(undefined)
  }

  const handleNewCampaign = () => {
    setEditingCampaign(undefined)
    setIsCampaignSheetOpen(true)
  }

  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign)
    setIsCampaignSheetOpen(true)
  }

  const getStatusColor = (status: string) => {
    const statusConfig = CAMPAIGN_STATUSES.find(s => s.value === status)
    return statusConfig?.color || 'bg-gray-500'
  }

  const calculatedBudget = targetLeads * expectedCpl

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-muted-foreground">
            Plan, build, and manage your ad campaigns
          </p>
        </div>
        <Button onClick={handleNewCampaign}>
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList>
          <TabsTrigger value="campaigns" className="gap-2">
            <Megaphone className="h-4 w-4" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="funnel" className="gap-2">
            <GitBranch className="h-4 w-4" />
            Funnel
          </TabsTrigger>
          <TabsTrigger value="calculator" className="gap-2">
            <Calculator className="h-4 w-4" />
            Budget
          </TabsTrigger>
          <TabsTrigger value="checklist" className="gap-2">
            <Rocket className="h-4 w-4" />
            Launch Checklist
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ) : campaigns.length === 0 ? (
            <Card className="p-12 text-center">
              <Megaphone className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No campaigns yet</h3>
              <p className="mt-2 text-muted-foreground">
                Create your first campaign to start advertising.
              </p>
              <Button className="mt-4" onClick={handleNewCampaign}>
                <Plus className="mr-2 h-4 w-4" />
                Create Campaign
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleEditCampaign(campaign)}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`h-3 w-3 rounded-full ${getStatusColor(campaign.status)}`} />
                        <div>
                          <h4 className="font-semibold">{campaign.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {campaign.funnelStage} • {campaign.objective}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">
                            {campaign.dailyBudget ? `${formatCurrency(campaign.dailyBudget)}/day` : 'No budget set'}
                          </p>
                          <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                            {campaign.status}
                          </Badge>
                        </div>
                        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                          {campaign.status === 'active' ? (
                            <Button variant="ghost" size="icon">
                              <Pause className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="icon">
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {campaign.adSets.length > 0 && (
                      <div className="mt-4 flex gap-2">
                        {campaign.adSets.map((adSet, i) => (
                          <Badge key={i} variant="outline">
                            {adSet.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="funnel" className="space-y-6">
          <FunnelMapper campaigns={campaigns} onSelectCampaign={handleEditCampaign} />
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          <BudgetCalculator />
        </TabsContent>

        <TabsContent value="checklist" className="space-y-6">
          <LaunchChecklist />
        </TabsContent>
      </Tabs>

      {/* Campaign Builder Sheet */}
      <Sheet open={isCampaignSheetOpen} onOpenChange={setIsCampaignSheetOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingCampaign ? 'Edit Campaign' : 'Create Campaign'}</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <CampaignBuilder
              campaign={editingCampaign}
              offers={offers}
              targetingStrategies={strategies}
              onSave={handleSaveCampaign}
              onCancel={() => setIsCampaignSheetOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
