import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Sparkles, 
  Copy, 
  RefreshCw, 
  Save,
  Wand2,
  MessageSquare,
  Target,
  Zap
} from 'lucide-react'
import { HOOK_TEMPLATES, HOOK_CATEGORIES } from '@/data/hook-templates'
import { COPY_FRAMEWORKS } from '@/data/copy-frameworks'
import { COPY_TONES } from '@/lib/constants'
import type { Offer, CustomerAvatar, AdCopy } from '@/types'

interface CopyGeneratorProps {
  offers: Offer[]
  avatars: CustomerAvatar[]
  onSaveCopy: (copy: Partial<AdCopy>) => Promise<void>
}

export function CopyGenerator({ offers, avatars, onSaveCopy }: CopyGeneratorProps) {
  const [selectedOffer, setSelectedOffer] = useState<string>('')
  const [selectedAvatar, setSelectedAvatar] = useState<string>('')
  const [selectedFramework, setSelectedFramework] = useState<string>('pas')
  const [selectedHookCategory, setSelectedHookCategory] = useState<string>('question')
  const [selectedTone, setSelectedTone] = useState<string>('Conversational')
  
  const [hook, setHook] = useState('')
  const [body, setBody] = useState('')
  const [cta, setCta] = useState('')
  const [copyName, setCopyName] = useState('')

  const offer = offers.find(o => o.id === selectedOffer)
  const avatar = avatars.find(a => a.id === selectedAvatar)
  const framework = COPY_FRAMEWORKS.find(f => f.id === selectedFramework)
  const hookTemplates = HOOK_TEMPLATES[selectedHookCategory] || []

  const generateHook = () => {
    if (!hookTemplates.length) return
    const template = hookTemplates[Math.floor(Math.random() * hookTemplates.length)]
    
    let generatedHook = template.example
    
    if (avatar) {
      generatedHook = generatedHook
        .replace('[pain point]', avatar.frustrations[0] || 'struggling')
        .replace('[goal]', avatar.goals[0] || 'success')
        .replace('[audience]', avatar.jobTitle || 'professionals')
    }
    
    if (offer) {
      generatedHook = generatedHook
        .replace('[result]', offer.afterState || 'amazing results')
        .replace('[timeframe]', offer.timeframe || 'quickly')
    }
    
    setHook(generatedHook)
  }

  const generateBody = () => {
    if (!framework || !avatar || !offer) return
    
    let generatedBody = ''
    
    framework.structure.forEach((section) => {
      let sectionContent = section.placeholder
      
      if (avatar) {
        sectionContent = sectionContent
          .replace('[pain]', avatar.frustrations[0] || 'current challenges')
          .replace('[frustration]', avatar.frustrations[1] || 'obstacles')
          .replace('[goal]', avatar.goals[0] || 'desired outcome')
          .replace('[desire]', avatar.desires[0] || 'what they want')
      }
      
      if (offer) {
        sectionContent = sectionContent
          .replace('[solution]', offer.name || 'our solution')
          .replace('[benefit]', offer.headline || 'key benefit')
          .replace('[result]', offer.afterState || 'transformation')
      }
      
      generatedBody += sectionContent + '\n\n'
    })
    
    setBody(generatedBody.trim())
  }

  const generateCta = () => {
    const ctas = [
      '👇 Click the link below to get started',
      '🔥 Tap "Learn More" to claim your spot',
      '➡️ Click below to see how it works',
      '💡 Ready to transform? Click the button below',
      '🚀 Start your journey - link in comments',
    ]
    setCta(ctas[Math.floor(Math.random() * ctas.length)])
  }

  const generateAll = () => {
    generateHook()
    generateBody()
    generateCta()
  }

  const getFullCopy = () => {
    return [hook, body, cta].filter(Boolean).join('\n\n')
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(getFullCopy())
  }

  const handleSave = async () => {
    if (!copyName.trim()) {
      alert('Please enter a name for this copy')
      return
    }
    
    await onSaveCopy({
      name: copyName,
      offerId: selectedOffer || undefined,
      hook,
      body,
      cta,
      fullText: getFullCopy(),
      hookType: selectedHookCategory,
      tone: selectedTone,
      status: 'draft',
    })
    
    setCopyName('')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Context
            </CardTitle>
            <CardDescription>
              Select your offer and target audience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Offer</Label>
              <Select value={selectedOffer} onValueChange={setSelectedOffer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an offer" />
                </SelectTrigger>
                <SelectContent>
                  {offers.map((offer) => (
                    <SelectItem key={offer.id} value={offer.id}>
                      {offer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Target Avatar</Label>
              <Select value={selectedAvatar} onValueChange={setSelectedAvatar}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an avatar" />
                </SelectTrigger>
                <SelectContent>
                  {avatars.map((avatar) => (
                    <SelectItem key={avatar.id} value={avatar.id}>
                      {avatar.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={selectedTone} onValueChange={setSelectedTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COPY_TONES.map((tone) => (
                    <SelectItem key={tone} value={tone}>
                      {tone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Hook Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Hook Type</Label>
              <Select value={selectedHookCategory} onValueChange={setSelectedHookCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {HOOK_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <ScrollArea className="h-32 rounded-md border p-2">
              <div className="space-y-2">
                {hookTemplates.slice(0, 5).map((template) => (
                  <div
                    key={template.id}
                    className="p-2 rounded cursor-pointer hover:bg-muted text-sm"
                    onClick={() => setHook(template.example)}
                  >
                    <p className="font-medium">{template.template}</p>
                    <p className="text-xs text-muted-foreground">{template.example}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Button variant="outline" className="w-full" onClick={generateHook}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate Hook
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Copy Framework
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Framework</Label>
              <Select value={selectedFramework} onValueChange={setSelectedFramework}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COPY_FRAMEWORKS.map((fw) => (
                    <SelectItem key={fw.id} value={fw.id}>
                      {fw.name} - {fw.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {framework && (
              <div className="rounded-lg bg-muted p-3 space-y-2">
                <p className="font-medium text-sm">{framework.name}</p>
                <div className="flex flex-wrap gap-1">
                  {framework.structure.map((section, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {section.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Button variant="outline" className="w-full" onClick={generateBody}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate Body
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Copy Editor
              </span>
              <Button onClick={generateAll}>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Hook (First Line)</Label>
              <Textarea
                value={hook}
                onChange={(e) => setHook(e.target.value)}
                placeholder="Your attention-grabbing opening..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Body</Label>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="The main content of your ad..."
                rows={8}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Call to Action</Label>
                <Button variant="ghost" size="sm" onClick={generateCta}>
                  <RefreshCw className="h-3 w-3" />
                </Button>
              </div>
              <Input
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                placeholder="e.g., Click below to learn more →"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted p-4 min-h-[200px]">
              <p className="whitespace-pre-wrap text-sm">
                {getFullCopy() || 'Your copy will appear here...'}
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <span>{getFullCopy().length} characters</span>
              <span>{getFullCopy().split(/\s+/).filter(Boolean).length} words</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Copy Name</Label>
                <Input
                  value={copyName}
                  onChange={(e) => setCopyName(e.target.value)}
                  placeholder="e.g., Lead Magnet - Question Hook v1"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={copyToClipboard}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy to Clipboard
                </Button>
                <Button className="flex-1" onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Copy
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
