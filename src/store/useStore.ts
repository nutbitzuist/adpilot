import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface AppState {
  user: User | null
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  currentWorkspace: string | null
  theme: 'light' | 'dark' | 'system'
  
  setUser: (user: User | null) => void
  setSidebarOpen: (open: boolean) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setCurrentWorkspace: (workspace: string | null) => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  logout: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      sidebarOpen: true,
      sidebarCollapsed: false,
      currentWorkspace: null,
      theme: 'light',
      
      setUser: (user) => set({ user }),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      setCurrentWorkspace: (currentWorkspace) => set({ currentWorkspace }),
      setTheme: (theme) => set({ theme }),
      logout: () => set({ user: null, currentWorkspace: null }),
    }),
    {
      name: 'adpilot-storage',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
      }),
    }
  )
)
