import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, Circle, AlertTriangle, Rocket, RefreshCw } from 'lucide-react'

interface ChecklistItem {
  id: string
  category: string
  item: string
  description: string
  required: boolean
  checked: boolean
}

const DEFAULT_CHECKLIST: Omit<ChecklistItem, 'checked'>[] = [
  // Strategy
  { id: '1', category: 'Strategy', item: 'Campaign objective defined', description: 'Clear goal: awareness, leads, or sales', required: true },
  { id: '2', category: 'Strategy', item: 'Target audience identified', description: 'Avatar and targeting strategy ready', required: true },
  { id: '3', category: 'Strategy', item: 'Funnel stage determined', description: 'TOF, MOF, or BOF campaign', required: true },
  { id: '4', category: 'Strategy', item: 'Budget allocated', description: 'Daily/lifetime budget set appropriately', required: true },
  
  // Creative
  { id: '5', category: 'Creative', item: 'Ad copy written and reviewed', description: 'Primary text, headline, description ready', required: true },
  { id: '6', category: 'Creative', item: 'Creative assets ready', description: 'Images/videos in correct dimensions', required: true },
  { id: '7', category: 'Creative', item: 'Multiple variations prepared', description: 'At least 2-3 ad variations for testing', required: false },
  { id: '8', category: 'Creative', item: 'Compliance check passed', description: 'No policy violations in copy/creative', required: true },
  
  // Technical
  { id: '9', category: 'Technical', item: 'Pixel installed and firing', description: 'Facebook pixel tracking correctly', required: true },
  { id: '10', category: 'Technical', item: 'Conversion events set up', description: 'Lead, Purchase, or custom events configured', required: true },
  { id: '11', category: 'Technical', item: 'UTM parameters added', description: 'Tracking parameters for analytics', required: false },
  { id: '12', category: 'Technical', item: 'Landing page tested', description: 'Page loads fast, mobile-friendly, form works', required: true },
  
  // Campaign Setup
  { id: '13', category: 'Campaign Setup', item: 'Campaign structure finalized', description: 'CBO/ABO, ad sets, and ads organized', required: true },
  { id: '14', category: 'Campaign Setup', item: 'Targeting configured', description: 'Interests, behaviors, custom audiences set', required: true },
  { id: '15', category: 'Campaign Setup', item: 'Placements selected', description: 'Automatic or manual placement selection', required: false },
  { id: '16', category: 'Campaign Setup', item: 'Schedule set', description: 'Start date, end date, or ongoing', required: true },
  
  // Final Checks
  { id: '17', category: 'Final Checks', item: 'Preview ads on all placements', description: 'Check how ads look on feed, stories, etc.', required: true },
  { id: '18', category: 'Final Checks', item: 'Double-check links', description: 'All URLs working correctly', required: true },
  { id: '19', category: 'Final Checks', item: 'Review billing', description: 'Payment method active and valid', required: true },
  { id: '20', category: 'Final Checks', item: 'Set up monitoring alerts', description: 'Budget alerts, performance notifications', required: false },
]

export function LaunchChecklist() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    DEFAULT_CHECKLIST.map(item => ({ ...item, checked: false }))
  )

  const toggleItem = (id: string) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  const resetChecklist = () => {
    setChecklist(checklist.map(item => ({ ...item, checked: false })))
  }

  const categories = [...new Set(checklist.map(item => item.category))]
  const totalItems = checklist.length
  const checkedItems = checklist.filter(item => item.checked).length
  const requiredItems = checklist.filter(item => item.required)
  const checkedRequired = requiredItems.filter(item => item.checked).length
  const progress = Math.round((checkedItems / totalItems) * 100)
  const isReadyToLaunch = requiredItems.every(item => item.checked)

  const getCategoryProgress = (category: string) => {
    const categoryItems = checklist.filter(item => item.category === category)
    const checked = categoryItems.filter(item => item.checked).length
    return { checked, total: categoryItems.length }
  }

  return (
    <div className="space-y-6">
      <Card style={{ border: '3px solid black', boxShadow: '4px 4px 0px 0px black' }}>
        <CardHeader style={{ borderBottom: '3px solid black', backgroundColor: '#7C3AED' }}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-white">
                <Rocket className="h-5 w-5" />
                Campaign Launch Checklist
              </CardTitle>
              <CardDescription className="text-white/80">
                Ensure everything is ready before going live
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={resetChecklist}
              style={{ border: '2px solid black', backgroundColor: 'white' }}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Progress Overview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold">Overall Progress</span>
              <span className="font-mono">{checkedItems}/{totalItems} ({progress}%)</span>
            </div>
            <Progress value={progress} className="h-4" />
            
            <div className="flex items-center gap-4">
              <Badge 
                style={{ 
                  border: '2px solid black',
                  backgroundColor: checkedRequired === requiredItems.length ? '#22C55E' : '#EF4444',
                  color: 'white'
                }}
              >
                Required: {checkedRequired}/{requiredItems.length}
              </Badge>
              
              {isReadyToLaunch ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-bold">Ready to Launch!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-yellow-600">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-bold">Complete required items</span>
                </div>
              )}
            </div>
          </div>

          {/* Category Progress */}
          <div className="grid gap-2 md:grid-cols-5">
            {categories.map(category => {
              const { checked, total } = getCategoryProgress(category)
              const isComplete = checked === total
              return (
                <div 
                  key={category}
                  className="p-2 text-center"
                  style={{ 
                    border: '2px solid black',
                    backgroundColor: isComplete ? '#D1FAE5' : '#F3F4F6'
                  }}
                >
                  <p className="text-xs font-bold">{category}</p>
                  <p className="font-mono text-sm">{checked}/{total}</p>
                </div>
              )
            })}
          </div>

          {/* Checklist Items */}
          <div className="space-y-6">
            {categories.map(category => (
              <div key={category}>
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  {category}
                  {getCategoryProgress(category).checked === getCategoryProgress(category).total && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </h4>
                <div className="space-y-2">
                  {checklist
                    .filter(item => item.category === category)
                    .map(item => (
                      <button
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`w-full p-3 text-left transition-all ${item.checked ? 'opacity-70' : ''}`}
                        style={{ 
                          border: '2px solid black',
                          boxShadow: item.checked ? 'none' : '2px 2px 0px 0px black',
                          backgroundColor: item.checked ? '#D1FAE5' : 'white',
                          transform: item.checked ? 'translate(2px, 2px)' : 'none'
                        }}
                      >
                        <div className="flex items-start gap-3">
                          {item.checked ? (
                            <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${item.checked ? 'line-through' : ''}`}>
                                {item.item}
                              </span>
                              {item.required && (
                                <Badge 
                                  variant="outline" 
                                  className="text-xs"
                                  style={{ border: '1px solid black' }}
                                >
                                  Required
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Launch Button */}
          <div className="pt-4">
            <Button
              className="w-full h-14 text-lg"
              disabled={!isReadyToLaunch}
              style={{ 
                border: '3px solid black',
                boxShadow: '4px 4px 0px 0px black',
                backgroundColor: isReadyToLaunch ? '#22C55E' : '#9CA3AF',
                color: 'white'
              }}
            >
              <Rocket className="h-5 w-5 mr-2" />
              {isReadyToLaunch ? 'Ready to Launch Campaign!' : 'Complete Required Items First'}
            </Button>
          </div>

          {/* Tips */}
          <div className="p-4" style={{ border: '2px solid black', backgroundColor: '#FEF3C7' }}>
            <h4 className="font-bold mb-2">💡 Pre-Launch Tips</h4>
            <ul className="text-sm space-y-1">
              <li>• Start with a small budget to test before scaling</li>
              <li>• Monitor closely for the first 24-48 hours</li>
              <li>• Don't make changes too quickly - give the algorithm time to learn</li>
              <li>• Have a plan for what to do if performance is below expectations</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
