import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Image, Video, LayoutGrid, Play, Smartphone, Monitor, CheckCircle, Star } from 'lucide-react'

interface FormatRecommendation {
  format: string
  score: number
  reasons: string[]
  specs: { dimension: string; ratio: string; maxSize: string }
  tips: string[]
}

const OBJECTIVES = [
  { value: 'awareness', label: 'Brand Awareness' },
  { value: 'traffic', label: 'Website Traffic' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'leads', label: 'Lead Generation' },
  { value: 'conversions', label: 'Conversions/Sales' },
  { value: 'app_installs', label: 'App Installs' },
  { value: 'video_views', label: 'Video Views' },
]

const FUNNEL_STAGES = [
  { value: 'tof', label: 'Top of Funnel (Cold)' },
  { value: 'mof', label: 'Middle of Funnel (Warm)' },
  { value: 'bof', label: 'Bottom of Funnel (Hot)' },
]

const CONTENT_TYPES = [
  { value: 'educational', label: 'Educational/How-to' },
  { value: 'testimonial', label: 'Testimonial/Social Proof' },
  { value: 'product_demo', label: 'Product Demo' },
  { value: 'story', label: 'Story/Behind the Scenes' },
  { value: 'offer', label: 'Direct Offer/Promo' },
  { value: 'ugc', label: 'User Generated Content' },
]

const FORMAT_DATA = {
  static_image: {
    name: 'Static Image',
    icon: Image,
    color: '#3B82F6',
    specs: { dimension: '1080x1080', ratio: '1:1', maxSize: '30MB' },
    bestFor: ['Quick messages', 'Simple offers', 'Brand awareness'],
    tips: ['Use bold, readable text', 'Keep text under 20% of image', 'High contrast colors work best'],
  },
  video_feed: {
    name: 'Feed Video',
    icon: Video,
    color: '#EF4444',
    specs: { dimension: '1080x1080', ratio: '1:1 or 4:5', maxSize: '4GB' },
    bestFor: ['Storytelling', 'Demonstrations', 'Testimonials'],
    tips: ['Hook in first 3 seconds', 'Add captions', 'Keep under 60 seconds for best engagement'],
  },
  video_story: {
    name: 'Story/Reel Video',
    icon: Smartphone,
    color: '#8B5CF6',
    specs: { dimension: '1080x1920', ratio: '9:16', maxSize: '4GB' },
    bestFor: ['Mobile-first audiences', 'Quick tips', 'Behind the scenes'],
    tips: ['Vertical format only', 'Fast-paced editing', 'Use native features like stickers'],
  },
  carousel: {
    name: 'Carousel',
    icon: LayoutGrid,
    color: '#10B981',
    specs: { dimension: '1080x1080', ratio: '1:1', maxSize: '30MB per card' },
    bestFor: ['Multiple products', 'Step-by-step guides', 'Feature highlights'],
    tips: ['Use 3-5 cards', 'Each card should work standalone', 'Strong first card is crucial'],
  },
  slideshow: {
    name: 'Slideshow Video',
    icon: Play,
    color: '#F59E0B',
    specs: { dimension: '1080x1080', ratio: '1:1', maxSize: '30MB' },
    bestFor: ['Low budget video', 'Product showcases', 'Quick creation'],
    tips: ['Use 3-10 images', 'Add music', 'Keep transitions simple'],
  },
}

export function FormatRecommender() {
  const [objective, setObjective] = useState('')
  const [funnelStage, setFunnelStage] = useState('')
  const [contentType, setContentType] = useState('')
  const [recommendations, setRecommendations] = useState<FormatRecommendation[]>([])

  const generateRecommendations = () => {
    const recs: FormatRecommendation[] = []

    // Scoring logic based on selections
    Object.entries(FORMAT_DATA).forEach(([key, format]) => {
      let score = 50 // Base score
      const reasons: string[] = []

      // Objective-based scoring
      if (objective === 'video_views' && (key === 'video_feed' || key === 'video_story')) {
        score += 30
        reasons.push('Video format aligns with video views objective')
      }
      if (objective === 'awareness' && key === 'video_feed') {
        score += 20
        reasons.push('Video drives higher brand recall')
      }
      if (objective === 'leads' && key === 'carousel') {
        score += 15
        reasons.push('Carousel allows showcasing multiple benefits')
      }
      if (objective === 'conversions' && (key === 'video_feed' || key === 'carousel')) {
        score += 20
        reasons.push('Higher engagement formats drive conversions')
      }
      if (objective === 'traffic' && key === 'static_image') {
        score += 10
        reasons.push('Simple format with clear CTA works for traffic')
      }

      // Funnel stage scoring
      if (funnelStage === 'tof' && (key === 'video_feed' || key === 'video_story')) {
        score += 15
        reasons.push('Video builds awareness with cold audiences')
      }
      if (funnelStage === 'mof' && key === 'carousel') {
        score += 15
        reasons.push('Carousel educates warm audiences effectively')
      }
      if (funnelStage === 'bof' && (key === 'static_image' || key === 'video_feed')) {
        score += 15
        reasons.push('Direct formats work well for ready-to-buy audiences')
      }

      // Content type scoring
      if (contentType === 'testimonial' && key === 'video_feed') {
        score += 25
        reasons.push('Video testimonials are highly persuasive')
      }
      if (contentType === 'educational' && key === 'carousel') {
        score += 20
        reasons.push('Carousel perfect for step-by-step education')
      }
      if (contentType === 'product_demo' && (key === 'video_feed' || key === 'video_story')) {
        score += 25
        reasons.push('Video showcases products in action')
      }
      if (contentType === 'offer' && key === 'static_image') {
        score += 15
        reasons.push('Static images deliver offers clearly')
      }
      if (contentType === 'ugc' && key === 'video_story') {
        score += 25
        reasons.push('Story format feels native for UGC')
      }
      if (contentType === 'story' && key === 'video_feed') {
        score += 20
        reasons.push('Video is ideal for storytelling')
      }

      if (reasons.length === 0) {
        reasons.push('Standard format option')
      }

      recs.push({
        format: key,
        score: Math.min(score, 100),
        reasons,
        specs: format.specs,
        tips: format.tips,
      })
    })

    // Sort by score
    recs.sort((a, b) => b.score - a.score)
    setRecommendations(recs)
  }

  return (
    <div className="space-y-6">
      <Card style={{ border: '3px solid black', boxShadow: '4px 4px 0px 0px black' }}>
        <CardHeader style={{ borderBottom: '3px solid black', backgroundColor: '#8B5CF6' }}>
          <CardTitle className="flex items-center gap-2 text-white">
            <Monitor className="h-5 w-5" />
            Creative Format Recommender
          </CardTitle>
          <CardDescription className="text-white/80">
            Get AI-powered recommendations for the best ad format based on your goals
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Input Section */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Campaign Objective</Label>
              <Select value={objective} onValueChange={setObjective}>
                <SelectTrigger style={{ border: '2px solid black' }}>
                  <SelectValue placeholder="Select objective" />
                </SelectTrigger>
                <SelectContent>
                  {OBJECTIVES.map((obj) => (
                    <SelectItem key={obj.value} value={obj.value}>{obj.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Funnel Stage</Label>
              <Select value={funnelStage} onValueChange={setFunnelStage}>
                <SelectTrigger style={{ border: '2px solid black' }}>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  {FUNNEL_STAGES.map((stage) => (
                    <SelectItem key={stage.value} value={stage.value}>{stage.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Content Type</Label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger style={{ border: '2px solid black' }}>
                  <SelectValue placeholder="Select content" />
                </SelectTrigger>
                <SelectContent>
                  {CONTENT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={generateRecommendations}
            disabled={!objective || !funnelStage || !contentType}
            className="w-full"
            style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black', backgroundColor: '#8B5CF6', color: 'white' }}
          >
            Get Recommendations
          </Button>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Recommended Formats</h4>
              {recommendations.map((rec, index) => {
                const formatInfo = FORMAT_DATA[rec.format as keyof typeof FORMAT_DATA]
                const Icon = formatInfo.icon
                const isTop = index === 0
                
                return (
                  <div
                    key={rec.format}
                    className={`p-4 ${isTop ? 'ring-2 ring-yellow-400' : ''}`}
                    style={{ 
                      border: '2px solid black',
                      boxShadow: isTop ? '4px 4px 0px 0px black' : '2px 2px 0px 0px black',
                      backgroundColor: isTop ? '#FEF9C3' : 'white'
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="p-3 text-white"
                        style={{ border: '2px solid black', backgroundColor: formatInfo.color }}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h5 className="font-bold text-lg">{formatInfo.name}</h5>
                          {isTop && (
                            <Badge style={{ border: '2px solid black', backgroundColor: '#F59E0B' }}>
                              <Star className="h-3 w-3 mr-1" />
                              Top Pick
                            </Badge>
                          )}
                          <Badge 
                            variant="outline" 
                            style={{ border: '2px solid black' }}
                          >
                            {rec.score}% Match
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-medium mb-1">Why this format:</p>
                            <ul className="text-sm space-y-1">
                              {rec.reasons.map((reason, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                  {reason}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="secondary" style={{ border: '1px solid black' }}>
                              {rec.specs.dimension}
                            </Badge>
                            <Badge variant="secondary" style={{ border: '1px solid black' }}>
                              {rec.specs.ratio}
                            </Badge>
                            <Badge variant="secondary" style={{ border: '1px solid black' }}>
                              Max: {rec.specs.maxSize}
                            </Badge>
                          </div>
                          
                          <div className="p-2 bg-blue-50 mt-2" style={{ border: '1px solid black' }}>
                            <p className="text-xs font-medium mb-1">Pro Tips:</p>
                            <ul className="text-xs space-y-0.5">
                              {rec.tips.map((tip, i) => (
                                <li key={i}>• {tip}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Quick Reference */}
          <div className="p-4" style={{ border: '2px solid black', backgroundColor: '#F3F4F6' }}>
            <h4 className="font-bold mb-3">📐 Quick Format Reference</h4>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(FORMAT_DATA).map(([key, format]) => {
                const Icon = format.icon
                return (
                  <div key={key} className="p-2 bg-white" style={{ border: '1px solid black' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="h-4 w-4" style={{ color: format.color }} />
                      <span className="font-medium text-sm">{format.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{format.specs.dimension} • {format.specs.ratio}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
