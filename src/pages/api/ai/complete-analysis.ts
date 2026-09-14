import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { projectId } = req.body;

    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    // Create Supabase client with service role key for admin operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Simulate AI analysis delay (5 seconds)
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Update project status to active
    const { error: updateError } = await supabase
      .from("ai_test_projects")
      .update({ status: "active" })
      .eq("id", projectId);

    if (updateError) {
      throw updateError;
    }

    return res.status(200).json({
      success: true,
      message: "Analysis completed successfully"
    });
  } catch (error: any) {
    console.error("Error completing analysis:", error);
    return res.status(500).json({ error: error.message || "Failed to complete analysis" });
  }
}