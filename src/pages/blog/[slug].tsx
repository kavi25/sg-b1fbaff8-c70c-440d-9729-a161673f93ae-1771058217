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
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Calendar, User, MessageCircle, Share2, Facebook, Twitter, Linkedin, ArrowLeft, Tag } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query;

  const post = blogPosts.find((p) => p.slug === slug);
  const relatedPosts = blogPosts.filter((p) => p.id !== post?.id).slice(0, 3);

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
                  <span>{post.author.name}</span>
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
                  <span>{post.comments} Comments</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
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
                    className="prose prose-lg dark:prose-invert max-w-none"
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
                    <Button size="sm" variant="outline" className="hover:bg-blue-600 hover:text-white">
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                    </Button>
                    <Button size="sm" variant="outline" className="hover:bg-blue-400 hover:text-white">
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                    <Button size="sm" variant="outline" className="hover:bg-blue-700 hover:text-white">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
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
                  <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{post.author.name}</h3>
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

        {/* Comments Section */}
        <section className="pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold">Leave a Comment</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Your email address will not be published. Required fields are marked *
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Your Name *" />
                  <Input type="email" placeholder="Your Email *" />
                </div>
                <Input placeholder="Website (Optional)" />
                <Textarea placeholder="Your Comment *" rows={6} />
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Post Comment
                </Button>
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