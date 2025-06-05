import axios from 'axios'
import { create } from 'zustand'
import toast from 'react-hot-toast'


export const useAuthStore = create((set) => ({
  user: null,
  isSignUp: false,
  isAuthCheck: true,
  isLogout: false,
  isLogin: false,
  login: async (credentials) => {
    set({ isLogin: true })
    try {
      const response = await axios.post('/api/v1/auth/login', credentials)
      set({ user: response.data.user, isLogin: false })
      toast.success("Login successfully")
    } catch (error) {
      console.log(error)
      set({ user: null, isLogin: false })
      toast.error(error.response.data.message || 'Login error')
    }
  },
  logout: async () => {
    set({ isLogout: true })
    try {
      await axios.post('/api/v1/auth/logout')
      set({ user: null, isLogout: false })
      toast.success("Logout successfully")
    } catch (error) {
      console.log(error)
      set({ isLogout: false })
      toast.error(error.responce.data.message || 'logout error')
    }
  },
  signup: async (credentials) => {
    set({ isSignUp: true })
    try {

      const responce = await axios.post('/api/v1/auth/signup', credentials)
      set({ user: responce.data.user, isSignUp: false })
      toast.success("Account created successfully")
    } catch (error) {
      console.log(error, 'authUser error')
      toast.error(error.responce.data.message || 'error signup')
      set({ isSignUp: false, user: null })
    }
  },
  authCheck: async () => {
    set({ isAuthCheck: true })
    try {
      const response = await axios.get('/api/v1/auth/authCheck')
      set({ user: response.data.user, isAuthCheck: false })
    } catch (error) {
      console.log(error)
      set({ isAuthCheck: false, user: null })
      toast.error(error.response.data.message || 'useAuthcheck error')
    }
  }
}))