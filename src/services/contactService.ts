import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type ContactSubmission = Database["public"]["Tables"]["contact_submissions"]["Row"];
type ContactSubmissionInsert = Database["public"]["Tables"]["contact_submissions"]["Insert"];
type ContactSubmissionUpdate = Database["public"]["Tables"]["contact_submissions"]["Update"];

export const contactService = {
  // Get all contact submissions
  async getAllSubmissions() {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get submission by ID
  async getSubmissionById(id: string) {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create contact submission
  async createSubmission(submission: ContactSubmissionInsert) {
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert(submission)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update submission status
  async updateSubmission(id: string, updates: ContactSubmissionUpdate) {
    const { data, error } = await supabase
      .from("contact_submissions")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete submission
  async deleteSubmission(id: string) {
    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  // Get unread submissions
  async getUnreadSubmissions() {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .eq("status", "unread")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },
};