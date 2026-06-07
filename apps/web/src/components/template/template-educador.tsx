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
  BookOpen,
  GraduationCap,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { JSX } from "react";
import { EmbedWidget, isEmbeddable } from "./LinkWidget";

type TemplateEducadorProps = {
  bio: Bio;
};

export const TemplateEducador = ({ bio }: TemplateEducadorProps) => {
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
    : { color: "#d97706" }; // amber-600

  const primaryBgStyle = bio.theme
    ? {
        backgroundColor: bio.theme.primaryColor,
        color: "#ffffff",
      }
    : { backgroundColor: "#d97706", color: "#ffffff" };

  return (
    <div
      className={`min-h-screen py-12 px-4 md:px-8 font-serif ${bio.theme ? "" : "bg-[#fdfbf7] text-[#3f3f46]"}`}
      style={customStyles}
    >
      <div className="max-w-3xl mx-auto bg-white rounded-t-lg rounded-br-lg rounded-bl-3xl shadow-xl shadow-[#d97706]/10 relative">
        {/* Book Spine effect */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-black/5 rounded-l-lg border-r border-black/10"></div>
        <div className="absolute left-2 top-0 bottom-0 w-[1px] bg-black/10"></div>
        <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-black/5"></div>

        <div className="p-8 md:p-12 lg:p-16 ml-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 border-b border-[#e5e7eb] pb-12"
          >
            {bio.avatar ? (
              <img
                src={bio.avatar}
                alt={bio.title}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-md ring-1 ring-black/5"
              />
            ) : (
              <div
                className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center text-5xl font-serif text-white shadow-md border-4 border-white ring-1 ring-black/5"
                style={primaryBgStyle}
              >
                {bio.title.charAt(0)}
              </div>
            )}

            <div className="flex-1 text-center md:text-left pt-2">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2 opacity-60">
                <GraduationCap className="w-5 h-5" />
                <span className="text-sm uppercase tracking-widest font-sans font-bold">Educador & Mentor</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight" style={primaryColorStyle}>
                {bio.title}
              </h1>
              <p className="text-lg opacity-80 italic font-medium">@{bio.user?.name}</p>
            </div>
          </motion.div>

          {/* Intro Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg md:prose-xl prose-stone mx-auto mb-16"
            style={{ color: bio.theme?.textColor }}
          >
            <div className="first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-[-8px]" style={bio.theme ? { WebkitTextFillColor: bio.theme.primaryColor } : { WebkitTextFillColor: '#d97706' }}>
              <ReactMarkdown>{bio.content}</ReactMarkdown>
            </div>
          </motion.div>

          {/* Library Section (Links) */}
          {bio.links && bio.links.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] flex-1 bg-black/10"></div>
                <h2 className="text-xl font-bold uppercase tracking-widest flex items-center gap-2" style={primaryColorStyle}>
                  <BookOpen className="w-5 h-5" /> Acervo
                </h2>
                <div className="h-[1px] flex-1 bg-black/10"></div>
              </div>

              {bio.links.filter((l) => isEmbeddable(l.url)).length > 0 && (
                <div className="mb-10 w-full flex flex-col gap-8">
                  {bio.links
                    .filter((l) => isEmbeddable(l.url))
                    .map((link) => (
                      <div key={`embed-${link.id}`} className="p-2 bg-[#fdfbf7] rounded-sm shadow-inner border border-black/5">
                        <EmbedWidget url={link.url} />
                      </div>
                    ))}
                </div>
              )}

              {bio.links.filter((l) => !isEmbeddable(l.url)).length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 font-sans">
                  {bio.links
                    .filter((l) => !isEmbeddable(l.url))
                    .map((link, index) => {
                      const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
                      return (
                        <a
                          key={link.id}
                          href={`${apiBaseUrl}/bios/click/${bio.id}/${link.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center p-4 border-b-2 hover:bg-black/5 transition-colors"
                          style={{ borderColor: bio.theme?.primaryColor || '#fcd34d' }}
                        >
                          <div className="mr-4 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" style={primaryColorStyle}>
                            {getPlatformIcon(link.label)}
                          </div>
                          <div className="flex-1">
                            <span className="font-bold text-[#3f3f46] group-hover:text-black block" style={bio.theme ? { color: bio.theme.textColor } : {}}>
                              {link.label}
                            </span>
                            <span className="text-xs uppercase tracking-wider opacity-50">{link.platform}</span>
                          </div>
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-40 transition-opacity" />
                        </a>
                      );
                    })}
                </div>
              )}
            </motion.div>
          )}

          {!["pro", "anual", "premium"].includes(bio.user?.plan || "free") && (
            <div className="mt-20 text-center font-sans">
              <span className="px-4 py-1 border rounded-full text-xs font-bold uppercase tracking-widest opacity-40">
                Página por AutoBio
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
