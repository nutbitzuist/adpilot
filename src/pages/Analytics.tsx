import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart3, TrendingUp, AlertTriangle, Target, Calendar } from 'lucide-react'
import { useCampaigns } from '@/hooks/useCampaigns'
import { BENCHMARKS } from '@/lib/benchmarks'
import { formatCurrency } from '@/lib/utils'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { MetricsInput } from '@/components/analytics/MetricsInput'
import { DiagnosticEngine } from '@/components/analytics/DiagnosticEngine'
import { WeeklyReview } from '@/components/analytics/WeeklyReview'
import type { CampaignMetrics } from '@/types'

const mockChartData = [
  { date: 'Mon', spend: 120, leads: 8, cpl: 15 },
  { date: 'Tue', spend: 145, leads: 12, cpl: 12.08 },
  { date: 'Wed', spend: 130, leads: 9, cpl: 14.44 },
  { date: 'Thu', spend: 160, leads: 14, cpl: 11.43 },
  { date: 'Fri', spend: 155, leads: 11, cpl: 14.09 },
  { date: 'Sat', spend: 90, leads: 6, cpl: 15 },
  { date: 'Sun', spend: 85, leads: 7, cpl: 12.14 },
]

const mockMetrics: CampaignMetrics = {
  id: '1',
  userId: 'demo',
  campaignId: '1',
  date: new Date().toISOString(),
  periodType: 'weekly',
  spend: 847.50,
  impressions: 45230,
  reach: 38000,
  frequency: 1.19,
  clicks: 1245,
  linkClicks: 980,
  leads: 67,
  purchases: 12,
  registrations: 0,
  addToCarts: 0,
  revenue: 2940,
  cpm: 18.74,
  cpc: 0.68,
  ctr: 2.75,
  cpl: 12.65,
  cpa: 70.63,
  roas: 3.47,
  createdAt: new Date().toISOString(),
}

export default function Analytics() {
  const { campaigns } = useCampaigns()
  const [metrics] = useState<CampaignMetrics>(mockMetrics)

  const handleSaveMetrics = async (data: Partial<CampaignMetrics>) => {
    console.log('Saving metrics:', data)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Track performance and diagnose issues
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="weekly" className="gap-2">
            <Calendar className="h-4 w-4" />
            Weekly Review
          </TabsTrigger>
          <TabsTrigger value="diagnostics" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Diagnostics
          </TabsTrigger>
          <TabsTrigger value="input" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Log Metrics
          </TabsTrigger>
          <TabsTrigger value="benchmarks" className="gap-2">
            <Target className="h-4 w-4" />
            Benchmarks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Spend</p>
                <p className="text-2xl font-bold">{formatCurrency(metrics.spend)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Leads</p>
                <p className="text-2xl font-bold">{metrics.leads}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">CPL</p>
                <p className="text-2xl font-bold">{formatCurrency(metrics.cpl)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">CTR</p>
                <p className="text-2xl font-bold">{metrics.ctr.toFixed(2)}%</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Spend & Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="spend" fill="hsl(var(--primary))" name="Spend ($)" />
                      <Bar yAxisId="right" dataKey="leads" fill="hsl(var(--primary) / 0.5)" name="Leads" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CPL Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="cpl" stroke="hsl(var(--primary))" strokeWidth={2} name="CPL ($)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          <WeeklyReview />
        </TabsContent>

        <TabsContent value="diagnostics" className="space-y-6">
          <DiagnosticEngine metrics={metrics} industry="consulting" />
        </TabsContent>

        <TabsContent value="input" className="space-y-6">
          <MetricsInput campaigns={campaigns} onSave={handleSaveMetrics} />
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(BENCHMARKS).map(([key, value]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="capitalize">{key.replace('_', ' ')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">CPM</span>
                    <span>${value.cpm.min} - ${value.cpm.max}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">CTR</span>
                    <span>{value.ctr.min}% - {value.ctr.max}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">CPL</span>
                    <span>${value.cpl.min} - ${value.cpl.max}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
