import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, X, Shield, AlertTriangle, Users, ShoppingCart, Mail, Eye } from 'lucide-react'
import { EXCLUSION_SUGGESTIONS } from '@/data/targeting-suggestions'

interface Exclusion {
  id: string
  type: string
  name: string
  reason: string
  priority: 'high' | 'medium' | 'low'
}

interface ExclusionMatrixProps {
  exclusions?: Exclusion[]
  onChange?: (exclusions: Exclusion[]) => void
}

const EXCLUSION_TYPES = [
  { value: 'customers', label: 'Existing Customers', icon: ShoppingCart },
  { value: 'leads', label: 'Recent Leads', icon: Users },
  { value: 'email', label: 'Email List Segment', icon: Mail },
  { value: 'website', label: 'Website Visitors', icon: Eye },
  { value: 'custom', label: 'Custom Audience', icon: Shield },
]

export function ExclusionMatrix({ exclusions: initialExclusions = [], onChange }: ExclusionMatrixProps) {
  const [exclusions, setExclusions] = useState<Exclusion[]>(initialExclusions)
  const [newExclusion, setNewExclusion] = useState<Partial<Exclusion>>({
    type: 'customers',
    priority: 'high',
  })

  const addExclusion = () => {
    if (!newExclusion.name) return
    
    const exclusion: Exclusion = {
      id: Date.now().toString(),
      type: newExclusion.type || 'custom',
      name: newExclusion.name,
      reason: newExclusion.reason || '',
      priority: newExclusion.priority || 'medium',
    }
    
    const updated = [...exclusions, exclusion]
    setExclusions(updated)
    onChange?.(updated)
    setNewExclusion({ type: 'customers', priority: 'high' })
  }

  const removeExclusion = (id: string) => {
    const updated = exclusions.filter(e => e.id !== id)
    setExclusions(updated)
    onChange?.(updated)
  }

  const addSuggestion = (suggestion: { name: string; description: string }) => {
    const exclusion: Exclusion = {
      id: Date.now().toString(),
      type: 'custom',
      name: suggestion.name,
      reason: suggestion.description,
      priority: 'high',
    }
    const updated = [...exclusions, exclusion]
    setExclusions(updated)
    onChange?.(updated)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getTypeIcon = (type: string) => {
    const typeConfig = EXCLUSION_TYPES.find(t => t.value === type)
    return typeConfig?.icon || Shield
  }

  return (
    <div className="space-y-6">
      <Card style={{ border: '3px solid black', boxShadow: '4px 4px 0px 0px black' }}>
        <CardHeader style={{ borderBottom: '3px solid black', backgroundColor: '#FFD700' }}>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Exclusion Matrix
          </CardTitle>
          <CardDescription className="text-black">
            Define audiences to exclude from your campaigns to avoid wasted spend
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Add New Exclusion */}
          <div className="space-y-4 p-4" style={{ border: '2px solid black', backgroundColor: '#f5f5f5' }}>
            <h4 className="font-bold">Add Exclusion</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Exclusion Type</Label>
                <Select
                  value={newExclusion.type}
                  onValueChange={(value) => setNewExclusion({ ...newExclusion, type: value })}
                >
                  <SelectTrigger style={{ border: '2px solid black' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EXCLUSION_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <span className="flex items-center gap-2">
                          <type.icon className="h-4 w-4" />
                          {type.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  value={newExclusion.priority}
                  onValueChange={(value) => setNewExclusion({ ...newExclusion, priority: value as 'high' | 'medium' | 'low' })}
                >
                  <SelectTrigger style={{ border: '2px solid black' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Audience Name</Label>
              <Input
                value={newExclusion.name || ''}
                onChange={(e) => setNewExclusion({ ...newExclusion, name: e.target.value })}
                placeholder="e.g., All purchasers last 180 days"
                style={{ border: '2px solid black' }}
              />
            </div>
            <div className="space-y-2">
              <Label>Reason for Exclusion</Label>
              <Textarea
                value={newExclusion.reason || ''}
                onChange={(e) => setNewExclusion({ ...newExclusion, reason: e.target.value })}
                placeholder="Why are you excluding this audience?"
                rows={2}
                style={{ border: '2px solid black' }}
              />
            </div>
            <Button 
              onClick={addExclusion}
              disabled={!newExclusion.name}
              style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black' }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Exclusion
            </Button>
          </div>

          {/* Current Exclusions */}
          {exclusions.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-bold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Active Exclusions ({exclusions.length})
              </h4>
              <div className="space-y-2">
                {exclusions.map((exclusion) => {
                  const Icon = getTypeIcon(exclusion.type)
                  return (
                    <div
                      key={exclusion.id}
                      className="flex items-start justify-between p-3 bg-white"
                      style={{ border: '2px solid black' }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 ${getPriorityColor(exclusion.priority)} text-white`} style={{ border: '2px solid black' }}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-bold">{exclusion.name}</p>
                          {exclusion.reason && (
                            <p className="text-sm text-muted-foreground">{exclusion.reason}</p>
                          )}
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" style={{ border: '2px solid black' }}>
                              {EXCLUSION_TYPES.find(t => t.value === exclusion.type)?.label}
                            </Badge>
                            <Badge 
                              className={getPriorityColor(exclusion.priority)}
                              style={{ border: '2px solid black' }}
                            >
                              {exclusion.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExclusion(exclusion.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Suggestions */}
          <div className="space-y-3">
            <h4 className="font-bold">Recommended Exclusions</h4>
            <div className="grid gap-2 md:grid-cols-2">
              {EXCLUSION_SUGGESTIONS.map((suggestion, index) => {
                const isAdded = exclusions.some(e => e.name === suggestion.name)
                return (
                  <button
                    key={index}
                    onClick={() => !isAdded && addSuggestion(suggestion)}
                    disabled={isAdded}
                    className={`p-3 text-left transition-all ${isAdded ? 'opacity-50' : 'hover:translate-x-0.5 hover:translate-y-0.5'}`}
                    style={{ 
                      border: '2px solid black', 
                      boxShadow: isAdded ? 'none' : '3px 3px 0px 0px black',
                      backgroundColor: isAdded ? '#e5e5e5' : 'white'
                    }}
                  >
                    <p className="font-bold text-sm">{suggestion.name}</p>
                    <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                  </button>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
