import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Calculator, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3
} from 'lucide-react'
import type { SignificanceResult } from '@/types'

export function SignificanceCalculator() {
  const [controlVisitors, setControlVisitors] = useState<number>(1000)
  const [controlConversions, setControlConversions] = useState<number>(50)
  const [variantVisitors, setVariantVisitors] = useState<number>(1000)
  const [variantConversions, setVariantConversions] = useState<number>(65)
  const [result, setResult] = useState<SignificanceResult | null>(null)

  const calculateSignificance = () => {
    const controlRate = controlConversions / controlVisitors
    const variantRate = variantConversions / variantVisitors
    
    const pooledRate = (controlConversions + variantConversions) / (controlVisitors + variantVisitors)
    const standardError = Math.sqrt(
      pooledRate * (1 - pooledRate) * (1 / controlVisitors + 1 / variantVisitors)
    )
    
    const zScore = (variantRate - controlRate) / standardError
    
    const confidence = normalCDF(Math.abs(zScore)) * 2 - 1
    const confidencePercent = Math.round(confidence * 100)
    
    const lift = ((variantRate - controlRate) / controlRate) * 100
    
    let winner: 'control' | 'variant' | 'inconclusive' = 'inconclusive'
    if (confidencePercent >= 95) {
      winner = lift > 0 ? 'variant' : 'control'
    }
    
    setResult({
      controlRate: (controlRate * 100).toFixed(2),
      variantRate: (variantRate * 100).toFixed(2),
      lift: lift.toFixed(2),
      confidence: confidencePercent,
      winner,
    })
  }

  const normalCDF = (x: number): number => {
    const a1 = 0.254829592
    const a2 = -0.284496736
    const a3 = 1.421413741
    const a4 = -1.453152027
    const a5 = 1.061405429
    const p = 0.3275911
    
    const sign = x < 0 ? -1 : 1
    x = Math.abs(x) / Math.sqrt(2)
    
    const t = 1.0 / (1.0 + p * x)
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)
    
    return 0.5 * (1.0 + sign * y)
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'text-green-600'
    if (confidence >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getWinnerIcon = (winner: string) => {
    switch (winner) {
      case 'variant':
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case 'control':
        return <CheckCircle className="h-6 w-6 text-blue-500" />
      default:
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            A/B Test Calculator
          </CardTitle>
          <CardDescription>
            Calculate statistical significance for your split tests
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4 p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium flex items-center gap-2">
                <Badge variant="secondary">Control (A)</Badge>
              </h4>
              <div className="space-y-2">
                <Label>Visitors / Impressions</Label>
                <Input
                  type="number"
                  value={controlVisitors}
                  onChange={(e) => setControlVisitors(Number(e.target.value) || 0)}
                  placeholder="1000"
                />
              </div>
              <div className="space-y-2">
                <Label>Conversions</Label>
                <Input
                  type="number"
                  value={controlConversions}
                  onChange={(e) => setControlConversions(Number(e.target.value) || 0)}
                  placeholder="50"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Conversion Rate: {controlVisitors > 0 
                  ? ((controlConversions / controlVisitors) * 100).toFixed(2) 
                  : '0.00'}%
              </div>
            </div>

            <div className="space-y-4 p-4 rounded-lg border bg-primary/5">
              <h4 className="font-medium flex items-center gap-2">
                <Badge>Variant (B)</Badge>
              </h4>
              <div className="space-y-2">
                <Label>Visitors / Impressions</Label>
                <Input
                  type="number"
                  value={variantVisitors}
                  onChange={(e) => setVariantVisitors(Number(e.target.value) || 0)}
                  placeholder="1000"
                />
              </div>
              <div className="space-y-2">
                <Label>Conversions</Label>
                <Input
                  type="number"
                  value={variantConversions}
                  onChange={(e) => setVariantConversions(Number(e.target.value) || 0)}
                  placeholder="65"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Conversion Rate: {variantVisitors > 0 
                  ? ((variantConversions / variantVisitors) * 100).toFixed(2) 
                  : '0.00'}%
              </div>
            </div>
          </div>

          <Button onClick={calculateSignificance} className="w-full">
            <BarChart3 className="mr-2 h-4 w-4" />
            Calculate Significance
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Results</span>
              {getWinnerIcon(result.winner)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Control Rate</p>
                <p className="text-2xl font-bold">{result.controlRate}%</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Variant Rate</p>
                <p className="text-2xl font-bold">{result.variantRate}%</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Lift</p>
                <p className={`text-2xl font-bold flex items-center justify-center gap-1 ${
                  parseFloat(result.lift) > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {parseFloat(result.lift) > 0 ? (
                    <TrendingUp className="h-5 w-5" />
                  ) : (
                    <TrendingDown className="h-5 w-5" />
                  )}
                  {result.lift}%
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Statistical Confidence</span>
                <span className={`text-lg font-bold ${getConfidenceColor(result.confidence)}`}>
                  {result.confidence}%
                </span>
              </div>
              <Progress value={result.confidence} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span className="text-yellow-600">80%</span>
                <span className="text-green-600">95%</span>
                <span>100%</span>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${
              result.winner === 'variant' 
                ? 'bg-green-50 border border-green-200' 
                : result.winner === 'control'
                  ? 'bg-blue-50 border border-blue-200'
                  : 'bg-yellow-50 border border-yellow-200'
            }`}>
              <div className="flex items-start gap-3">
                {getWinnerIcon(result.winner)}
                <div>
                  <h4 className="font-semibold">
                    {result.winner === 'variant' && 'Variant B is the Winner!'}
                    {result.winner === 'control' && 'Control A is the Winner!'}
                    {result.winner === 'inconclusive' && 'Results are Inconclusive'}
                  </h4>
                  <p className="text-sm mt-1">
                    {result.winner === 'variant' && (
                      `With ${result.confidence}% confidence, Variant B outperforms Control A by ${result.lift}%. You can safely implement this change.`
                    )}
                    {result.winner === 'control' && (
                      `With ${result.confidence}% confidence, Control A outperforms Variant B. Keep your original version.`
                    )}
                    {result.winner === 'inconclusive' && (
                      `The confidence level is below 95%. Continue running the test to gather more data before making a decision.`
                    )}
                  </p>
                </div>
              </div>
            </div>

            {result.winner === 'inconclusive' && (
              <div className="rounded-lg bg-muted p-4">
                <h4 className="font-medium mb-2">Recommendations</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Continue running the test for more data
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Aim for at least 1,000 conversions per variant
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Ensure equal traffic split between variants
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Run for at least 7 days to account for day-of-week effects
                  </li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex gap-2">
            <span className="font-bold text-primary">1.</span>
            <p>Enter the number of visitors/impressions for each variant</p>
          </div>
          <div className="flex gap-2">
            <span className="font-bold text-primary">2.</span>
            <p>Enter the number of conversions (leads, purchases, clicks, etc.)</p>
          </div>
          <div className="flex gap-2">
            <span className="font-bold text-primary">3.</span>
            <p>Click "Calculate" to see if your results are statistically significant</p>
          </div>
          <div className="flex gap-2">
            <span className="font-bold text-primary">4.</span>
            <p>Look for 95%+ confidence before declaring a winner</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
