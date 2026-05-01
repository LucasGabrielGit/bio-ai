import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  FileText,
  Globe,
  LinkIcon,
  Loader2,
  Palette,
  Plus,
  Save,
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
  Camera,
  Heart,
  BarChart3,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useQueryClient } from "@tanstack/react-query";
import { useBio, useGenerateContent, useUpdateBio } from "@/lib/api/bios";
import apiClient from "@/lib/api/client";
import { BioAnalytics } from "@/components/analytics/BioAnalytics";
import { AvatarUpload } from "@/components/AvatarUpload";
import { ThemeCustomizer } from "@/components/ThemeCustomizer";
import { createFileRoute } from "@tanstack/react-router";
import Markdown from "react-markdown";

export const Route = createFileRoute("/admin/_layout/bios/editar/$publicUrl")({
  component: EditarBioComponent,
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
  publicUrl: string;
  isPublic: boolean;
  template: string;
  links: SocialLink[];
}

export const bioStyles = [
  {
    value: "profissional",
    label: "Profissional",
    icon: <User className="h-4 w-4" />,
    description: "Tom formal e corporativo",
  },
  {
    value: "criativo",
    label: "Criativo",
    icon: <Palette className="h-4 w-4" />,
    description: "Expressivo e artístico",
  },
  {
    value: "divertido",
    label: "Divertido",
    icon: <Wand2 className="h-4 w-4" />,
    description: "Descontraído e casual",
  },
  {
    value: "neutro",
    label: "Neutro",
    icon: <FileText className="h-4 w-4" />,
    description: "Equilibrado e versátil",
  },
  {
    value: "tecnologico",
    label: "Tecnológico",
    icon: <Globe className="h-4 w-4" />,
    description: "Focado em tech e inovação",
  },
];

function EditarBioComponent() {
  const { publicUrl } = Route.useParams();
  const navigate = useNavigate();
  const { data: bio, isLoading, error } = useBio(publicUrl);
  const updateBioMutation = useUpdateBio();
  const generateContentMutation = useGenerateContent();
  const [activeTab, setActiveTab] = useState("configuracoes");
  const [pendingAvatar, setPendingAvatar] = useState<{
    file: File | null;
    preview: string | null;
  } | null>(null);
  const [pendingTheme, setPendingTheme] = useState<any>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BioFormData>({
    defaultValues: {
      title: "",
      content: "",
      style: "",
      publicUrl: "",
      isPublic: false,
      links: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  useEffect(() => {
    if (bio) {
      console.log(bio);
      reset({
        title: bio.title,
        content: bio.content,
        style: bio.style,
        publicUrl: bio.publicUrl,
        isPublic: bio.isPublic || false,
        links: bio.links || [],
      });
    }
  }, [bio, reset]);

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

    if (!title?.trim()) {
      toast.error("Por favor, adicione um título antes de gerar conteúdo");
      return;
    }

    if (!style) {
      toast.error("Por favor, selecione um estilo antes de gerar conteúdo");
      return;
    }

    try {
      const result = await generateContentMutation.mutateAsync({
        title,
        style,
      });

      setValue("content", result.content);
      toast.success("Conteúdo gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar conteúdo:", error);
      toast.error("Erro ao gerar conteúdo. Tente novamente.");
    }
  };

  const onSubmit = async (data: BioFormData, publish = false) => {
    const validLinks = data.links.filter(
      (link) => link.url.trim() && link.label.trim(),
    );

    const bioData = {
      id: bio?.id || "",
      title: data.title.trim(),
      content: data.content.trim(),
      style: data.style,
      publicUrl: data.publicUrl,
      isPublic: publish || data.isPublic,
      template: data.template,
      links: validLinks,
    };

    try {
      if (pendingAvatar) {
        if (pendingAvatar.file) {
          const formData = new FormData();
          formData.append("file", pendingAvatar.file);
          await apiClient.post(`/bios/upload-avatar/${publicUrl}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } else if (pendingAvatar.preview === null) {
          await apiClient.put(`/bios/theme/${publicUrl}`, { avatar: null });
        }
      }

      if (pendingTheme) {
        await apiClient.put(`/bios/theme/${publicUrl}`, pendingTheme);
      }

      await updateBioMutation.mutateAsync({ publicUrl, data: bioData });

      toast.success(
        publish
          ? "Biografia atualizada e publicada com sucesso!"
          : "Biografia atualizada com sucesso!",
      );
      if (publish) {
        navigate({ to: "/admin/bios" });
      }
    } catch (error) {
      console.error("Erro ao atualizar biografia:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao atualizar biografia. Tente novamente.",
      );
    }
  };

  const handleSave = handleSubmit((data) => onSubmit(data, false));
  const handlePublish = handleSubmit((data) => onSubmit(data, true));

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 space-y-6 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !bio) {
    return (
      <div className="container mx-auto py-8 px-4 space-y-6 max-w-4xl">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-600 mb-4">Erro ao carregar biografia</p>
              <Button asChild>
                <Link to="/admin/bios">Voltar para Minhas Bios</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin/bios">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Editar Biografia
            </h1>
            <p className="text-muted-foreground">
              Atualize sua biografia personalizada
            </p>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleSave}
            disabled={isSubmitting || updateBioMutation.isPending}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar
              </>
            )}
          </Button>
          <Button
            onClick={handlePublish}
            disabled={isSubmitting || updateBioMutation.isPending}
            className="bg-linear-to-r from-primary to-purple-600"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publicando...
              </>
            ) : (
              <>
                <Globe className="mr-2 h-4 w-4" />
                Publicar
              </>
            )}
          </Button>
        </div>
      </motion.div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6 mt-3"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="configuracoes"
            className="flex items-center space-x-2"
          >
            <Settings className="h-4 w-4" />
            <span>Configurações</span>
          </TabsTrigger>
          <TabsTrigger
            value="personalizacao"
            className="flex items-center space-x-2"
          >
            <Palette className="h-4 w-4" />
            <span>Personalização</span>
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="flex items-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="configuracoes" className="space-y-0">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <form
                onSubmit={handleSubmit((data) => onSubmit(data, false))}
                className="space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="h-5 w-5" />
                        <span>Informações Básicas</span>
                      </CardTitle>
                      <CardDescription>
                        Configure o título e URL da sua biografia
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Título da Bio</Label>
                        <Input
                          id="title"
                          placeholder="Ex: Bio Profissional - LinkedIn"
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
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                            autobio.app/
                          </span>
                          <Input
                            id="publicUrl"
                            placeholder="seu-nome"
                            {...register("publicUrl")}
                            className="rounded-l-none"
                            disabled
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          A URL pública não pode ser alterada após a criação
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="isPublic" {...register("isPublic")} />
                        <Label htmlFor="isPublic">
                          Tornar biografia pública
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Palette className="h-5 w-5" />
                        <span>Estilo da Biografia</span>
                      </CardTitle>
                      <CardDescription>
                        Escolha o tom e formato da sua biografia
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 md:grid-cols-2">
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
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <User className="h-5 w-5" />
                            <span>Conteúdo da Biografia</span>
                          </CardTitle>
                          <CardDescription>
                            Escreva ou gere com IA o conteúdo da sua biografia
                          </CardDescription>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={generateWithAI}
                          disabled={!watch("style")}
                          className="bg-linear-to-r from-primary/10 to-purple-600/10"
                        >
                          <Wand2 className="mr-2 h-4 w-4" />
                          Gerar com IA
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Escreva sobre você, suas habilidades, experiências e objetivos..."
                        {...register("content", {
                          required: "Conteúdo é obrigatório",
                          minLength: {
                            value: 10,
                            message: "Conteúdo deve ter ao menos 10 caracteres",
                          },
                        })}
                        className="min-h-[200px] resize-none"
                      />
                      {errors.content && (
                        <p className="text-sm text-destructive mt-2">
                          {errors.content.message}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <LinkIcon className="h-5 w-5" />
                            <span>Links Sociais</span>
                          </CardTitle>
                          <CardDescription>
                            Adicione seus perfis e links importantes
                          </CardDescription>
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
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {fields.map((field, index) => {
                        const selectedTemplate = linksTemplates.find(
                          (t) => t.platform === field.platform,
                        );
                        return (
                          <div
                            key={field.id}
                            className="flex space-x-2 items-center"
                          >
                            <div>
                              <Select
                                value={field.platform}
                                onValueChange={(value) => {
                                  const template = linksTemplates.find(
                                    (t) => t.platform === value,
                                  );
                                  if (template) {
                                    setValue(`links.${index}.platform`, value);
                                    setValue(
                                      `links.${index}.label`,
                                      template.label,
                                    );
                                  }
                                }}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue>
                                    <div className="flex items-center space-x-2">
                                      {selectedTemplate?.icon}
                                      <span>
                                        {selectedTemplate?.label ||
                                          "Selecionar"}
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
                                    message:
                                      "URL deve começar com http:// ou https://",
                                  },
                                })}
                              />
                              {errors.links?.[index]?.url && (
                                <p className="text-xs text-destructive mt-1">
                                  {errors.links[index]?.url?.message}
                                </p>
                              )}
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
                        <div className="text-center py-8 text-muted-foreground">
                          <LinkIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Nenhum link adicionado ainda</p>
                          <p className="text-sm">
                            Clique em "Adicionar Link" para começar
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" asChild>
                    <Link to="/admin/bios">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Voltar
                    </Link>
                  </Button>
                  <div className="space-x-2">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleSubmit((data) =>
                        onSubmit({ ...data, isPublic: true }),
                      )}
                      disabled={isSubmitting}
                      className="bg-linear-to-r from-primary to-purple-600"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Publicando...
                        </>
                      ) : (
                        <>
                          <Globe className="mr-2 h-4 w-4" />
                          Publicar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            <div className="space-y-6 sticky top-12 right-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="sticky top-12">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="h-5 w-5" />
                      <span>Preview</span>
                    </CardTitle>
                    <CardDescription>Veja como sua bio ficará</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-bold text-lg mb-2">
                        {watch("title") || "Título da Bio"}
                      </h3>
                      <div className="text-sm text-muted-foreground mb-3">
                        <Markdown>
                          {watch("content") ||
                            "Conteúdo da biografia aparecerá aqui..."}
                        </Markdown>
                      </div>
                      {watch("style") && (
                        <Badge variant="outline" className="text-xs">
                          {
                            bioStyles.find((s) => s.value === watch("style"))
                              ?.label
                          }
                        </Badge>
                      )}
                    </div>

                    {fields.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Links:</h4>
                        {fields
                          .filter(
                            (_, index) =>
                              watch(`links.${index}.label`) &&
                              watch(`links.${index}.url`),
                          )
                          .map((field, index) => (
                            <div
                              key={field.id}
                              className="flex items-center space-x-2 text-sm"
                            >
                              <LinkIcon className="h-3 w-3" />
                              <span className="text-muted-foreground">
                                {watch(`links.${index}.label`)}
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="personalizacao" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Camera className="h-5 w-5" />
                      <span>Avatar</span>
                    </CardTitle>
                    <CardDescription>
                      Adicione uma foto de perfil para sua bio
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AvatarUpload
                      bioSlug={publicUrl}
                      currentAvatar={bio?.avatar}
                      onAvatarChange={(previewUrl, file) => {
                        setPendingAvatar({ preview: previewUrl, file });
                      }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Palette className="h-5 w-5" />
                      <span>Tema e Cores</span>
                    </CardTitle>
                    <CardDescription>
                      Personalize as cores da sua bio
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ThemeCustomizer
                      bioSlug={publicUrl}
                      currentTheme={pendingTheme || bio?.theme}
                      onThemeChange={(newTheme) => {
                        setPendingTheme(newTheme);
                      }}
                      avatarUrl={
                        pendingAvatar !== null
                          ? pendingAvatar.preview || undefined
                          : bio?.avatar
                      }
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-0">
          <BioAnalytics publicUrl={publicUrl} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
