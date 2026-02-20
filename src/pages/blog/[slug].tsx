import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Calendar, User, MessageCircle, Share2, Facebook, Twitter, Linkedin, ArrowLeft, Tag, Link2, CheckCircle } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { blogService } from "@/services/blogService";
import { commentService } from "@/services/commentService";
import { supabase } from "@/integrations/supabase/client";

interface CommentFormData {
  author_name: string;
  author_email: string;
  author_website: string;
  comment_text: string;
}

export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { toast } = useToast();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentForm, setCommentForm] = useState<CommentFormData>({
    author_name: "",
    author_email: "",
    author_website: "",
    comment_text: ""
  });

  useEffect(() => {
    if (slug) {
      loadPost();
    }
  }, [slug]);

  const loadPost = async () => {
    try {
      const posts = await blogService.getAllPosts();
      const foundPost = posts.find((p) => p.slug === slug);
      setPost(foundPost || null);
      
      if (foundPost) {
        loadComments(foundPost.id);
      }
    } catch (error) {
      console.error("Error loading post:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (postId: string) => {
    try {
      const postComments = await commentService.getCommentsByPostId(postId);
      setComments(postComments);
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!post) return;

    if (!commentForm.author_name.trim() || !commentForm.author_email.trim() || !commentForm.comment_text.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email, Comment)",
        variant: "destructive"
      });
      return;
    }

    setSubmittingComment(true);
    try {
      const { data, error } = await supabase
        .from("blog_comments")
        .insert({
          post_id: post.id,
          author_name: commentForm.author_name.trim(),
          author_email: commentForm.author_email.trim(),
          author_website: commentForm.author_website.trim() || null,
          comment_text: commentForm.comment_text.trim()
        })
        .select()
        .single();

      console.log("Comment submission:", { data, error });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      toast({
        title: "Comment Submitted!",
        description: "Your comment is awaiting moderation and will be published soon.",
      });

      setCommentForm({
        author_name: "",
        author_email: "",
        author_website: "",
        comment_text: ""
      });

      // Reload comments to show pending count
      loadComments(post.id);
    } catch (error: any) {
      console.error("Error submitting comment:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to submit comment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmittingComment(false);
    }
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "width=600,height=400");
  };

  const shareToTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post?.title || "");
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank", "width=600,height=400");
  };

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank", "width=600,height=400");
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Post URL has been copied to clipboard.",
    });
  };

  const relatedPosts = blogPosts.filter((p) => p.id !== post?.id).slice(0, 3);

  if (loading) {
    return (
      <>
        <SEO title="Loading... - ITProBit" />
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
          <Header />
          <div className="max-w-4xl mx-auto px-4 py-32 text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <SEO title="Post Not Found - ITProBit" />
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
          <Header />
          <div className="max-w-4xl mx-auto px-4 py-32 text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link href="/blog">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  const authorName = post.profiles?.full_name || "ITProBit Team";
  const authorAvatar = post.profiles?.avatar_url || "https://ui-avatars.com/api/?name=ITProBit&background=3b82f6&color=fff";

  return (
    <>
      <SEO
        title={`${post.title} - ITProBit Blog`}
        description={post.excerpt}
        image={post.image}
      />
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        <Header />

        {/* Back to Blog */}
        <section className="pt-32 pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </section>

        {/* Blog Post Header */}
        <section className="pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-4">
                {post.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{authorName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>{comments.length} {comments.length === 1 ? "Comment" : "Comments"}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-8 md:p-12">
                  <div 
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Share Buttons */}
        <section className="pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Share this post
                  </h3>
                  <div className="flex gap-3">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={shareToFacebook}
                      className="hover:bg-blue-600 hover:text-white"
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={shareToTwitter}
                      className="hover:bg-blue-400 hover:text-white"
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={shareToLinkedIn}
                      className="hover:bg-blue-700 hover:text-white"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={copyLinkToClipboard}
                      className="hover:bg-green-600 hover:text-white"
                    >
                      <Link2 className="w-4 h-4 mr-2" />
                      Copy Link
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Author Bio */}
        <section className="pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="flex gap-6 items-start">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={authorAvatar} alt={authorName} />
                    <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{authorName}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Expert team of software testers and developers passionate about quality assurance,
                      automation testing, and delivering exceptional software solutions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Comments Display */}
        {comments.length > 0 && (
          <section className="pb-12 px-4">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <h3 className="text-2xl font-bold">{comments.length} {comments.length === 1 ? "Comment" : "Comments"}</h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author_name)}&background=3b82f6&color=fff`} />
                          <AvatarFallback>{comment.author_name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{comment.author_name}</h4>
                            {comment.status === "approved" && (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            )}
                            <span className="text-sm text-gray-500">
                              {new Date(comment.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{comment.comment_text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Comment Form */}
        <section className="pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold">Leave a Comment</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Your email address will not be published. Required fields are marked *
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input 
                      placeholder="Your Name *" 
                      required
                      value={commentForm.author_name}
                      onChange={(e) => setCommentForm({ ...commentForm, author_name: e.target.value })}
                    />
                    <Input 
                      type="email" 
                      placeholder="Your Email *" 
                      required
                      value={commentForm.author_email}
                      onChange={(e) => setCommentForm({ ...commentForm, author_email: e.target.value })}
                    />
                  </div>
                  <Input 
                    placeholder="Website (Optional)" 
                    value={commentForm.author_website}
                    onChange={(e) => setCommentForm({ ...commentForm, author_website: e.target.value })}
                  />
                  <Textarea 
                    placeholder="Your Comment *" 
                    rows={6} 
                    required
                    value={commentForm.comment_text}
                    onChange={(e) => setCommentForm({ ...commentForm, comment_text: e.target.value })}
                  />
                  <Button 
                    type="submit"
                    disabled={submittingComment}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {submittingComment ? "Submitting..." : "Post Comment"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="pb-16 px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-8">Related Posts</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <motion.div
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <CardContent className="p-4">
                          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-2">
                            {relatedPost.category}
                          </Badge>
                          <h4 className="font-bold text-sm mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(relatedPost.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </p>
                        </CardContent>
                      </Link>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}