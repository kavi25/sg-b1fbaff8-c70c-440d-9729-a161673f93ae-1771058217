import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/integrations/supabase/client";
import { blogService } from "@/services/blogService";
import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AdminBlogList() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    checkUser();
    loadPosts();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/admin/login");
    }
  };

  const loadPosts = async () => {
    try {
      const data = await blogService.getAllPosts();
      setPosts(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await blogService.deletePost(id);
      setPosts(posts.filter(p => p.id !== id));
    } catch (error: any) {
      alert("Failed to delete post: " + error.message);
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      await blogService.updatePost(id, { published: !currentStatus });
      setPosts(posts.map(p => p.id === id ? { ...p, published: !currentStatus } : p));
    } catch (error: any) {
      alert("Failed to update post: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <SEO title="Manage Blog Posts - Admin" />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
            </div>
            <Link href="/admin/blog/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </Link>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle>{post.title}</CardTitle>
                        <Badge variant={post.published ? "default" : "secondary"}>
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      <CardDescription>
                        {post.excerpt?.substring(0, 150)}...
                      </CardDescription>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>Category: {post.category}</span>
                        <span>•</span>
                        <span>Created: {new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePublish(post.id, post.published)}
                      >
                        {post.published ? (
                          <><EyeOff className="h-4 w-4 mr-1" /> Unpublish</>
                        ) : (
                          <><Eye className="h-4 w-4 mr-1" /> Publish</>
                        )}
                      </Button>
                      <Link href={`/admin/blog/edit/${post.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}

            {posts.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-gray-500 mb-4">No blog posts yet</p>
                  <Link href="/admin/blog/new">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Post
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}