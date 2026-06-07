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
  Briefcase,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { JSX } from "react";
import { EmbedWidget, isEmbeddable } from "./LinkWidget";

type TemplateFreelancerProps = {
  bio: Bio;
};

export const TemplateFreelancer = ({ bio }: TemplateFreelancerProps) => {
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
    : { backgroundColor: "#8b5cf6" }; // violet-500

  const primaryTextColorStyle = bio.theme
    ? {
        color: bio.theme.primaryColor,
      }
    : { color: "#8b5cf6" };

  // Parse tags if user has comma separated keywords in content (just a visual feature for the layout)
  // For this layout, we'll extract some keywords to show as "skills"
  const fakeSkills = ["Disponível para Projetos", "Portfolio", "Contato Rápido"];

  return (
    <div
      className={`min-h-screen py-10 px-4 md:px-8 font-sans ${bio.theme ? "" : "bg-slate-50 text-slate-800"}`}
      style={customStyles}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (Sticky Profile) */}
          <div className="lg:col-span-4 h-max lg:sticky lg:top-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
              style={bio.theme ? { backgroundColor: bio.theme.backgroundColor } : {}}
            >
              <div className="h-32 w-full" style={primaryColorStyle}></div>
              <div className="px-6 pb-6 relative text-center">
                <div className="flex justify-center -mt-16 mb-4">
                  {bio.avatar ? (
                    <img
                      src={bio.avatar}
                      alt={bio.title}
                      className="w-32 h-32 rounded-xl object-cover border-4 border-white shadow-md bg-white"
                    />
                  ) : (
                    <div
                      className="w-32 h-32 rounded-xl flex items-center justify-center text-5xl font-bold border-4 border-white text-white shadow-md"
                      style={primaryColorStyle}
                    >
                      {bio.title.charAt(0)}
                    </div>
                  )}
                </div>
                
                <h1 className="text-2xl font-bold mb-1" style={bio.theme ? { color: bio.theme.textColor } : {}}>
                  {bio.title}
                </h1>
                <p className="text-sm font-medium opacity-60 mb-6">@{bio.user?.name}</p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {fakeSkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 text-xs font-semibold rounded-full border border-slate-200" style={bio.theme ? { color: bio.theme.textColor } : {}}>
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="w-full flex justify-center items-center gap-2 text-sm font-bold uppercase tracking-wider py-3 border-t border-slate-100" style={primaryTextColorStyle}>
                  <CheckCircle2 className="w-4 h-4" /> Open to Work
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Content & Links) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* About Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
              style={bio.theme ? { backgroundColor: bio.theme.backgroundColor } : {}}
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={primaryTextColorStyle}>
                <Briefcase className="w-5 h-5" /> Sobre mim
              </h2>
              <div className="prose prose-slate max-w-none" style={{ color: bio.theme?.textColor }}>
                <ReactMarkdown>{bio.content}</ReactMarkdown>
              </div>
            </motion.div>

            {/* Embeds Card */}
            {bio.links && bio.links.filter((l) => isEmbeddable(l.url)).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
                style={bio.theme ? { backgroundColor: bio.theme.backgroundColor } : {}}
              >
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2" style={primaryTextColorStyle}>
                  <Wrench className="w-5 h-5" /> Trabalhos Recentes
                </h2>
                <div className="flex flex-col gap-6 w-full">
                  {bio.links
                    .filter((l) => isEmbeddable(l.url))
                    .map((link) => (
                      <div key={`embed-${link.id}`} className="rounded-xl overflow-hidden shadow-sm border border-slate-100">
                        <EmbedWidget url={link.url} />
                      </div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* Links Grid */}
            {bio.links && bio.links.filter((l) => !isEmbeddable(l.url)).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bio.links
                    .filter((l) => !isEmbeddable(l.url))
                    .map((link) => {
                      const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
                      return (
                        <a
                          key={link.id}
                          href={`${apiBaseUrl}/bios/click/${bio.id}/${link.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 relative overflow-hidden"
                          style={bio.theme ? { backgroundColor: bio.theme.backgroundColor } : {}}
                        >
                          <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-full -z-0 transition-transform group-hover:scale-150"></div>
                          
                          <div className="flex items-start justify-between relative z-10 mb-4">
                            <div className="p-3 rounded-xl bg-slate-100 text-slate-600 group-hover:text-white transition-colors" style={bio.theme ? { color: bio.theme.primaryColor } : {}}>
                              {/* Overlay style hack for hover */}
                              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" style={primaryColorStyle}></div>
                              <div className="relative z-20">{getPlatformIcon(link.label)}</div>
                            </div>
                            <ExternalLink className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-opacity" style={primaryTextColorStyle} />
                          </div>
                          
                          <div className="relative z-10">
                            <h3 className="font-bold text-lg mb-1" style={bio.theme ? { color: bio.theme.textColor } : {}}>{link.label}</h3>
                            <p className="text-sm opacity-60 font-medium">{link.platform}</p>
                          </div>
                        </a>
                      );
                    })}
                </div>
              </motion.div>
            )}

            {/* Footer */}
            {!["pro", "anual", "premium"].includes(bio.user?.plan || "free") && (
              <div className="text-center py-6">
                <span className="text-xs font-bold uppercase tracking-widest opacity-40">
                  Gerado por AutoBio
                </span>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};
