import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { action, prompt, content, category } = req.body;

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_gemini_api_key_here") {
    return res.status(500).json({ 
      error: "Gemini API key not configured. Please add your API key to .env.local" 
    });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let systemPrompt = "";
    let userPrompt = "";

    switch (action) {
      case "generate_post":
        systemPrompt = "You are a professional blog writer for ITProBit, a software testing and development company. Write engaging, informative, and SEO-optimized blog posts.";
        userPrompt = `Write a comprehensive blog post about: ${prompt}\n\nCategory: ${category || "Technology"}\n\nInclude:\n- Engaging introduction\n- Well-structured sections with headings\n- Practical examples\n- Conclusion with key takeaways\n\nFormat the output in HTML with proper tags (<h2>, <h3>, <p>, <ul>, <li>, etc.)`;
        break;

      case "generate_title":
        systemPrompt = "You are a creative content strategist. Generate catchy, SEO-friendly blog post titles.";
        userPrompt = `Generate 5 engaging blog post titles about: ${prompt}\n\nMake them catchy, informative, and optimized for clicks. Return as a JSON array of strings only, no additional text.`;
        break;

      case "generate_excerpt":
        systemPrompt = "You are an expert at writing compelling blog post summaries.";
        userPrompt = `Write a compelling 2-3 sentence excerpt/summary for this blog post:\n\n${content}\n\nMake it engaging and make people want to read more.`;
        break;

      case "expand_content":
        systemPrompt = "You are a professional content writer. Expand brief ideas into detailed, engaging paragraphs.";
        userPrompt = `Expand this brief idea into a detailed, well-written paragraph (3-5 sentences):\n\n${content}\n\nMake it informative, engaging, and professional.`;
        break;

      case "improve_content":
        systemPrompt = "You are an expert editor. Improve grammar, style, and readability while maintaining the original meaning.";
        userPrompt = `Improve this text for grammar, style, and readability:\n\n${content}\n\nReturn the improved version only.`;
        break;

      case "generate_seo":
        systemPrompt = "You are an SEO expert. Generate optimized meta descriptions and keywords.";
        userPrompt = `Based on this blog post title and content:\n\nTitle: ${prompt}\nContent: ${content}\n\nGenerate:\n1. SEO meta description (150-160 characters)\n2. 5-7 relevant keywords (comma-separated)\n\nReturn as JSON only: { "description": "...", "keywords": "..." }`;
        break;

      case "generate_tags":
        systemPrompt = "You are a content categorization expert.";
        userPrompt = `Based on this blog post content, suggest 5-7 relevant tags:\n\n${content}\n\nReturn as comma-separated tags only (e.g., "automation, testing, selenium, QA, software")`;
        break;

      default:
        return res.status(400).json({ error: "Invalid action" });
    }

    // Combine system and user prompts for Gemini
    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const generatedText = response.text();

    // Parse JSON responses if needed
    if (action === "generate_title" || action === "generate_seo") {
      try {
        // Extract JSON from markdown code blocks if present
        let jsonText = generatedText.trim();
        if (jsonText.startsWith("```json")) {
          jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
        } else if (jsonText.startsWith("```")) {
          jsonText = jsonText.replace(/```\n?/g, "");
        }
        
        const parsed = JSON.parse(jsonText);
        return res.status(200).json({ result: parsed });
      } catch {
        return res.status(200).json({ result: generatedText });
      }
    }

    res.status(200).json({ result: generatedText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: error.message || "Failed to generate content",
      details: error.response?.data || null
    });
  }
}