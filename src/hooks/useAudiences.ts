import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { useStore } from '@/store/useStore'
import type { CustomerAvatar, TargetingStrategy } from '@/types'

// Demo data for when Supabase is not configured
const demoAvatars: CustomerAvatar[] = [
  {
    id: '1',
    userId: 'demo-user',
    name: 'Ambitious Consultant',
    ageRangeStart: 35,
    ageRangeEnd: 55,
    gender: 'all',
    location: 'United States',
    incomeLevel: '$100,000 - $150,000',
    education: "Bachelor's Degree",
    jobTitle: 'Business Consultant',
    industry: 'Consulting',
    companySize: '2-10 employees',
    goals: ['Scale to 7 figures', 'Build a team', 'Work less hours'],
    frustrations: ['Inconsistent leads', 'Feast or famine income', 'No systems'],
    fears: ['Staying stuck', 'Missing opportunities', 'Burnout'],
    desires: ['Financial freedom', 'Impact', 'Recognition'],
    objections: ['Too expensive', 'No time', 'Tried before'],
    whereTheyHangOut: ['LinkedIn', 'Facebook Groups', 'Podcasts'],
    influencersTheyFollow: ['Tony Robbins', 'Gary Vee', 'Russell Brunson'],
    booksPodcasts: ['$100M Offers', 'Expert Secrets', 'Building a StoryBrand'],
    buyingTriggers: ['Lost a client', 'Hit a plateau', 'Competitor success'],
    phrasesTheyUse: ['Scale my business', 'Get more clients', 'Systemize'],
    painPointLanguage: ['Feast or famine', 'Trading time for money', 'Stuck'],
    dailyRoutine: 'Wakes up early, checks emails, client calls, content creation',
    decisionMakingProcess: 'Research-heavy, needs social proof, consults spouse',
    isPrimary: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const demoStrategies: TargetingStrategy[] = [
  {
    id: '1',
    userId: 'demo-user',
    avatarId: '1',
    name: 'Consultant Cold Audience',
    interests: ['Business consulting', 'Entrepreneurship', 'Small business'],
    behaviors: ['Small business owners', 'Engaged shoppers'],
    ageMin: 35,
    ageMax: 55,
    genders: ['all'],
    locations: ['United States'],
    languages: ['English'],
    customAudiences: [],
    lookalikesSources: ['Email list', 'Website visitors'],
    exclusions: ['Existing customers'],
    layeringNotes: 'Layer interests with behaviors for higher quality',
    performanceNotes: '',
    estimatedAudienceSize: '2-5M',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export function useAvatars() {
  const { user } = useStore()
  const queryClient = useQueryClient()

  const avatarsQuery = useQuery({
    queryKey: ['avatars', user?.id],
    queryFn: async () => {
      if (!isSupabaseConfigured || !user) {
        return demoAvatars
      }

      const { data, error } = await supabase
        .from('customer_avatars')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data.map((avatar): CustomerAvatar => ({
        id: avatar.id,
        userId: avatar.user_id || '',
        name: avatar.name,
        ageRangeStart: avatar.age_range_start || undefined,
        ageRangeEnd: avatar.age_range_end || undefined,
        gender: avatar.gender || undefined,
        location: avatar.location || undefined,
        incomeLevel: avatar.income_level || undefined,
        education: avatar.education || undefined,
        jobTitle: avatar.job_title || undefined,
        industry: avatar.industry || undefined,
        companySize: avatar.company_size || undefined,
        goals: (avatar.goals as string[]) || [],
        frustrations: (avatar.frustrations as string[]) || [],
        fears: (avatar.fears as string[]) || [],
        desires: (avatar.desires as string[]) || [],
        objections: (avatar.objections as string[]) || [],
        whereTheyHangOut: (avatar.where_they_hang_out as string[]) || [],
        influencersTheyFollow: (avatar.influencers_they_follow as string[]) || [],
        booksPodcasts: (avatar.books_podcasts as string[]) || [],
        buyingTriggers: (avatar.buying_triggers as string[]) || [],
        phrasesTheyUse: (avatar.phrases_they_use as string[]) || [],
        painPointLanguage: (avatar.pain_point_language as string[]) || [],
        dailyRoutine: avatar.daily_routine || undefined,
        decisionMakingProcess: avatar.decision_making_process || undefined,
        isPrimary: avatar.is_primary,
        createdAt: avatar.created_at,
        updatedAt: avatar.updated_at,
      }))
    },
    enabled: !!user,
  })

  const createAvatar = useMutation({
    mutationFn: async (avatar: Partial<CustomerAvatar>) => {
      if (!isSupabaseConfigured || !user) {
        const newAvatar: CustomerAvatar = {
          id: crypto.randomUUID(),
          userId: 'demo-user',
          name: avatar.name || 'New Avatar',
          goals: avatar.goals || [],
          frustrations: avatar.frustrations || [],
          fears: avatar.fears || [],
          desires: avatar.desires || [],
          objections: avatar.objections || [],
          whereTheyHangOut: avatar.whereTheyHangOut || [],
          influencersTheyFollow: avatar.influencersTheyFollow || [],
          booksPodcasts: avatar.booksPodcasts || [],
          buyingTriggers: avatar.buyingTriggers || [],
          phrasesTheyUse: avatar.phrasesTheyUse || [],
          painPointLanguage: avatar.painPointLanguage || [],
          isPrimary: avatar.isPrimary || false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...avatar,
        }
        return newAvatar
      }

      const { data, error } = await supabase
        .from('customer_avatars')
        .insert({
          user_id: user.id,
          name: avatar.name,
          age_range_start: avatar.ageRangeStart,
          age_range_end: avatar.ageRangeEnd,
          gender: avatar.gender,
          location: avatar.location,
          income_level: avatar.incomeLevel,
          education: avatar.education,
          job_title: avatar.jobTitle,
          industry: avatar.industry,
          company_size: avatar.companySize,
          goals: avatar.goals,
          frustrations: avatar.frustrations,
          fears: avatar.fears,
          desires: avatar.desires,
          objections: avatar.objections,
          where_they_hang_out: avatar.whereTheyHangOut,
          influencers_they_follow: avatar.influencersTheyFollow,
          books_podcasts: avatar.booksPodcasts,
          buying_triggers: avatar.buyingTriggers,
          phrases_they_use: avatar.phrasesTheyUse,
          pain_point_language: avatar.painPointLanguage,
          daily_routine: avatar.dailyRoutine,
          decision_making_process: avatar.decisionMakingProcess,
          is_primary: avatar.isPrimary,
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['avatars'] })
    },
  })

  const updateAvatar = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<CustomerAvatar> & { id: string }) => {
      if (!isSupabaseConfigured) {
        return { id, ...updates }
      }

      const { data, error } = await supabase
        .from('customer_avatars')
        .update({
          name: updates.name,
          age_range_start: updates.ageRangeStart,
          age_range_end: updates.ageRangeEnd,
          gender: updates.gender,
          location: updates.location,
          income_level: updates.incomeLevel,
          education: updates.education,
          job_title: updates.jobTitle,
          industry: updates.industry,
          company_size: updates.companySize,
          goals: updates.goals,
          frustrations: updates.frustrations,
          fears: updates.fears,
          desires: updates.desires,
          objections: updates.objections,
          where_they_hang_out: updates.whereTheyHangOut,
          influencers_they_follow: updates.influencersTheyFollow,
          books_podcasts: updates.booksPodcasts,
          buying_triggers: updates.buyingTriggers,
          phrases_they_use: updates.phrasesTheyUse,
          pain_point_language: updates.painPointLanguage,
          daily_routine: updates.dailyRoutine,
          decision_making_process: updates.decisionMakingProcess,
          is_primary: updates.isPrimary,
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['avatars'] })
    },
  })

  const deleteAvatar = useMutation({
    mutationFn: async (id: string) => {
      if (!isSupabaseConfigured) {
        return { id }
      }

      const { error } = await supabase
        .from('customer_avatars')
        .delete()
        .eq('id', id)

      if (error) throw error
      return { id }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['avatars'] })
    },
  })

  return {
    avatars: avatarsQuery.data || [],
    isLoading: avatarsQuery.isLoading,
    error: avatarsQuery.error,
    createAvatar,
    updateAvatar,
    deleteAvatar,
  }
}

export function useTargetingStrategies() {
  const { user } = useStore()
  const queryClient = useQueryClient()

  const strategiesQuery = useQuery({
    queryKey: ['targeting-strategies', user?.id],
    queryFn: async () => {
      if (!isSupabaseConfigured || !user) {
        return demoStrategies
      }

      const { data, error } = await supabase
        .from('targeting_strategies')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data.map((strategy): TargetingStrategy => ({
        id: strategy.id,
        userId: strategy.user_id || '',
        avatarId: strategy.avatar_id || undefined,
        name: strategy.name,
        interests: (strategy.interests as string[]) || [],
        behaviors: (strategy.behaviors as string[]) || [],
        ageMin: strategy.age_min || undefined,
        ageMax: strategy.age_max || undefined,
        genders: (strategy.genders as string[]) || [],
        locations: (strategy.locations as string[]) || [],
        languages: (strategy.languages as string[]) || [],
        customAudiences: (strategy.custom_audiences as string[]) || [],
        lookalikesSources: (strategy.lookalike_sources as string[]) || [],
        exclusions: (strategy.exclusions as string[]) || [],
        layeringNotes: strategy.layering_notes || undefined,
        performanceNotes: strategy.performance_notes || undefined,
        estimatedAudienceSize: strategy.estimated_audience_size || undefined,
        status: strategy.status,
        createdAt: strategy.created_at,
        updatedAt: strategy.updated_at,
      }))
    },
    enabled: !!user,
  })

  const createStrategy = useMutation({
    mutationFn: async (strategy: Partial<TargetingStrategy>) => {
      if (!isSupabaseConfigured || !user) {
        return {
          id: crypto.randomUUID(),
          userId: 'demo-user',
          ...strategy,
        }
      }

      const { data, error } = await supabase
        .from('targeting_strategies')
        .insert({
          user_id: user.id,
          avatar_id: strategy.avatarId,
          name: strategy.name,
          interests: strategy.interests,
          behaviors: strategy.behaviors,
          age_min: strategy.ageMin,
          age_max: strategy.ageMax,
          genders: strategy.genders,
          locations: strategy.locations,
          languages: strategy.languages,
          custom_audiences: strategy.customAudiences,
          lookalike_sources: strategy.lookalikesSources,
          exclusions: strategy.exclusions,
          layering_notes: strategy.layeringNotes,
          estimated_audience_size: strategy.estimatedAudienceSize,
          status: strategy.status || 'draft',
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['targeting-strategies'] })
    },
  })

  return {
    strategies: strategiesQuery.data || [],
    isLoading: strategiesQuery.isLoading,
    error: strategiesQuery.error,
    createStrategy,
  }
}
