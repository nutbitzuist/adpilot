import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, X, Search, ExternalLink, Image, Video, LayoutGrid, Bookmark, Tag } from 'lucide-react'

interface SwipeEntry {
  id: string
  source: string
  sourceUrl?: string
  primaryText: string
  headline?: string
  description?: string
  hookType: string
  whyItWorks: string
  industry: string
  formatType: string
  tags: string[]
  createdAt: Date
}

const HOOK_TYPES = [
  'Question', 'Bold Claim', 'Story', 'Pattern Interrupt', 'Statistic', 'Curiosity', 'Social Proof', 'Controversy'
]

const FORMAT_TYPES = [
  { value: 'image', label: 'Static Image', icon: Image },
  { value: 'video', label: 'Video', icon: Video },
  { value: 'carousel', label: 'Carousel', icon: LayoutGrid },
]

const INDUSTRIES = [
  'Consulting', 'Coaching', 'Online Courses', 'SaaS', 'E-commerce', 'Agency', 'Health & Fitness', 'Finance', 'Other'
]

export function SwipeFile() {
  const [entries, setEntries] = useState<SwipeEntry[]>([
    {
      id: '1',
      source: 'Facebook Ad Library',
      sourceUrl: 'https://facebook.com/ads/library',
      primaryText: 'I spent 10 years building businesses the hard way. Then I discovered this one framework that changed everything...',
      headline: 'The Framework That Built 7-Figure Businesses',
      hookType: 'Story',
      whyItWorks: 'Opens with relatable struggle, creates curiosity with "one framework", implies transformation',
      industry: 'Consulting',
      formatType: 'video',
      tags: ['story-hook', 'transformation', 'framework'],
      createdAt: new Date(),
    },
    {
      id: '2',
      source: 'Competitor Research',
      primaryText: '97% of coaches never hit 6 figures. Here\'s what the top 3% do differently...',
      headline: 'The 3% Secret',
      hookType: 'Statistic',
      whyItWorks: 'Specific statistic creates credibility, exclusivity of "top 3%" creates aspiration',
      industry: 'Coaching',
      formatType: 'image',
      tags: ['statistic', 'exclusivity', 'coaching'],
      createdAt: new Date(),
    },
  ])
  const [isAdding, setIsAdding] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterHookType, setFilterHookType] = useState<string>('all')
  const [filterIndustry, setFilterIndustry] = useState<string>('all')
  const [newEntry, setNewEntry] = useState<Partial<SwipeEntry>>({
    formatType: 'image',
    tags: [],
  })
  const [newTag, setNewTag] = useState('')

  const addEntry = () => {
    if (!newEntry.primaryText || !newEntry.hookType) return
    
    const entry: SwipeEntry = {
      id: Date.now().toString(),
      source: newEntry.source || 'Unknown',
      sourceUrl: newEntry.sourceUrl,
      primaryText: newEntry.primaryText,
      headline: newEntry.headline,
      description: newEntry.description,
      hookType: newEntry.hookType,
      whyItWorks: newEntry.whyItWorks || '',
      industry: newEntry.industry || 'Other',
      formatType: newEntry.formatType || 'image',
      tags: newEntry.tags || [],
      createdAt: new Date(),
    }
    
    setEntries([entry, ...entries])
    setNewEntry({ formatType: 'image', tags: [] })
    setIsAdding(false)
  }

  const removeEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id))
  }

  const addTag = () => {
    if (!newTag.trim()) return
    setNewEntry({
      ...newEntry,
      tags: [...(newEntry.tags || []), newTag.trim().toLowerCase()],
    })
    setNewTag('')
  }

  const removeTag = (tag: string) => {
    setNewEntry({
      ...newEntry,
      tags: (newEntry.tags || []).filter(t => t !== tag),
    })
  }

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = !searchTerm || 
      entry.primaryText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.headline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some(t => t.includes(searchTerm.toLowerCase()))
    const matchesHookType = filterHookType === 'all' || entry.hookType === filterHookType
    const matchesIndustry = filterIndustry === 'all' || entry.industry === filterIndustry
    return matchesSearch && matchesHookType && matchesIndustry
  })

  const getFormatIcon = (format: string) => {
    const formatConfig = FORMAT_TYPES.find(f => f.value === format)
    return formatConfig?.icon || Image
  }

  return (
    <div className="space-y-6">
      <Card style={{ border: '3px solid black', boxShadow: '4px 4px 0px 0px black' }}>
        <CardHeader style={{ borderBottom: '3px solid black', backgroundColor: '#EC4899' }}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-white">
                <Bookmark className="h-5 w-5" />
                Swipe File
              </CardTitle>
              <CardDescription className="text-white/80">
                Save and analyze winning ads for inspiration
              </CardDescription>
            </div>
            <Button
              onClick={() => setIsAdding(true)}
              style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black', backgroundColor: 'white' }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Entry
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Add New Entry Form */}
          {isAdding && (
            <div className="p-4 space-y-4" style={{ border: '2px solid black', backgroundColor: '#FDF2F8' }}>
              <div className="flex items-center justify-between">
                <h4 className="font-bold">Add New Swipe</h4>
                <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Source</Label>
                  <Input
                    value={newEntry.source || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, source: e.target.value })}
                    placeholder="e.g., Facebook Ad Library, Competitor"
                    style={{ border: '2px solid black' }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Source URL (optional)</Label>
                  <Input
                    value={newEntry.sourceUrl || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, sourceUrl: e.target.value })}
                    placeholder="https://..."
                    style={{ border: '2px solid black' }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Primary Text / Ad Copy *</Label>
                <Textarea
                  value={newEntry.primaryText || ''}
                  onChange={(e) => setNewEntry({ ...newEntry, primaryText: e.target.value })}
                  placeholder="Paste the ad copy here..."
                  rows={4}
                  style={{ border: '2px solid black' }}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Headline</Label>
                  <Input
                    value={newEntry.headline || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, headline: e.target.value })}
                    placeholder="Ad headline"
                    style={{ border: '2px solid black' }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hook Type *</Label>
                  <Select
                    value={newEntry.hookType}
                    onValueChange={(value) => setNewEntry({ ...newEntry, hookType: value })}
                  >
                    <SelectTrigger style={{ border: '2px solid black' }}>
                      <SelectValue placeholder="Select hook type" />
                    </SelectTrigger>
                    <SelectContent>
                      {HOOK_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Select
                    value={newEntry.industry}
                    onValueChange={(value) => setNewEntry({ ...newEntry, industry: value })}
                  >
                    <SelectTrigger style={{ border: '2px solid black' }}>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRIES.map((ind) => (
                        <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Format Type</Label>
                  <Select
                    value={newEntry.formatType}
                    onValueChange={(value) => setNewEntry({ ...newEntry, formatType: value })}
                  >
                    <SelectTrigger style={{ border: '2px solid black' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FORMAT_TYPES.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          <span className="flex items-center gap-2">
                            <format.icon className="h-4 w-4" />
                            {format.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Why It Works</Label>
                <Textarea
                  value={newEntry.whyItWorks || ''}
                  onChange={(e) => setNewEntry({ ...newEntry, whyItWorks: e.target.value })}
                  placeholder="Analyze why this ad is effective..."
                  rows={2}
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
                    <Tag className="h-4 w-4" />
                  </Button>
                </div>
                {(newEntry.tags || []).length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {newEntry.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" style={{ border: '2px solid black' }}>
                        {tag}
                        <button onClick={() => removeTag(tag)} className="ml-1">×</button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Button 
                onClick={addEntry}
                disabled={!newEntry.primaryText || !newEntry.hookType}
                style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black', backgroundColor: '#EC4899', color: 'white' }}
              >
                Save to Swipe File
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
                  placeholder="Search swipes..."
                  className="pl-10"
                  style={{ border: '2px solid black' }}
                />
              </div>
            </div>
            <Select value={filterHookType} onValueChange={setFilterHookType}>
              <SelectTrigger className="w-[150px]" style={{ border: '2px solid black' }}>
                <SelectValue placeholder="Hook Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Hooks</SelectItem>
                {HOOK_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterIndustry} onValueChange={setFilterIndustry}>
              <SelectTrigger className="w-[150px]" style={{ border: '2px solid black' }}>
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {INDUSTRIES.map((ind) => (
                  <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Entries List */}
          <div className="space-y-4">
            {filteredEntries.length === 0 ? (
              <div className="p-8 text-center" style={{ border: '2px dashed black' }}>
                <Bookmark className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">No swipes found. Start building your collection!</p>
              </div>
            ) : (
              filteredEntries.map((entry) => {
                const FormatIcon = getFormatIcon(entry.formatType)
                return (
                  <div
                    key={entry.id}
                    className="p-4 bg-white"
                    style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black' }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge style={{ border: '2px solid black', backgroundColor: '#EC4899', color: 'white' }}>
                            {entry.hookType}
                          </Badge>
                          <Badge variant="outline" style={{ border: '2px solid black' }}>
                            <FormatIcon className="h-3 w-3 mr-1" />
                            {entry.formatType}
                          </Badge>
                          <Badge variant="outline" style={{ border: '2px solid black' }}>
                            {entry.industry}
                          </Badge>
                        </div>
                        
                        {entry.headline && (
                          <h4 className="font-bold mb-1">{entry.headline}</h4>
                        )}
                        <p className="text-sm mb-2 whitespace-pre-wrap">{entry.primaryText}</p>
                        
                        {entry.whyItWorks && (
                          <div className="p-2 bg-green-50 text-sm" style={{ border: '1px solid black' }}>
                            <strong>Why it works:</strong> {entry.whyItWorks}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground">Source: {entry.source}</span>
                          {entry.sourceUrl && (
                            <a href={entry.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                        
                        {entry.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {entry.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs" style={{ border: '1px solid black' }}>
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeEntry(entry.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
