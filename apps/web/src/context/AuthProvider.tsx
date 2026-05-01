
import apiClient from '@/lib/api/client'
import { useNavigate } from '@tanstack/react-router'
import axios from 'axios'
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { toast } from 'sonner'

export interface User {
    id: string
    email: string
    name: string
    plan: string
}

export interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (data: { email: string, password: string }) => Promise<void>
    logout: () => void
    refreshToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const isPublicRoute = location.pathname.startsWith('/bio/') ||
            location.pathname === '/' ||
            location.pathname === '/login' ||
            location.pathname.startsWith('/registro') ||
            location.pathname.startsWith('/home') ||
            location.pathname.startsWith('/sobre') ||
            location.pathname.startsWith('/contato') ||
            location.pathname.startsWith('/planos') ||
            location.pathname.startsWith('/termos') ||
            location.pathname.startsWith('/privacidade') ||
            location.pathname.startsWith('/recuperar-senha')

        if (isPublicRoute) {
            setIsLoading(false)
            return
        }

        const token = localStorage.getItem("auth_token")

        if (!token) {
            const isProtectedRoute = location.pathname.startsWith('/admin')
            if (isProtectedRoute) {
                navigate({ to: "/login" })
            }
            setIsLoading(false)
            return
        }

        const check = async () => {
            try {
                await verifyToken(token)
            } catch (err) {
                localStorage.removeItem("auth_token")
                const isProtectedRoute = location.pathname.startsWith('/admin')
                if (isProtectedRoute) {
                    navigate({ to: "/login" })
                }
            } finally {
                setIsLoading(false)
            }
        }

        check()
    }, [])


    const verifyToken = async (token: string) => {
        try {
            const response = await apiClient.get("/auth/verify", {
                headers: { Authorization: `Bearer ${token}` },
            })

            if (!response.data) {
                throw new Error("Token inválido")
            }
            setUser(response.data.user)
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                localStorage.removeItem("auth_token")
                setUser(null)
                const isProtectedRoute = location.pathname.startsWith('/admin')
                if (isProtectedRoute) {
                    toast.error("Você precisa estar logado para acessar esta página!")
                    navigate({ to: "/login" })
                }
            }
            throw error
        }
    }


    const login = async (data: { email: string, password: string }) => {
        try {
            setIsLoading(true)
            const response = await apiClient.post('/auth/login', data)
            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token)
                console.log(response.data)
                setUser({
                    id: response.data.user.id,
                    email: response.data.user.email,
                    name: response.data.user.name,
                    plan: response.data.user.plan,
                })
                toast.success('Login realizado com sucesso!')

                setTimeout(() => {
                    navigate({ to: '/admin/dashboard' })
                }, 200)
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.message || error.response?.data?.error || "Usuário ou senha inválidos"
                toast.error(msg)
            } else {
                console.error('Erro não-axios:', error)
                toast.error('Erro interno do sistema')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('auth_token')
        setUser(null)
        navigate({ to: '/login' })
    }

    const refreshToken = async () => {
        try {
            const token = localStorage.getItem('auth_token')
            if (!token) {
                throw new Error('Nenhum token encontrado')
            }

            const response = await apiClient.post('/auth/refresh', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            const data = response.data
            localStorage.setItem('auth_token', data.token)
            setUser(data.user)
        } catch (error) {
            console.error('Erro ao renovar token:', error)
            logout()
            throw error
        }
    }

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshToken,

    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider')
    }

    return context
}

export const useRequireAuth = () => {
    const { isAuthenticated, isLoading } = useAuth()

    return { isAuthenticated, isLoading }
}

export const useAuthToken = () => {
    const getToken = () => localStorage.getItem('auth_token')

    const getAuthHeaders = () => {
        const token = getToken()
        return token ? { Authorization: `Bearer ${token}` } : {}
    }

    return { getToken, getAuthHeaders }
}

