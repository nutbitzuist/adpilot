import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import {
  Users,
  PenTool,
  Megaphone,
  BarChart3,
  FlaskConical,
  Palette,
} from 'lucide-react'

const actions = [
  {
    label: 'Create Avatar',
    icon: Users,
    href: '/audience',
    description: 'Define your target customer',
  },
  {
    label: 'Write Copy',
    icon: PenTool,
    href: '/copy',
    description: 'Generate ad copy',
  },
  {
    label: 'Create Brief',
    icon: Palette,
    href: '/creative',
    description: 'Brief for designers',
  },
  {
    label: 'New Campaign',
    icon: Megaphone,
    href: '/campaigns',
    description: 'Plan a campaign',
  },
  {
    label: 'Log Metrics',
    icon: BarChart3,
    href: '/analytics',
    description: 'Track performance',
  },
  {
    label: 'Start Test',
    icon: FlaskConical,
    href: '/testing',
    description: 'Run an A/B test',
  },
]

export function QuickActions() {
  const navigate = useNavigate()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto flex-col gap-2 p-4"
              onClick={() => navigate(action.href)}
            >
              <action.icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
