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
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Separator } from "../ui/separator";
import type { JSX } from "react";
import { EmbedWidget, isEmbeddable } from "./LinkWidget";

type TemplateMinimalistaProps = {
  bio: Bio;
};

export const TemplateMinimalista = ({ bio }: TemplateMinimalistaProps) => {
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
    : {};

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans ${bio.theme ? "" : "bg-gray-50 text-gray-900"}`}
      style={customStyles}
    >
      <div className="max-w-2xl mx-auto">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {bio.avatar ? (
            <img
              src={bio.avatar}
              alt={bio.title}
              className="w-32 h-32 mx-auto rounded-full object-cover shadow-sm mb-6 border border-gray-200"
            />
          ) : (
            <div
              className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-4xl font-bold mb-6 text-white shadow-sm"
              style={bio.theme ? primaryColorStyle : { backgroundColor: "#4f46e5" }}
            >
              {bio.title.charAt(0)}
            </div>
          )}
          <h1 className="text-3xl font-light mb-2">{bio.title}</h1>
          <p className="text-gray-500 text-sm tracking-widest uppercase">
            {bio.user?.name}
          </p>
        </motion.div>

        <Separator className="my-8 opacity-50" />

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-sm sm:prose-base mx-auto mb-12"
        >
          <div className={`${bio.theme ? "" : "text-gray-600"}`} style={{ color: bio.theme ? bio.theme.textColor : undefined }}>
            <ReactMarkdown>{bio.content}</ReactMarkdown>
          </div>
        </motion.div>

        {/* Links Section */}
        {bio.links && bio.links.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {bio.links.filter(l => isEmbeddable(l.url)).length > 0 && (
              <div className="flex flex-col gap-6 mb-8 w-full max-w-2xl mx-auto">
                {bio.links.filter(l => isEmbeddable(l.url)).map(link => (
                  <EmbedWidget key={`embed-${link.id}`} url={link.url} />
                ))}
              </div>
            )}

            {bio.links.filter(l => !isEmbeddable(l.url)).length > 0 && (
              <div className="flex flex-col gap-4">
                {bio.links.filter(l => !isEmbeddable(l.url)).map((link) => {
                  const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
                  return (
                    <a
                      key={link.id}
                      href={`${apiBaseUrl}/bios/click/${bio.id}/${link.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between p-4 rounded-md transition-all duration-300 border ${
                        bio.theme
                          ? "border-black/10 hover:border-black/30"
                          : "border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="opacity-70">{getPlatformIcon(link.label)}</span>
                        <span className="font-medium tracking-wide">{link.label}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 opacity-30" />
                    </a>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* Footer */}
        {!['pro', 'anual', 'premium'].includes(bio.user?.plan || 'free') && (
          <div className="text-center mt-16 text-xs text-gray-400 uppercase tracking-widest">
            <p>
              Criado com <Heart className="w-3 h-3 inline text-gray-300" /> AutoBio
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
