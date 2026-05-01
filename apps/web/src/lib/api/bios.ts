import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import apiClient from './client'

export interface Bio {
  id: string
  user: {
    id: string
    name: string
  }
  title: string
  content: string
  style:
  | 'profissional'
  | 'criativo'
  | 'divertido'
  | 'neutro'
  | 'tecnologico'
  template: string
  links: SocialLink[]
  publicUrl: string
  isPublic: boolean
  views: number
  avatar?: string
  theme?: {
    primaryColor: string
    backgroundColor: string
    textColor: string
  }
  createdAt: string
  updatedAt: string
}

export interface BioAnalytics {
  bio: {
    id: string
    title: string
    createdAt: string
  }
  stats: {
    totalViews: number
    recentViews: number
    uniqueVisitors: number
    topReferrers: Array<{
      domain: string
      count: number
    }>
  }
  chartData: Array<{
    date: string
    views: number
  }>
}

export type SocialLink = {
  id: string
  platform: string
  url: string
  label: string
}

export interface CreateBioRequest {
  title: string
  content: string
  style: string
  template: string
  links: SocialLink[]
  publicUrl: string
  isPublic: boolean
}

export interface UpdateBioRequest extends CreateBioRequest {
  id: string
}

const mapperBio = (bio: any) => {
  return {
    ...bio,
    user: {
      id: bio.user.id,
      name: bio.user.name,
    }
  }
}

export const biosApi = {
  getAll: async (): Promise<Bio[]> => {
    const response = await apiClient.get('/bios/all')
    return response.data.map(mapperBio)
  },

  getBySlug: async (slug: string): Promise<Bio> => {
    const response = await apiClient.get(`/bios/u/${slug}`)
    return response.data
  },

  getByPublicUrl: async (publicUrl: string): Promise<Bio> => {
    const response = await apiClient.get(`/bios/${publicUrl}`)
    return response.data
  },

  getPublicBySlug: async (slug: string): Promise<Bio> => {
    const response = await apiClient.get(`/bios/public/${slug}`)
    return mapperBio(response.data)
  },

  getAnalytics: async (slug: string, params?: { startDate?: string; endDate?: string; days?: number }): Promise<BioAnalytics> => {
    const queryParams = new URLSearchParams()
    if (params?.startDate) queryParams.append('startDate', params.startDate)
    if (params?.endDate) queryParams.append('endDate', params.endDate)
    if (params?.days) queryParams.append('days', params.days.toString())
    
    const url = `/bios/analytics/${slug}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    const response = await apiClient.get(url)
    return response.data
  },

  create: async (data: CreateBioRequest): Promise<Bio> => {
    const response = await apiClient.post('/bios/save', data)
    return response.data
  },

  update: async (slug: string, data: UpdateBioRequest): Promise<Bio> => {
    const response = await apiClient.put(`/bios/update/${slug}`, data)
    return response.data
  },

  delete: async (slug: string): Promise<void> => {
    await apiClient.delete(`/bios/delete/${slug}`)
  },

  generate: async (data: { title: string, style: string }): Promise<Bio> => {
    const response = await apiClient.post('/bios/generate', data)
    return response.data
  },

}


export const generateContent = async (data: { title: string, style: string }): Promise<string> => {
  const response = await apiClient.post('/bios/generate', data)
  return response.data.bio || response.data
}


export const useBios = () => {
  return useQuery({
    queryKey: ['bios'],
    queryFn: biosApi.getAll,
    staleTime: 5 * 60 * 1000,
  })
}

export const useBio = (slug: string) => {
  return useQuery({
    queryKey: ['bio', slug],
    queryFn: () => biosApi.getBySlug(slug),
    enabled: !!slug,
  })
}

export const usePublicBio = (slug: string) => {
  return useQuery({
    queryKey: ['public-bio', slug],
    queryFn: () => biosApi.getPublicBySlug(slug).catch(() => null),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  })
}

export const useBioBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['bio', slug],
    queryFn: () => biosApi.getBySlug(slug),
    enabled: !!slug,
  })
}

export const useBioAnalytics = (slug: string, params?: { startDate?: string; endDate?: string; days?: number }) => {
  return useQuery({
    queryKey: ['bio-analytics', slug, params],
    queryFn: () => biosApi.getAnalytics(slug, params),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}


export const useGenerateContent = () => {
  return useMutation({
    mutationFn: async (data: { title: string, style: string }) => {
      const content = await generateContent(data)
      return { content }
    },
  })
}

export const useCreateBio = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateBioRequest) => biosApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bios'] })
    },
  })
}



export const useUpdateBio = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ publicUrl, data }: { publicUrl: string; data: UpdateBioRequest }) =>
      biosApi.update(publicUrl, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bios'] })
      queryClient.invalidateQueries({ queryKey: ['bio'] })
    },
  })
}

export const useDeleteBio = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (publicUrl: string) => biosApi.delete(publicUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bios'] })
      queryClient.invalidateQueries({ queryKey: ['bio-stats'] })
    },
  })
}


export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export const getBioUrl = (publicUrl: string): string => {
  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://autobio.app/bio'
    : 'http://localhost:3001/bio'
  return `${baseUrl}/${publicUrl}`
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Erro ao copiar para clipboard:', error)
    return false
  }
}