import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { useStore } from '@/store/useStore'
import type { User } from '@/types'

export function useAuth() {
  const [loading, setLoading] = useState(true)
  const { user, setUser, logout } = useStore()

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Demo mode - set a demo user
      setUser({
        id: 'demo-user',
        email: 'demo@adpilot.com',
        fullName: 'Demo User',
        companyName: 'Demo Company',
        industry: 'consulting',
      })
      setLoading(false)
      return
    }

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await fetchProfile(session.user.id)
      } else if (event === 'SIGNED_OUT') {
        logout()
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error

      setUser({
        id: data.id,
        email: data.email || '',
        fullName: data.full_name || undefined,
        companyName: data.company_name || undefined,
        industry: data.industry || undefined,
      })
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      setUser({
        id: 'demo-user',
        email,
        fullName: 'Demo User',
      })
      return { error: null }
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string, fullName?: string) => {
    if (!isSupabaseConfigured) {
      setUser({
        id: 'demo-user',
        email,
        fullName: fullName || 'Demo User',
      })
      return { error: null }
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    return { error }
  }

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      logout()
      return { error: null }
    }

    const { error } = await supabase.auth.signOut()
    if (!error) {
      logout()
    }
    return { error }
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return { error: new Error('No user logged in') }

    if (!isSupabaseConfigured) {
      setUser({ ...user, ...updates })
      return { error: null }
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: updates.fullName,
        company_name: updates.companyName,
        industry: updates.industry,
      })
      .eq('id', user.id)

    if (!error) {
      setUser({ ...user, ...updates })
    }

    return { error }
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAuthenticated: !!user,
  }
}
