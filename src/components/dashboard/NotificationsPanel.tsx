import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell, AlertTriangle, TrendingDown, CheckCircle, X, DollarSign } from 'lucide-react'

interface Notification {
  id: string
  type: 'warning' | 'alert' | 'success' | 'info'
  title: string
  message: string
  time: string
  read: boolean
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'warning', title: 'Budget Alert', message: 'Lead Magnet campaign at 85% of daily budget', time: '2h ago', read: false },
  { id: '2', type: 'alert', title: 'Underperforming', message: 'Webinar campaign CTR dropped below 0.5%', time: '4h ago', read: false },
  { id: '3', type: 'success', title: 'Test Complete', message: 'Hook Test A/B reached statistical significance', time: '1d ago', read: true },
  { id: '4', type: 'info', title: 'Weekly Review', message: 'Time for your weekly performance review', time: '2d ago', read: true },
]

const TYPE_CONFIG = {
  warning: { icon: DollarSign, color: '#F59E0B', bg: '#FEF3C7' },
  alert: { icon: TrendingDown, color: '#EF4444', bg: '#FEE2E2' },
  success: { icon: CheckCircle, color: '#22C55E', bg: '#D1FAE5' },
  info: { icon: Bell, color: '#3B82F6', bg: '#DBEAFE' },
}

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS)
  const [showAll, setShowAll] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length
  const displayNotifications = showAll ? notifications : notifications.slice(0, 3)

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const dismiss = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  return (
    <Card style={{ border: '3px solid black', boxShadow: '4px 4px 0px 0px black' }}>
      <CardHeader className="pb-3" style={{ borderBottom: '3px solid black', backgroundColor: '#3B82F6' }}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white text-base">
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge style={{ border: '2px solid black', backgroundColor: '#EF4444', color: 'white' }}>
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllRead} className="text-white text-xs">
              Mark all read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          <>
            {displayNotifications.map((notification) => {
              const config = TYPE_CONFIG[notification.type]
              const Icon = config.icon
              return (
                <div
                  key={notification.id}
                  className={`p-3 flex items-start gap-3 ${!notification.read ? 'bg-blue-50' : ''}`}
                  style={{ borderBottom: '2px solid black' }}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="p-1.5" style={{ backgroundColor: config.bg, border: '2px solid black' }}>
                    <Icon className="h-4 w-4" style={{ color: config.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm">{notification.title}</p>
                      {!notification.read && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); dismiss(notification.id) }}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )
            })}
            {notifications.length > 3 && (
              <Button
                variant="ghost"
                className="w-full py-3 text-sm"
                onClick={() => setShowAll(!showAll)}
                style={{ borderTop: '2px solid black' }}
              >
                {showAll ? 'Show less' : `Show ${notifications.length - 3} more`}
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
