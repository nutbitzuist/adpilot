import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, X, AlertTriangle, Search, TrendingDown, Lightbulb } from 'lucide-react'

interface Failure {
  id: string
  name: string
  type: 'hook' | 'copy' | 'creative' | 'audience' | 'offer'
  description: string
  whyItFailed: string
  lessonLearned: string
  campaign: string
  dateFailed: string
}

const MOCK_FAILURES: Failure[] = [
  {
    id: '1',
    name: 'Generic Question Hook',
    type: 'hook',
    description: 'Want to grow your business? Here\'s how...',
    whyItFailed: 'Too generic, no curiosity gap',
    lessonLearned: 'Specific hooks outperform generic ones by 3-5x',
    campaign: 'Lead Magnet',
    dateFailed: '2026-01-08',
  },
]

const TYPE_COLORS: Record<string, string> = {
  hook: '#EF4444', copy: '#F97316', creative: '#F59E0B', audience: '#84CC16', offer: '#06B6D4',
}

export function FailureLog() {
  const [failures, setFailures] = useState<Failure[]>(MOCK_FAILURES)
  const [isAdding, setIsAdding] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [newFailure, setNewFailure] = useState<Partial<Failure>>({})

  const addFailure = () => {
    if (!newFailure.name || !newFailure.type) return
    const failure: Failure = {
      id: Date.now().toString(),
      name: newFailure.name,
      type: newFailure.type as Failure['type'],
      description: newFailure.description || '',
      whyItFailed: newFailure.whyItFailed || '',
      lessonLearned: newFailure.lessonLearned || '',
      campaign: newFailure.campaign || '',
      dateFailed: new Date().toISOString().split('T')[0],
    }
    setFailures([failure, ...failures])
    setNewFailure({})
    setIsAdding(false)
  }

  const filteredFailures = failures.filter(f => 
    !searchTerm || f.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card style={{ border: '3px solid black', boxShadow: '4px 4px 0px 0px black' }}>
      <CardHeader style={{ borderBottom: '3px solid black', backgroundColor: '#EF4444' }}>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-white">
              <AlertTriangle className="h-5 w-5" />
              Failure Log
            </CardTitle>
            <CardDescription className="text-white/80">Learn from what didn't work</CardDescription>
          </div>
          <Button onClick={() => setIsAdding(true)} style={{ border: '2px solid black', backgroundColor: 'white' }}>
            <Plus className="mr-2 h-4 w-4" />Log Failure
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {isAdding && (
          <div className="p-4 space-y-4" style={{ border: '2px solid black', backgroundColor: '#FEE2E2' }}>
            <div className="flex justify-between"><h4 className="font-bold">Log a Failure</h4>
              <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}><X className="h-4 w-4" /></Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>What Failed *</Label>
                <Input value={newFailure.name || ''} onChange={(e) => setNewFailure({ ...newFailure, name: e.target.value })} style={{ border: '2px solid black' }} />
              </div>
              <div className="space-y-2">
                <Label>Type *</Label>
                <Select value={newFailure.type} onValueChange={(v) => setNewFailure({ ...newFailure, type: v as Failure['type'] })}>
                  <SelectTrigger style={{ border: '2px solid black' }}><SelectValue placeholder="Select type" /></SelectTrigger>
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
              <Label>Why It Failed</Label>
              <Textarea value={newFailure.whyItFailed || ''} onChange={(e) => setNewFailure({ ...newFailure, whyItFailed: e.target.value })} rows={2} style={{ border: '2px solid black' }} />
            </div>
            <div className="space-y-2">
              <Label>Lesson Learned</Label>
              <Textarea value={newFailure.lessonLearned || ''} onChange={(e) => setNewFailure({ ...newFailure, lessonLearned: e.target.value })} rows={2} style={{ border: '2px solid black' }} />
            </div>
            <Button onClick={addFailure} disabled={!newFailure.name || !newFailure.type} style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black', backgroundColor: '#EF4444', color: 'white' }}>
              Log Failure
            </Button>
          </div>
        )}

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search failures..." className="pl-10" style={{ border: '2px solid black' }} />
        </div>

        <div className="space-y-4">
          {filteredFailures.length === 0 ? (
            <div className="p-8 text-center" style={{ border: '2px dashed black' }}>
              <AlertTriangle className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">No failures logged yet.</p>
            </div>
          ) : (
            filteredFailures.map((failure) => (
              <div key={failure.id} className="p-4" style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black' }}>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="h-5 w-5 text-red-500" />
                  <h4 className="font-bold">{failure.name}</h4>
                  <Badge style={{ border: '2px solid black', backgroundColor: TYPE_COLORS[failure.type], color: 'white' }}>{failure.type}</Badge>
                </div>
                {failure.whyItFailed && (
                  <div className="p-2 bg-red-50 mb-2" style={{ border: '1px solid black' }}>
                    <p className="text-xs font-bold text-red-800">Why It Failed</p>
                    <p className="text-sm">{failure.whyItFailed}</p>
                  </div>
                )}
                {failure.lessonLearned && (
                  <div className="p-2 bg-yellow-50" style={{ border: '1px solid black' }}>
                    <p className="text-xs font-bold text-yellow-800 flex items-center gap-1"><Lightbulb className="h-3 w-3" />Lesson Learned</p>
                    <p className="text-sm">{failure.lessonLearned}</p>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">Campaign: {failure.campaign} • {failure.dateFailed}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
