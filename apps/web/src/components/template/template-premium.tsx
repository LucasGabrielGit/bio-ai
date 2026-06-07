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

type TemplatePremiumProps = {
  bio: Bio;
};

export const TemplatePremium = ({ bio }: TemplatePremiumProps) => {
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
        backgroundColor: bio.theme.backgroundColor || "#0a0a0a",
        color: bio.theme.textColor || "#fafafa",
      }
    : { backgroundColor: "#0a0a0a", color: "#fafafa" }; // zinc-950 and zinc-50

  const primaryColorStyle = bio.theme
    ? {
        color: bio.theme.primaryColor,
      }
    : { color: "#d4af37" }; // Gold color

  const borderGradientStyle = bio.theme
    ? { background: `linear-gradient(to right, transparent, ${bio.theme.primaryColor}, transparent)` }
    : { background: "linear-gradient(to right, transparent, #d4af37, transparent)" };

  return (
    <div
      className="min-h-screen py-16 px-4 md:px-8 font-serif relative overflow-hidden"
      style={customStyles}
    >
      {/* Background elegant noise/texture effect could be added here */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div className="max-w-2xl mx-auto relative z-10">
        
        {/* Luxury Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-4 mb-10 opacity-70">
            <div className="h-[1px] w-12" style={borderGradientStyle}></div>
            <Sparkles className="w-4 h-4" style={primaryColorStyle} />
            <div className="h-[1px] w-12" style={borderGradientStyle}></div>
          </div>

          <div className="relative inline-block mb-10">
            {bio.avatar ? (
              <div className="relative p-1 rounded-full" style={{ background: bio.theme?.primaryColor ? `linear-gradient(45deg, transparent, ${bio.theme.primaryColor}, transparent)` : 'linear-gradient(45deg, transparent, #d4af37, transparent)' }}>
                <img
                  src={bio.avatar}
                  alt={bio.title}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover bg-[#0a0a0a]"
                />
              </div>
            ) : (
              <div className="relative p-1 rounded-full" style={{ background: bio.theme?.primaryColor ? `linear-gradient(45deg, transparent, ${bio.theme.primaryColor}, transparent)` : 'linear-gradient(45deg, transparent, #d4af37, transparent)' }}>
                <div
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center text-5xl font-light bg-[#0a0a0a]"
                  style={primaryColorStyle}
                >
                  {bio.title.charAt(0)}
                </div>
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase mb-4" style={{ fontFamily: "Didot, 'Times New Roman', serif" }}>
            {bio.title}
          </h1>
          <p className="text-sm tracking-[0.3em] uppercase opacity-60 mb-8 font-sans">
            {bio.user?.name}
          </p>

          <div className="prose prose-invert prose-lg mx-auto opacity-80 font-light leading-loose" style={{ color: bio.theme?.textColor }}>
            <ReactMarkdown>{bio.content}</ReactMarkdown>
          </div>
        </motion.div>

        {/* Separator */}
        <div className="w-full h-[1px] my-16 opacity-30" style={borderGradientStyle}></div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Embeds Section */}
          {bio.links && bio.links.filter((l) => isEmbeddable(l.url)).length > 0 && (
            <div className="mb-16">
              <h3 className="text-center text-xs tracking-[0.4em] uppercase opacity-50 mb-8 font-sans">Conteúdo Exclusivo</h3>
              <div className="flex flex-col gap-8 w-full">
                {bio.links
                  .filter((l) => isEmbeddable(l.url))
                  .map((link) => (
                    <div key={`embed-${link.id}`} className="p-[1px] rounded-lg" style={{ background: bio.theme?.primaryColor ? `linear-gradient(to bottom, transparent, ${bio.theme.primaryColor}40, transparent)` : 'linear-gradient(to bottom, transparent, #d4af3740, transparent)' }}>
                      <div className="bg-[#0a0a0a] rounded-lg overflow-hidden">
                        <EmbedWidget url={link.url} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Luxury Links */}
          {bio.links && bio.links.filter((l) => !isEmbeddable(l.url)).length > 0 && (
            <div>
              <h3 className="text-center text-xs tracking-[0.4em] uppercase opacity-50 mb-8 font-sans">Conexões</h3>
              <div className="flex flex-col gap-6 font-sans">
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
                        whileHover={{ scale: 1.02 }}
                        className="group relative overflow-hidden p-[1px]"
                      >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={borderGradientStyle}></div>
                        
                        <div className="bg-[#0f0f0f] relative flex items-center justify-between p-6 px-8 transition-all duration-500 border border-white/5 group-hover:border-transparent">
                          <div className="flex items-center gap-6">
                            <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={primaryColorStyle}>
                              {getPlatformIcon(link.label)}
                            </div>
                            <span className="text-sm font-light tracking-[0.2em] uppercase text-white/80 group-hover:text-white transition-colors duration-500">
                              {link.label}
                            </span>
                          </div>
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={primaryColorStyle} />
                        </div>
                      </motion.a>
                    );
                  })}
              </div>
            </div>
          )}
        </motion.div>

        {!["pro", "anual", "premium"].includes(bio.user?.plan || "free") && (
          <div className="mt-32 text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase opacity-30 font-sans">
              Designed by AutoBio
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
