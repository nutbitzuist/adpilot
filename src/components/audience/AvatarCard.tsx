import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Users, Star, Edit, Trash2, Copy, MoreVertical, Target, Download } from 'lucide-react'
import { AvatarExport } from './AvatarExport'
import type { CustomerAvatar } from '@/types'

interface AvatarCardProps {
  avatar: CustomerAvatar
  onEdit: (avatar: CustomerAvatar) => void
  onDelete: (id: string) => void
  onDuplicate: (avatar: CustomerAvatar) => void
  onCreateTargeting: (avatar: CustomerAvatar) => void
}

export function AvatarCard({ avatar, onEdit, onDelete, onDuplicate, onCreateTargeting }: AvatarCardProps) {
  return (
    <Card className="relative group hover:shadow-md transition-shadow">
      {avatar.isPrimary && (
        <Badge className="absolute right-4 top-4 gap-1" variant="default">
          <Star className="h-3 w-3" />
          Primary
        </Badge>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{avatar.name}</h3>
              <p className="text-sm text-muted-foreground font-normal">
                {avatar.jobTitle || 'No job title'} {avatar.industry && `• ${avatar.industry}`}
              </p>
            </div>
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(avatar)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(avatar)}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onCreateTargeting(avatar)}>
                <Target className="mr-2 h-4 w-4" />
                Create Targeting
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete(avatar.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Age Range</p>
            <p className="font-medium">
              {avatar.ageRangeStart && avatar.ageRangeEnd 
                ? `${avatar.ageRangeStart} - ${avatar.ageRangeEnd}`
                : 'Not specified'}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Location</p>
            <p className="font-medium">{avatar.location || 'Not specified'}</p>
          </div>
        </div>

        {avatar.goals.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">Goals</p>
            <div className="flex flex-wrap gap-1">
              {avatar.goals.slice(0, 3).map((goal, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {goal}
                </Badge>
              ))}
              {avatar.goals.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{avatar.goals.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {avatar.frustrations.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">Frustrations</p>
            <div className="flex flex-wrap gap-1">
              {avatar.frustrations.slice(0, 3).map((frustration, i) => (
                <Badge key={i} variant="outline" className="text-xs border-orange-200 text-orange-700 bg-orange-50">
                  {frustration}
                </Badge>
              ))}
              {avatar.frustrations.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{avatar.frustrations.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(avatar)}>
            <Edit className="mr-2 h-3 w-3" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onCreateTargeting(avatar)}>
            <Target className="mr-2 h-3 w-3" />
            Target
          </Button>
          <AvatarExport avatar={avatar} />
        </div>
      </CardContent>
    </Card>
  )
}
