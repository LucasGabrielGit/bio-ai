import apiClient from './client'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  user: {
    id: string
    name: string
    email: string
    createdAt: string
  }
  token: string
}

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', data)
    return response.data
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/user/register', data)
    return response.data
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout')
  },

  me: async (): Promise<User> => {
    const response = await apiClient.get('/auth/me')
    return response.data
  },

  forgotPassword: async (email: string): Promise<void> => {
    await apiClient.post('/auth/forgot-password', { email })
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    await apiClient.post('/auth/reset-password', { token, password })
  },

  verifyToken: async (): Promise<boolean> => {
    try {
      await apiClient.get('/auth/verify')
      return true
    } catch {
      return false
    }
  }
}

export const authUtils = {
  setToken: (token: string) => {
    localStorage.setItem('auth_token', token)
  },

  getToken: () => {
    return localStorage.getItem('auth_token')
  },

  removeToken: () => {
    localStorage.removeItem('auth_token')
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token')
  }
}