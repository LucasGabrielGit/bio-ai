import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Upload, User, X } from 'lucide-react';
import { toast } from 'sonner';
import apiClient from '@/lib/api/client';

interface AvatarUploadProps {
  currentAvatar?: string;
  onAvatarChange: (previewUrl: string | null, file: File | null) => void;
  bioSlug: string;
}

export function AvatarUpload({ currentAvatar, onAvatarChange, bioSlug }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentAvatar || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Tipo de arquivo não permitido. Use JPEG, PNG, WebP ou GIF');
      return;
    }

    // Validar tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Arquivo muito grande. Máximo 5MB');
      return;
    }

    // Mostrar preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewUrl = e.target?.result as string;
      setPreview(previewUrl);
      onAvatarChange(previewUrl, file);
    };
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => {
    setPreview(null);
    onAvatarChange(null, null);
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
              {preview ? (
                <img
                  src={preview.startsWith('/public') ? `${API_BASE_URL}${preview}` : preview}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-gray-400" />
              )}
            </div>

            {preview && (
              <Button
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                onClick={removeAvatar}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-900">Avatar da Bio</h3>
            <p className="text-xs text-gray-500 mt-1">
              JPEG, PNG, WebP ou GIF até 5MB
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileSelect}
            className="hidden"
          />

          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            {preview ? 'Alterar Avatar' : 'Enviar Avatar'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
