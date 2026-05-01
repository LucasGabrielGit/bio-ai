import { createFileRoute } from '@tanstack/react-router'
import { usePublicBio } from '../lib/api/bios'
import { useState } from 'react'
import { Copy, ExternalLink, Share2, Heart, Eye } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { motion } from 'framer-motion'
import { BioTemplate } from '@/components/template/template'



export const Route = createFileRoute('/bio/$slug')({
  component: PublicBioPage,
})

function PublicBioPage() {
  const { slug } = Route.useParams()
  const { data: bio, isLoading, error } = usePublicBio(slug)

  return <BioTemplate bio={bio} isLoading={isLoading} error={error} />

}
