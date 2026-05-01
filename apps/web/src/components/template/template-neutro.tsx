import type { Bio } from "@/lib/api/bios"
import { motion } from "framer-motion"
import {
    Camera,
    Circle,
    Dot,
    ExternalLink,
    Facebook,
    Github,
    Globe,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Minus,
    Plus,
    Square,
    Triangle,
    Twitter,
    Youtube
} from "lucide-react"
import type { JSX } from "react"
import ReactMarkdown from "react-markdown"

type TemplateNeutroProps = {
    bio: Bio
}

export const TemplateNeutro = ({ bio }: TemplateNeutroProps) => {

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

    const primaryTextStyle = bio.theme ? {
        color: bio.theme.primaryColor
    } : {}

    return (
        <div className={`min-h-screen ${bio.theme ? '' : 'bg-linear-to-br from-gray-50 via-stone-50 to-slate-100'} relative`} style={customStyles}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-20 right-20 w-32 h-32 border border-gray-200 rounded-full"
                />

                <motion.div
                    animate={{
                        rotate: [360, 0],
                        opacity: [0.05, 0.15, 0.05]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-32 left-16 w-24 h-24 border border-gray-300"
                />

                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/4 w-16 h-16 bg-gray-200 rounded-full"
                />
            </div>

            <div className="container mx-auto px-6 py-16 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative mb-16"
                >
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
                        <div className="px-12 py-16 text-center">
                            <div className="flex items-center justify-center mb-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                    className="relative"
                                >
                                    {bio.avatar ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="relative"
                                        >
                                            <img
                                                src={bio.avatar}
                                                alt={`Avatar de ${bio.title}`}
                                                className="w-16 h-16 rounded-full object-cover border border-gray-200"
                                                style={bio.theme ? { borderColor: bio.theme.primaryColor } : {}}
                                            />
                                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full" style={bio.theme ? { backgroundColor: bio.theme.primaryColor } : { backgroundColor: '#d1d5db' }}></div>
                                        </motion.div>
                                    ) : (
                                        <>
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200" style={bio.theme ? { backgroundColor: bio.theme.backgroundColor, borderColor: bio.theme.primaryColor } : {}}>
                                                <Circle className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full" style={bio.theme ? { backgroundColor: bio.theme.primaryColor } : { backgroundColor: '#d1d5db' }}></div>
                                        </>
                                    )}
                                </motion.div>
                            </div>

                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className={`text-4xl font-light mb-4 tracking-wide ${bio.theme ? '' : 'text-gray-800'}`}
                                style={primaryTextStyle}
                            >
                                {bio.title}
                            </motion.h1>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.6 }}
                                className="flex items-center justify-center space-x-6 text-sm text-gray-500"
                            >
                                <div className="flex items-center space-x-2">
                                    <Dot className="w-3 h-3" style={bio.theme ? primaryTextStyle : { color: '#9ca3af' }} />
                                    <span>{bio.user?.name || 'Usuário'}</span>
                                </div>
                                <div className="w-px h-4" style={bio.theme ? { backgroundColor: bio.theme.textColor, opacity: 0.3 } : { backgroundColor: '#d1d5db' }}></div>
                                <div className="flex items-center space-x-2">
                                    <Dot className="w-3 h-3" style={bio.theme ? primaryTextStyle : { color: '#9ca3af' }} />
                                    <span>{new Date(bio.createdAt).toLocaleDateString('pt-BR')}</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`backdrop-blur-sm rounded-lg shadow-sm border p-12 mb-12 ${bio.theme ? 'bg-white/10 border-white/20' : 'bg-white/70 border-gray-200/50'}`}
                >
                    <div className="prose prose-lg max-w-none">
                        <div className={`leading-relaxed ${bio.theme ? '' : 'text-gray-700'}`} style={{ color: bio.theme ? bio.theme.textColor : undefined }}>
                            <ReactMarkdown
                                components={{
                                    h1: ({ children }) => (
                                        <h1 className={`text-2xl font-light mb-6 pb-3 border-b flex items-center ${bio.theme ? 'border-white/20' : 'text-gray-800 border-gray-200'}`}>
                                            <Minus className="w-4 h-4 mr-3" style={bio.theme ? primaryTextStyle : { color: '#9ca3af' }} />
                                            {children}
                                        </h1>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className={`text-xl font-light mb-4 flex items-center ${bio.theme ? '' : 'text-gray-700'}`}>
                                            <Plus className="w-4 h-4 mr-3" style={bio.theme ? primaryTextStyle : { color: '#9ca3af' }} />
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className={`text-lg font-light mb-3 flex items-center ${bio.theme ? '' : 'text-gray-600'}`}>
                                            <Dot className="w-3 h-3 mr-3" style={bio.theme ? primaryTextStyle : { color: '#9ca3af' }} />
                                            {children}
                                        </h3>
                                    ),
                                    p: ({ children }) => (
                                        <p className={`mb-6 leading-relaxed text-base font-light ${bio.theme ? '' : 'text-gray-600'}`}>
                                            {children}
                                        </p>
                                    ),
                                    ul: ({ children }) => <ul className="list-none mb-6 space-y-3">{children}</ul>,
                                    li: ({ children }) => (
                                        <li className={`flex items-start font-light ${bio.theme ? '' : 'text-gray-600'}`}>
                                            <span className={`w-2 h-2 rounded-full mt-2 mr-4 shrink-0 ${bio.theme ? 'opacity-50' : 'bg-gray-300'}`} style={bio.theme ? { backgroundColor: bio.theme.primaryColor } : {}}></span>
                                            <span>{children}</span>
                                        </li>
                                    ),
                                    strong: ({ children }) => (
                                        <strong className={`font-medium ${bio.theme ? '' : 'text-gray-800'}`}>
                                            {children}
                                        </strong>
                                    ),
                                    blockquote: ({ children }) => (
                                        <blockquote className={`border-l-2 pl-6 italic my-6 ${bio.theme ? 'border-white/30 opacity-80' : 'border-gray-300 text-gray-600'}`}>
                                            {children}
                                        </blockquote>
                                    ),
                                }}
                            >
                                {bio.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </motion.div>

                {bio.links && bio.links.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className={`backdrop-blur-sm rounded-lg shadow-sm border p-12 mb-12 ${bio.theme ? 'bg-white/10 border-white/20' : 'bg-white/70 border-gray-200/50'}`}
                    >
                        <h2 className={`text-2xl font-light mb-8 text-center pb-4 border-b flex items-center justify-center ${bio.theme ? 'border-white/20' : 'text-gray-800 border-gray-200'}`}>
                            <Square className="w-5 h-5 mr-3" style={bio.theme ? primaryTextStyle : { color: '#9ca3af' }} />
                            Conexões
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {bio.links.map((link, index) => (
                                <motion.a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                        ease: "easeOut"
                                    }}
                                    whileHover={{
                                        y: -2,
                                        transition: { duration: 0.2 }
                                    }}
                                    className="group"
                                >
                                    <div className={`border rounded-lg p-6 transition-all duration-300 ${bio.theme ? 'bg-white/5 border-white/10 hover:border-white/30' : 'bg-white border-gray-200 group-hover:border-gray-300 group-hover:shadow-sm'}`}>
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-3 rounded-lg transition-all duration-300 ${bio.theme ? 'bg-white/10' : 'bg-gray-50 text-gray-600 group-hover:bg-gray-100'}`} style={bio.theme ? primaryTextStyle : {}}>
                                                {getPlatformIcon(link.label)}
                                            </div>
                                            <div className="flex-1">
                                                <div className={`font-medium text-base ${bio.theme ? '' : 'text-gray-800'}`}>{link.label}</div>
                                                <div className={`text-sm font-light ${bio.theme ? 'opacity-70' : 'text-gray-500'}`}>{link.platform}</div>
                                            </div>
                                            <ExternalLink className={`w-4 h-4 transition-colors ${bio.theme ? 'opacity-40 group-hover:opacity-100' : 'text-gray-400 group-hover:text-gray-600'}`} />
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className={`text-center backdrop-blur-sm rounded-lg shadow-sm border p-8 ${bio.theme ? 'bg-white/10 border-white/20' : 'bg-white/70 border-gray-200/50'}`}
                >
                    <div className={`flex items-center justify-center space-x-3 mb-3 ${bio.theme ? 'opacity-60' : 'text-gray-500'}`}>
                        <Triangle className="w-3 h-3" style={bio.theme ? primaryTextStyle : { color: '#9ca3af' }} />
                        <span className="text-sm font-light">
                            Criado com AutoBio
                        </span>
                        <Triangle className="w-3 h-3 rotate-180" style={bio.theme ? primaryTextStyle : { color: '#9ca3af' }} />
                    </div>
                    <p className={`text-xs font-light ${bio.theme ? 'opacity-50' : 'text-gray-400'}`}>
                        Crie sua biografia em{' '}
                        <a href="/" className={`transition-colors underline ${bio.theme ? 'hover:opacity-100' : 'text-gray-600 hover:text-gray-800 decoration-gray-300 hover:decoration-gray-500'}`}>
                            autobio.app
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}