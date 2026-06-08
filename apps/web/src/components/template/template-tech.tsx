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
  Terminal,
  ChevronRight,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { JSX } from "react";
import { EmbedWidget, isEmbeddable } from "./LinkWidget";

type TemplateTechProps = {
  bio: Bio;
};

export const TemplateTech = ({ bio }: TemplateTechProps) => {
  const getPlatformIcon = (label: string) => {
    const iconMap: Record<string, JSX.Element> = {
      github: <Github className="w-4 h-4" />,
      twitter: <Twitter className="w-4 h-4" />,
      instagram: <Instagram className="w-4 h-4" />,
      facebook: <Facebook className="w-4 h-4" />,
      youtube: <Youtube className="w-4 h-4" />,
      linkedin: <Linkedin className="w-4 h-4" />,
      email: <Mail className="w-4 h-4" />,
      website: <Globe className="w-4 h-4" />,
      portfolio: <Camera className="w-4 h-4" />,
      other: <MapPin className="w-4 h-4" />,
    };
    return iconMap[label.toLowerCase()] || <Globe className="w-4 h-4" />;
  };

  const customStyles = bio.theme
    ? {
        backgroundColor: bio.theme.backgroundColor || "#0f172a", // Default dark
        color: bio.theme.textColor || "#e2e8f0",
      }
    : { backgroundColor: "#0f172a", color: "#e2e8f0" };

  const primaryColorStyle = bio.theme
    ? {
        color: bio.theme.primaryColor,
      }
    : { color: "#10b981" }; // emerald-500

  const borderColorStyle = bio.theme
    ? {
        borderColor: bio.theme.primaryColor,
      }
    : { borderColor: "#10b981" };

  return (
    <div
      className="min-h-screen p-4 md:p-8 font-mono"
      style={customStyles}
    >
      <div className="max-w-4xl mx-auto">
        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl overflow-hidden border border-slate-700 shadow-2xl shadow-emerald-900/20 bg-[#0f172a]"
        >
          {/* Terminal Header */}
          <div className="bg-slate-800 px-4 py-3 flex items-center border-b border-slate-700">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <div className="flex-1 text-center text-xs text-slate-400 opacity-70">
              {bio.user?.name ? `${bio.user.name.toLowerCase().replace(/\s+/g, '-')}` : 'guest'}@autobio: ~
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6 opacity-70 text-sm">
              <span style={primaryColorStyle}>➜</span>
              <span className="text-cyan-400">~</span>
              <span>./fetch-profile.sh</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 mb-8 items-start">
              {bio.avatar ? (
                <img
                  src={bio.avatar}
                  alt={bio.title}
                  className="w-24 h-24 rounded border-2 border-dashed"
                  style={borderColorStyle}
                />
              ) : (
                <div
                  className="w-24 h-24 rounded border-2 border-dashed flex items-center justify-center text-3xl font-bold bg-slate-800/50"
                  style={{ ...borderColorStyle, ...primaryColorStyle }}
                >
                  <Terminal className="w-10 h-10" />
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4" style={primaryColorStyle}>
                  {bio.title}
                </h1>
                <div className="prose prose-invert prose-sm sm:prose-base max-w-none opacity-80">
                  <ReactMarkdown>{bio.content}</ReactMarkdown>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6 opacity-70 text-sm">
              <span style={primaryColorStyle}>➜</span>
              <span className="text-cyan-400">~</span>
              <span>ls -la ./links</span>
            </div>

            {/* Embeds Section */}
            {bio.links && bio.links.filter((l) => isEmbeddable(l.url)).length > 0 && (
              <div className="mb-8 w-full border-l-2 pl-4" style={borderColorStyle}>
                <div className="text-xs opacity-50 mb-4">// Embedded Media</div>
                <div className="flex flex-col gap-6">
                  {bio.links
                    .filter((l) => isEmbeddable(l.url))
                    .map((link) => (
                      <div key={`embed-${link.id}`} className="w-full">
                        <EmbedWidget url={link.url} />
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Links Section */}
            {bio.links && bio.links.filter((l) => !isEmbeddable(l.url)).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group flex items-center p-3 rounded bg-slate-800/50 hover:bg-slate-800 border border-slate-700 transition-all duration-300"
                        style={{ borderLeftWidth: "4px", ...borderColorStyle }}
                      >
                        <div className="mr-3 opacity-70 group-hover:opacity-100" style={primaryColorStyle}>
                          {getPlatformIcon(link.label)}
                        </div>
                        <div className="flex-1 text-sm">
                          <span className="font-semibold text-slate-200">{link.label}</span>
                          <span className="opacity-50 text-xs ml-2">({link.platform})</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={primaryColorStyle} />
                      </motion.a>
                    );
                  })}
              </div>
            )}

            {!["pro", "anual", "premium"].includes(bio.user?.plan || "free") && (
              <div className="mt-12 pt-6 border-t border-slate-800 text-xs opacity-40 text-center">
                System: AutoBio Kernel v1.0.0
              </div>
            )}
            
            <div className="flex items-center gap-2 mt-6 opacity-70 text-sm">
              <span style={primaryColorStyle}>➜</span>
              <span className="text-cyan-400">~</span>
              <span className="animate-pulse w-2 h-4 bg-slate-400 inline-block"></span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
