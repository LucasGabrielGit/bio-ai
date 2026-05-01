import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { generateSlug, useCreateBio, generateContent } from "@/lib/api/bios";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Briefcase,
  Eye,
  FileText,
  Globe,
  Info,
  Link as LinkIcon,
  Palette,
  Plus,
  Save,
  Sparkles,
  Trash2,
  User,
  Wand2,
  Github,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Mail,
  MapPin,
  Heart,
  Camera,
  Layout,
  Zap,
  Crown,
} from "lucide-react";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import Markdown from "react-markdown";
import { bioStyles } from "./editar.$publicUrl";
import { useAuth } from "@/context/AuthProvider";
import { TemplatePreview } from "@/components/template/templates";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Route = createFileRoute("/admin/_layout/bios/nova-rhf")({
  component: NovaBioRHFComponent,
});

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  label: string;
}

interface BioFormData {
  title: string;
  content: string;
  style: string;
  template: string;
  publicUrl: string;
  isPublic: boolean;
  links: SocialLink[];
}

function NovaBioRHFComponent() {
  const navigate = useNavigate();
  const createBioMutation = useCreateBio();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BioFormData>({
    defaultValues: {
      title: "",
      content: "",
      style: "",
      template: "",
      publicUrl: "",
      isPublic: false,
      links: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const { user } = useAuth();

  const bioTemplates = [
    {
      id: "minimalista",
      name: "Minimalista",
      description: "Design limpo e focado no essencial",
      icon: <Layout className="h-4 w-4" />,
      preview: "Layout simples com foco no conteúdo principal",
      planRequired: "free",
    },
    {
      id: "profissional-executivo",
      name: "Profissional Executivo",
      description: "Para líderes e executivos",
      icon: <Briefcase className="h-4 w-4" />,
      preview: "Template corporativo com seções para experiência e conquistas",
      planRequired: "free",
    },
    {
      id: "criativo-artistico",
      name: "Criativo Artístico",
      description: "Para artistas e criativos",
      icon: <Palette className="h-4 w-4" />,
      preview: "Design vibrante com galeria de trabalhos e portfólio",
      planRequired: "free",
    },
    {
      id: "tech-developer",
      name: "Tech Developer",
      description: "Para desenvolvedores e profissionais de tech",
      icon: <Globe className="h-4 w-4" />,
      preview: "Template moderno com seções para projetos e tecnologias",
      planRequired: ["pro", "anual"],
    },
    {
      id: "influencer-social",
      name: "Influencer Social",
      description: "Para influenciadores e criadores de conteúdo",
      icon: <Sparkles className="h-4 w-4" />,
      preview: "Layout dinâmico com destaque para redes sociais e métricas",
      planRequired: ["pro", "anual"],
    },
    {
      id: "empreendedor-startup",
      name: "Empreendedor Startup",
      description: "Para empreendedores e fundadores",
      icon: <Zap className="h-4 w-4" />,
      preview: "Template inovador com seções para empresa e visão",
      planRequired: ["pro", "anual"],
    },
    {
      id: "consultor-especialista",
      name: "Consultor Especialista",
      description: "Para consultores e especialistas",
      icon: <User className="h-4 w-4" />,
      preview: "Layout profissional com foco em expertise e depoimentos",
      planRequired: "anual",
    },
    {
      id: "educador-mentor",
      name: "Educador & Mentor",
      description: "Para educadores e mentores",
      icon: <FileText className="h-4 w-4" />,
      preview: "Template educacional com seções para cursos e mentorias",
      planRequired: "anual",
    },
    {
      id: "freelancer-multiplo",
      name: "Freelancer Múltiplo",
      description: "Para freelancers com múltiplas habilidades",
      icon: <Plus className="h-4 w-4" />,
      preview: "Layout versátil com seções para diferentes serviços",
      planRequired: ["pro", "anual"],
    },
    {
      id: "premium-luxury",
      name: "Premium Luxury",
      description: "Template exclusivo com design sofisticado",
      icon: <Sparkles className="h-4 w-4" />,
      preview: "Design luxuoso com animações e elementos premium",
      planRequired: "anual",
    },
  ];

  const userPlan = user?.plan;

  const linksTemplates = [
    {
      platform: "linkedin",
      label: "LinkedIn",
      icon: <Linkedin className="h-4 w-4" />,
    },
    {
      platform: "github",
      label: "GitHub",
      icon: <Github className="h-4 w-4" />,
    },
    {
      platform: "twitter",
      label: "Twitter",
      icon: <Twitter className="h-4 w-4" />,
    },
    {
      platform: "instagram",
      label: "Instagram",
      icon: <Instagram className="h-4 w-4" />,
    },
    {
      platform: "facebook",
      label: "Facebook",
      icon: <Facebook className="h-4 w-4" />,
    },
    {
      platform: "youtube",
      label: "YouTube",
      icon: <Youtube className="h-4 w-4" />,
    },
    {
      platform: "website",
      label: "Website",
      icon: <Globe className="h-4 w-4" />,
    },
    { platform: "email", label: "Email", icon: <Mail className="h-4 w-4" /> },
    {
      platform: "pinterest",
      label: "Pinterest",
      icon: <Camera className="h-4 w-4" />,
    },
    {
      platform: "tiktok",
      label: "TikTok",
      icon: <Heart className="h-4 w-4" />,
    },
    {
      platform: "onlyfans",
      label: "OnlyFans",
      icon: <Heart className="h-4 w-4" />,
    },
    {
      platform: "other",
      label: "Outro",
      icon: <LinkIcon className="h-4 w-4" />,
    },
  ];

  const randomCUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  };

  const addSocialLink = () => {
    const usedPlatforms = fields.map((link) => link.platform);
    const availableTemplates = linksTemplates.filter(
      (template) => !usedPlatforms.includes(template.platform),
    );

    let newLink: SocialLink;
    if (availableTemplates.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableTemplates.length);
      const selectedTemplate = availableTemplates[randomIndex];
      newLink = {
        id: randomCUUID(),
        platform: selectedTemplate.platform,
        url: "",
        label: selectedTemplate.label,
      };
    } else {
      newLink = {
        id: randomCUUID(),
        platform: "other",
        url: "",
        label: "Outro",
      };
    }

    append(newLink);
  };

  const generateWithAI = async () => {
    const title = watch("title");
    const style = watch("style");

    if (!title || !style) {
      toast.error(
        "Por favor, preencha o título e selecione um estilo antes de gerar conteúdo",
      );
      return;
    }

    setIsGenerating(true);
    try {
      const aiContent = await generateContent({
        title,
        style,
      });

      setValue("content", aiContent);
      toast.success("Conteúdo gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar conteúdo com IA:", error);
      toast.error("Erro ao gerar conteúdo com IA. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data: BioFormData, publish = false) => {
    let publicUrl = data.publicUrl.trim();
    if (!publicUrl) {
      publicUrl = generateSlug(data.title);
    }

    const validLinks = data.links.filter(
      (link) => link.url.trim() && link.label.trim(),
    );

    const bioData = {
      ...data,
      publicUrl,
      isPublic: publish || data.isPublic,
      links: validLinks,
    };

    try {
      await createBioMutation.mutateAsync(bioData);

      toast.success(
        publish
          ? "Biografia publicada com sucesso!"
          : "Biografia salva como rascunho!",
      );

      navigate({ to: "/admin/bios" });
    } catch (error) {
      console.error("Erro ao salvar biografia:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao salvar biografia. Tente novamente.",
      );
    }
  };

  const handlePublish = handleSubmit((data) => onSubmit(data, true));
  const handleSave = handleSubmit((data) => onSubmit(data, false));

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin/bios">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Nova Biografia</h1>
            <p className="text-muted-foreground">
              Crie uma nova biografia personalizada com validação avançada
            </p>
          </div>
        </div>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 relative">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Informações Básicas
              </CardTitle>
              <CardDescription>
                Configure as informações principais da sua biografia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título da Biografia</Label>
                <Input
                  id="title"
                  placeholder="Ex: João Silva - Desenvolvedor Full Stack"
                  {...register("title", {
                    required: "Título é obrigatório",
                    minLength: {
                      value: 3,
                      message: "Título deve ter ao menos 3 caracteres",
                    },
                  })}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="publicUrl">URL Pública</Label>
                <Input
                  id="publicUrl"
                  placeholder="Ex: joao-silva-dev (deixe vazio para gerar automaticamente)"
                  {...register("publicUrl")}
                />
                <p className="text-xs text-muted-foreground">
                  Se deixado vazio, será gerado automaticamente baseado no
                  título
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="isPublic" {...register("isPublic")} />
                <Label htmlFor="isPublic">Biografia pública</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layout className="mr-2 h-5 w-5" />
                Template da Biografia
              </CardTitle>
              <CardDescription>
                Escolha um template que melhor representa seu perfil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {watch("template") ? (
                      <div className="p-3 border rounded-lg bg-primary/5 border-primary">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {
                              bioTemplates.find(
                                (t) => t.id === watch("template"),
                              )?.icon
                            }
                          </div>
                          <div>
                            <h3 className="font-medium">
                              {
                                bioTemplates.find(
                                  (t) => t.id === watch("template"),
                                )?.name
                              }
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {
                                bioTemplates.find(
                                  (t) => t.id === watch("template"),
                                )?.description
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 border rounded-lg border-dashed">
                        <p className="text-muted-foreground text-center">
                          Nenhum template selecionado
                        </p>
                      </div>
                    )}
                  </div>
                  <Dialog
                    open={templateDialogOpen}
                    onOpenChange={setTemplateDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" className="ml-4">
                        <Layout className="mr-2 h-4 w-4" />
                        Selecionar Template
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] w-152 overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Escolha um Template</DialogTitle>
                        <DialogDescription>
                          Selecione o template que melhor se adequa ao seu
                          perfil.
                          {userPlan === "free" && (
                            <span className="text-primary">
                              {" "}
                              Upgrade para Premium para acessar todos os
                              templates.
                            </span>
                          )}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {bioTemplates.map((template) => {
                          const isAvailable =
                            template.planRequired === "free" ||
                            template.planRequired.includes(String(userPlan));
                          return (
                            <HoverCard key={template.id}>
                              <Tooltip>
                                <TooltipTrigger>
                                  <HoverCardTrigger asChild>
                                    <div
                                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                                        !isAvailable
                                          ? "opacity-50 cursor-not-allowed border-muted pointer-events-none"
                                          : watch("template") === template.id
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/50"
                                      }`}
                                      onClick={() => {
                                        if (isAvailable) {
                                          setValue("template", template.id);
                                          setTemplateDialogOpen(false);
                                        }
                                      }}
                                    >
                                      <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                          {template.icon}
                                        </div>
                                        <div className="flex-1">
                                          <div className="flex items-center space-x-2">
                                            <h3 className="font-medium">
                                              {template.name}
                                            </h3>
                                            {template.planRequired.includes(
                                              "pro",
                                            ) ||
                                              (template.planRequired.includes(
                                                "anual",
                                              ) && (
                                                <Badge
                                                  variant="secondary"
                                                  className="text-xs"
                                                >
                                                  {typeof template.planRequired ===
                                                  "string"
                                                    ? template.planRequired
                                                        .charAt(0)
                                                        .toUpperCase()
                                                        .concat(
                                                          template.planRequired.slice(
                                                            1,
                                                          ),
                                                        )
                                                    : template.planRequired.join(
                                                        ", ",
                                                      )}
                                                </Badge>
                                              ))}
                                          </div>
                                          <p className="text-sm text-muted-foreground">
                                            {template.description}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </HoverCardTrigger>
                                </TooltipTrigger>
                                {!isAvailable && (
                                  <TooltipContent className="bg-linear-to-br from-red-400 via-orange-500 to-yellow-600 text-white p-2 rounded-lg">
                                    <span className="font-semibold text-sm">
                                      Atualize seu plano para{" "}
                                      {typeof template.planRequired === "string"
                                        ? template.planRequired
                                            .charAt(0)
                                            .toUpperCase()
                                            .concat(
                                              template.planRequired.slice(1),
                                            )
                                        : template.planRequired.join(", ")}{" "}
                                      para usar este template.
                                    </span>
                                  </TooltipContent>
                                )}
                              </Tooltip>
                              <HoverCardContent className="w-96 p-4">
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-semibold text-base">
                                      {template.name}
                                    </h4>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {template.description}
                                    </p>
                                  </div>

                                  <div className="space-y-2">
                                    <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                      Preview do Layout
                                    </h5>
                                    <div className="border rounded-lg p-2 bg-white">
                                      <TemplatePreview
                                        templateId={template.id}
                                      />
                                    </div>
                                  </div>

                                  <div className="text-xs text-muted-foreground border-t pt-2">
                                    <strong>Características:</strong>{" "}
                                    {template.preview}
                                  </div>

                                  {(template.planRequired.includes("pro") ||
                                    template.planRequired.includes("anual")) &&
                                    userPlan === "free" && (
                                      <div className="p-3 bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                          <Crown className="h-4 w-4 text-amber-600" />
                                          <span className="text-sm font-medium text-amber-800">
                                            Template Premium
                                          </span>
                                        </div>
                                        <p className="text-xs text-amber-700 mt-1">
                                          Faça upgrade para acessar este
                                          template exclusivo
                                        </p>
                                      </div>
                                    )}
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          );
                        })}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                {errors.template && (
                  <p className="text-sm text-destructive">
                    {errors.template.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="mr-2 h-5 w-5" />
                Estilo da Biografia
              </CardTitle>
              <CardDescription>
                Escolha o tom e estilo da sua biografia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bioStyles.map((style) => (
                  <div
                    key={style.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      watch("style") === style.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        value={style.value}
                        {...register("style", {
                          required: "Selecione um estilo",
                        })}
                        className="sr-only"
                      />
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {style.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{style.label}</h3>
                          <p className="text-sm text-muted-foreground">
                            {style.description}
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              {errors.style && (
                <p className="text-sm text-destructive mt-2">
                  {errors.style.message}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Conteúdo da Biografia
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateWithAI}
                  disabled={isGenerating || !watch("title") || !watch("style")}
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Gerar com IA
                    </>
                  )}
                </Button>
              </CardTitle>
              <CardDescription>
                Escreva ou gere automaticamente o conteúdo da sua biografia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Conte sua história, suas habilidades, experiências e o que te motiva..."
                className="min-h-[200px] resize-none"
                {...register("content", {
                  required: "Conteúdo é obrigatório",
                  minLength: {
                    value: 10,
                    message: "Conteúdo deve ter ao menos 10 caracteres",
                  },
                })}
              />
              {errors.content && (
                <p className="text-sm text-destructive mt-2">
                  {errors.content.message}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <LinkIcon className="mr-2 h-5 w-5" />
                  Links Sociais
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSocialLink}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Link
                </Button>
              </CardTitle>
              <CardDescription>
                Adicione seus perfis de redes sociais e outros links importantes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {fields.map((field, index) => {
                const selectedTemplate = linksTemplates.find(
                  (t) => t.platform === field.platform,
                );
                return (
                  <div key={field.id} className="flex space-x-2 items-center">
                    <div>
                      <Select
                        value={field.platform}
                        onValueChange={(value) => {
                          const template = linksTemplates.find(
                            (t) => t.platform === value,
                          );
                          if (template) {
                            setValue(`links.${index}.platform`, value);
                            setValue(`links.${index}.label`, template.label);
                          }
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue>
                            <div className="flex items-center space-x-2">
                              {selectedTemplate?.icon}
                              <span>
                                {selectedTemplate?.label || "Selecionar"}
                              </span>
                            </div>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="h-full">
                          {linksTemplates.map((template) => (
                            <SelectItem
                              key={template.platform}
                              value={template.platform}
                              className="w-32"
                            >
                              <div className="flex items-center space-x-2 w-full">
                                {template.icon}
                                <span>{template.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Input
                        placeholder="https://..."
                        {...register(`links.${index}.url`, {
                          pattern: {
                            value: /^https?:\/\/.+/,
                            message: "URL deve começar com http:// ou https://",
                          },
                        })}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
              {fields.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Nenhum link adicionado. Clique em "Adicionar Link" para
                  começar.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Preview
              </CardTitle>
              <CardDescription>Veja como sua biografia ficará</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    {watch("title") || "Título da biografia"}
                  </h3>
                  <Badge variant="secondary" className="mt-1">
                    {watch("style") || "Estilo"}
                  </Badge>
                  {watch("isPublic") && (
                    <Badge variant="default" className="mt-1 ml-2">
                      Público
                    </Badge>
                  )}
                </div>

                <div className="text-sm text-muted-foreground">
                  <Markdown>{watch("content")}</Markdown>
                </div>

                {fields.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Links:</h4>
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="text-xs text-muted-foreground"
                      >
                        {watch(`links.${index}.label`) || "Nome do link"}:{" "}
                        {watch(`links.${index}.url`) || "URL"}
                      </div>
                    ))}
                  </div>
                )}

                {watch("publicUrl") && (
                  <div className="text-xs text-muted-foreground">
                    URL: {watch("publicUrl")}
                  </div>
                )}
              </div>
              <Separator className="my-4" />
              <CardAction>
                <div className="space-y-3">
                  <Button
                    type="button"
                    onClick={handlePublish}
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Publicando...
                      </>
                    ) : (
                      <>
                        <Globe className="mr-2 h-4 w-4" />
                        Publicar Biografia
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSave}
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Rascunho
                      </>
                    )}
                  </Button>
                </div>
              </CardAction>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
