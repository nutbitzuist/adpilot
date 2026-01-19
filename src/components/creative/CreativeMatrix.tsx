import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, X, Grid3X3, Shuffle, Download, Eye } from 'lucide-react'

interface CreativeVariation {
  id: string
  hook: string
  visual: string
  cta: string
  status: 'idea' | 'in_progress' | 'ready' | 'testing' | 'winner'
}

const HOOK_IDEAS = [
  'Question hook',
  'Bold claim',
  'Story opener',
  'Statistic',
  'Pattern interrupt',
  'Social proof',
  'Curiosity gap',
]

const VISUAL_IDEAS = [
  'Talking head',
  'Text overlay',
  'Product demo',
  'Before/After',
  'Lifestyle shot',
  'UGC style',
  'Animated graphics',
  'Screenshot/proof',
]

const CTA_IDEAS = [
  'Learn More',
  'Get Started',
  'Book a Call',
  'Download Free',
  'Watch Now',
  'Claim Offer',
  'Join Free',
  'Get Access',
]

const STATUS_COLORS = {
  idea: { bg: '#E5E7EB', text: '#374151' },
  in_progress: { bg: '#FEF3C7', text: '#92400E' },
  ready: { bg: '#DBEAFE', text: '#1E40AF' },
  testing: { bg: '#EDE9FE', text: '#5B21B6' },
  winner: { bg: '#D1FAE5', text: '#065F46' },
}

export function CreativeMatrix() {
  const [variations, setVariations] = useState<CreativeVariation[]>([
    { id: '1', hook: 'Question hook', visual: 'Talking head', cta: 'Learn More', status: 'testing' },
    { id: '2', hook: 'Bold claim', visual: 'Text overlay', cta: 'Get Started', status: 'ready' },
    { id: '3', hook: 'Story opener', visual: 'UGC style', cta: 'Book a Call', status: 'winner' },
  ])
  const [newVariation, setNewVariation] = useState<Partial<CreativeVariation>>({})
  const [isAdding, setIsAdding] = useState(false)

  const addVariation = () => {
    if (!newVariation.hook || !newVariation.visual || !newVariation.cta) return
    
    const variation: CreativeVariation = {
      id: Date.now().toString(),
      hook: newVariation.hook,
      visual: newVariation.visual,
      cta: newVariation.cta,
      status: 'idea',
    }
    
    setVariations([...variations, variation])
    setNewVariation({})
    setIsAdding(false)
  }

  const removeVariation = (id: string) => {
    setVariations(variations.filter(v => v.id !== id))
  }

  const updateStatus = (id: string, status: CreativeVariation['status']) => {
    setVariations(variations.map(v => v.id === id ? { ...v, status } : v))
  }

  const generateRandomCombination = () => {
    const randomHook = HOOK_IDEAS[Math.floor(Math.random() * HOOK_IDEAS.length)]
    const randomVisual = VISUAL_IDEAS[Math.floor(Math.random() * VISUAL_IDEAS.length)]
    const randomCta = CTA_IDEAS[Math.floor(Math.random() * CTA_IDEAS.length)]
    
    const variation: CreativeVariation = {
      id: Date.now().toString(),
      hook: randomHook,
      visual: randomVisual,
      cta: randomCta,
      status: 'idea',
    }
    
    setVariations([...variations, variation])
  }

  const generateAllCombinations = () => {
    // Generate a subset of combinations (3 hooks x 3 visuals x 2 CTAs = 18)
    const newVariations: CreativeVariation[] = []
    const selectedHooks = HOOK_IDEAS.slice(0, 3)
    const selectedVisuals = VISUAL_IDEAS.slice(0, 3)
    const selectedCtas = CTA_IDEAS.slice(0, 2)
    
    selectedHooks.forEach(hook => {
      selectedVisuals.forEach(visual => {
        selectedCtas.forEach(cta => {
          // Check if combination already exists
          const exists = variations.some(v => v.hook === hook && v.visual === visual && v.cta === cta)
          if (!exists) {
            newVariations.push({
              id: Date.now().toString() + Math.random(),
              hook,
              visual,
              cta,
              status: 'idea',
            })
          }
        })
      })
    })
    
    setVariations([...variations, ...newVariations.slice(0, 9)]) // Limit to 9 new
  }

  const exportMatrix = () => {
    const csv = [
      ['Hook', 'Visual', 'CTA', 'Status'].join(','),
      ...variations.map(v => [v.hook, v.visual, v.cta, v.status].join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'creative-matrix.csv'
    a.click()
  }

  const statusCounts = {
    idea: variations.filter(v => v.status === 'idea').length,
    in_progress: variations.filter(v => v.status === 'in_progress').length,
    ready: variations.filter(v => v.status === 'ready').length,
    testing: variations.filter(v => v.status === 'testing').length,
    winner: variations.filter(v => v.status === 'winner').length,
  }

  return (
    <div className="space-y-6">
      <Card style={{ border: '3px solid black', boxShadow: '4px 4px 0px 0px black' }}>
        <CardHeader style={{ borderBottom: '3px solid black', backgroundColor: '#10B981' }}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-white">
                <Grid3X3 className="h-5 w-5" />
                Creative Testing Matrix
              </CardTitle>
              <CardDescription className="text-white/80">
                Plan and track your creative variations systematically
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={generateRandomCombination}
                style={{ border: '2px solid black', backgroundColor: 'white' }}
              >
                <Shuffle className="h-4 w-4 mr-1" />
                Random
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportMatrix}
                style={{ border: '2px solid black', backgroundColor: 'white' }}
              >
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Status Overview */}
          <div className="flex flex-wrap gap-3">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div 
                key={status}
                className="px-3 py-2"
                style={{ 
                  border: '2px solid black',
                  backgroundColor: STATUS_COLORS[status as keyof typeof STATUS_COLORS].bg
                }}
              >
                <span className="font-bold capitalize">{status.replace('_', ' ')}</span>
                <span className="ml-2 font-mono">{count}</span>
              </div>
            ))}
          </div>

          {/* Add New Variation */}
          {isAdding ? (
            <div className="p-4 space-y-4" style={{ border: '2px solid black', backgroundColor: '#F0FDF4' }}>
              <div className="flex items-center justify-between">
                <h4 className="font-bold">Add Creative Variation</h4>
                <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Hook Type</Label>
                  <select
                    value={newVariation.hook || ''}
                    onChange={(e) => setNewVariation({ ...newVariation, hook: e.target.value })}
                    className="w-full p-2"
                    style={{ border: '2px solid black' }}
                  >
                    <option value="">Select hook...</option>
                    {HOOK_IDEAS.map(hook => (
                      <option key={hook} value={hook}>{hook}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Visual Style</Label>
                  <select
                    value={newVariation.visual || ''}
                    onChange={(e) => setNewVariation({ ...newVariation, visual: e.target.value })}
                    className="w-full p-2"
                    style={{ border: '2px solid black' }}
                  >
                    <option value="">Select visual...</option>
                    {VISUAL_IDEAS.map(visual => (
                      <option key={visual} value={visual}>{visual}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>CTA</Label>
                  <select
                    value={newVariation.cta || ''}
                    onChange={(e) => setNewVariation({ ...newVariation, cta: e.target.value })}
                    className="w-full p-2"
                    style={{ border: '2px solid black' }}
                  >
                    <option value="">Select CTA...</option>
                    {CTA_IDEAS.map(cta => (
                      <option key={cta} value={cta}>{cta}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Button 
                onClick={addVariation}
                disabled={!newVariation.hook || !newVariation.visual || !newVariation.cta}
                style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black', backgroundColor: '#10B981', color: 'white' }}
              >
                Add Variation
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={() => setIsAdding(true)}
                style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black' }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Variation
              </Button>
              <Button
                variant="outline"
                onClick={generateAllCombinations}
                style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black' }}
              >
                <Grid3X3 className="h-4 w-4 mr-2" />
                Generate Matrix
              </Button>
            </div>
          )}

          {/* Matrix Grid */}
          <div className="space-y-3">
            <h4 className="font-bold">Creative Variations ({variations.length})</h4>
            
            {variations.length === 0 ? (
              <div className="p-8 text-center" style={{ border: '2px dashed black' }}>
                <Grid3X3 className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">No variations yet. Add your first creative combination!</p>
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {variations.map((variation) => (
                  <div
                    key={variation.id}
                    className="p-3"
                    style={{ 
                      border: '2px solid black',
                      boxShadow: '3px 3px 0px 0px black',
                      backgroundColor: STATUS_COLORS[variation.status].bg
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <select
                        value={variation.status}
                        onChange={(e) => updateStatus(variation.id, e.target.value as CreativeVariation['status'])}
                        className="text-xs font-bold px-2 py-1"
                        style={{ 
                          border: '1px solid black',
                          backgroundColor: 'white'
                        }}
                      >
                        <option value="idea">💡 Idea</option>
                        <option value="in_progress">🔨 In Progress</option>
                        <option value="ready">✅ Ready</option>
                        <option value="testing">🧪 Testing</option>
                        <option value="winner">🏆 Winner</option>
                      </select>
                      <Button variant="ghost" size="sm" onClick={() => removeVariation(variation.id)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs" style={{ border: '1px solid black' }}>
                          Hook
                        </Badge>
                        <span className="text-sm font-medium">{variation.hook}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs" style={{ border: '1px solid black' }}>
                          Visual
                        </Badge>
                        <span className="text-sm font-medium">{variation.visual}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs" style={{ border: '1px solid black' }}>
                          CTA
                        </Badge>
                        <span className="text-sm font-medium">{variation.cta}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="p-4" style={{ border: '2px solid black', backgroundColor: '#F0FDF4' }}>
            <h4 className="font-bold mb-2">🎯 Creative Testing Best Practices</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>Test one variable at a time</strong> to isolate what works</li>
              <li>• <strong>Start with hooks</strong> - they have the biggest impact on CTR</li>
              <li>• <strong>Run tests for 3-7 days</strong> minimum before declaring winners</li>
              <li>• <strong>Document learnings</strong> from both winners and losers</li>
              <li>• <strong>Iterate on winners</strong> - small tweaks can yield big gains</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
