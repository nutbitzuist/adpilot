import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  change: number
  changeLabel?: string
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel = 'vs last period',
  icon,
  trend,
}: MetricCardProps) {
  const isPositive = change >= 0
  const actualTrend = trend || (isPositive ? 'up' : 'down')

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        <div className="mt-2">
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="mt-2 flex items-center gap-1">
          {actualTrend === 'up' ? (
            <TrendingUp className={cn('h-4 w-4', isPositive ? 'text-success' : 'text-destructive')} />
          ) : (
            <TrendingDown className={cn('h-4 w-4', isPositive ? 'text-success' : 'text-destructive')} />
          )}
          <span
            className={cn(
              'text-sm font-medium',
              isPositive ? 'text-success' : 'text-destructive'
            )}
          >
            {isPositive ? '+' : ''}{change.toFixed(1)}%
          </span>
          <span className="text-sm text-muted-foreground">{changeLabel}</span>
        </div>
      </CardContent>
    </Card>
  )
}
