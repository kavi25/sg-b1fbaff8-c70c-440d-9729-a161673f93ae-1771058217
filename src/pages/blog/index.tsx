import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Search, Calendar, User, MessageCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { blogPosts, categories, tags } from "@/data/blogPosts";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const postsPerPage = 6;

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const recentPosts = blogPosts.slice(0, 3);

  return (
    <>
      <SEO
        title="Blog - ITProBit | Software Testing & Development Insights"
        description="Read the latest articles on software testing, automation, web development, and technology trends from ITProBit experts."
      />
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        <Header />

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                Our <span className="gradient-text">Blog</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Latest insights, tutorials, and updates on software testing, automation, and development
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Blog Posts */}
              <div className="lg:col-span-2">
                {/* Search Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </motion.div>

                {/* Blog Grid */}
                <div className="space-y-8">
                  {currentPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                        <div className="grid md:grid-cols-2 gap-0">
                          <div className="relative h-64 md:h-full overflow-hidden">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                {post.category}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-6 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(post.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric"
                                  })}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MessageCircle className="w-4 h-4" />
                                  {post.comments} Comments
                                </span>
                              </div>
                              <Link href={`/blog/${post.slug}`}>
                                <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                                  {post.title}
                                </h2>
                              </Link>
                              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                {post.excerpt}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Link href={`/blog/${post.slug}`}>
                              <Button variant="outline" className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all">
                                Read More
                                <ChevronRight className="ml-2 w-4 h-4" />
                              </Button>
                            </Link>
                          </CardContent>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 flex justify-center gap-2"
                  >
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Recent Posts */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <h3 className="text-xl font-bold">Recent Posts</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`}>
                          <div className="flex gap-3 group cursor-pointer">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                              <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                                {post.title}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(post.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric"
                                })}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Categories */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <h3 className="text-xl font-bold">Categories</h3>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                          !selectedCategory ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700" : ""
                        }`}
                      >
                        <span className="flex justify-between">
                          <span>All Posts</span>
                          <span>{blogPosts.length}</span>
                        </span>
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category.name}
                          onClick={() => setSelectedCategory(category.name)}
                          className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                            selectedCategory === category.name ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700" : ""
                          }`}
                        >
                          <span className="flex justify-between">
                            <span>{category.name}</span>
                            <span>{category.count}</span>
                          </span>
                        </button>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <h3 className="text-xl font-bold">Tags</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Newsletter */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                    <CardHeader>
                      <h3 className="text-xl font-bold">Subscribe to Newsletter</h3>
                      <p className="text-sm text-blue-100">
                        Get the latest updates and insights delivered to your inbox
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Input
                        type="email"
                        placeholder="Your email address"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                      <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                        Subscribe
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}