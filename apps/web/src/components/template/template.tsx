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
import { TemplateProfissional } from "./template-profissinal";
import { TemplateTecnologico } from "./template-tecnologico";
import { TemplateCriativo } from "./template-criativo";
import { TemplateDivertido } from "./template-divertido";
import { TemplateNeutro } from "./template-neutro";

type BioTemplateProps = {
  bio: Bio | null | undefined;
  error: Error | null;
  isLoading: boolean;
};

export const BioTemplate = ({ bio, error, isLoading }: BioTemplateProps) => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando biografia...</p>
        </div>
      </div>
    );
  }

  if (error || !bio) {
    return (
      <div className="min-h-screen bg-linear-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Biografia não encontrada
          </h1>
          <p className="text-gray-600 mb-6">
            A biografia que você está procurando não existe ou não está mais
            disponível.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    );
  }

  switch (bio.template) {
    case "profissional-executivo":
      return <TemplateProfissional bio={bio} />;
    case "tecnologico-dev":
      return <TemplateTecnologico bio={bio} />;
    case "criativo-artistico":
      return <TemplateCriativo bio={bio} />;
    case "divertido-casual":
      return <TemplateDivertido bio={bio} />;
    case "neutro-equilibrado":
      return <TemplateNeutro bio={bio} />;
    case "minimalista":
    default:
      return <DefaultTemplate bio={bio} getPlatformIcon={getPlatformIcon} />;
  }
};

const DefaultTemplate = ({
  bio,
  getPlatformIcon,
}: {
  bio: Bio;
  getPlatformIcon: (label: string) => JSX.Element;
}) => {
  const getStyleClasses = (style: string) => {
    // Se há tema personalizado, usar as cores personalizadas
    if (bio.theme) {
      return "";
    }

    switch (style) {
      case "divertido":
        return "bg-linear-to-br from-blue-50 to-cyan-100 text-gray-800";
      case "neutro":
        return "bg-linear-to-br from-green-50 to-emerald-100 text-gray-800";
      default:
        return "bg-linear-to-br from-blue-50 to-indigo-100 text-gray-800";
    }
  };

  const customStyles = bio.theme
    ? {
        backgroundColor: bio.theme.backgroundColor,
        color: bio.theme.textColor,
      }
    : {};

  console.log(bio.avatar);

  return (
    <div
      className={`min-h-screen ${getStyleClasses(bio.style)}`}
      style={customStyles}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex flex-col justify-center items-center">
              {bio.avatar && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-6"
                >
                  <img
                    src={`${bio.avatar}`}
                    alt={`Avatar de ${bio.title}`}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </motion.div>
              )}
              <h1 className="text-4xl font-bold mb-1 text-center">
                {bio.title}
              </h1>
              <div className="text-sm text-gray-500">
                Criado por {bio.user?.name || "Usuário"} em{" "}
                {new Date(bio.createdAt).toLocaleDateString()}
              </div>
            </div>
            <Separator
              orientation="horizontal"
              className="my-6 bg-primary-foreground"
            />
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                <ReactMarkdown>{bio.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        </motion.div>

        {bio.links && bio.links.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Links</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bio.links.map((link) => {
                const linkStyles = bio.theme
                  ? {
                      backgroundColor: bio.theme.primaryColor,
                      color: "#ffffff",
                    }
                  : {};

                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center p-4 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
                      bio.theme
                        ? ""
                        : "bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                    }`}
                    style={linkStyles}
                  >
                    {getPlatformIcon(link.label)}
                    <div className="flex-1 ml-3">
                      <div className="font-semibold">{link.label}</div>
                      <div className="text-sm opacity-90">{link.platform}</div>
                    </div>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}

        <div className="text-center mt-12 text-gray-600">
          <p className="text-sm">
            Criado com <Heart className="w-4 h-4 inline text-red-500" /> usando
            AutoBio
          </p>
          <p className="text-xs mt-2">
            Crie sua própria biografia em{" "}
            <a href="/" className="text-indigo-600 hover:underline">
              autobio.app
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
