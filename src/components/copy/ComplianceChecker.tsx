import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { AlertTriangle, CheckCircle, XCircle, Shield, Search, Lightbulb } from 'lucide-react'

interface ComplianceIssue {
  type: 'error' | 'warning' | 'info'
  category: string
  text: string
  suggestion: string
  matchedPhrase?: string
}

const COMPLIANCE_RULES = {
  personal_attributes: {
    category: 'Personal Attributes',
    severity: 'error',
    patterns: [
      { pattern: /\byou are\b/gi, suggestion: 'Avoid directly stating personal attributes. Use "If you..." or "For those who..."' },
      { pattern: /\byou're overweight\b/gi, suggestion: 'Never reference weight directly. Focus on goals instead.' },
      { pattern: /\byou're struggling\b/gi, suggestion: 'Avoid implying personal struggles. Use "challenges" or "obstacles"' },
      { pattern: /\byour debt\b/gi, suggestion: 'Don\'t reference personal financial situations directly' },
      { pattern: /\byour credit\b/gi, suggestion: 'Avoid mentioning credit scores or status' },
      { pattern: /\byour age\b/gi, suggestion: 'Don\'t reference age directly' },
      { pattern: /\byour race\b/gi, suggestion: 'Never reference race or ethnicity' },
      { pattern: /\byour religion\b/gi, suggestion: 'Avoid religious references' },
    ],
  },
  guarantees: {
    category: 'Unrealistic Guarantees',
    severity: 'error',
    patterns: [
      { pattern: /\bguaranteed results\b/gi, suggestion: 'Remove guarantee claims. Use "designed to help" instead' },
      { pattern: /\b100% guaranteed\b/gi, suggestion: 'Avoid absolute guarantees. Be specific about refund policies instead' },
      { pattern: /\bguaranteed to work\b/gi, suggestion: 'Replace with "proven strategies" or "tested methods"' },
      { pattern: /\bno risk\b/gi, suggestion: 'All investments have risk. Be transparent about this' },
      { pattern: /\brisk.?free\b/gi, suggestion: 'Avoid risk-free claims. Mention your guarantee policy instead' },
    ],
  },
  exaggerated_claims: {
    category: 'Exaggerated Claims',
    severity: 'warning',
    patterns: [
      { pattern: /\blose \d+ pounds\b/gi, suggestion: 'Avoid specific weight loss claims. Focus on lifestyle changes' },
      { pattern: /\bmake \$[\d,]+\b/gi, suggestion: 'Income claims require disclaimers. Consider removing specific amounts' },
      { pattern: /\bearn \$[\d,]+\b/gi, suggestion: 'Specific earnings claims may be flagged. Use ranges or testimonials with disclaimers' },
      { pattern: /\bget rich\b/gi, suggestion: 'Avoid "get rich" language. Focus on value and skills instead' },
      { pattern: /\bovernight success\b/gi, suggestion: 'Remove unrealistic timeframe claims' },
      { pattern: /\binstant results\b/gi, suggestion: 'Avoid instant/immediate result claims' },
      { pattern: /\bquick money\b/gi, suggestion: 'Remove quick money references' },
      { pattern: /\beasy money\b/gi, suggestion: 'Avoid easy money claims' },
    ],
  },
  medical_claims: {
    category: 'Medical/Health Claims',
    severity: 'error',
    patterns: [
      { pattern: /\bcure\b/gi, suggestion: 'Never claim to cure conditions. Use "support" or "help manage"' },
      { pattern: /\btreat\b/gi, suggestion: 'Avoid treatment claims unless you\'re a licensed provider' },
      { pattern: /\bdiagnose\b/gi, suggestion: 'Remove diagnostic language' },
      { pattern: /\bprevent disease\b/gi, suggestion: 'Avoid disease prevention claims' },
      { pattern: /\bheal\b/gi, suggestion: 'Be careful with healing claims. Use "support wellness" instead' },
    ],
  },
  before_after: {
    category: 'Before/After Content',
    severity: 'warning',
    patterns: [
      { pattern: /\bbefore and after\b/gi, suggestion: 'Before/after comparisons may be restricted. Ensure compliance with platform policies' },
      { pattern: /\btransformation photo\b/gi, suggestion: 'Transformation images may be flagged. Use with caution' },
      { pattern: /\bresults may vary\b/gi, suggestion: 'Good! But ensure this disclaimer is prominent' },
    ],
  },
  urgency_scarcity: {
    category: 'False Urgency/Scarcity',
    severity: 'info',
    patterns: [
      { pattern: /\bonly \d+ (spots?|seats?|left)\b/gi, suggestion: 'Ensure scarcity claims are truthful and verifiable' },
      { pattern: /\blast chance\b/gi, suggestion: 'Only use if genuinely the last opportunity' },
      { pattern: /\bending soon\b/gi, suggestion: 'Be specific about end dates if using urgency' },
      { pattern: /\blimited time\b/gi, suggestion: 'Specify the actual time limit' },
    ],
  },
}

export function ComplianceChecker() {
  const [copyText, setCopyText] = useState('')
  const [issues, setIssues] = useState<ComplianceIssue[]>([])
  const [isChecked, setIsChecked] = useState(false)

  const checkCompliance = () => {
    const foundIssues: ComplianceIssue[] = []

    Object.entries(COMPLIANCE_RULES).forEach(([, rule]) => {
      rule.patterns.forEach((pattern) => {
        const matches = copyText.match(pattern.pattern)
        if (matches) {
          matches.forEach((match) => {
            foundIssues.push({
              type: rule.severity as 'error' | 'warning' | 'info',
              category: rule.category,
              text: pattern.suggestion,
              suggestion: pattern.suggestion,
              matchedPhrase: match,
            })
          })
        }
      })
    })

    setIssues(foundIssues)
    setIsChecked(true)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#22C55E'
    if (score >= 70) return '#EAB308'
    return '#EF4444'
  }

  const complianceScore = isChecked 
    ? Math.max(0, 100 - (issues.filter(i => i.type === 'error').length * 20) - (issues.filter(i => i.type === 'warning').length * 10) - (issues.filter(i => i.type === 'info').length * 5))
    : 0

  const errorCount = issues.filter(i => i.type === 'error').length
  const warningCount = issues.filter(i => i.type === 'warning').length
  const infoCount = issues.filter(i => i.type === 'info').length

  return (
    <div className="space-y-6">
      <Card style={{ border: '3px solid black', boxShadow: '4px 4px 0px 0px black' }}>
        <CardHeader style={{ borderBottom: '3px solid black', backgroundColor: '#EF4444' }}>
          <CardTitle className="flex items-center gap-2 text-white">
            <Shield className="h-5 w-5" />
            Ad Compliance Checker
          </CardTitle>
          <CardDescription className="text-white/80">
            Check your ad copy for potential policy violations before submitting
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Textarea
              value={copyText}
              onChange={(e) => {
                setCopyText(e.target.value)
                setIsChecked(false)
              }}
              placeholder="Paste your ad copy here to check for compliance issues..."
              rows={8}
              style={{ border: '2px solid black', fontFamily: 'monospace' }}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {copyText.length} characters
              </span>
              <Button 
                onClick={checkCompliance}
                disabled={!copyText.trim()}
                style={{ border: '2px solid black', boxShadow: '3px 3px 0px 0px black', backgroundColor: '#7C3AED', color: 'white' }}
              >
                <Search className="mr-2 h-4 w-4" />
                Check Compliance
              </Button>
            </div>
          </div>

          {isChecked && (
            <>
              {/* Score Card */}
              <div className="p-4" style={{ border: '3px solid black', backgroundColor: getScoreColor(complianceScore) + '20' }}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-lg">Compliance Score</h4>
                  <span 
                    className="text-3xl font-bold"
                    style={{ color: getScoreColor(complianceScore) }}
                  >
                    {complianceScore}/100
                  </span>
                </div>
                <Progress value={complianceScore} className="h-3" />
                <div className="flex gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm">{errorCount} Errors</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{warningCount} Warnings</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Lightbulb className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{infoCount} Suggestions</span>
                  </div>
                </div>
              </div>

              {/* Issues List */}
              {issues.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="font-bold">Issues Found</h4>
                  {issues.map((issue, index) => (
                    <div
                      key={index}
                      className="p-3"
                      style={{ 
                        border: '2px solid black',
                        backgroundColor: issue.type === 'error' ? '#FEE2E2' : issue.type === 'warning' ? '#FEF9C3' : '#DBEAFE'
                      }}
                    >
                      <div className="flex items-start gap-3">
                        {issue.type === 'error' && <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />}
                        {issue.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />}
                        {issue.type === 'info' && <Lightbulb className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge 
                              variant={issue.type === 'error' ? 'destructive' : issue.type === 'warning' ? 'default' : 'secondary'}
                              style={{ border: '2px solid black' }}
                            >
                              {issue.category}
                            </Badge>
                            {issue.matchedPhrase && (
                              <code className="text-xs bg-black/10 px-1 py-0.5 rounded">
                                "{issue.matchedPhrase}"
                              </code>
                            )}
                          </div>
                          <p className="text-sm">{issue.suggestion}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center" style={{ border: '2px solid black', backgroundColor: '#DCFCE7' }}>
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <h4 className="font-bold text-lg">All Clear!</h4>
                  <p className="text-sm text-muted-foreground">
                    No compliance issues detected. Your copy looks good to go!
                  </p>
                </div>
              )}

              {/* Best Practices */}
              <div className="p-4" style={{ border: '2px solid black', backgroundColor: '#F3F4F6' }}>
                <h4 className="font-bold mb-2">📋 Facebook Ads Best Practices</h4>
                <ul className="text-sm space-y-1">
                  <li>• Avoid making claims about personal attributes (age, race, religion, etc.)</li>
                  <li>• Don't use before/after images for weight loss or health</li>
                  <li>• Include disclaimers for income or results claims</li>
                  <li>• Ensure urgency/scarcity claims are truthful</li>
                  <li>• Avoid sensational language or clickbait</li>
                  <li>• Don't use misleading buttons or fake UI elements</li>
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
