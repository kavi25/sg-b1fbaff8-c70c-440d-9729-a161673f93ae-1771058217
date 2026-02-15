import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
type BlogPostInsert = Database["public"]["Tables"]["blog_posts"]["Insert"];
type BlogPostUpdate = Database["public"]["Tables"]["blog_posts"]["Update"];

// Extended type with author profile data
export type BlogPostWithAuthor = BlogPost & {
  profiles?: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
};

export const blogService = {
  // Get all blog posts with author data
  async getAllPosts(): Promise<BlogPostWithAuthor[]> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        profiles!blog_posts_author_id_fkey(full_name, avatar_url)
      `)
      .order("created_at", { ascending: false });

    console.log("getAllPosts:", { data, error });
    if (error) throw error;
    return data || [];
  },

  // Get published blog posts with author data
  async getPublishedPosts(): Promise<BlogPostWithAuthor[]> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        profiles!blog_posts_author_id_fkey(full_name, avatar_url)
      `)
      .eq("published", true)
      .order("created_at", { ascending: false });

    console.log("getPublishedPosts:", { data, error });
    if (error) throw error;
    return data || [];
  },

  // Get blog post by slug with author data
  async getPostBySlug(slug: string): Promise<BlogPostWithAuthor | null> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        profiles!blog_posts_author_id_fkey(full_name, avatar_url)
      `)
      .eq("slug", slug)
      .single();

    console.log("getPostBySlug:", { data, error });
    if (error) throw error;
    return data;
  },

  // Get blog post by ID with author data
  async getPostById(id: string): Promise<BlogPostWithAuthor | null> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        profiles!blog_posts_author_id_fkey(full_name, avatar_url)
      `)
      .eq("id", id)
      .single();

    console.log("getPostById:", { data, error });
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

    console.log("createPost:", { data, error });
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

    console.log("updatePost:", { data, error });
    if (error) throw error;
    return data;
  },

  // Delete blog post
  async deletePost(id: string) {
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);

    console.log("deletePost:", { error });
    if (error) throw error;
  },

  // Get posts by category with author data
  async getPostsByCategory(category: string): Promise<BlogPostWithAuthor[]> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        profiles!blog_posts_author_id_fkey(full_name, avatar_url)
      `)
      .eq("published", true)
      .eq("category", category)
      .order("created_at", { ascending: false });

    console.log("getPostsByCategory:", { data, error });
    if (error) throw error;
    return data || [];
  },

  // Search posts with author data
  async searchPosts(query: string): Promise<BlogPostWithAuthor[]> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        profiles!blog_posts_author_id_fkey(full_name, avatar_url)
      `)
      .eq("published", true)
      .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
      .order("created_at", { ascending: false });

    console.log("searchPosts:", { data, error });
    if (error) throw error;
    return data || [];
  },
};