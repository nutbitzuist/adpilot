import { useDashboardMetrics } from '@/hooks/useMetrics'
import { formatCurrency } from '@/lib/utils'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { CampaignList } from '@/components/dashboard/CampaignList'
import { ActiveTests } from '@/components/dashboard/ActiveTests'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { WeeklyInsight } from '@/components/dashboard/WeeklyInsight'
import { NotificationsPanel } from '@/components/dashboard/NotificationsPanel'
import { DollarSign, Users, TrendingDown, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  const { metrics, isLoading } = useDashboardMetrics()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your ad performance.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Spend"
          value={formatCurrency(metrics.totalSpend)}
          change={metrics.spendChange}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="Total Leads"
          value={metrics.totalLeads.toString()}
          change={metrics.leadsChange}
          icon={<Users className="h-4 w-4" />}
        />
        <MetricCard
          title="Avg. CPL"
          value={formatCurrency(metrics.averageCpl)}
          change={metrics.cplChange}
          trend={metrics.cplChange <= 0 ? 'down' : 'up'}
          icon={<TrendingDown className="h-4 w-4" />}
        />
        <MetricCard
          title="ROAS"
          value={`${metrics.averageRoas.toFixed(1)}x`}
          change={metrics.roasChange}
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <CampaignList />
          <QuickActions />
        </div>
        <div className="space-y-6">
          <NotificationsPanel />
          <WeeklyInsight />
          <ActiveTests />
        </div>
      </div>
    </div>
  )
}
