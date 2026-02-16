import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, X, Image as ImageIcon, Link as LinkIcon, Copy, Check } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  onImageSelect: (url: string) => void;
  value?: string;
}

export function ImageUploader({ onImageSelect, value }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState(value || "");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      setError("");

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size must be less than 5MB");
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        throw new Error("File must be an image");
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("blog-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("blog-media")
        .getPublicUrl(filePath);

      setUploadedImages(prev => [...prev, publicUrl]);
      onImageSelect(publicUrl);
      setImageUrl(publicUrl);
      
    } catch (error: any) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleUrlSubmit = () => {
    if (imageUrl) {
      onImageSelect(imageUrl);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const removeImage = (url: string) => {
    setUploadedImages(prev => prev.filter(img => img !== url));
    if (imageUrl === url) {
      setImageUrl("");
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Upload Button */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">Upload Image</Label>
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              variant="outline"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? "Uploading..." : "Choose File"}
            </Button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="text-sm text-gray-500">
            Supported formats: JPG, PNG, GIF, WebP (Max 5MB)
          </div>
        </div>
      </Card>

      {/* Image URL Input */}
      <Card className="p-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Or Enter Image URL</Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <Button type="button" onClick={handleUrlSubmit} variant="outline">
              <LinkIcon className="w-4 h-4 mr-2" />
              Use URL
            </Button>
          </div>
        </div>
      </Card>

      {/* Uploaded Images Gallery */}
      {uploadedImages.length > 0 && (
        <Card className="p-6">
          <Label className="text-lg font-semibold mb-4 block">Uploaded Images</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {uploadedImages.map((url) => (
              <div key={url} className="relative group">
                <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-gray-200">
                  <Image
                    src={url}
                    alt="Uploaded"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => copyToClipboard(url)}
                    >
                      {copiedUrl === url ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() => removeImage(url)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-1 text-xs text-gray-500 truncate">
                  {url.split("/").pop()}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Current Image Preview */}
      {imageUrl && (
        <Card className="p-6">
          <Label className="text-lg font-semibold mb-4 block">Featured Image Preview</Label>
          <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-blue-500">
            <Image
              src={imageUrl}
              alt="Featured"
              fill
              className="object-cover"
            />
          </div>
        </Card>
      )}
    </div>
  );
}