import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/integrations/supabase/client";
import { blogService } from "@/services/blogService";
import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { CodeEditor } from "@/components/admin/CodeEditor";
import { AIWritingAssistant } from "@/components/admin/AIWritingAssistant";
import { ArrowLeft, Save, Eye, FileText, Image as ImageIcon, Code, Sparkles } from "lucide-react";

export default function NewBlogPost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authorId, setAuthorId] = useState<string>("");
  const [activeTab, setActiveTab] = useState("content");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    category: "Testing",
    tags: "",
    published: false,
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/admin/login");
      return;
    }
    setAuthorId(user.id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title
    if (name === "title") {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleImageSelect = (url: string) => {
    setFormData(prev => ({ ...prev, image: url }));
  };

  const handleCodeInsert = (code: string) => {
    setFormData(prev => ({
      ...prev,
      content: prev.content + "\n\n" + code
    }));
    setActiveTab("content");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!authorId) {
      setError("You must be logged in to create a post");
      setLoading(false);
      return;
    }

    try {
      const tagsArray = formData.tags.split(",").map(tag => tag.trim()).filter(Boolean);
      
      await blogService.createPost({
        ...formData,
        author_id: authorId,
        tags: tagsArray,
        comments_count: 0,
      });

      router.push("/admin/blog");
    } catch (error: any) {
      setError(error.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    // Store draft in localStorage for preview
    localStorage.setItem("blog_preview", JSON.stringify(formData));
    window.open("/blog/preview", "_blank");
  };

  return (
    <>
      <SEO title="New Blog Post - Admin" />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6 flex items-center justify-between">
            <Link href="/admin/blog">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog Posts
              </Button>
            </Link>
            <Button onClick={handlePreview} variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Create New Blog Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter post title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug *</Label>
                    <Input
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="auto-generated-from-title"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Brief description of your post (shown in listings)"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Input
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="e.g., Testing, Development, Design"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="automation, testing, selenium (comma-separated)"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Writing Assistant */}
            <AIWritingAssistant
              onContentGenerated={(content) => setFormData(prev => ({ ...prev, content }))}
              onTitleGenerated={(title) => {
                setFormData(prev => ({ 
                  ...prev, 
                  title,
                  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
                }));
              }}
              onExcerptGenerated={(excerpt) => setFormData(prev => ({ ...prev, excerpt }))}
              onTagsGenerated={(tags) => setFormData(prev => ({ ...prev, tags }))}
              currentContent={formData.content}
              currentTitle={formData.title}
              category={formData.category}
            />

            {/* Content Editor Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Content Editor</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="content" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Content
                    </TabsTrigger>
                    <TabsTrigger value="images" className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Images
                    </TabsTrigger>
                    <TabsTrigger value="code" className="flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      Code
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="mt-6">
                    <div className="space-y-2">
                      <Label>Post Content *</Label>
                      <RichTextEditor
                        value={formData.content}
                        onChange={handleContentChange}
                        placeholder="Write your blog post content here..."
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Use the toolbar to format text, add links, insert images, and more.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="images" className="mt-6">
                    <ImageUploader
                      value={formData.image}
                      onImageSelect={handleImageSelect}
                    />
                  </TabsContent>

                  <TabsContent value="code" className="mt-6">
                    <CodeEditor onInsert={handleCodeInsert} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Publish Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Publish Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="published" className="text-base">
                      Publish Status
                    </Label>
                    <p className="text-sm text-gray-500">
                      {formData.published ? "Post will be visible to everyone" : "Save as draft"}
                    </p>
                  </div>
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Link href="/admin/blog">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData(prev => ({ ...prev, published: false }))}
                disabled={loading}
              >
                Save as Draft
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Creating..." : formData.published ? "Publish Post" : "Create Post"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}