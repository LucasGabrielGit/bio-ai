import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Palette, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import apiClient from "@/lib/api/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ThemeCustomizerProps {
  bioSlug: string;
  currentTheme?: {
    primaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
  };
  onThemeChange: (theme: any) => void;
  avatarUrl?: string;
}

const defaultTheme = {
  primaryColor: "#3b82f6",
  backgroundColor: "#ffffff",
  textColor: "#1f2937",
};

const presetThemes = [
  {
    name: "Azul Clássico",
    primaryColor: "#3b82f6",
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
  },
  {
    name: "Verde Natureza",
    primaryColor: "#10b981",
    backgroundColor: "#f0fdf4",
    textColor: "#064e3b",
  },
  {
    name: "Roxo Criativo",
    primaryColor: "#8b5cf6",
    backgroundColor: "#faf5ff",
    textColor: "#581c87",
  },
  {
    name: "Rosa Moderno",
    primaryColor: "#ec4899",
    backgroundColor: "#fdf2f8",
    textColor: "#831843",
  },
  {
    name: "Laranja Vibrante",
    primaryColor: "#f97316",
    backgroundColor: "#fff7ed",
    textColor: "#9a3412",
  },
  {
    name: "Modo Escuro",
    primaryColor: "#60a5fa",
    backgroundColor: "#111827",
    textColor: "#f9fafb",
  },
];

export function ThemeCustomizer({
  bioSlug,
  currentTheme,
  onThemeChange,
  avatarUrl,
}: ThemeCustomizerProps) {
  const [theme, setTheme] = useState(currentTheme || defaultTheme);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (currentTheme) {
      setTheme({ ...defaultTheme, ...currentTheme });
    }
  }, [currentTheme]);

  const handleColorChange = (key: keyof typeof theme, value: string) => {
    const newTheme = { ...theme, [key]: value };
    setTheme(newTheme);
    onThemeChange(newTheme);
  };

  const applyPreset = (preset: (typeof presetThemes)[0]) => {
    setTheme(preset);
    onThemeChange(preset);
  };

  const resetToDefault = () => {
    setTheme(defaultTheme);
    onThemeChange(defaultTheme);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Personalização Visual
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Preview */}
        <div
          className="border rounded-lg p-4"
          style={{ backgroundColor: theme.backgroundColor }}
        >
          <div className="text-center space-y-2">
            <div
              className="w-12 h-12 rounded-full mx-auto"
              style={{ backgroundColor: theme.primaryColor }}
            />
            <h3 style={{ color: theme.textColor }} className="font-semibold">
              Preview do Tema
            </h3>
            <p
              style={{ color: theme.textColor, opacity: 0.7 }}
              className="text-sm"
            >
              Assim ficará sua bio
            </p>
            <div
              className="inline-block px-4 py-2 rounded-full text-white text-sm"
              style={{ backgroundColor: theme.primaryColor }}
            >
              Botão de Exemplo
            </div>
          </div>
        </div>

        {/* Cores Personalizadas */}
        <div className="space-y-4">
          <h4 className="font-medium">Cores Personalizadas</h4>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="primaryColor">Cor Principal</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="primaryColor"
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) =>
                    handleColorChange("primaryColor", e.target.value)
                  }
                  className="w-12 h-10 p-1 border rounded"
                />
                <Input
                  type="text"
                  value={theme.primaryColor}
                  onChange={(e) =>
                    handleColorChange("primaryColor", e.target.value)
                  }
                  className="flex-1"
                  placeholder="#3b82f6"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="backgroundColor">Cor de Fundo</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="backgroundColor"
                  type="color"
                  value={theme.backgroundColor}
                  onChange={(e) =>
                    handleColorChange("backgroundColor", e.target.value)
                  }
                  className="w-12 h-10 p-1 border rounded"
                />
                <Input
                  type="text"
                  value={theme.backgroundColor}
                  onChange={(e) =>
                    handleColorChange("backgroundColor", e.target.value)
                  }
                  className="flex-1"
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="textColor">Cor do Texto</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="textColor"
                  type="color"
                  value={theme.textColor}
                  onChange={(e) =>
                    handleColorChange("textColor", e.target.value)
                  }
                  className="w-12 h-10 p-1 border rounded"
                />
                <Input
                  type="text"
                  value={theme.textColor}
                  onChange={(e) =>
                    handleColorChange("textColor", e.target.value)
                  }
                  className="flex-1"
                  placeholder="#1f2937"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Temas Predefinidos */}
        <div className="space-y-4">
          <h4 className="font-medium">Temas Predefinidos</h4>
          <div className="grid grid-cols-2 gap-2">
            {presetThemes.map((preset, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => applyPreset(preset)}
                disabled={isUpdating}
                className="justify-start"
              >
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: preset.primaryColor }}
                />
                {preset.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Reset */}
        <Button
          variant="outline"
          onClick={resetToDefault}
          disabled={isUpdating}
          className="w-full"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Restaurar Padrão
        </Button>
      </CardContent>
    </Card>
  );
}
