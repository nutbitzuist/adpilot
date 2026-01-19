import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { 
  Lightbulb, 
  Plus, 
  Search, 
  Filter, 
  Target, 
  Palette, 
  PenTool, 
  Megaphone,
  TrendingUp,
  BookOpen,
  Tag,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react'
import { useLearnings } from '@/hooks/useTests'
import type { Learning } from '@/types'

const CATEGORIES = [
  { value: 'audience', label: 'Audience', icon: Target },
  { value: 'copy', label: 'Copy', icon: PenTool },
  { value: 'creative', label: 'Creative', icon: Palette },
  { value: 'campaign', label: 'Campaign', icon: Megaphone },
  { value: 'general', label: 'General', icon: BookOpen },
]

const IMPACT_LEVELS = [
  { value: 'high', label: 'High Impact', color: 'bg-green-500' },
  { value: 'medium', label: 'Medium Impact', color: 'bg-yellow-500' },
  { value: 'low', label: 'Low Impact', color: 'bg-gray-400' },
]

const SOURCES = [
  { value: 'test', label: 'A/B Test' },
  { value: 'observation', label: 'Observation' },
  { value: 'external', label: 'External Research' },
  { value: 'campaign', label: 'Campaign Analysis' },
]

export function LearningLibrary() {
  const { learnings, createLearning } = useLearnings()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [impactFilter, setImpactFilter] = useState<string>('all')
  
  const [newLearning, setNewLearning] = useState<Partial<Learning>>({
    title: '',
    description: '',
    category: 'general',
    source: 'observation',
    impactLevel: 'medium',
    tags: [],
  })
  const [tagInput, setTagInput] = useState('')

  const filteredLearnings = learnings.filter(learning => {
    const matchesSearch = 
      learning.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      learning.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      learning.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = categoryFilter === 'all' || learning.category === categoryFilter
    const matchesImpact = impactFilter === 'all' || learning.impactLevel === impactFilter
    
    return matchesSearch && matchesCategory && matchesImpact
  })

  const handleAddTag = () => {
    if (tagInput.trim() && !newLearning.tags?.includes(tagInput.trim())) {
      setNewLearning({
        ...newLearning,
        tags: [...(newLearning.tags || []), tagInput.trim().toLowerCase()],
      })
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setNewLearning({
      ...newLearning,
      tags: newLearning.tags?.filter(tag => tag !== tagToRemove),
    })
  }

  const handleSave = async () => {
    if (!newLearning.title) return
    
    await createLearning.mutateAsync(newLearning)
    setNewLearning({
      title: '',
      description: '',
      category: 'general',
      source: 'observation',
      impactLevel: 'medium',
      tags: [],
    })
    setIsSheetOpen(false)
  }

  const getCategoryIcon = (category?: string) => {
    const cat = CATEGORIES.find(c => c.value === category)
    return cat ? cat.icon : BookOpen
  }

  const getImpactIcon = (impact?: string) => {
    switch (impact) {
      case 'high': return ArrowUpRight
      case 'low': return ArrowDownRight
      default: return Minus
    }
  }

  const getImpactColor = (impact?: string) => {
    switch (impact) {
      case 'high': return 'text-green-600 bg-green-50 border-green-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-gray-600 bg-gray-50 border-gray-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const learningsByCategory = CATEGORIES.map(cat => ({
    ...cat,
    count: learnings.filter(l => l.category === cat.value).length,
  }))

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-5">
        {learningsByCategory.map((cat) => {
          const Icon = cat.icon
          return (
            <Card 
              key={cat.value}
              className="cursor-pointer transition-all hover:translate-y-[-2px]"
              style={{ 
                border: '2px solid black', 
                boxShadow: '3px 3px 0px 0px black',
                backgroundColor: categoryFilter === cat.value ? '#FFD700' : 'white'
              }}
              onClick={() => setCategoryFilter(categoryFilter === cat.value ? 'all' : cat.value)}
            >
              <CardContent className="p-4 text-center">
                <Icon className="mx-auto h-6 w-6 mb-2" />
                <p className="text-2xl font-bold">{cat.count}</p>
                <p className="text-xs text-muted-foreground">{cat.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Search and Filters */}
      <Card style={{ border: '2px solid black', boxShadow: '4px 4px 0px 0px black' }}>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search learnings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                style={{ border: '2px solid black' }}
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px]" style={{ border: '2px solid black' }}>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={impactFilter} onValueChange={setImpactFilter}>
                <SelectTrigger className="w-[150px]" style={{ border: '2px solid black' }}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Impact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Impact</SelectItem>
                  {IMPACT_LEVELS.map(level => (
                    <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={() => setIsSheetOpen(true)}
                style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black' }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Learning
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learnings List */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredLearnings.length === 0 ? (
          <Card 
            className="md:col-span-2" 
            style={{ border: '2px solid black', boxShadow: '4px 4px 0px 0px black' }}
          >
            <CardContent className="py-12 text-center">
              <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg">No learnings found</h3>
              <p className="text-muted-foreground mt-1">
                {searchQuery || categoryFilter !== 'all' || impactFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Start documenting your learnings from tests and campaigns'}
              </p>
              <Button 
                className="mt-4"
                onClick={() => setIsSheetOpen(true)}
                style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black' }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Learning
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredLearnings.map((learning) => {
            const CategoryIcon = getCategoryIcon(learning.category)
            const ImpactIcon = getImpactIcon(learning.impactLevel)
            
            return (
              <Card 
                key={learning.id}
                className="hover:translate-y-[-2px] transition-all"
                style={{ border: '2px solid black', boxShadow: '4px 4px 0px 0px black' }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="p-2"
                        style={{ 
                          backgroundColor: '#FFD700', 
                          border: '2px solid black',
                          boxShadow: '2px 2px 0px 0px black'
                        }}
                      >
                        <CategoryIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{learning.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getImpactColor(learning.impactLevel)}`}
                            style={{ border: '2px solid black' }}
                          >
                            <ImpactIcon className="h-3 w-3 mr-1" />
                            {learning.impactLevel} impact
                          </Badge>
                          {learning.source && (
                            <Badge variant="secondary" className="text-xs">
                              {learning.source}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {learning.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {learning.description}
                    </p>
                  )}
                  
                  {learning.tags && learning.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {learning.tags.map((tag, i) => (
                        <Badge 
                          key={i} 
                          variant="outline" 
                          className="text-xs"
                          style={{ border: '1px solid black' }}
                        >
                          <Tag className="h-2 w-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center text-xs text-muted-foreground pt-2 border-t">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(learning.createdAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Add Learning Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent 
          className="w-full sm:max-w-lg overflow-y-auto"
          style={{ border: '3px solid black' }}
        >
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Document Learning
            </SheetTitle>
          </SheetHeader>
          
          <div className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={newLearning.title}
                onChange={(e) => setNewLearning({ ...newLearning, title: e.target.value })}
                placeholder="What did you learn?"
                style={{ border: '2px solid black' }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newLearning.description}
                onChange={(e) => setNewLearning({ ...newLearning, description: e.target.value })}
                placeholder="Describe the learning in detail..."
                rows={4}
                style={{ border: '2px solid black' }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select 
                  value={newLearning.category} 
                  onValueChange={(value) => setNewLearning({ ...newLearning, category: value })}
                >
                  <SelectTrigger style={{ border: '2px solid black' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex items-center gap-2">
                          <cat.icon className="h-4 w-4" />
                          {cat.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Source</Label>
                <Select 
                  value={newLearning.source} 
                  onValueChange={(value) => setNewLearning({ ...newLearning, source: value })}
                >
                  <SelectTrigger style={{ border: '2px solid black' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SOURCES.map(source => (
                      <SelectItem key={source.value} value={source.value}>
                        {source.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Impact Level</Label>
              <div className="grid grid-cols-3 gap-2">
                {IMPACT_LEVELS.map(level => (
                  <Button
                    key={level.value}
                    type="button"
                    variant={newLearning.impactLevel === level.value ? 'default' : 'outline'}
                    className="w-full"
                    onClick={() => setNewLearning({ ...newLearning, impactLevel: level.value })}
                    style={{ 
                      border: '2px solid black',
                      backgroundColor: newLearning.impactLevel === level.value ? '#7C3AED' : 'white',
                      color: newLearning.impactLevel === level.value ? 'white' : 'black'
                    }}
                  >
                    {level.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag..."
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  style={{ border: '2px solid black' }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleAddTag}
                  style={{ border: '2px solid black' }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {newLearning.tags && newLearning.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {newLearning.tags.map((tag, i) => (
                    <Badge 
                      key={i} 
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleRemoveTag(tag)}
                      style={{ border: '1px solid black' }}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsSheetOpen(false)}
                style={{ border: '2px solid black' }}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={handleSave}
                disabled={!newLearning.title || createLearning.isPending}
                style={{ 
                  border: '2px solid black', 
                  boxShadow: '3px 3px 0px 0px black',
                  backgroundColor: '#7C3AED'
                }}
              >
                {createLearning.isPending ? 'Saving...' : 'Save Learning'}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
