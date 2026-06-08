import type { Bio } from "@/lib/api/bios";
import {
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
import type { JSX } from "react";

// Imports of the 10 distinct templates
import { TemplateMinimalista } from "./template-minimalista";
import { TemplateProfissional } from "./template-profissional";
import { TemplateCriativo } from "./template-criativo";
import { TemplateTech } from "./template-tech";
import { TemplateInfluencer } from "./template-influencer";
import { TemplateStartup } from "./template-startup";
import { TemplateConsultor } from "./template-consultor";
import { TemplateEducador } from "./template-educador";
import { TemplateFreelancer } from "./template-freelancer";
import { TemplatePremium } from "./template-premium";

type BioTemplateProps = {
  bio: Bio | null | undefined;
  error: Error | null;
  isLoading: boolean;
  isPreview?: boolean;
};

export const BioTemplate = ({ bio, error, isLoading, isPreview }: BioTemplateProps) => {

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

  // Map the exact ID string from the DB/Form to the correct React Component
  switch (bio.template) {
    case "profissional-executivo":
      return <TemplateProfissional bio={bio} isPreview={isPreview} />;
    case "criativo-artistico":
      return <TemplateCriativo bio={bio} />;
    case "tech-developer":
      return <TemplateTech bio={bio} />;
    case "influencer-social":
      return <TemplateInfluencer bio={bio} />;
    case "empreendedor-startup":
      return <TemplateStartup bio={bio} />;
    case "consultor-especialista":
      return <TemplateConsultor bio={bio} />;
    case "educador-mentor":
      return <TemplateEducador bio={bio} />;
    case "freelancer-multiplo":
      return <TemplateFreelancer bio={bio} />;
    case "premium-luxury":
      return <TemplatePremium bio={bio} />;
    case "minimalista":
    default:
      // Fallback for any unknown template or explicitly "minimalista"
      return <TemplateMinimalista bio={bio} />;
  }
};
