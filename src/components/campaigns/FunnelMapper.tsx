import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowDown, 
  Users, 
  Eye, 
  MousePointer, 
  UserPlus, 
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Info
} from 'lucide-react'
import { FUNNEL_TEMPLATES } from '@/data/funnel-templates'
import type { Campaign } from '@/types'

interface FunnelMapperProps {
  campaigns: Campaign[]
  onSelectCampaign?: (campaign: Campaign) => void
}

interface FunnelStage {
  name: string
  icon: React.ReactNode
  description: string
  campaigns: Campaign[]
  metrics?: {
    label: string
    value: string
    change?: string
  }[]
}

export function FunnelMapper({ campaigns, onSelectCampaign }: FunnelMapperProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('standard')

  const template = FUNNEL_TEMPLATES.find(t => t.id === selectedTemplate)

  const getFunnelStages = (): FunnelStage[] => {
    const awarenesssCampaigns = campaigns.filter(c => c.funnelStage === 'Awareness')
    const considerationCampaigns = campaigns.filter(c => c.funnelStage === 'Consideration')
    const conversionCampaigns = campaigns.filter(c => c.funnelStage === 'Conversion')
    const retentionCampaigns = campaigns.filter(c => c.funnelStage === 'Retention')

    return [
      {
        name: 'Awareness',
        icon: <Eye className="h-5 w-5" />,
        description: 'Top of funnel - Reach new audiences',
        campaigns: awarenesssCampaigns,
        metrics: [
          { label: 'Reach', value: '125K', change: '+12%' },
          { label: 'CPM', value: '$8.50' },
        ],
      },
      {
        name: 'Consideration',
        icon: <MousePointer className="h-5 w-5" />,
        description: 'Middle of funnel - Engage interested prospects',
        campaigns: considerationCampaigns,
        metrics: [
          { label: 'Clicks', value: '3.2K', change: '+8%' },
          { label: 'CTR', value: '2.4%' },
        ],
      },
      {
        name: 'Conversion',
        icon: <UserPlus className="h-5 w-5" />,
        description: 'Bottom of funnel - Convert leads to customers',
        campaigns: conversionCampaigns,
        metrics: [
          { label: 'Leads', value: '156', change: '+15%' },
          { label: 'CPL', value: '$12.50' },
        ],
      },
      {
        name: 'Retention',
        icon: <ShoppingCart className="h-5 w-5" />,
        description: 'Post-purchase - Retain and upsell',
        campaigns: retentionCampaigns,
        metrics: [
          { label: 'Purchases', value: '42', change: '+5%' },
          { label: 'ROAS', value: '3.2x' },
        ],
      },
    ]
  }

  const stages = getFunnelStages()
  const totalCampaigns = campaigns.length
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Funnel Overview</h3>
          <p className="text-sm text-muted-foreground">
            {totalCampaigns} campaigns ({activeCampaigns} active)
          </p>
        </div>
        <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FUNNEL_TEMPLATES.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {template && (
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">{template.name}</p>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="relative">
        {stages.map((stage, index) => (
          <div key={stage.name} className="relative">
            {index > 0 && (
              <div className="flex justify-center py-2">
                <ArrowDown className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
            
            <Card className={`transition-all ${stage.campaigns.length > 0 ? 'border-primary/50' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <div className={`p-2 rounded-lg ${stage.campaigns.length > 0 ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {stage.icon}
                    </div>
                    {stage.name}
                  </CardTitle>
                  <Badge variant={stage.campaigns.length > 0 ? 'default' : 'secondary'}>
                    {stage.campaigns.length} campaign{stage.campaigns.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
                <CardDescription>{stage.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {stage.campaigns.length > 0 ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {stage.metrics?.map((metric, i) => (
                        <div key={i} className="text-center p-2 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground">{metric.label}</p>
                          <p className="text-lg font-semibold">{metric.value}</p>
                          {metric.change && (
                            <p className="text-xs text-green-600">{metric.change}</p>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      {stage.campaigns.map((campaign) => (
                        <div
                          key={campaign.id}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => onSelectCampaign?.(campaign)}
                        >
                          <div>
                            <p className="font-medium">{campaign.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {campaign.objective}
                              </Badge>
                              {campaign.dailyBudget && (
                                <span className="text-xs text-muted-foreground">
                                  ${campaign.dailyBudget}/day
                                </span>
                              )}
                            </div>
                          </div>
                          <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                            {campaign.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <Users className="mx-auto h-8 w-8 mb-2" />
                    <p className="text-sm">No campaigns in this stage</p>
                    <Button variant="link" size="sm" className="mt-2">
                      Create Campaign
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {template && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recommended Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {template.stages.map((stage, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{stage.name}</p>
                    <p className="text-sm text-muted-foreground">{stage.objective}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {stage.suggestedAudiences.map((audience, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {audience}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
