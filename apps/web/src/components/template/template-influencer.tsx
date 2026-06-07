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
  Star,
  CheckCircle2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { JSX } from "react";
import { EmbedWidget, isEmbeddable } from "./LinkWidget";

type TemplateInfluencerProps = {
  bio: Bio;
};

export const TemplateInfluencer = ({ bio }: TemplateInfluencerProps) => {
  const getPlatformIcon = (label: string) => {
    const iconMap: Record<string, JSX.Element> = {
      github: <Github className="w-6 h-6" />,
      twitter: <Twitter className="w-6 h-6" />,
      instagram: <Instagram className="w-6 h-6" />,
      facebook: <Facebook className="w-6 h-6" />,
      youtube: <Youtube className="w-6 h-6" />,
      linkedin: <Linkedin className="w-6 h-6" />,
      email: <Mail className="w-6 h-6" />,
      website: <Globe className="w-6 h-6" />,
      portfolio: <Camera className="w-6 h-6" />,
      other: <MapPin className="w-6 h-6" />,
    };
    return iconMap[label.toLowerCase()] || <Globe className="w-6 h-6" />;
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
    : { backgroundColor: "#f43f5e" }; // rose-500

  const primaryTextColorStyle = bio.theme
    ? {
        color: bio.theme.primaryColor,
      }
    : { color: "#f43f5e" };

  return (
    <div
      className={`min-h-screen pb-16 ${bio.theme ? "" : "bg-zinc-50 text-zinc-900"}`}
      style={customStyles}
    >
      {/* Cover Image / Banner */}
      <div 
        className="h-48 md:h-64 w-full relative" 
        style={bio.theme ? { backgroundColor: bio.theme.primaryColor, opacity: 0.2 } : { backgroundColor: "#ffe4e6" }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/20"></div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-24 relative z-10">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[2.5rem] p-6 shadow-xl text-center mb-8"
          style={bio.theme ? { backgroundColor: bio.theme.backgroundColor } : {}}
        >
          <div className="relative inline-block mb-4">
            {bio.avatar ? (
              <img
                src={bio.avatar}
                alt={bio.title}
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div
                className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-5xl font-bold border-4 border-white text-white shadow-lg"
                style={primaryColorStyle}
              >
                {bio.title.charAt(0)}
              </div>
            )}
            <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-sm">
              <CheckCircle2 className="w-6 h-6" style={primaryTextColorStyle} />
            </div>
          </div>

          <h1 className="text-2xl font-black mb-1">{bio.title}</h1>
          <p className="text-zinc-500 text-sm font-medium mb-4">@{bio.user?.name}</p>

          <div className="prose prose-sm mx-auto mb-6 opacity-90 leading-relaxed">
            <ReactMarkdown>{bio.content}</ReactMarkdown>
          </div>

          {/* Metrics Row (Fake metrics for social proof illusion) */}
          <div className="flex justify-center gap-6 py-4 border-y border-zinc-100">
            <div className="text-center">
              <div className="font-black text-xl" style={primaryTextColorStyle}>+</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider font-bold mt-1">Links</div>
            </div>
            <div className="text-center">
              <div className="font-black text-xl" style={primaryTextColorStyle}><Star className="w-5 h-5 mx-auto" /></div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider font-bold mt-1">Creator</div>
            </div>
          </div>
        </motion.div>

        {/* Links Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {bio.links && bio.links.filter((l) => isEmbeddable(l.url)).length > 0 && (
            <div className="flex flex-col gap-6 mb-8 w-full">
              {bio.links
                .filter((l) => isEmbeddable(l.url))
                .map((link) => (
                  <div key={`embed-${link.id}`} className="rounded-[2rem] overflow-hidden shadow-lg border-4 border-white">
                    <EmbedWidget url={link.url} />
                  </div>
                ))}
            </div>
          )}

          {bio.links && bio.links.filter((l) => !isEmbeddable(l.url)).length > 0 && (
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
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center p-2 pr-6 rounded-full bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-zinc-100"
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white mr-4 shadow-inner"
                        style={primaryColorStyle}
                      >
                        {getPlatformIcon(link.label)}
                      </div>
                      <div className="flex-1 text-center pr-10">
                        <span className="font-bold text-lg text-zinc-800 group-hover:text-black transition-colors">
                          {link.label}
                        </span>
                      </div>
                      <ExternalLink className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-opacity absolute right-8" style={primaryTextColorStyle} />
                    </motion.a>
                  );
                })}
            </div>
          )}
        </motion.div>

        {!["pro", "anual", "premium"].includes(bio.user?.plan || "free") && (
          <div className="mt-12 text-center text-sm font-bold opacity-30 uppercase tracking-widest flex items-center justify-center gap-2">
            <span>Powered by AutoBio</span>
          </div>
        )}
      </div>
    </div>
  );
};
