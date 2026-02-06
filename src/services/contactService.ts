import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type ContactSubmission = Database["public"]["Tables"]["contact_submissions"]["Row"];
type ContactSubmissionInsert = Database["public"]["Tables"]["contact_submissions"]["Insert"];
type ContactSubmissionUpdate = Database["public"]["Tables"]["contact_submissions"]["Update"];

export const contactService = {
  // Submit contact form with email notification
  async submitContactForm(formData: {
    name: string;
    email: string;
    phone?: string;
    service?: string;
    message: string;
  }) {
    try {
      // Save to database
      const { data: submission, error: dbError } = await supabase
        .from("contact_submissions")
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          subject: formData.service || "General Inquiry",
          message: formData.message,
          status: "new",
        })
        .select()
        .single();

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error("Failed to save contact submission");
      }

      // Send email notification
      try {
        const emailResponse = await fetch("/api/send-contact-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!emailResponse.ok) {
          console.error("Email sending failed:", await emailResponse.text());
          // Don't throw error - submission is already saved
        }
      } catch (emailError) {
        console.error("Email error:", emailError);
        // Continue - submission is saved even if email fails
      }

      return submission;
    } catch (error: any) {
      console.error("Contact form submission error:", error);
      throw error;
    }
  },

  // Get all contact submissions (Admin)
  async getAllSubmissions() {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching submissions:", error);
      throw error;
    }
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

  // Update submission status
  async updateSubmission(id: string, updates: ContactSubmissionUpdate) {
    const { data, error } = await supabase
      .from("contact_submissions")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
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
      .eq("status", "new")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Mark submission as read
  async markAsRead(id: string) {
    return this.updateSubmission(id, { status: "read" });
  },

  // Mark submission as replied
  async markAsReplied(id: string, notes?: string) {
    return this.updateSubmission(id, {
      status: "replied",
      notes: notes,
    });
  },
};