import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { useStore } from '@/store/useStore'
import type { AdCopy, Offer, SwipeFileEntry } from '@/types'

const demoOffers: Offer[] = [
  {
    id: '1',
    userId: 'demo-user',
    name: 'Consulting Accelerator',
    offerType: 'course',
    headline: 'Scale Your Consulting Business to 7 Figures',
    description: 'The complete system for consultants who want to scale without burning out',
    price: '$2,997',
    valueStack: [
      { name: 'Core Training', value: '$4,997', description: '12 module video course' },
      { name: 'Templates Library', value: '$997', description: '50+ done-for-you templates' },
      { name: 'Community Access', value: '$1,997', description: 'Private mastermind group' },
    ],
    totalValue: '$7,991',
    bonuses: [
      { name: 'Quick Start Guide', value: '$297', description: 'Get results in 7 days' },
      { name: 'Live Q&A Calls', value: '$997', description: 'Monthly group coaching' },
    ],
    guaranteeType: '30-day',
    guaranteeDetails: 'Full refund if you don\'t see results in 30 days',
    urgencyType: 'limited_time',
    urgencyDetails: 'Price increases Friday at midnight',
    beforeState: 'Struggling to get consistent clients, working 60+ hours',
    afterState: 'Predictable 6-figure months, working 30 hours or less',
    timeframe: '90 days',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const demoCopy: AdCopy[] = [
  {
    id: '1',
    userId: 'demo-user',
    offerId: '1',
    name: 'Question Hook - Struggling',
    copyType: 'primary_text',
    hook: 'Are you still struggling to get consistent clients for your consulting business?',
    body: 'I was in the same place 3 years ago. Working 60+ hours a week, never knowing where my next client would come from.\n\nThen I discovered a simple system that changed everything.\n\nNow I help consultants like you build predictable 6-figure months while working less.',
    cta: 'Click below to learn how →',
    fullText: 'Are you still struggling to get consistent clients for your consulting business?\n\nI was in the same place 3 years ago. Working 60+ hours a week, never knowing where my next client would come from.\n\nThen I discovered a simple system that changed everything.\n\nNow I help consultants like you build predictable 6-figure months while working less.\n\nClick below to learn how →',
    hookType: 'question',
    tone: 'Conversational',
    length: 'medium',
    clarityScore: 85,
    emotionScore: 78,
    ctaStrength: 72,
    overallScore: 78,
    isWinner: true,
    tags: ['consulting', 'lead-magnet'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: 'demo-user',
    offerId: '1',
    name: 'Bold Claim - 7 Figures',
    copyType: 'primary_text',
    hook: 'I help consultants hit 7 figures without working more hours.',
    body: 'Sounds impossible? That\'s what I thought too.\n\nBut after scaling my own consulting business from $5k to $83k months, I realized the secret isn\'t working harder.\n\nIt\'s having the right system.\n\nThe same system I now teach to consultants who are ready to scale.',
    cta: 'Ready to see how it works? Click below.',
    hookType: 'bold_claim',
    tone: 'Authoritative',
    length: 'medium',
    clarityScore: 82,
    emotionScore: 75,
    ctaStrength: 80,
    overallScore: 79,
    isWinner: false,
    tags: ['consulting', 'high-ticket'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export function useOffers() {
  const { user } = useStore()
  const queryClient = useQueryClient()

  const offersQuery = useQuery({
    queryKey: ['offers', user?.id],
    queryFn: async () => {
      if (!isSupabaseConfigured || !user) {
        return demoOffers
      }

      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data.map((offer): Offer => ({
        id: offer.id,
        userId: offer.user_id || '',
        name: offer.name,
        offerType: offer.offer_type || undefined,
        headline: offer.headline || undefined,
        description: offer.description || undefined,
        price: offer.price || undefined,
        valueStack: (offer.value_stack as Offer['valueStack']) || [],
        totalValue: offer.total_value || undefined,
        bonuses: (offer.bonuses as Offer['bonuses']) || [],
        guaranteeType: offer.guarantee_type || undefined,
        guaranteeDetails: offer.guarantee_details || undefined,
        urgencyType: offer.urgency_type || undefined,
        urgencyDetails: offer.urgency_details || undefined,
        beforeState: offer.before_state || undefined,
        afterState: offer.after_state || undefined,
        timeframe: offer.timeframe || undefined,
        status: offer.status,
        createdAt: offer.created_at,
        updatedAt: offer.updated_at,
      }))
    },
    enabled: !!user,
  })

  const createOffer = useMutation({
    mutationFn: async (offer: Partial<Offer>) => {
      if (!isSupabaseConfigured || !user) {
        return {
          id: crypto.randomUUID(),
          userId: 'demo-user',
          name: offer.name || 'New Offer',
          valueStack: [],
          bonuses: [],
          status: 'draft',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...offer,
        }
      }

      const { data, error } = await supabase
        .from('offers')
        .insert({
          user_id: user.id,
          name: offer.name,
          offer_type: offer.offerType,
          headline: offer.headline,
          description: offer.description,
          price: offer.price,
          value_stack: offer.valueStack,
          total_value: offer.totalValue,
          bonuses: offer.bonuses,
          guarantee_type: offer.guaranteeType,
          guarantee_details: offer.guaranteeDetails,
          urgency_type: offer.urgencyType,
          urgency_details: offer.urgencyDetails,
          before_state: offer.beforeState,
          after_state: offer.afterState,
          timeframe: offer.timeframe,
          status: offer.status || 'draft',
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] })
    },
  })

  return {
    offers: offersQuery.data || [],
    isLoading: offersQuery.isLoading,
    error: offersQuery.error,
    createOffer,
  }
}

export function useAdCopy() {
  const { user } = useStore()
  const queryClient = useQueryClient()

  const copyQuery = useQuery({
    queryKey: ['ad-copy', user?.id],
    queryFn: async () => {
      if (!isSupabaseConfigured || !user) {
        return demoCopy
      }

      const { data, error } = await supabase
        .from('ad_copy')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data.map((copy): AdCopy => ({
        id: copy.id,
        userId: copy.user_id || '',
        offerId: copy.offer_id || undefined,
        campaignId: copy.campaign_id || undefined,
        name: copy.name,
        copyType: copy.copy_type || undefined,
        hook: copy.hook || undefined,
        body: copy.body || undefined,
        cta: copy.cta || undefined,
        fullText: copy.full_text || undefined,
        hookType: copy.hook_type || undefined,
        tone: copy.tone || undefined,
        length: copy.length || undefined,
        clarityScore: copy.clarity_score || undefined,
        emotionScore: copy.emotion_score || undefined,
        ctaStrength: copy.cta_strength || undefined,
        overallScore: copy.overall_score || undefined,
        performanceNotes: copy.performance_notes || undefined,
        isWinner: copy.is_winner,
        tags: (copy.tags as string[]) || [],
        status: copy.status,
        createdAt: copy.created_at,
        updatedAt: copy.updated_at,
      }))
    },
    enabled: !!user,
  })

  const createCopy = useMutation({
    mutationFn: async (copy: Partial<AdCopy>) => {
      if (!isSupabaseConfigured || !user) {
        return {
          id: crypto.randomUUID(),
          userId: 'demo-user',
          name: copy.name || 'New Copy',
          isWinner: false,
          tags: [],
          status: 'draft',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...copy,
        }
      }

      const { data, error } = await supabase
        .from('ad_copy')
        .insert({
          user_id: user.id,
          offer_id: copy.offerId,
          campaign_id: copy.campaignId,
          name: copy.name,
          copy_type: copy.copyType,
          hook: copy.hook,
          body: copy.body,
          cta: copy.cta,
          full_text: copy.fullText,
          hook_type: copy.hookType,
          tone: copy.tone,
          length: copy.length,
          clarity_score: copy.clarityScore,
          emotion_score: copy.emotionScore,
          cta_strength: copy.ctaStrength,
          overall_score: copy.overallScore,
          is_winner: copy.isWinner,
          tags: copy.tags,
          status: copy.status || 'draft',
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ad-copy'] })
    },
  })

  return {
    copies: copyQuery.data || [],
    isLoading: copyQuery.isLoading,
    error: copyQuery.error,
    createCopy,
  }
}

export function useSwipeFile() {
  const { user } = useStore()
  const queryClient = useQueryClient()

  const swipeQuery = useQuery({
    queryKey: ['swipe-file', user?.id],
    queryFn: async (): Promise<SwipeFileEntry[]> => {
      if (!isSupabaseConfigured || !user) {
        return []
      }

      const { data, error } = await supabase
        .from('swipe_file')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data.map((entry): SwipeFileEntry => ({
        id: entry.id,
        userId: entry.user_id || '',
        source: entry.source || undefined,
        sourceUrl: entry.source_url || undefined,
        screenshotUrl: entry.screenshot_url || undefined,
        primaryText: entry.primary_text || undefined,
        headline: entry.headline || undefined,
        description: entry.description || undefined,
        hookType: entry.hook_type || undefined,
        whyItWorks: entry.why_it_works || undefined,
        industry: entry.industry || undefined,
        formatType: entry.format_type || undefined,
        tags: (entry.tags as string[]) || [],
        createdAt: entry.created_at,
      }))
    },
    enabled: !!user,
  })

  const addToSwipeFile = useMutation({
    mutationFn: async (entry: Partial<SwipeFileEntry>) => {
      if (!isSupabaseConfigured || !user) {
        return {
          id: crypto.randomUUID(),
          userId: 'demo-user',
          tags: [],
          createdAt: new Date().toISOString(),
          ...entry,
        }
      }

      const { data, error } = await supabase
        .from('swipe_file')
        .insert({
          user_id: user.id,
          source: entry.source,
          source_url: entry.sourceUrl,
          screenshot_url: entry.screenshotUrl,
          primary_text: entry.primaryText,
          headline: entry.headline,
          description: entry.description,
          hook_type: entry.hookType,
          why_it_works: entry.whyItWorks,
          industry: entry.industry,
          format_type: entry.formatType,
          tags: entry.tags,
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['swipe-file'] })
    },
  })

  return {
    entries: swipeQuery.data || [],
    isLoading: swipeQuery.isLoading,
    error: swipeQuery.error,
    addToSwipeFile,
  }
}
