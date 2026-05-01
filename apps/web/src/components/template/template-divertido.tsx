import type { Bio } from "@/lib/api/bios";
import { motion } from "framer-motion";
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
  Smile,
  Sun,
  Star,
  Zap,
  Music,
  Gamepad2,
  Rocket,
  PartyPopper,
  Candy,
  Gift,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { JSX } from "react";

type TemplateDivertidoProps = {
  bio: Bio;
};

export const TemplateDivertido = ({ bio }: TemplateDivertidoProps) => {
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
      other: <MapPin className="w-5 h-5" />,
    };
    return iconMap[label.toLowerCase()] || <Globe className="w-5 h-5" />;
  };

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
    <div className={`min-h-screen ${bio.theme ? '' : 'bg-linear-to-br from-yellow-100 via-orange-50 to-red-100'} relative overflow-hidden`} style={customStyles}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-16 left-16 w-16 h-16 bg-yellow-400 rounded-full opacity-30 flex items-center justify-center"
        >
          <Sun className="w-8 h-8 text-orange-600" />
        </motion.div>

        <motion.div
          animate={{
            rotate: [360, 0],
            x: [0, -60, 60, 0],
            y: [0, 40, -40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 right-20 w-12 h-12 bg-pink-400 rounded-full opacity-25 flex items-center justify-center"
        >
          <Heart className="w-6 h-6 text-red-600" />
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/3 left-1/3 w-14 h-14 bg-blue-400 rounded-full opacity-20 flex items-center justify-center"
        >
          <Smile className="w-7 h-7 text-blue-700" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-2/3 right-1/4 w-10 h-10 bg-green-400 rounded-full opacity-30 flex items-center justify-center"
        >
          <Star className="w-5 h-5 text-green-700" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="relative mb-12"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-4 border-dashed" style={bio.theme ? { borderColor: bio.theme.primaryColor } : { borderColor: '#fdba74' }}>
            <div className={`px-8 py-12 text-white relative ${bio.theme ? '' : 'bg-linear-to-r from-yellow-400 via-orange-400 to-red-400'}`} style={bio.theme ? { backgroundColor: bio.theme.primaryColor } : {}}>
              <div className="absolute top-4 right-4 flex space-x-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <PartyPopper className="w-6 h-6 text-yellow-200" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Gift className="w-6 h-6 text-pink-200" />
                </motion.div>
              </div>

              <div className="absolute bottom-4 left-4 flex space-x-2">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Rocket className="w-5 h-5 text-blue-200" />
                </motion.div>
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Music className="w-5 h-5 text-green-200" />
                </motion.div>
              </div>

              <div className="flex items-center space-x-6">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
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
                        className="w-16 h-16 rounded-full object-cover border-2 border-white/30 backdrop-blur-sm"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center animate-bounce">
                        <Candy className="w-3 h-3 text-pink-800" />
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm border-2 border-white/30">
                        <Gamepad2 className="w-8 h-8" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center animate-bounce">
                        <Candy className="w-3 h-3 text-pink-800" />
                      </div>
                    </>
                  )}
                </motion.div>
                <div>
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-bold mb-2 text-shadow-lg"
                  >
                    {bio.title} 🎉
                  </motion.h1>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className={`flex items-center space-x-4 ${bio.theme ? 'opacity-90' : 'text-yellow-100'}`}
                  >
                    <div className="flex items-center space-x-2">
                      <Smile className="w-4 h-4 text-yellow-200" />
                      <span>Por {bio.user?.name || "Usuário"} 😊</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sun className="w-4 h-4 text-orange-200" />
                      <span>
                        {new Date(bio.createdAt).toLocaleDateString("pt-BR")} ✨
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border-3 ${bio.theme ? 'bg-white/20' : 'bg-white/95 border-yellow-200'}`}
          style={bio.theme ? { borderColor: bio.theme.primaryColor } : {}}
        >
          <div className="prose prose-lg max-w-none">
            <div className={`leading-relaxed ${bio.theme ? '' : 'text-gray-700'}`} style={{ color: bio.theme ? bio.theme.textColor : undefined }}>
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className={`text-3xl font-bold mb-4 flex items-center ${bio.theme ? '' : 'bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent'}`} style={bio.theme ? primaryTextStyle : {}}>
                      <PartyPopper className="w-6 h-6 text-yellow-500 mr-2" />
                      {children} 🎊
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className={`text-2xl font-semibold mb-3 flex items-center ${bio.theme ? '' : 'bg-linear-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent'}`} style={bio.theme ? primaryTextStyle : {}}>
                      <Rocket className="w-5 h-5 text-blue-500 mr-2" />
                      {children} 🚀
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className={`text-xl font-medium mb-2 flex items-center ${bio.theme ? '' : 'bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent'}`} style={bio.theme ? primaryTextStyle : {}}>
                      <Star className="w-4 h-4 text-yellow-500 mr-2" />
                      {children} ⭐
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 text-gray-600 leading-relaxed text-lg">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-none mb-4 space-y-3">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-600 flex items-start">
                      <span className="text-2xl mr-3">🎈</span>
                      <span className="pt-1">{children}</span>
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className={`font-bold ${bio.theme ? '' : 'bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent'}`} style={bio.theme ? primaryTextStyle : {}}>
                      {children}
                    </strong>
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
            className={`backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border-3 ${bio.theme ? 'bg-white/20' : 'bg-white/95 border-orange-200'}`}
            style={bio.theme ? { borderColor: bio.theme.primaryColor } : {}}
          >
            <h2 className={`text-3xl font-bold mb-8 flex items-center justify-center ${bio.theme ? '' : 'bg-linear-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent'}`} style={bio.theme ? primaryTextStyle : {}}>
              <Gamepad2 className="w-8 h-8 mr-3" style={bio.theme ? primaryTextStyle : { color: '#f97316' }} />
              Vamos nos Conectar! 🎮
              <PartyPopper className="w-6 h-6 ml-3 animate-bounce" style={bio.theme ? primaryTextStyle : { color: '#ec4899' }} />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bio.links.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    bounce: 0.5,
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotate: [0, -2, 2, 0],
                    transition: { duration: 0.3 },
                  }}
                  className="group relative overflow-hidden"
                >
                  <div className={`absolute inset-0 rounded-2xl ${bio.theme ? 'opacity-50' : 'bg-linear-to-r from-yellow-400 via-orange-400 to-red-400'}`} style={bio.theme ? { backgroundColor: bio.theme.primaryColor } : {}}></div>
                  <div className={`relative m-1 rounded-xl p-6 transition-all duration-300 ${bio.theme ? 'bg-white/10 group-hover:bg-white/20' : 'bg-white group-hover:bg-yellow-50'}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 text-white rounded-xl transition-all duration-300 shadow-lg ${bio.theme ? '' : 'bg-linear-to-br from-yellow-500 to-orange-600 group-hover:from-yellow-400 group-hover:to-orange-500'}`} style={bio.theme ? primaryColorStyle : {}}>
                        {getPlatformIcon(link.label)}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-800 text-lg">
                          {link.label}
                        </div>
                        <div className="text-sm text-gray-500">
                          {link.platform}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Zap className="w-4 h-4 text-yellow-500" />
                        </motion.div>
                        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
                      </div>
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
          className={`text-center backdrop-blur-sm rounded-3xl shadow-xl p-8 border-3 ${bio.theme ? 'bg-white/20' : 'bg-white/95 border-pink-200'}`}
          style={bio.theme ? { borderColor: bio.theme.primaryColor } : {}}
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex items-center justify-center space-x-3 text-gray-600 mb-4"
          >
            <Heart className="w-6 h-6 text-red-500 animate-pulse" />
            <span className={`text-lg font-semibold ${bio.theme ? '' : 'bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent'}`} style={bio.theme ? primaryTextStyle : {}}>
              Feito com muito amor no AutoBio
            </span>
            <PartyPopper className="w-6 h-6 text-yellow-500 animate-bounce" />
          </motion.div>
          <p className={`text-gray-500 ${bio.theme ? 'opacity-80' : ''}`} style={bio.theme ? { color: bio.theme.textColor } : {}}>
            Crie sua biografia divertida em{" "}
            <a
              href="/"
              className={`font-bold transition-all duration-300 ${bio.theme ? 'hover:opacity-80' : 'bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent hover:from-orange-500 hover:to-red-500'}`}
              style={bio.theme ? primaryTextStyle : {}}
            >
              autobio.app
            </a>{" "}
            🎉✨
          </p>
        </motion.div>
      </div>
    </div>
  );
};
