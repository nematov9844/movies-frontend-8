import { create } from 'zustand'
import { getMe } from '../services/auth'
import { User } from '../types/user'

export interface AuthState {
    user: {
    user: User
    token: string
  } | null
  setUser: (user: { user: User, token: string } | null) => void
  checkAuth: () => Promise<void>
  logout: () => void
  getMe: () => Promise<any>
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  checkAuth: async () => {
    try {
      const user = await getMe()
      set({ user })
    } catch (error) {
      set({ user: null })
    }
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ user: null })
  },
  getMe: async () => {
    return await getMe()
  }
}))

export type { User } 