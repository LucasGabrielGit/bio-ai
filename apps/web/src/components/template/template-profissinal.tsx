
import type { Bio } from "@/lib/api/bios"
import { motion } from "framer-motion"
import {
    ExternalLink,
    Heart,
    Github,
    Twitter,
    Instagram,
    Facebook,
    Youtube,
    Linkedin,
    Mail,
    MapPin,
    Camera,
    Globe,
    Briefcase,
    Award,
    Building
} from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Separator } from "../ui/separator"
import type { JSX } from "react"

type TemplateProfissionalProps = {
    bio: Bio
}

export const TemplateProfissional = ({ bio }: TemplateProfissionalProps) => {

    const getPlatformIcon = (label: string) => {
        const iconMap: Record<string, JSX.Element> = {
            github: <Github className="w-5 h-5" />,
            twitter: <Twitter className="w-5 h-5" />,
            instagram: <Instagram className="w-5 h-5" />,
            facebook: <Facebook className="w-5 h-5" />,
            youtube: <Youtube className="w-5 h-5" />,
            linkedin: <Linkedin className="w-5 h-5" />,
            email: <Mail className="w-5 h-5" />,
            website: <Globe className="w-5 h-5" />,
            portfolio: <Camera className="w-5 h-5" />,
            other: <MapPin className="w-5 h-5" />
        }
        return iconMap[label.toLowerCase()] || <Globe className="w-5 h-5" />
    }

    const customStyles = bio.theme ? {
        backgroundColor: bio.theme.backgroundColor,
        color: bio.theme.textColor,
    } : {}

    const primaryColorStyle = bio.theme ? {
        backgroundColor: bio.theme.primaryColor,
        borderColor: bio.theme.primaryColor,
        color: '#ffffff'
    } : {}

    return (
        <div className={`min-h-screen ${bio.theme ? '' : 'bg-linear-to-br from-slate-50 via-gray-50 to-slate-100'}`} style={customStyles}>
            <div className="container mx-auto px-4 py-12 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`shadow-lg rounded-lg overflow-hidden mb-8 ${bio.theme ? '' : 'bg-white'}`}
                >
                    <div className={`px-8 py-12 ${bio.theme ? '' : 'bg-linear-to-r from-slate-700 to-slate-900 text-white'}`} style={bio.theme ? { backgroundColor: bio.theme.primaryColor, color: '#ffffff' } : {}}>
                        <div className="flex items-center space-x-6">
                            {bio.avatar ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <img
                                        src={bio.avatar}
                                        alt={`Avatar de ${bio.title}`}
                                        className="w-20 h-20 rounded-full object-cover border-4 border-white/20"
                                    />
                                </motion.div>
                            ) : (
                                <div className="bg-white/10 p-4 rounded-full">
                                    <Briefcase className="w-8 h-8" />
                                </div>
                            )}
                            <div>
                                <h1 className="text-4xl font-bold mb-2">{bio.title}</h1>
                                <div className="flex items-center space-x-4 text-slate-200">
                                    <div className="flex items-center space-x-2">
                                        <Building className="w-4 h-4" />
                                        <span>Criado por {bio.user?.name || 'Usuário'}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Award className="w-4 h-4" />
                                        <span>{new Date(bio.createdAt).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`shadow-lg rounded-lg p-8 mb-8 ${bio.theme ? 'bg-white/10 backdrop-blur-sm' : 'bg-white'}`}
                >
                    <div className="prose prose-lg max-w-none">
                        <div className="leading-relaxed" style={{ color: bio.theme ? bio.theme.textColor : undefined }}>
                                <ReactMarkdown
                                    components={{
                                        h1: ({ children }) => <h1 className={`text-2xl font-bold mb-4 ${bio.theme ? '' : 'text-slate-800'}`}>{children}</h1>,
                                        h2: ({ children }) => <h2 className={`text-xl font-semibold mb-3 ${bio.theme ? '' : 'text-slate-700'}`}>{children}</h2>,
                                        h3: ({ children }) => <h3 className={`text-lg font-medium mb-2 ${bio.theme ? '' : 'text-slate-600'}`}>{children}</h3>,
                                        p: ({ children }) => <p className={`mb-4 leading-relaxed ${bio.theme ? '' : 'text-slate-600'}`}>{children}</p>,
                                        ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
                                        li: ({ children }) => <li className={bio.theme ? '' : 'text-slate-600'}>{children}</li>,
                                        strong: ({ children }) => <strong className={`font-semibold ${bio.theme ? '' : 'text-slate-800'}`}>{children}</strong>,
                                    }}
                                >
                                {bio.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </motion.div>

                {bio.links && bio.links.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className={`shadow-lg rounded-lg p-8 mb-8 ${bio.theme ? 'bg-white/10 backdrop-blur-sm' : 'bg-white'}`}
                    >
                        <h2 className={`text-2xl font-bold mb-6 flex items-center ${bio.theme ? '' : 'text-slate-800'}`}>
                            <Globe className={`w-6 h-6 mr-3 ${bio.theme ? '' : 'text-slate-600'}`} />
                            Contatos Profissionais
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {bio.links.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group flex items-center p-4 border rounded-lg transition-all duration-300 hover:shadow-md ${bio.theme ? 'bg-white/5 border-white/20 hover:bg-white/10' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-slate-300'}`}
                                >
                                    <div className={`p-2 rounded-lg transition-colors ${bio.theme ? '' : 'bg-slate-600 text-white group-hover:bg-slate-700'}`} style={bio.theme ? primaryColorStyle : {}}>
                                        {getPlatformIcon(link.label)}
                                    </div>
                                    <div className="flex-1 ml-4">
                                        <div className={`font-semibold ${bio.theme ? '' : 'text-slate-800'}`}>{link.label}</div>
                                        <div className={`text-sm ${bio.theme ? 'opacity-80' : 'text-slate-500'}`}>{link.platform}</div>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className={`text-center shadow-lg rounded-lg p-6 ${bio.theme ? 'bg-white/10 backdrop-blur-sm' : 'bg-white'}`}
                >
                    <div className={`flex items-center justify-center space-x-2 mb-2 ${bio.theme ? 'opacity-80' : 'text-slate-600'}`}>
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium">Criado com AutoBio</span>
                    </div>
                    <p className={`text-xs ${bio.theme ? 'opacity-60' : 'text-slate-500'}`}>
                        Crie sua biografia profissional em{' '}
                        <a href="/" className={`font-medium hover:underline transition-colors ${bio.theme ? '' : 'text-slate-700 hover:text-slate-900'}`}>
                            autobio.app
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
