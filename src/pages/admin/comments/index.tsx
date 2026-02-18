import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Clock,
  Mail,
  User,
  Calendar,
  ExternalLink,
  Eye,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { checkAdminAuth } from "@/services/authService";
import { 
  getAllComments, 
  approveComment, 
  deleteComment,
  getCommentsByStatus 
} from "@/services/commentService";
import type { Tables } from "@/integrations/supabase/types";

type Comment = Tables<"blog_comments"> & {
  blog_posts?: {
    title: string;
    slug: string;
  };
};

export default function AdminComments() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved" | "spam">("pending");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    spam: 0
  });

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    filterComments();
  }, [activeTab, comments]);

  const checkUser = async () => {
    const isAdmin = await checkAdminAuth();
    if (!isAdmin) {
      router.push("/admin/login");
      return;
    }
    await loadComments();
  };

  const loadComments = async () => {
    try {
      setLoading(true);
      const data = await getAllComments();
      setComments(data);
      
      // Calculate stats
      const pending = data.filter(c => c.status === "pending").length;
      const approved = data.filter(c => c.status === "approved").length;
      const spam = data.filter(c => c.status === "spam").length;
      
      setStats({
        total: data.length,
        pending,
        approved,
        spam
      });
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterComments = () => {
    if (activeTab === "all") {
      setFilteredComments(comments);
    } else {
      setFilteredComments(comments.filter(c => c.status === activeTab));
    }
  };

  const handleApprove = async (commentId: string) => {
    try {
      await approveComment(commentId);
      await loadComments();
    } catch (error) {
      console.error("Error approving comment:", error);
    }
  };

  const handleMarkSpam = async (commentId: string) => {
    try {
      await approveComment(commentId, "spam");
      await loadComments();
    } catch (error) {
      console.error("Error marking as spam:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedComment) return;
    
    try {
      await deleteComment(selectedComment.id);
      await loadComments();
      setDeleteDialogOpen(false);
      setSelectedComment(null);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const openDeleteDialog = (comment: Comment) => {
    setSelectedComment(comment);
    setDeleteDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
          <CheckCircle className="w-3 h-3 mr-1" />
          Approved
        </Badge>;
      case "spam":
        return <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20">
          <XCircle className="w-3 h-3 mr-1" />
          Spam
        </Badge>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading comments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Comment Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Review and manage blog comments
              </p>
            </div>
            <Button onClick={() => router.push("/admin")} variant="outline">
              Back to Dashboard
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Comments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Pending Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">
                  {stats.pending}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Approved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {stats.approved}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Spam
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">
                  {stats.spam}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              All ({stats.total})
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Pending ({stats.pending})
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Approved ({stats.approved})
            </TabsTrigger>
            <TabsTrigger value="spam" className="flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              Spam ({stats.spam})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {filteredComments.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400">
                    No {activeTab !== "all" && activeTab} comments found
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredComments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          {/* Comment Info */}
                          <div className="flex-1 space-y-4">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-3 flex-wrap">
                                  <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-gray-500" />
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                      {comment.author_name}
                                    </span>
                                  </div>
                                  {getStatusBadge(comment.status || "pending")}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    {comment.author_email}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(comment.created_at || "")}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Blog Post Link */}
                            {comment.blog_posts && (
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-500">On post:</span>
                                <a
                                  href={`/blog/${comment.blog_posts.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                >
                                  {comment.blog_posts.title}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            )}

                            {/* Comment Content */}
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {comment.comment_text}
                              </p>
                            </div>

                            {/* Website URL (if provided) */}
                            {comment.author_website && (
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>Website:</span>
                                <a
                                  href={comment.author_website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  {comment.author_website}
                                </a>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex lg:flex-col gap-2 lg:w-40">
                            {comment.status === "pending" && (
                              <>
                                <Button
                                  onClick={() => handleApprove(comment.id)}
                                  className="flex-1 lg:w-full bg-green-600 hover:bg-green-700"
                                  size="sm"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Approve
                                </Button>
                                <Button
                                  onClick={() => handleMarkSpam(comment.id)}
                                  variant="outline"
                                  className="flex-1 lg:w-full border-red-500 text-red-600 hover:bg-red-50"
                                  size="sm"
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Spam
                                </Button>
                              </>
                            )}
                            
                            {comment.status === "spam" && (
                              <Button
                                onClick={() => handleApprove(comment.id)}
                                variant="outline"
                                className="flex-1 lg:w-full"
                                size="sm"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve
                              </Button>
                            )}

                            {comment.status === "approved" && (
                              <Button
                                onClick={() => handleMarkSpam(comment.id)}
                                variant="outline"
                                className="flex-1 lg:w-full border-red-500 text-red-600 hover:bg-red-50"
                                size="sm"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Mark Spam
                              </Button>
                            )}

                            <Button
                              onClick={() => openDeleteDialog(comment)}
                              variant="destructive"
                              className="flex-1 lg:w-full"
                              size="sm"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>

                            {comment.blog_posts && (
                              <Button
                                onClick={() => window.open(`/blog/${comment.blog_posts?.slug}`, "_blank")}
                                variant="outline"
                                className="flex-1 lg:w-full"
                                size="sm"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Post
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Comment?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this comment from <strong>{selectedComment?.author_name}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}