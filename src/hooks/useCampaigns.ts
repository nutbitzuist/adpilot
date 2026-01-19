import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { useStore } from '@/store/useStore'
import type { Campaign, CampaignMetrics } from '@/types'

const demoCampaigns: Campaign[] = [
  {
    id: '1',
    userId: 'demo-user',
    name: 'Lead Magnet - Free Guide',
    objective: 'leads',
    funnelStage: 'Awareness',
    campaignType: 'lead_generation',
    dailyBudget: 50,
    totalBudget: 1500,
    budgetType: 'daily',
    startDate: '2024-01-15',
    status: 'active',
    adSets: [
      { name: 'Interest - Entrepreneurs', targeting: 'Entrepreneurship', budget: 25 },
      { name: 'Lookalike - Email List', targeting: '1% Lookalike', budget: 25 },
    ],
    notes: 'Testing new lead magnet offer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: 'demo-user',
    name: 'Webinar Registration',
    objective: 'leads',
    funnelStage: 'Consideration',
    campaignType: 'lead_generation',
    dailyBudget: 75,
    totalBudget: 2250,
    budgetType: 'daily',
    startDate: '2024-01-20',
    status: 'active',
    adSets: [
      { name: 'Retargeting - Lead Magnet', targeting: 'Lead magnet downloaders', budget: 40 },
      { name: 'Cold - Business Coaches', targeting: 'Business coaching', budget: 35 },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    userId: 'demo-user',
    name: 'Strategy Call Booking',
    objective: 'leads',
    funnelStage: 'Conversion',
    campaignType: 'lead_generation',
    dailyBudget: 100,
    status: 'paused',
    adSets: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const demoMetrics: CampaignMetrics[] = [
  {
    id: '1',
    userId: 'demo-user',
    campaignId: '1',
    date: new Date().toISOString().split('T')[0],
    periodType: 'daily',
    spend: 847.50,
    impressions: 45230,
    reach: 38450,
    frequency: 1.18,
    clicks: 1245,
    linkClicks: 1089,
    leads: 67,
    purchases: 0,
    registrations: 0,
    addToCarts: 0,
    revenue: 0,
    cpm: 18.74,
    cpc: 0.68,
    ctr: 2.75,
    cpl: 12.65,
    cpa: 0,
    roas: 0,
    createdAt: new Date().toISOString(),
  },
]

export function useCampaigns() {
  const { user } = useStore()
  const queryClient = useQueryClient()

  const campaignsQuery = useQuery({
    queryKey: ['campaigns', user?.id],
    queryFn: async () => {
      if (!isSupabaseConfigured || !user) {
        return demoCampaigns
      }

      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data.map((campaign): Campaign => ({
        id: campaign.id,
        userId: campaign.user_id || '',
        name: campaign.name,
        objective: campaign.objective || undefined,
        funnelStage: campaign.funnel_stage || undefined,
        offerId: campaign.offer_id || undefined,
        targetingStrategyId: campaign.targeting_strategy_id || undefined,
        campaignType: campaign.campaign_type || undefined,
        dailyBudget: campaign.daily_budget || undefined,
        totalBudget: campaign.total_budget || undefined,
        budgetType: campaign.budget_type || undefined,
        startDate: campaign.start_date || undefined,
        endDate: campaign.end_date || undefined,
        adSets: (campaign.ad_sets as Campaign['adSets']) || [],
        status: campaign.status,
        metaCampaignId: campaign.meta_campaign_id || undefined,
        notes: campaign.notes || undefined,
        createdAt: campaign.created_at,
        updatedAt: campaign.updated_at,
      }))
    },
    enabled: !!user,
  })

  const createCampaign = useMutation({
    mutationFn: async (campaign: Partial<Campaign>) => {
      if (!isSupabaseConfigured || !user) {
        return {
          id: crypto.randomUUID(),
          userId: 'demo-user',
          name: campaign.name || 'New Campaign',
          status: 'planning',
          adSets: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...campaign,
        }
      }

      const { data, error } = await supabase
        .from('campaigns')
        .insert({
          user_id: user.id,
          name: campaign.name,
          objective: campaign.objective,
          funnel_stage: campaign.funnelStage,
          offer_id: campaign.offerId,
          targeting_strategy_id: campaign.targetingStrategyId,
          campaign_type: campaign.campaignType,
          daily_budget: campaign.dailyBudget,
          total_budget: campaign.totalBudget,
          budget_type: campaign.budgetType,
          start_date: campaign.startDate,
          end_date: campaign.endDate,
          ad_sets: campaign.adSets,
          status: campaign.status || 'planning',
          notes: campaign.notes,
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
    },
  })

  const updateCampaign = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Campaign> & { id: string }) => {
      if (!isSupabaseConfigured) {
        return { id, ...updates }
      }

      const { data, error } = await supabase
        .from('campaigns')
        .update({
          name: updates.name,
          objective: updates.objective,
          funnel_stage: updates.funnelStage,
          offer_id: updates.offerId,
          targeting_strategy_id: updates.targetingStrategyId,
          campaign_type: updates.campaignType,
          daily_budget: updates.dailyBudget,
          total_budget: updates.totalBudget,
          budget_type: updates.budgetType,
          start_date: updates.startDate,
          end_date: updates.endDate,
          ad_sets: updates.adSets,
          status: updates.status,
          notes: updates.notes,
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
    },
  })

  const deleteCampaign = useMutation({
    mutationFn: async (id: string) => {
      if (!isSupabaseConfigured) {
        return { id }
      }

      const { error } = await supabase.from('campaigns').delete().eq('id', id)
      if (error) throw error
      return { id }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
    },
  })

  return {
    campaigns: campaignsQuery.data || [],
    isLoading: campaignsQuery.isLoading,
    error: campaignsQuery.error,
    createCampaign,
    updateCampaign,
    deleteCampaign,
  }
}

export function useCampaignMetrics(campaignId?: string) {
  const { user } = useStore()

  return useQuery({
    queryKey: ['campaign-metrics', campaignId],
    queryFn: async () => {
      if (!isSupabaseConfigured || !user) {
        return campaignId
          ? demoMetrics.filter((m) => m.campaignId === campaignId)
          : demoMetrics
      }

      let query = supabase
        .from('campaign_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })

      if (campaignId) {
        query = query.eq('campaign_id', campaignId)
      }

      const { data, error } = await query

      if (error) throw error

      return data.map((metric): CampaignMetrics => ({
        id: metric.id,
        userId: metric.user_id || '',
        campaignId: metric.campaign_id || '',
        date: metric.date,
        periodType: metric.period_type,
        spend: metric.spend,
        impressions: metric.impressions,
        reach: metric.reach,
        frequency: metric.frequency,
        clicks: metric.clicks,
        linkClicks: metric.link_clicks,
        leads: metric.leads,
        purchases: metric.purchases,
        registrations: metric.registrations,
        addToCarts: metric.add_to_carts,
        revenue: metric.revenue,
        cpm: metric.cpm,
        cpc: metric.cpc,
        ctr: metric.ctr,
        cpl: metric.cpl,
        cpa: metric.cpa,
        roas: metric.roas,
        notes: metric.notes || undefined,
        createdAt: metric.created_at,
      }))
    },
    enabled: !!user,
  })
}
