import { useCampaigns } from '@/hooks/useCampaigns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { Plus, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const statusColors: Record<string, string> = {
  active: 'bg-green-500',
  paused: 'bg-yellow-500',
  planning: 'bg-gray-500',
  completed: 'bg-blue-500',
  draft: 'bg-gray-400',
}

export function CampaignList() {
  const { campaigns, isLoading } = useCampaigns()
  const navigate = useNavigate()

  const activeCampaigns = campaigns.filter((c) => c.status === 'active' || c.status === 'paused').slice(0, 5)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Active Campaigns</CardTitle>
        <Button variant="outline" size="sm" onClick={() => navigate('/campaigns')}>
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </CardHeader>
      <CardContent>
        {activeCampaigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">No active campaigns yet</p>
            <Button variant="link" onClick={() => navigate('/campaigns')}>
              Create your first campaign
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {activeCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div className={`h-2 w-2 rounded-full ${statusColors[campaign.status]}`} />
                  <div>
                    <p className="font-medium">{campaign.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {campaign.funnelStage} • {campaign.objective}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">
                      {campaign.dailyBudget ? formatCurrency(campaign.dailyBudget) : '-'}/day
                    </p>
                    <Badge variant={campaign.status === 'active' ? 'success' : 'secondary'}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
