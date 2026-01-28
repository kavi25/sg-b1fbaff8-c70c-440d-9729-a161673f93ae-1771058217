import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
type BlogPostInsert = Database["public"]["Tables"]["blog_posts"]["Insert"];
type BlogPostUpdate = Database["public"]["Tables"]["blog_posts"]["Update"];

export const blogService = {
  // Get all blog posts
  async getAllPosts() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get published blog posts
  async getPublishedPosts() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get blog post by slug
  async getPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data;
  },

  // Get blog post by ID
  async getPostById(id: string) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create blog post
  async createPost(post: BlogPostInsert) {
    const { data, error } = await supabase
      .from("blog_posts")
      .insert(post)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update blog post
  async updatePost(id: string, updates: BlogPostUpdate) {
    const { data, error } = await supabase
      .from("blog_posts")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete blog post
  async deletePost(id: string) {
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  // Get posts by category
  async getPostsByCategory(category: string) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Search posts
  async searchPosts(query: string) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },
};