import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useStore } from '@/store/useStore'
import {
  LayoutDashboard,
  Users,
  PenTool,
  Palette,
  Megaphone,
  BarChart3,
  FlaskConical,
  Library,
  Settings,
  ChevronLeft,
  ChevronRight,
  Rocket,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Audience', href: '/audience', icon: Users },
  { name: 'Copy Lab', href: '/copy', icon: PenTool },
  { name: 'Creative', href: '/creative', icon: Palette },
  { name: 'Campaigns', href: '/campaigns', icon: Megaphone },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Testing', href: '/testing', icon: FlaskConical },
  { name: 'Library', href: '/library', icon: Library },
]

const bottomNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed } = useStore()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-white transition-all duration-300',
        sidebarCollapsed ? 'w-[70px]' : 'w-64'
      )}
      style={{ borderRight: '4px solid black' }}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div 
          className="flex h-16 items-center justify-between px-3"
          style={{ borderBottom: '4px solid black', backgroundColor: '#FFD700' }}
        >
          <NavLink to="/dashboard" className="flex items-center gap-2">
            <div 
              className="flex h-10 w-10 items-center justify-center"
              style={{ 
                border: '3px solid black', 
                backgroundColor: '#7C3AED',
                boxShadow: '3px 3px 0px 0px black'
              }}
            >
              <Rocket className="h-5 w-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <span className="text-xl font-bold text-black">AdPilot</span>
            )}
          </NavLink>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="flex h-8 w-8 items-center justify-center bg-white"
            style={{ 
              border: '2px solid black',
              boxShadow: '2px 2px 0px 0px black'
            }}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 bg-white">
          <nav className="flex flex-col gap-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2.5 text-sm font-bold transition-all',
                    sidebarCollapsed && 'justify-center px-2'
                  )
                }
                style={({ isActive }) => ({
                  border: '3px solid black',
                  backgroundColor: isActive ? '#7C3AED' : 'white',
                  color: isActive ? 'white' : 'black',
                  boxShadow: '3px 3px 0px 0px black',
                })}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!sidebarCollapsed && <span>{item.name}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Navigation */}
        <div className="p-3 bg-white" style={{ borderTop: '4px solid black' }}>
          {bottomNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 text-sm font-bold transition-all',
                  sidebarCollapsed && 'justify-center px-2'
                )
              }
              style={({ isActive }) => ({
                border: '3px solid black',
                backgroundColor: isActive ? '#7C3AED' : 'white',
                color: isActive ? 'white' : 'black',
                boxShadow: '3px 3px 0px 0px black',
              })}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!sidebarCollapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  )
}
