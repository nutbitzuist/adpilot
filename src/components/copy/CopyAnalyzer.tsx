import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  BarChart3, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Lightbulb,
  Target,
  MessageSquare,
  Zap
} from 'lucide-react'

interface AnalysisResult {
  overallScore: number
  clarityScore: number
  emotionScore: number
  ctaStrength: number
  hookStrength: number
  readability: number
  issues: Array<{ type: 'error' | 'warning' | 'info'; message: string }>
  suggestions: string[]
  wordCount: number
  charCount: number
  estimatedReadTime: string
}

export function CopyAnalyzer() {
  const [copyText, setCopyText] = useState('')
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeCopy = () => {
    if (!copyText.trim()) return
    
    setIsAnalyzing(true)
    
    setTimeout(() => {
      const words = copyText.split(/\s+/).filter(Boolean)
      const sentences = copyText.split(/[.!?]+/).filter(Boolean)
      const avgWordsPerSentence = words.length / Math.max(sentences.length, 1)
      
      const issues: AnalysisResult['issues'] = []
      const suggestions: string[] = []
      
      // Check hook (first line)
      const firstLine = copyText.split('\n')[0] || ''
      let hookStrength = 50
      
      if (firstLine.endsWith('?')) {
        hookStrength += 20
      }
      if (firstLine.includes('you') || firstLine.includes('your')) {
        hookStrength += 15
      }
      if (firstLine.length < 20) {
        issues.push({ type: 'warning', message: 'Hook might be too short to grab attention' })
        hookStrength -= 10
      }
      if (firstLine.length > 150) {
        issues.push({ type: 'warning', message: 'Hook is quite long - consider shortening' })
        hookStrength -= 10
      }
      
      // Check for power words
      const powerWords = ['free', 'new', 'now', 'instant', 'proven', 'guaranteed', 'secret', 'discover', 'transform', 'exclusive']
      const hasPowerWords = powerWords.some(word => copyText.toLowerCase().includes(word))
      if (!hasPowerWords) {
        suggestions.push('Consider adding power words like "free", "proven", or "exclusive"')
      }
      
      // Check for emotional triggers
      const emotionalWords = ['frustrated', 'struggling', 'tired', 'excited', 'imagine', 'dream', 'fear', 'love', 'hate', 'amazing']
      const emotionalCount = emotionalWords.filter(word => copyText.toLowerCase().includes(word)).length
      let emotionScore = Math.min(100, 40 + emotionalCount * 15)
      
      if (emotionalCount === 0) {
        suggestions.push('Add emotional language to connect with your audience')
      }
      
      // Check CTA
      const ctaWords = ['click', 'tap', 'learn', 'get', 'start', 'join', 'book', 'download', 'sign up', 'register']
      const hasCta = ctaWords.some(word => copyText.toLowerCase().includes(word))
      let ctaStrength = hasCta ? 70 : 30
      
      if (!hasCta) {
        issues.push({ type: 'error', message: 'No clear call-to-action detected' })
        suggestions.push('Add a clear CTA like "Click below" or "Learn more"')
      }
      
      if (copyText.includes('👇') || copyText.includes('⬇️') || copyText.includes('→')) {
        ctaStrength += 15
      }
      
      // Check readability
      let readability = 100 - Math.min(50, Math.abs(avgWordsPerSentence - 15) * 3)
      
      if (avgWordsPerSentence > 25) {
        issues.push({ type: 'warning', message: 'Sentences are quite long - consider breaking them up' })
      }
      
      // Check for "you" language
      const youCount = (copyText.match(/\byou\b|\byour\b/gi) || []).length
      if (youCount < 3 && words.length > 50) {
        suggestions.push('Use more "you" language to make it personal')
      }
      
      // Check for specificity
      const hasNumbers = /\d/.test(copyText)
      if (!hasNumbers) {
        suggestions.push('Add specific numbers or statistics for credibility')
      }
      
      // Calculate clarity score
      let clarityScore = readability
      if (words.length > 300) {
        clarityScore -= 10
        issues.push({ type: 'info', message: 'Copy is quite long - ensure every word earns its place' })
      }
      
      // Calculate overall score
      const overallScore = Math.round(
        (hookStrength * 0.25) + 
        (emotionScore * 0.2) + 
        (ctaStrength * 0.25) + 
        (clarityScore * 0.15) + 
        (readability * 0.15)
      )
      
      // Estimate read time (average 200 words per minute)
      const readTimeSeconds = Math.ceil((words.length / 200) * 60)
      const estimatedReadTime = readTimeSeconds < 60 
        ? `${readTimeSeconds} seconds` 
        : `${Math.ceil(readTimeSeconds / 60)} minute${readTimeSeconds >= 120 ? 's' : ''}`
      
      setAnalysis({
        overallScore: Math.min(100, Math.max(0, overallScore)),
        clarityScore: Math.min(100, Math.max(0, clarityScore)),
        emotionScore: Math.min(100, Math.max(0, emotionScore)),
        ctaStrength: Math.min(100, Math.max(0, ctaStrength)),
        hookStrength: Math.min(100, Math.max(0, hookStrength)),
        readability: Math.min(100, Math.max(0, readability)),
        issues,
        suggestions,
        wordCount: words.length,
        charCount: copyText.length,
        estimatedReadTime,
      })
      
      setIsAnalyzing(false)
    }, 500)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Needs Work'
    return 'Poor'
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Copy Input
          </CardTitle>
          <CardDescription>
            Paste your ad copy to analyze its effectiveness
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Your Ad Copy</Label>
            <Textarea
              value={copyText}
              onChange={(e) => setCopyText(e.target.value)}
              placeholder="Paste your ad copy here...

Example:
Are you tired of inconsistent leads for your coaching business?

Every month you're wondering where your next client will come from. The uncertainty is exhausting, and you know there has to be a better way.

That's exactly why I created the Client Attraction System - a proven framework that generates 10+ qualified leads per week.

👇 Click below to learn how it works"
              rows={15}
              className="font-mono text-sm"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{copyText.split(/\s+/).filter(Boolean).length} words</span>
            <span>{copyText.length} characters</span>
          </div>
          <Button 
            onClick={analyzeCopy} 
            disabled={!copyText.trim() || isAnalyzing}
            className="w-full"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Copy'}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {analysis ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Overall Score
                  </span>
                  <span className={`text-3xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                    {analysis.overallScore}
                  </span>
                </CardTitle>
                <CardDescription>
                  {getScoreLabel(analysis.overallScore)} - {analysis.estimatedReadTime} read
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Hook Strength</span>
                      <span className={getScoreColor(analysis.hookStrength)}>{analysis.hookStrength}%</span>
                    </div>
                    <Progress value={analysis.hookStrength} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Emotional Appeal</span>
                      <span className={getScoreColor(analysis.emotionScore)}>{analysis.emotionScore}%</span>
                    </div>
                    <Progress value={analysis.emotionScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>CTA Strength</span>
                      <span className={getScoreColor(analysis.ctaStrength)}>{analysis.ctaStrength}%</span>
                    </div>
                    <Progress value={analysis.ctaStrength} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Clarity</span>
                      <span className={getScoreColor(analysis.clarityScore)}>{analysis.clarityScore}%</span>
                    </div>
                    <Progress value={analysis.clarityScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Readability</span>
                      <span className={getScoreColor(analysis.readability)}>{analysis.readability}%</span>
                    </div>
                    <Progress value={analysis.readability} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {analysis.issues.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Issues Found
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analysis.issues.map((issue, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        {issue.type === 'error' && <XCircle className="h-4 w-4 text-red-500 mt-0.5" />}
                        {issue.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />}
                        {issue.type === 'info' && <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />}
                        <span>{issue.message}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {analysis.suggestions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analysis.suggestions.map((suggestion, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <Zap className="h-4 w-4 text-primary mt-0.5" />
                        <span>{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center py-12">
              <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 font-semibold">No Analysis Yet</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Paste your ad copy and click "Analyze" to see insights
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
