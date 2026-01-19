import { useCampaigns } from '@/hooks/useCampaigns'
import { useAdCopy } from '@/hooks/useCopy'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Library as LibraryIcon, Trophy, Archive, Search, Star, Copy, AlertTriangle } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { WinnerLibrary } from '@/components/library/WinnerLibrary'
import { FailureLog } from '@/components/library/FailureLog'

export default function Library() {
  const { campaigns } = useCampaigns()
  const { copies } = useAdCopy()

  const completedCampaigns = campaigns.filter(c => c.status === 'completed' || c.status === 'archived')
  const winningCopy = copies.filter(c => c.isWinner)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Library</h1>
        <p className="text-muted-foreground">
          Your archive of campaigns, winners, and learnings
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search library..." className="pl-10" />
        </div>
      </div>

      <Tabs defaultValue="winners" className="space-y-6">
        <TabsList>
          <TabsTrigger value="winners" className="gap-2">
            <Trophy className="h-4 w-4" />
            Winners
          </TabsTrigger>
          <TabsTrigger value="failures" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Failure Log
          </TabsTrigger>
          <TabsTrigger value="archive" className="gap-2">
            <Archive className="h-4 w-4" />
            Archive
          </TabsTrigger>
        </TabsList>

        <TabsContent value="winners" className="space-y-6">
          <WinnerLibrary />
        </TabsContent>

        <TabsContent value="failures" className="space-y-6">
          <FailureLog />
        </TabsContent>

        <TabsContent value="archive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Archive</CardTitle>
              <CardDescription>
                Historical record of all your campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              {completedCampaigns.length === 0 ? (
                <div className="py-8 text-center">
                  <Archive className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 font-semibold">No archived campaigns</h3>
                  <p className="text-sm text-muted-foreground">
                    Completed campaigns will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {completedCampaigns.map((campaign) => (
                    <div key={campaign.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{campaign.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {campaign.funnelStage} • {campaign.objective}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">{campaign.status}</Badge>
                          {campaign.totalBudget && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Total: {formatCurrency(campaign.totalBudget)}
                            </p>
                          )}
                        </div>
                      </div>
                      {campaign.notes && (
                        <p className="mt-2 text-sm text-muted-foreground">{campaign.notes}</p>
                      )}
                      <div className="mt-3 flex gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="outline" size="sm">Clone Campaign</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
