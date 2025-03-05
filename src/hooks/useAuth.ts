import { create } from 'zustand'
import { getMe } from '../services/auth'
import { User } from '../types/user'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  login: (token: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (token: string) => {
    try {
      localStorage.setItem('token', token)
      const user = await getMe()
      set({ user, error: null })
    } catch (error) {
      set({ error: 'Ошибка авторизации' })
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null })
  },

  checkAuth: async () => {
    try {
      set({ loading: true })
      const user = await getMe()
      set({ user, error: null })
    } catch (error) {
      set({ error: 'Ошибка авторизации' })
    } finally {
      set({ loading: false })
    }
  },
})) 