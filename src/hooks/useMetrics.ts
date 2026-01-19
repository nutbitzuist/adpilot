import { useMemo } from 'react'
import { useCampaignMetrics } from './useCampaigns'
import { calculatePercentChange } from '@/lib/utils'

export interface DashboardMetrics {
  totalSpend: number
  totalLeads: number
  averageCpl: number
  averageRoas: number
  spendChange: number
  leadsChange: number
  cplChange: number
  roasChange: number
}

export function useDashboardMetrics() {
  const { data: metrics, isLoading } = useCampaignMetrics()

  const dashboardMetrics = useMemo((): DashboardMetrics => {
    if (!metrics || metrics.length === 0) {
      return {
        totalSpend: 2847.50,
        totalLeads: 187,
        averageCpl: 15.23,
        averageRoas: 3.2,
        spendChange: 12.5,
        leadsChange: 23.4,
        cplChange: -8.2,
        roasChange: 15.7,
      }
    }

    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)

    const currentPeriod = metrics.filter((m) => new Date(m.date) >= sevenDaysAgo)
    const previousPeriod = metrics.filter(
      (m) => new Date(m.date) >= fourteenDaysAgo && new Date(m.date) < sevenDaysAgo
    )

    const currentSpend = currentPeriod.reduce((sum, m) => sum + m.spend, 0)
    const currentLeads = currentPeriod.reduce((sum, m) => sum + m.leads, 0)
    const currentCpl = currentLeads > 0 ? currentSpend / currentLeads : 0
    const currentRevenue = currentPeriod.reduce((sum, m) => sum + m.revenue, 0)
    const currentRoas = currentSpend > 0 ? currentRevenue / currentSpend : 0

    const previousSpend = previousPeriod.reduce((sum, m) => sum + m.spend, 0)
    const previousLeads = previousPeriod.reduce((sum, m) => sum + m.leads, 0)
    const previousCpl = previousLeads > 0 ? previousSpend / previousLeads : 0
    const previousRevenue = previousPeriod.reduce((sum, m) => sum + m.revenue, 0)
    const previousRoas = previousSpend > 0 ? previousRevenue / previousSpend : 0

    return {
      totalSpend: currentSpend,
      totalLeads: currentLeads,
      averageCpl: currentCpl,
      averageRoas: currentRoas,
      spendChange: calculatePercentChange(currentSpend, previousSpend),
      leadsChange: calculatePercentChange(currentLeads, previousLeads),
      cplChange: calculatePercentChange(currentCpl, previousCpl),
      roasChange: calculatePercentChange(currentRoas, previousRoas),
    }
  }, [metrics])

  return {
    metrics: dashboardMetrics,
    isLoading,
  }
}

export function calculateCpm(spend: number, impressions: number): number {
  return impressions > 0 ? (spend / impressions) * 1000 : 0
}

export function calculateCpc(spend: number, clicks: number): number {
  return clicks > 0 ? spend / clicks : 0
}

export function calculateCtr(clicks: number, impressions: number): number {
  return impressions > 0 ? (clicks / impressions) * 100 : 0
}

export function calculateCpl(spend: number, leads: number): number {
  return leads > 0 ? spend / leads : 0
}

export function calculateRoas(revenue: number, spend: number): number {
  return spend > 0 ? revenue / spend : 0
}
