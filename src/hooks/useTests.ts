import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { useStore } from '@/store/useStore'
import type { Test, TestResult, Learning, SignificanceResult } from '@/types'

const demoTests: Test[] = [
  {
    id: '1',
    userId: 'demo-user',
    campaignId: '1',
    name: 'Hook Test - Question vs Bold Claim',
    hypothesis: 'A question-based hook will generate higher CTR than a bold claim hook because it creates curiosity',
    variableType: 'hook',
    variableDetails: 'Testing question hook vs bold claim hook',
    controlDescription: 'Question hook: "Are you still struggling..."',
    variants: [
      { name: 'Variant A', description: 'Bold claim: "I help consultants hit 7 figures..."' },
    ],
    primaryMetric: 'ctr',
    targetImprovement: 20,
    minimumSampleSize: 1000,
    minimumSpend: 200,
    startDate: '2024-01-15',
    plannedEndDate: '2024-01-22',
    status: 'running',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: 'demo-user',
    campaignId: '1',
    name: 'Image vs Video Creative',
    hypothesis: 'Video creative will outperform static image for lead generation',
    variableType: 'creative',
    variableDetails: 'Static image vs 30-second video',
    controlDescription: 'Static image with text overlay',
    variants: [
      { name: 'Video', description: '30-second talking head video' },
    ],
    primaryMetric: 'cpl',
    targetImprovement: 15,
    status: 'completed',
    winner: 'variant',
    statisticalSignificance: 96,
    resultsSummary: 'Video outperformed image by 23% on CPL',
    keyLearning: 'Video content drives higher engagement and lower CPL for this audience',
    applyToFuture: 'Use video as primary creative format for lead gen campaigns',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const demoLearnings: Learning[] = [
  {
    id: '1',
    userId: 'demo-user',
    category: 'creative',
    title: 'Video outperforms static images for lead gen',
    description: 'In our A/B test, video creative reduced CPL by 23% compared to static images. The talking head format performed best.',
    source: 'A/B Test',
    testId: '2',
    impactLevel: 'high',
    tags: ['creative', 'video', 'lead-gen'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: 'demo-user',
    category: 'targeting',
    title: 'Lookalike audiences outperform interest targeting',
    description: '1% lookalike based on email list consistently delivers 30% lower CPL than interest-based targeting.',
    source: 'Campaign Analysis',
    impactLevel: 'high',
    tags: ['targeting', 'lookalike', 'audience'],
    createdAt: new Date().toISOString(),
  },
]

export function useTests() {
  const { user } = useStore()
  const queryClient = useQueryClient()

  const testsQuery = useQuery({
    queryKey: ['tests', user?.id],
    queryFn: async () => {
      if (!isSupabaseConfigured || !user) {
        return demoTests
      }

      const { data, error } = await supabase
        .from('tests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data.map((test): Test => ({
        id: test.id,
        userId: test.user_id || '',
        campaignId: test.campaign_id || undefined,
        name: test.name,
        hypothesis: test.hypothesis || undefined,
        variableType: test.variable_type || undefined,
        variableDetails: test.variable_details || undefined,
        controlDescription: test.control_description || undefined,
        controlAdId: test.control_ad_id || undefined,
        variants: (test.variants as Test['variants']) || [],
        primaryMetric: test.primary_metric || undefined,
        targetImprovement: test.target_improvement || undefined,
        minimumSampleSize: test.minimum_sample_size || undefined,
        minimumSpend: test.minimum_spend || undefined,
        startDate: test.start_date || undefined,
        plannedEndDate: test.planned_end_date || undefined,
        actualEndDate: test.actual_end_date || undefined,
        status: test.status,
        winner: test.winner || undefined,
        statisticalSignificance: test.statistical_significance || undefined,
        resultsSummary: test.results_summary || undefined,
        keyLearning: test.key_learning || undefined,
        applyToFuture: test.apply_to_future || undefined,
        createdAt: test.created_at,
        updatedAt: test.updated_at,
      }))
    },
    enabled: !!user,
  })

  const createTest = useMutation({
    mutationFn: async (test: Partial<Test>) => {
      if (!isSupabaseConfigured || !user) {
        return {
          id: crypto.randomUUID(),
          userId: 'demo-user',
          name: test.name || 'New Test',
          variants: [],
          status: 'planning',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...test,
        }
      }

      const { data, error } = await supabase
        .from('tests')
        .insert({
          user_id: user.id,
          campaign_id: test.campaignId,
          name: test.name,
          hypothesis: test.hypothesis,
          variable_type: test.variableType,
          variable_details: test.variableDetails,
          control_description: test.controlDescription,
          variants: test.variants,
          primary_metric: test.primaryMetric,
          target_improvement: test.targetImprovement,
          minimum_sample_size: test.minimumSampleSize,
          minimum_spend: test.minimumSpend,
          start_date: test.startDate,
          planned_end_date: test.plannedEndDate,
          status: test.status || 'planning',
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] })
    },
  })

  const updateTest = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Test> & { id: string }) => {
      if (!isSupabaseConfigured) {
        return { id, ...updates }
      }

      const { data, error } = await supabase
        .from('tests')
        .update({
          name: updates.name,
          hypothesis: updates.hypothesis,
          variable_type: updates.variableType,
          variable_details: updates.variableDetails,
          control_description: updates.controlDescription,
          variants: updates.variants,
          primary_metric: updates.primaryMetric,
          target_improvement: updates.targetImprovement,
          minimum_sample_size: updates.minimumSampleSize,
          minimum_spend: updates.minimumSpend,
          start_date: updates.startDate,
          planned_end_date: updates.plannedEndDate,
          actual_end_date: updates.actualEndDate,
          status: updates.status,
          winner: updates.winner,
          statistical_significance: updates.statisticalSignificance,
          results_summary: updates.resultsSummary,
          key_learning: updates.keyLearning,
          apply_to_future: updates.applyToFuture,
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] })
    },
  })

  return {
    tests: testsQuery.data || [],
    isLoading: testsQuery.isLoading,
    error: testsQuery.error,
    createTest,
    updateTest,
  }
}

export function useLearnings() {
  const { user } = useStore()
  const queryClient = useQueryClient()

  const learningsQuery = useQuery({
    queryKey: ['learnings', user?.id],
    queryFn: async () => {
      if (!isSupabaseConfigured || !user) {
        return demoLearnings
      }

      const { data, error } = await supabase
        .from('learnings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data.map((learning): Learning => ({
        id: learning.id,
        userId: learning.user_id || '',
        category: learning.category || undefined,
        title: learning.title,
        description: learning.description || undefined,
        source: learning.source || undefined,
        testId: learning.test_id || undefined,
        campaignId: learning.campaign_id || undefined,
        impactLevel: learning.impact_level || undefined,
        tags: (learning.tags as string[]) || [],
        createdAt: learning.created_at,
      }))
    },
    enabled: !!user,
  })

  const createLearning = useMutation({
    mutationFn: async (learning: Partial<Learning>) => {
      if (!isSupabaseConfigured || !user) {
        return {
          id: crypto.randomUUID(),
          userId: 'demo-user',
          title: learning.title || 'New Learning',
          tags: [],
          createdAt: new Date().toISOString(),
          ...learning,
        }
      }

      const { data, error } = await supabase
        .from('learnings')
        .insert({
          user_id: user.id,
          category: learning.category,
          title: learning.title,
          description: learning.description,
          source: learning.source,
          test_id: learning.testId,
          campaign_id: learning.campaignId,
          impact_level: learning.impactLevel,
          tags: learning.tags,
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learnings'] })
    },
  })

  return {
    learnings: learningsQuery.data || [],
    isLoading: learningsQuery.isLoading,
    error: learningsQuery.error,
    createLearning,
  }
}

export function calculateSignificance(
  control: { conversions: number; traffic: number },
  variant: { conversions: number; traffic: number }
): SignificanceResult {
  const p1 = control.conversions / control.traffic
  const p2 = variant.conversions / variant.traffic
  const pooled = (control.conversions + variant.conversions) / (control.traffic + variant.traffic)
  const se = Math.sqrt(pooled * (1 - pooled) * (1 / control.traffic + 1 / variant.traffic))
  const z = (p2 - p1) / se

  let confidence: number
  if (Math.abs(z) >= 2.58) confidence = 99
  else if (Math.abs(z) >= 1.96) confidence = 95
  else if (Math.abs(z) >= 1.65) confidence = 90
  else confidence = Math.round((Math.abs(z) / 1.96) * 95)

  const lift = p1 > 0 ? ((p2 - p1) / p1) * 100 : 0

  return {
    controlRate: (p1 * 100).toFixed(2),
    variantRate: (p2 * 100).toFixed(2),
    lift: lift.toFixed(1),
    confidence,
    winner: confidence >= 95 ? (p2 > p1 ? 'variant' : 'control') : 'inconclusive',
  }
}
