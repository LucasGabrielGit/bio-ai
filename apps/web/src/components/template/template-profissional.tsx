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
  Calendar,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Separator } from "../ui/separator";
import type { JSX } from "react";
import { EmbedWidget, isEmbeddable } from "./LinkWidget";

type TemplateProfissionalProps = {
  bio: Bio;
  isPreview?: boolean;
};

export const TemplateProfissional = ({ bio, isPreview }: TemplateProfissionalProps) => {
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
        color: "#ffffff",
      }
    : { backgroundColor: "#1e293b", color: "#ffffff" }; // slate-800 default

  return (
    <div>
      <div
        className={`min-h-[100dvh] flex flex-col ${isPreview ? '' : 'md:flex-row'} items-start ${bio.theme ? "" : "bg-slate-50 text-slate-900"}`}
        style={customStyles}
      >
        {/* Left Sidebar (Sticky on Desktop) */}
        <div
          className={`w-full ${isPreview ? '' : 'md:w-1/3 lg:w-1/4 md:sticky md:top-0 md:h-screen md:border-r'} p-8 flex flex-col items-center justify-center border-b border-black/10 shadow-lg shrink-0 overflow-y-auto`}
          style={primaryColorStyle}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center w-full"
          >
            {bio.avatar ? (
              <img
                src={bio.avatar}
                alt={bio.title}
                className="w-40 h-40 mx-auto rounded-xl object-cover shadow-2xl mb-6 border-4 border-white/20"
              />
            ) : (
              <div className="w-40 h-40 mx-auto rounded-xl flex items-center justify-center text-5xl font-bold mb-6 text-white shadow-2xl border-4 border-white/20 bg-black/20">
                {bio.title.charAt(0)}
              </div>
            )}
            <h1 className="text-2xl font-bold mb-2 tracking-tight">{bio.title}</h1>
            <p className="opacity-80 text-sm font-medium uppercase tracking-widest mb-6">
              {bio.user?.name}
            </p>

            <div className="flex flex-col gap-3 text-sm opacity-90 mb-8 items-center">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Membro desde {new Date(bio.createdAt).getFullYear()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>Perfil Executivo</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Content Area */}
        <div className={`w-full ${isPreview ? '' : 'md:w-2/3 lg:w-3/4 md:p-16 lg:p-24'} p-8 overflow-y-auto`}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="prose prose-slate lg:prose-lg mb-16">
            <div style={{ color: bio.theme ? bio.theme.textColor : undefined }}>
              <ReactMarkdown>{bio.content}</ReactMarkdown>
            </div>
          </div>

          <Separator className="my-12 opacity-20" />

          <h2 className="text-xl font-bold mb-8 uppercase tracking-widest opacity-80 flex items-center gap-3">
            <Globe className="w-5 h-5" /> Contatos & Links
          </h2>

          {bio.links && bio.links.length > 0 && (
            <div>
              {bio.links.filter((l) => isEmbeddable(l.url)).length > 0 && (
                <div className="flex flex-col gap-6 mb-12 w-full">
                  {bio.links
                    .filter((l) => isEmbeddable(l.url))
                    .map((link) => (
                      <EmbedWidget key={`embed-${link.id}`} url={link.url} />
                    ))}
                </div>
              )}

              {bio.links.filter((l) => !isEmbeddable(l.url)).length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {bio.links
                    .filter((l) => !isEmbeddable(l.url))
                    .map((link) => {
                      const apiBaseUrl =
                        import.meta.env.VITE_API_URL || "http://localhost:3000";
                      return (
                        <a
                          key={link.id}
                          href={`${apiBaseUrl}/bios/click/${bio.id}/${link.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center p-5 rounded-xl border border-black/10 hover:border-black/30 hover:shadow-md transition-all duration-300 bg-white/5"
                        >
                          <div className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 mr-4">
                            {getPlatformIcon(link.label)}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm">
                              {link.label}
                            </div>
                            <div className="text-xs opacity-60">
                              {link.platform}
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />
                        </a>
                      );
                    })}
                </div>
              )}
            </div>
          )}

          {!["pro", "anual", "premium"].includes(bio.user?.plan || "free") && (
            <div className="mt-24 text-sm opacity-50 flex items-center justify-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>Criado com AutoBio</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
    </div>
  );
};
