import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, X, Trophy, Search, Star, TrendingUp, Copy } from 'lucide-react'

interface Winner {
  id: string
  name: string
  type: 'hook' | 'copy' | 'creative' | 'audience' | 'offer'
  description: string
  metrics: {
    ctr?: number
    cpl?: number
    roas?: number
    cvr?: number
  }
  whyItWon: string
  howToReplicate: string
  campaign: string
  dateWon: string
  tags: string[]
}

const MOCK_WINNERS: Winner[] = [
  {
    id: '1',
    name: 'Story Hook - "3 years ago..."',
    type: 'hook',
    description: '3 years ago, I was broke and desperate for clients. Then I discovered this one framework...',
    metrics: { ctr: 2.8, cpl: 8.50 },
    whyItWon: 'Relatable story opening, creates curiosity, implies transformation',
    howToReplicate: 'Use personal story format, mention specific timeframe, hint at discovery',
    campaign: 'Lead Magnet - Free Guide',
    dateWon: '2026-01-15',
    tags: ['story', 'hook', 'lead-magnet'],
  },
  {
    id: '2',
    name: 'UGC-Style Video Creative',
    type: 'creative',
    description: 'Selfie-style video testimonial from client Sarah about her results',
    metrics: { ctr: 3.2, cvr: 28 },
    whyItWon: 'Authentic feel, social proof, specific results mentioned',
    howToReplicate: 'Use real client testimonials, selfie format, mention specific numbers',
    campaign: 'Webinar Registration',
    dateWon: '2026-01-10',
    tags: ['ugc', 'video', 'testimonial'],
  },
]

const TYPE_COLORS = {
  hook: '#3B82F6',
  copy: '#8B5CF6',
  creative: '#EC4899',
  audience: '#10B981',
  offer: '#F59E0B',
}

export function WinnerLibrary() {
  const [winners, setWinners] = useState<Winner[]>(MOCK_WINNERS)
  const [isAdding, setIsAdding] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [newWinner, setNewWinner] = useState<Partial<Winner>>({ tags: [] })
  const [newTag, setNewTag] = useState('')

  const addWinner = () => {
    if (!newWinner.name || !newWinner.type) return
    
    const winner: Winner = {
      id: Date.now().toString(),
      name: newWinner.name,
      type: newWinner.type as Winner['type'],
      description: newWinner.description || '',
      metrics: newWinner.metrics || {},
      whyItWon: newWinner.whyItWon || '',
      howToReplicate: newWinner.howToReplicate || '',
      campaign: newWinner.campaign || '',
      dateWon: new Date().toISOString().split('T')[0],
      tags: newWinner.tags || [],
    }
    
    setWinners([winner, ...winners])
    setNewWinner({ tags: [] })
    setIsAdding(false)
  }

  const removeWinner = (id: string) => {
    setWinners(winners.filter(w => w.id !== id))
  }

  const addTag = () => {
    if (!newTag.trim()) return
    setNewWinner({
      ...newWinner,
      tags: [...(newWinner.tags || []), newTag.trim().toLowerCase()],
    })
    setNewTag('')
  }

  const filteredWinners = winners.filter(winner => {
    const matchesSearch = !searchTerm || 
      winner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      winner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      winner.tags.some(t => t.includes(searchTerm.toLowerCase()))
    const matchesType = filterType === 'all' || winner.type === filterType
    return matchesSearch && matchesType
  })

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <Card style={{ border: '3px solid black', boxShadow: '4px 4px 0px 0px black' }}>
        <CardHeader style={{ borderBottom: '3px solid black', backgroundColor: '#F59E0B' }}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Winner Library
              </CardTitle>
              <CardDescription className="text-black">
                Document and learn from your winning ads, hooks, and strategies
              </CardDescription>
            </div>
            <Button
              onClick={() => setIsAdding(true)}
              style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black', backgroundColor: 'white' }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Winner
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Add New Winner Form */}
          {isAdding && (
            <div className="p-4 space-y-4" style={{ border: '2px solid black', backgroundColor: '#FEF9C3' }}>
              <div className="flex items-center justify-between">
                <h4 className="font-bold">Add New Winner</h4>
                <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Winner Name *</Label>
                  <Input
                    value={newWinner.name || ''}
                    onChange={(e) => setNewWinner({ ...newWinner, name: e.target.value })}
                    placeholder="e.g., Story Hook - 3 years ago..."
                    style={{ border: '2px solid black' }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type *</Label>
                  <Select
                    value={newWinner.type}
                    onValueChange={(value) => setNewWinner({ ...newWinner, type: value as Winner['type'] })}
                  >
                    <SelectTrigger style={{ border: '2px solid black' }}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hook">Hook</SelectItem>
                      <SelectItem value="copy">Ad Copy</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                      <SelectItem value="audience">Audience</SelectItem>
                      <SelectItem value="offer">Offer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description / Content</Label>
                <Textarea
                  value={newWinner.description || ''}
                  onChange={(e) => setNewWinner({ ...newWinner, description: e.target.value })}
                  placeholder="The actual hook, copy, or description of the winner..."
                  rows={3}
                  style={{ border: '2px solid black' }}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label>CTR (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={newWinner.metrics?.ctr || ''}
                    onChange={(e) => setNewWinner({
                      ...newWinner,
                      metrics: { ...newWinner.metrics, ctr: Number(e.target.value) }
                    })}
                    style={{ border: '2px solid black' }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>CPL ($)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newWinner.metrics?.cpl || ''}
                    onChange={(e) => setNewWinner({
                      ...newWinner,
                      metrics: { ...newWinner.metrics, cpl: Number(e.target.value) }
                    })}
                    style={{ border: '2px solid black' }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>CVR (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={newWinner.metrics?.cvr || ''}
                    onChange={(e) => setNewWinner({
                      ...newWinner,
                      metrics: { ...newWinner.metrics, cvr: Number(e.target.value) }
                    })}
                    style={{ border: '2px solid black' }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>ROAS</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={newWinner.metrics?.roas || ''}
                    onChange={(e) => setNewWinner({
                      ...newWinner,
                      metrics: { ...newWinner.metrics, roas: Number(e.target.value) }
                    })}
                    style={{ border: '2px solid black' }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Why It Won</Label>
                <Textarea
                  value={newWinner.whyItWon || ''}
                  onChange={(e) => setNewWinner({ ...newWinner, whyItWon: e.target.value })}
                  placeholder="Analyze why this performed so well..."
                  rows={2}
                  style={{ border: '2px solid black' }}
                />
              </div>

              <div className="space-y-2">
                <Label>How to Replicate</Label>
                <Textarea
                  value={newWinner.howToReplicate || ''}
                  onChange={(e) => setNewWinner({ ...newWinner, howToReplicate: e.target.value })}
                  placeholder="Steps to recreate this success..."
                  rows={2}
                  style={{ border: '2px solid black' }}
                />
              </div>

              <div className="space-y-2">
                <Label>Campaign</Label>
                <Input
                  value={newWinner.campaign || ''}
                  onChange={(e) => setNewWinner({ ...newWinner, campaign: e.target.value })}
                  placeholder="Which campaign was this from?"
                  style={{ border: '2px solid black' }}
                />
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    style={{ border: '2px solid black' }}
                  />
                  <Button onClick={addTag} variant="outline" style={{ border: '2px solid black' }}>
                    Add
                  </Button>
                </div>
                {(newWinner.tags || []).length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {newWinner.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" style={{ border: '1px solid black' }}>
                        {tag}
                        <button 
                          onClick={() => setNewWinner({
                            ...newWinner,
                            tags: newWinner.tags?.filter(t => t !== tag)
                          })} 
                          className="ml-1"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Button 
                onClick={addWinner}
                disabled={!newWinner.name || !newWinner.type}
                style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black', backgroundColor: '#F59E0B' }}
              >
                <Trophy className="mr-2 h-4 w-4" />
                Save Winner
              </Button>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search winners..."
                  className="pl-10"
                  style={{ border: '2px solid black' }}
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]" style={{ border: '2px solid black' }}>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="hook">Hooks</SelectItem>
                <SelectItem value="copy">Ad Copy</SelectItem>
                <SelectItem value="creative">Creatives</SelectItem>
                <SelectItem value="audience">Audiences</SelectItem>
                <SelectItem value="offer">Offers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats */}
          <div className="flex gap-3">
            {['hook', 'copy', 'creative', 'audience', 'offer'].map(type => {
              const count = winners.filter(w => w.type === type).length
              return (
                <div 
                  key={type}
                  className="px-3 py-1"
                  style={{ border: '2px solid black', backgroundColor: TYPE_COLORS[type as keyof typeof TYPE_COLORS] + '30' }}
                >
                  <span className="font-bold capitalize">{type}</span>
                  <span className="ml-2 font-mono">{count}</span>
                </div>
              )
            })}
          </div>

          {/* Winners List */}
          <div className="space-y-4">
            {filteredWinners.length === 0 ? (
              <div className="p-8 text-center" style={{ border: '2px dashed black' }}>
                <Trophy className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">No winners found. Start documenting your successes!</p>
              </div>
            ) : (
              filteredWinners.map((winner) => (
                <div
                  key={winner.id}
                  className="p-4"
                  style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black' }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <h4 className="font-bold">{winner.name}</h4>
                        <Badge 
                          style={{ 
                            border: '2px solid black',
                            backgroundColor: TYPE_COLORS[winner.type],
                            color: 'white'
                          }}
                        >
                          {winner.type}
                        </Badge>
                      </div>
                      
                      {winner.description && (
                        <div className="p-2 bg-gray-50 mb-3 font-mono text-sm" style={{ border: '1px solid black' }}>
                          {winner.description}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2"
                            onClick={() => copyToClipboard(winner.description)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      )}

                      {/* Metrics */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {winner.metrics.ctr && (
                          <Badge variant="outline" style={{ border: '2px solid black' }}>
                            <TrendingUp className="h-3 w-3 mr-1" />
                            CTR: {winner.metrics.ctr}%
                          </Badge>
                        )}
                        {winner.metrics.cpl && (
                          <Badge variant="outline" style={{ border: '2px solid black' }}>
                            CPL: ${winner.metrics.cpl}
                          </Badge>
                        )}
                        {winner.metrics.cvr && (
                          <Badge variant="outline" style={{ border: '2px solid black' }}>
                            CVR: {winner.metrics.cvr}%
                          </Badge>
                        )}
                        {winner.metrics.roas && (
                          <Badge variant="outline" style={{ border: '2px solid black' }}>
                            ROAS: {winner.metrics.roas}x
                          </Badge>
                        )}
                      </div>

                      {winner.whyItWon && (
                        <div className="p-2 bg-green-50 mb-2" style={{ border: '1px solid black' }}>
                          <p className="text-xs font-bold text-green-800">Why It Won</p>
                          <p className="text-sm">{winner.whyItWon}</p>
                        </div>
                      )}

                      {winner.howToReplicate && (
                        <div className="p-2 bg-blue-50 mb-2" style={{ border: '1px solid black' }}>
                          <p className="text-xs font-bold text-blue-800">How to Replicate</p>
                          <p className="text-sm">{winner.howToReplicate}</p>
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Campaign: {winner.campaign}</span>
                        <span>Won: {new Date(winner.dateWon).toLocaleDateString()}</span>
                      </div>

                      {winner.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {winner.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs" style={{ border: '1px solid black' }}>
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeWinner(winner.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
