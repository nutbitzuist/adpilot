import { useTests } from '@/hooks/useTests'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { FlaskConical, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function ActiveTests() {
  const { tests, isLoading } = useTests()
  const navigate = useNavigate()

  const activeTests = tests.filter((t) => t.status === 'running').slice(0, 3)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5" />
            Active Tests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FlaskConical className="h-5 w-5" />
          Active Tests
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={() => navigate('/testing')}>
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {activeTests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-sm text-muted-foreground">No active tests</p>
            <Button variant="link" size="sm" onClick={() => navigate('/testing')}>
              Start a new test
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {activeTests.map((test) => (
              <div key={test.id} className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{test.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Testing: {test.variableType}
                    </p>
                  </div>
                  <Badge variant="secondary">{test.status}</Badge>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <Progress value={65} className="mt-1 h-2" />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
