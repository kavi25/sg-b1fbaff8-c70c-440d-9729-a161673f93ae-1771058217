import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type BlogComment = Database["public"]["Tables"]["blog_comments"]["Row"];
type BlogCommentInsert = Database["public"]["Tables"]["blog_comments"]["Insert"];

export const commentService = {
  // Get all approved comments for a blog post
  async getCommentsByPostId(postId: string): Promise<BlogComment[]> {
    const { data, error } = await supabase
      .from("blog_comments")
      .select("*")
      .eq("post_id", postId)
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    console.log("getCommentsByPostId:", { data, error });
    if (error) throw error;
    return data || [];
  },

  // Create a new comment (will be pending by default)
  async createComment(comment: BlogCommentInsert): Promise<BlogComment> {
    const { data, error } = await supabase
      .from("blog_comments")
      .insert({
        ...comment,
        status: "pending"
      })
      .select()
      .single();

    console.log("createComment:", { data, error });
    if (error) throw error;
    return data;
  },

  // Get comment count for a post
  async getCommentCount(postId: string): Promise<number> {
    const { count, error } = await supabase
      .from("blog_comments")
      .select("*", { count: "exact", head: true })
      .eq("post_id", postId)
      .eq("status", "approved");

    console.log("getCommentCount:", { count, error });
    if (error) throw error;
    return count || 0;
  },

  // Admin: Get all comments (including pending)
  async getAllComments(): Promise<BlogComment[]> {
    const { data, error } = await supabase
      .from("blog_comments")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("getAllComments:", { data, error });
    if (error) throw error;
    return data || [];
  },

  // Admin: Update comment status
  async updateCommentStatus(commentId: string, status: "approved" | "spam" | "pending"): Promise<BlogComment> {
    const { data, error } = await supabase
      .from("blog_comments")
      .update({ status })
      .eq("id", commentId)
      .select()
      .single();

    console.log("updateCommentStatus:", { data, error });
    if (error) throw error;
    return data;
  },

  // Admin: Delete comment
  async deleteComment(commentId: string): Promise<void> {
    const { error } = await supabase
      .from("blog_comments")
      .delete()
      .eq("id", commentId);

    console.log("deleteComment:", { error });
    if (error) throw error;
  }
};