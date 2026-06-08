import type { Bio } from "@/lib/api/bios";
import { motion } from "framer-motion";
import {
  ExternalLink,
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
  Sparkles,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { JSX } from "react";
import { EmbedWidget, isEmbeddable } from "./LinkWidget";

type TemplateCriativoProps = {
  bio: Bio;
};

export const TemplateCriativo = ({ bio }: TemplateCriativoProps) => {
  const getPlatformIcon = (label: string) => {
    const iconMap: Record<string, JSX.Element> = {
      github: <Github className="w-8 h-8" />,
      twitter: <Twitter className="w-8 h-8" />,
      instagram: <Instagram className="w-8 h-8" />,
      facebook: <Facebook className="w-8 h-8" />,
      youtube: <Youtube className="w-8 h-8" />,
      linkedin: <Linkedin className="w-8 h-8" />,
      email: <Mail className="w-8 h-8" />,
      website: <Globe className="w-8 h-8" />,
      portfolio: <Camera className="w-8 h-8" />,
      other: <MapPin className="w-8 h-8" />,
    };
    return iconMap[label.toLowerCase()] || <Globe className="w-8 h-8" />;
  };

  const customStyles = bio.theme
    ? {
        backgroundColor: bio.theme.backgroundColor,
        color: bio.theme.textColor,
      }
    : {};

  const primaryColorStyle = bio.theme
    ? {
        backgroundColor: bio.theme.primaryColor,
      }
    : { backgroundColor: "#c084fc" }; // purple-400

  return (
    <div
      className={`min-h-screen p-4 md:p-8 overflow-x-hidden ${bio.theme ? "" : "bg-linear-to-br from-fuchsia-100 via-purple-100 to-indigo-100 text-slate-800"}`}
      style={customStyles}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Header Card (Bento Style) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-8 lg:col-span-9 bg-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 flex flex-col sm:flex-row items-center sm:items-start gap-8"
          >
            {bio.avatar ? (
              <img
                src={bio.avatar}
                alt={bio.title}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-[2rem] object-cover shadow-lg transform rotate-3"
              />
            ) : (
              <div
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-[2rem] flex items-center justify-center text-5xl font-bold text-white shadow-lg transform rotate-3"
                style={primaryColorStyle}
              >
                {bio.title.charAt(0)}
              </div>
            )}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-pink-500" style={bio.theme ? { color: bio.theme.primaryColor, background: 'none', WebkitTextFillColor: 'initial' } : {}}>
                {bio.title}
              </h1>
              <div className="prose prose-sm sm:prose-base opacity-80 mb-4 max-w-none">
                <ReactMarkdown>{bio.content}</ReactMarkdown>
              </div>
              <p className="inline-block px-4 py-1 rounded-full bg-black/5 text-sm font-semibold tracking-wide">
                @{bio.user?.name}
              </p>
            </div>
          </motion.div>

          {/* Side Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-4 lg:col-span-3 bg-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 flex flex-col justify-center items-center text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            
            <Sparkles className="w-12 h-12 mb-4 text-purple-500" style={bio.theme ? { color: bio.theme.primaryColor } : {}} />
            <h3 className="font-bold text-xl mb-2">Criativo</h3>
            <p className="text-sm opacity-70">Design & Arte</p>
          </motion.div>

          {/* Embeds Section */}
          {bio.links && bio.links.filter((l) => isEmbeddable(l.url)).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-12 w-full flex flex-col gap-4"
            >
              {bio.links
                .filter((l) => isEmbeddable(l.url))
                .map((link) => (
                  <div key={`embed-${link.id}`} className="w-full bg-white/20 backdrop-blur-xl rounded-3xl p-2 shadow-xl border border-white/50">
                    <EmbedWidget url={link.url} />
                  </div>
                ))}
            </motion.div>
          )}

          {/* Bento Links Grid */}
          {bio.links && bio.links.filter((l) => !isEmbeddable(l.url)).length > 0 && (
            bio.links.filter((l) => !isEmbeddable(l.url)).map((link, index) => {
              const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
              
              // Crie um padrão visual interessante para o grid
              const colSpan = index === 0 ? "md:col-span-8" : index === 1 ? "md:col-span-4" : index % 3 === 0 ? "md:col-span-6 lg:col-span-4" : "md:col-span-6 lg:col-span-4";
              
              return (
                <motion.a
                  key={link.id}
                  href={`${apiBaseUrl}/bios/click/${bio.id}/${link.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }}
                  className={`${colSpan} group relative bg-white/40 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 overflow-hidden flex flex-col justify-between min-h-[150px]`}
                >
                  <div className="absolute -right-6 -top-6 opacity-10 transform group-hover:scale-150 transition-transform duration-500">
                    {getPlatformIcon(link.label)}
                  </div>
                  
                  <div className="bg-white/50 p-3 rounded-2xl w-fit mb-4 text-purple-600" style={bio.theme ? { color: bio.theme.primaryColor } : {}}>
                    {getPlatformIcon(link.label)}
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-xl mb-1">{link.label}</h3>
                    <p className="text-sm opacity-60 flex items-center gap-2">
                      {link.platform} <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </p>
                  </div>
                </motion.a>
              );
            })
          )}

          {/* Footer Card */}
          {!["pro", "anual", "premium"].includes(bio.user?.plan || "free") && (
            <div className="md:col-span-12 mt-8 text-center bg-white/30 backdrop-blur-md rounded-full py-3 px-6 mx-auto w-fit border border-white/40 shadow-sm text-sm font-medium">
              Criado com AutoBio ✨
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
