import { useState } from 'react'
import { useTests, useLearnings } from '@/hooks/useTests'
import { useCampaigns } from '@/hooks/useCampaigns'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { FlaskConical, BookOpen, Calculator, Plus, Trophy, Clock, CheckCircle } from 'lucide-react'
import { TestPlanner } from '@/components/testing/TestPlanner'
import { SignificanceCalculator } from '@/components/testing/SignificanceCalculator'
import type { Test } from '@/types'

export default function Testing() {
  const { tests, isLoading: testsLoading, createTest } = useTests()
  const { learnings, isLoading: learningsLoading } = useLearnings()
  const { campaigns } = useCampaigns()
  const [isTestSheetOpen, setIsTestSheetOpen] = useState(false)
  const [editingTest, setEditingTest] = useState<Test | undefined>()

  const handleSaveTest = async (data: Partial<Test>) => {
    await createTest.mutateAsync(data)
    setIsTestSheetOpen(false)
    setEditingTest(undefined)
  }

  const handleNewTest = () => {
    setEditingTest(undefined)
    setIsTestSheetOpen(true)
  }

  const handleEditTest = (test: Test) => {
    setEditingTest(test)
    setIsTestSheetOpen(true)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Clock className="h-4 w-4 text-blue-500" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <FlaskConical className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Testing Lab</h1>
          <p className="text-muted-foreground">
            Plan and track A/B tests to optimize your ads
          </p>
        </div>
        <Button onClick={handleNewTest}>
          <Plus className="mr-2 h-4 w-4" />
          New Test
        </Button>
      </div>

      <Tabs defaultValue="tests" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tests" className="gap-2">
            <FlaskConical className="h-4 w-4" />
            Active Tests
          </TabsTrigger>
          <TabsTrigger value="calculator" className="gap-2">
            <Calculator className="h-4 w-4" />
            Significance Calculator
          </TabsTrigger>
          <TabsTrigger value="learnings" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Learning Library
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="space-y-6">
          {testsLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-32 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ) : tests.length === 0 ? (
            <Card className="p-12 text-center">
              <FlaskConical className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No tests yet</h3>
              <p className="mt-2 text-muted-foreground">
                Start your first A/B test to optimize your campaigns.
              </p>
              <Button className="mt-4" onClick={handleNewTest}>
                <Plus className="mr-2 h-4 w-4" />
                Create Test
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {tests.map((test) => (
                <Card 
                  key={test.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleEditTest(test)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getStatusIcon(test.status)}
                        <div>
                          <h4 className="font-semibold">{test.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {test.hypothesis}
                          </p>
                        </div>
                      </div>
                      <Badge variant={
                        test.status === 'running' ? 'default' :
                        test.status === 'completed' ? 'default' : 'secondary'
                      }>
                        {test.status}
                      </Badge>
                    </div>
                    
                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Variable</p>
                        <p className="text-sm font-medium">{test.variableType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Primary Metric</p>
                        <p className="text-sm font-medium">{test.primaryMetric}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Target Improvement</p>
                        <p className="text-sm font-medium">{test.targetImprovement}%</p>
                      </div>
                    </div>

                    {test.status === 'completed' && test.winner && (
                      <div className="mt-4 rounded-lg bg-green-50 p-4">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-green-800">
                            Winner: {test.winner}
                          </span>
                          <Badge variant="outline" className="ml-2">
                            {test.statisticalSignificance}% confidence
                          </Badge>
                        </div>
                        {test.keyLearning && (
                          <p className="mt-2 text-sm text-green-700">{test.keyLearning}</p>
                        )}
                      </div>
                    )}

                    {test.status === 'running' && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span>65%</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          <SignificanceCalculator />
        </TabsContent>

        <TabsContent value="learnings" className="space-y-6">
          {learningsLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ) : learnings.length === 0 ? (
            <Card className="p-12 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No learnings yet</h3>
              <p className="mt-2 text-muted-foreground">
                Document your insights from tests and campaigns.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {learnings.map((learning) => (
                <Card key={learning.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{learning.title}</h4>
                          <Badge variant={
                            learning.impactLevel === 'high' ? 'default' :
                            learning.impactLevel === 'medium' ? 'secondary' : 'outline'
                          }>
                            {learning.impactLevel} impact
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          {learning.description}
                        </p>
                      </div>
                      <Badge variant="outline">{learning.category}</Badge>
                    </div>
                    {learning.tags.length > 0 && (
                      <div className="mt-3 flex gap-1">
                        {learning.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Test Planner Sheet */}
      <Sheet open={isTestSheetOpen} onOpenChange={setIsTestSheetOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingTest ? 'Edit Test' : 'Create A/B Test'}</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <TestPlanner
              test={editingTest}
              campaigns={campaigns}
              onSave={handleSaveTest}
              onCancel={() => setIsTestSheetOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
