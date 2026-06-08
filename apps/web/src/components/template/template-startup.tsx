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
  Rocket,
  ArrowRight,
  Zap,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { JSX } from "react";
import { EmbedWidget, isEmbeddable } from "./LinkWidget";

type TemplateStartupProps = {
  bio: Bio;
};

export const TemplateStartup = ({ bio }: TemplateStartupProps) => {
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
        backgroundColor: bio.theme.primaryColor,
      }
    : { backgroundColor: "#f97316" }; // orange-500

  const primaryTextColorStyle = bio.theme
    ? {
        color: bio.theme.primaryColor,
      }
    : { color: "#f97316" };

  return (
    <div
      className={`min-h-screen py-16 px-4 font-sans relative overflow-hidden ${bio.theme ? "" : "bg-white text-slate-900"}`}
      style={customStyles}
    >
      {/* Background Ornaments */}
      <div className="absolute top-0 inset-x-0 h-96 bg-linear-to-b from-orange-50 to-transparent pointer-events-none" style={bio.theme ? { background: `linear-gradient(to bottom, ${bio.theme.primaryColor}20, transparent)` } : {}}></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none" style={bio.theme ? { backgroundColor: bio.theme.primaryColor } : {}}></div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header - SaaS Landing Page Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider mb-8 border border-orange-100 shadow-sm" style={bio.theme ? { backgroundColor: `${bio.theme.primaryColor}15`, color: bio.theme.primaryColor, borderColor: `${bio.theme.primaryColor}30` } : {}}>
            <Zap className="w-3 h-3" />
            <span>{bio.user?.name || "Startup"}</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-slate-900 to-slate-600" style={bio.theme ? { color: bio.theme.textColor || '#0f172a', WebkitTextFillColor: 'initial' } : {}}>
              {bio.title}
            </span>
          </h1>

          <div className="prose prose-lg mx-auto text-slate-500 mb-8 max-w-2xl leading-relaxed" style={{ color: bio.theme?.textColor ? `${bio.theme.textColor}cc` : undefined }}>
            <ReactMarkdown>{bio.content}</ReactMarkdown>
          </div>

          {bio.avatar && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              className="mt-8 mb-4 relative w-24 h-24 mx-auto"
            >
              <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-20" style={primaryColorStyle}></div>
              <img
                src={bio.avatar}
                alt={bio.title}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl relative z-10"
              />
            </motion.div>
          )}
        </motion.div>

        {/* Links Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {bio.links && bio.links.filter((l) => isEmbeddable(l.url)).length > 0 && (
            <div className="mb-12">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 text-center">Featured Media</h3>
              <div className="flex flex-col gap-8 w-full shadow-2xl rounded-2xl overflow-hidden border border-slate-100">
                {bio.links
                  .filter((l) => isEmbeddable(l.url))
                  .map((link) => (
                    <EmbedWidget key={`embed-${link.id}`} url={link.url} />
                  ))}
              </div>
            </div>
          )}

          {bio.links && bio.links.filter((l) => !isEmbeddable(l.url)).length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 text-center">Explore More</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                        className="group bg-white border border-slate-200 p-6 rounded-2xl shadow-sm transition-all duration-300 flex flex-col items-start justify-between min-h-[140px]"
                        style={bio.theme ? { backgroundColor: `${bio.theme.backgroundColor}dd` } : {}}
                      >
                        <div className="p-3 rounded-xl bg-slate-50 text-slate-600 mb-4 transition-colors group-hover:bg-orange-50 group-hover:text-orange-600" style={bio.theme ? { color: bio.theme.primaryColor } : {}}>
                          {getPlatformIcon(link.label)}
                        </div>
                        <div className="w-full flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors" style={bio.theme ? { color: bio.theme.textColor } : {}}>{link.label}</h4>
                            <p className="text-xs text-slate-500 font-medium">{link.platform}</p>
                          </div>
                          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" style={bio.theme ? { borderColor: bio.theme.primaryColor, color: bio.theme.primaryColor } : { borderColor: '#f97316', color: '#f97316' }}>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </motion.a>
                    );
                  })}
              </div>
            </div>
          )}
        </motion.div>

        {!["pro", "anual", "premium"].includes(bio.user?.plan || "free") && (
          <div className="mt-20 text-center flex flex-col items-center justify-center opacity-50">
            <Rocket className="w-5 h-5 mb-2" />
            <p className="text-xs font-bold uppercase tracking-widest">
              Lançado com AutoBio
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
