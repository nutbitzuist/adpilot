import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  TrendingDown,
  Lightbulb,
  Target,
  DollarSign,
  MousePointer,
  Eye
} from 'lucide-react'
import { BENCHMARKS } from '@/lib/benchmarks'
import type { CampaignMetrics } from '@/types'

interface DiagnosticEngineProps {
  metrics: CampaignMetrics
  industry?: string
}

interface Diagnostic {
  metric: string
  value: number
  benchmark: number
  status: 'good' | 'warning' | 'critical'
  message: string
  recommendation: string
  icon: React.ReactNode
}

export function DiagnosticEngine({ metrics, industry = 'consulting' }: DiagnosticEngineProps) {
  const benchmarks = BENCHMARKS[industry as keyof typeof BENCHMARKS] || BENCHMARKS.consulting

  const getDiagnostics = (): Diagnostic[] => {
    const diagnostics: Diagnostic[] = []

    // CPM Analysis
    const cpmStatus = metrics.cpm <= benchmarks.cpm.good 
      ? 'good' 
      : metrics.cpm <= benchmarks.cpm.average 
        ? 'warning' 
        : 'critical'
    
    diagnostics.push({
      metric: 'CPM',
      value: metrics.cpm,
      benchmark: benchmarks.cpm.good,
      status: cpmStatus,
      message: cpmStatus === 'good' 
        ? 'CPM is within healthy range' 
        : cpmStatus === 'warning'
          ? 'CPM is slightly high'
          : 'CPM is significantly above benchmark',
      recommendation: cpmStatus !== 'good'
        ? 'Consider broadening your audience or testing different placements'
        : 'Keep monitoring to maintain efficiency',
      icon: <DollarSign className="h-4 w-4" />,
    })

    // CTR Analysis
    const ctrStatus = metrics.ctr >= benchmarks.ctr.good 
      ? 'good' 
      : metrics.ctr >= benchmarks.ctr.average 
        ? 'warning' 
        : 'critical'
    
    diagnostics.push({
      metric: 'CTR',
      value: metrics.ctr,
      benchmark: benchmarks.ctr.good,
      status: ctrStatus,
      message: ctrStatus === 'good' 
        ? 'CTR is strong - your ads are resonating' 
        : ctrStatus === 'warning'
          ? 'CTR could be improved'
          : 'CTR is below average - creative refresh needed',
      recommendation: ctrStatus !== 'good'
        ? 'Test new hooks, headlines, or creative formats'
        : 'Document what\'s working for future campaigns',
      icon: <MousePointer className="h-4 w-4" />,
    })

    // CPC Analysis
    const cpcStatus = metrics.cpc <= benchmarks.cpc.good 
      ? 'good' 
      : metrics.cpc <= benchmarks.cpc.average 
        ? 'warning' 
        : 'critical'
    
    diagnostics.push({
      metric: 'CPC',
      value: metrics.cpc,
      benchmark: benchmarks.cpc.good,
      status: cpcStatus,
      message: cpcStatus === 'good' 
        ? 'CPC is efficient' 
        : cpcStatus === 'warning'
          ? 'CPC is moderate'
          : 'CPC is high - optimize targeting',
      recommendation: cpcStatus !== 'good'
        ? 'Review audience targeting and ad relevance'
        : 'Consider scaling budget on this campaign',
      icon: <Target className="h-4 w-4" />,
    })

    // CPL Analysis (if leads > 0)
    if (metrics.leads > 0) {
      const cplStatus = metrics.cpl <= benchmarks.cpl.good 
        ? 'good' 
        : metrics.cpl <= benchmarks.cpl.average 
          ? 'warning' 
          : 'critical'
      
      diagnostics.push({
        metric: 'CPL',
        value: metrics.cpl,
        benchmark: benchmarks.cpl.good,
        status: cplStatus,
        message: cplStatus === 'good' 
          ? 'Cost per lead is excellent' 
          : cplStatus === 'warning'
            ? 'CPL is acceptable but could improve'
            : 'CPL is too high - funnel optimization needed',
        recommendation: cplStatus !== 'good'
          ? 'Review landing page, offer, or audience quality'
          : 'This campaign is performing well - consider scaling',
        icon: <Eye className="h-4 w-4" />,
      })
    }

    // ROAS Analysis (if revenue > 0)
    if (metrics.revenue > 0) {
      const roasStatus = metrics.roas >= benchmarks.roas.good 
        ? 'good' 
        : metrics.roas >= benchmarks.roas.average 
          ? 'warning' 
          : 'critical'
      
      diagnostics.push({
        metric: 'ROAS',
        value: metrics.roas,
        benchmark: benchmarks.roas.good,
        status: roasStatus,
        message: roasStatus === 'good' 
          ? 'ROAS is profitable' 
          : roasStatus === 'warning'
            ? 'ROAS is break-even or slightly profitable'
            : 'ROAS is below target - review entire funnel',
        recommendation: roasStatus !== 'good'
          ? 'Analyze conversion rates and average order value'
          : 'Scale this campaign while maintaining efficiency',
        icon: <TrendingUp className="h-4 w-4" />,
      })
    }

    return diagnostics
  }

  const diagnostics = getDiagnostics()
  const overallScore = Math.round(
    (diagnostics.filter(d => d.status === 'good').length / diagnostics.length) * 100
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'critical':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'border-green-200 bg-green-50'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50'
      case 'critical':
        return 'border-red-200 bg-red-50'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Campaign Health Score</span>
            <span className={`text-3xl font-bold ${
              overallScore >= 80 ? 'text-green-600' : 
              overallScore >= 50 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {overallScore}%
            </span>
          </CardTitle>
          <CardDescription>
            Based on {diagnostics.length} key metrics compared to industry benchmarks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={overallScore} className="h-3" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Needs Work</span>
            <span>Healthy</span>
            <span>Excellent</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {diagnostics.map((diagnostic, index) => (
          <Card key={index} className={`${getStatusColor(diagnostic.status)}`}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-base">
                <span className="flex items-center gap-2">
                  {diagnostic.icon}
                  {diagnostic.metric}
                </span>
                {getStatusIcon(diagnostic.status)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {diagnostic.metric === 'CTR' 
                      ? `${diagnostic.value.toFixed(2)}%`
                      : diagnostic.metric === 'ROAS'
                        ? `${diagnostic.value.toFixed(2)}x`
                        : `$${diagnostic.value.toFixed(2)}`
                    }
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Benchmark: {diagnostic.metric === 'CTR' 
                      ? `${diagnostic.benchmark}%`
                      : diagnostic.metric === 'ROAS'
                        ? `${diagnostic.benchmark}x`
                        : `$${diagnostic.benchmark}`
                    }
                  </p>
                </div>
                <Badge variant={
                  diagnostic.status === 'good' ? 'default' : 
                  diagnostic.status === 'warning' ? 'secondary' : 'destructive'
                }>
                  {diagnostic.status === 'good' ? 'Healthy' : 
                   diagnostic.status === 'warning' ? 'Monitor' : 'Action Needed'}
                </Badge>
              </div>
              
              <p className="text-sm">{diagnostic.message}</p>
              
              <div className="flex items-start gap-2 p-2 rounded bg-white/50">
                <Lightbulb className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-xs">{diagnostic.recommendation}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Top Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {diagnostics
              .filter(d => d.status !== 'good')
              .slice(0, 3)
              .map((diagnostic, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className={`p-1 rounded ${
                    diagnostic.status === 'critical' ? 'bg-red-100' : 'bg-yellow-100'
                  }`}>
                    {diagnostic.status === 'critical' 
                      ? <TrendingDown className="h-4 w-4 text-red-600" />
                      : <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {diagnostic.status === 'critical' ? 'Critical: ' : 'Improve: '}
                      {diagnostic.metric}
                    </p>
                    <p className="text-sm text-muted-foreground">{diagnostic.recommendation}</p>
                  </div>
                </div>
              ))}
            {diagnostics.filter(d => d.status !== 'good').length === 0 && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-sm text-green-800">
                  All metrics are within healthy ranges. Keep up the great work!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
