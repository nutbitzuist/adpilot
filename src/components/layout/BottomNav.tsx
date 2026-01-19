import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  PenTool,
  Megaphone,
  BarChart3,
  MoreHorizontal,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Palette, FlaskConical, Library, Settings } from 'lucide-react'

const mainNavItems = [
  { name: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Audience', href: '/audience', icon: Users },
  { name: 'Copy', href: '/copy', icon: PenTool },
  { name: 'Campaigns', href: '/campaigns', icon: Megaphone },
]

const moreNavItems = [
  { name: 'Creative', href: '/creative', icon: Palette },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Testing', href: '/testing', icon: FlaskConical },
  { name: 'Library', href: '/library', icon: Library },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function BottomNav() {
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{ 
        backgroundColor: 'white',
        borderTop: '3px solid black',
        boxShadow: '0 -4px 0px 0px rgba(0,0,0,0.1)'
      }}
    >
      <div className="flex items-center justify-around py-2">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center px-3 py-1 min-w-[60px]',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className="p-1.5 mb-0.5"
                  style={isActive ? {
                    backgroundColor: '#FFD700',
                    border: '2px solid black',
                    boxShadow: '2px 2px 0px 0px black'
                  } : {}}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex flex-col items-center justify-center px-3 py-1 min-w-[60px] text-muted-foreground">
              <div className="p-1.5 mb-0.5">
                <MoreHorizontal className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold">More</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-48 mb-2"
            style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black' }}
          >
            {moreNavItems.map((item) => (
              <DropdownMenuItem key={item.name} asChild>
                <NavLink
                  to={item.href}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </NavLink>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
