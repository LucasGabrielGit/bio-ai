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
  Quote,
  CheckCircle,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { JSX } from "react";
import { EmbedWidget, isEmbeddable } from "./LinkWidget";

type TemplateConsultorProps = {
  bio: Bio;
  isPreview?: boolean;
};

export const TemplateConsultor = ({ bio, isPreview }: TemplateConsultorProps) => {
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

  const customStyles = bio.theme
    ? {
        backgroundColor: bio.theme.backgroundColor,
        color: bio.theme.textColor,
      }
    : {};

  const primaryColorStyle = bio.theme
    ? {
        color: bio.theme.primaryColor,
      }
    : { color: "#0f766e" }; // teal-700

  const primaryBgStyle = bio.theme
    ? {
        backgroundColor: bio.theme.primaryColor,
        color: "#ffffff",
      }
    : { backgroundColor: "#0f766e", color: "#ffffff" };

  return (
    <div
      className={`min-h-screen py-16 px-4 font-serif relative ${bio.theme ? "" : "bg-[#f8fafc] text-slate-800"}`}
      style={customStyles}
    >
      <div className="max-w-4xl mx-auto">
        <div className={`flex flex-col ${isPreview ? '' : 'md:flex-row'} gap-12 items-start`}>
          
          {/* Left Column - Profile */}
          <div className={`w-full ${isPreview ? '' : 'md:w-1/3'} flex flex-col items-center ${isPreview ? '' : 'md:items-end md:text-right'} text-center sticky top-16`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              {bio.avatar ? (
                <div className="relative inline-block mb-8">
                  <img
                    src={bio.avatar}
                    alt={bio.title}
                    className={`w-48 h-48 ${isPreview ? '' : 'md:w-56 md:h-56'} object-cover shadow-2xl rounded-sm`}
                  />
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-dots-pattern opacity-50 -z-10"></div>
                  <div className="absolute -top-4 -left-4 w-full h-full border-2 -z-10" style={{ borderColor: bio.theme?.primaryColor || '#0f766e' }}></div>
                </div>
              ) : (
                <div className="relative inline-block mb-8">
                  <div
                    className={`w-48 h-48 ${isPreview ? '' : 'md:w-56 md:h-56'} shadow-2xl flex items-center justify-center text-7xl font-light rounded-sm`}
                    style={primaryBgStyle}
                  >
                    {bio.title.charAt(0)}
                  </div>
                  <div className="absolute -top-4 -left-4 w-full h-full border-2 -z-10" style={{ borderColor: bio.theme?.primaryColor || '#0f766e' }}></div>
                </div>
              )}

              <h1 className={`text-4xl ${isPreview ? '' : 'md:text-5xl'} font-bold tracking-tight mb-4`} style={{ fontFamily: "Georgia, serif" }}>
                {bio.title}
              </h1>
              <p className="text-sm uppercase tracking-[0.2em] mb-6 font-sans font-semibold" style={primaryColorStyle}>
                {bio.user?.name || "Especialista"}
              </p>

              {/* Verified Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white shadow-sm border border-slate-100 rounded-sm font-sans text-xs uppercase tracking-wider text-slate-500">
                <CheckCircle className="w-4 h-4" style={primaryColorStyle} />
                <span>Perfil Verificado</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Content & Links */}
          <div className={`w-full ${isPreview ? '' : 'md:w-2/3'}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative mb-16">
                <Quote className="absolute -top-6 -left-8 w-16 h-16 opacity-10 rotate-180" style={primaryColorStyle} />
                <div className="prose prose-lg md:prose-xl prose-slate font-serif leading-relaxed text-slate-700" style={{ color: bio.theme?.textColor }}>
                  <ReactMarkdown>{bio.content}</ReactMarkdown>
                </div>
              </div>

              <div className="w-16 h-1 bg-slate-200 mb-12"></div>

              {/* Links Section */}
              <div className="font-sans">
                {bio.links && bio.links.filter((l) => isEmbeddable(l.url)).length > 0 && (
                  <div className="mb-12">
                    <h3 className="text-xs uppercase tracking-[0.15em] text-slate-400 mb-6 font-semibold">Material em Destaque</h3>
                    <div className="flex flex-col gap-8">
                      {bio.links
                        .filter((l) => isEmbeddable(l.url))
                        .map((link) => (
                          <div key={`embed-${link.id}`} className="p-4 bg-white shadow-lg border border-slate-100 rounded-sm">
                            <EmbedWidget url={link.url} />
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {bio.links && bio.links.filter((l) => !isEmbeddable(l.url)).length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.15em] text-slate-400 mb-6 font-semibold">Canais de Contato</h3>
                    <div className="flex flex-col gap-4">
                      {bio.links
                        .filter((l) => !isEmbeddable(l.url))
                        .map((link, index) => {
                          const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
                          return (
                            <motion.a
                              key={link.id}
                              href={`${apiBaseUrl}/bios/click/${bio.id}/${link.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ x: 8 }}
                              className="group flex items-center justify-between p-5 bg-white border border-slate-200 hover:border-slate-400 shadow-sm transition-all rounded-sm"
                            >
                              <div className="flex items-center gap-6">
                                <div className="text-slate-400 group-hover:text-slate-800 transition-colors" style={bio.theme ? { color: bio.theme.primaryColor } : {}}>
                                  {getPlatformIcon(link.label)}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-slate-900 tracking-wide text-lg" style={bio.theme ? { color: bio.theme.textColor } : {}}>{link.label}</h4>
                                  <p className="text-xs text-slate-500 uppercase tracking-wider">{link.platform}</p>
                                </div>
                              </div>
                              <div className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-800" />
                              </div>
                            </motion.a>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>

              {!["pro", "anual", "premium"].includes(bio.user?.plan || "free") && (
                <div className="mt-24 pt-8 border-t border-slate-200 font-sans">
                  <p className="text-xs text-slate-400 uppercase tracking-widest">
                    Tecnologia por <span className="font-semibold">AutoBio</span>
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
