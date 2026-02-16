import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { action, prompt, content, category } = req.body;

  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_openai_api_key_here") {
    return res.status(500).json({ 
      error: "OpenAI API key not configured. Please add your API key to .env.local" 
    });
  }

  try {
    let systemPrompt = "";
    let userPrompt = "";

    switch (action) {
      case "generate_post":
        systemPrompt = "You are a professional blog writer for ITProBit, a software testing and development company. Write engaging, informative, and SEO-optimized blog posts.";
        userPrompt = `Write a comprehensive blog post about: ${prompt}\n\nCategory: ${category || "Technology"}\n\nInclude:\n- Engaging introduction\n- Well-structured sections with headings\n- Practical examples\n- Conclusion with key takeaways\n\nFormat the output in HTML with proper tags (<h2>, <h3>, <p>, <ul>, <li>, etc.)`;
        break;

      case "generate_title":
        systemPrompt = "You are a creative content strategist. Generate catchy, SEO-friendly blog post titles.";
        userPrompt = `Generate 5 engaging blog post titles about: ${prompt}\n\nMake them catchy, informative, and optimized for clicks. Return as a JSON array of strings.`;
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
        userPrompt = `Based on this blog post title and content:\n\nTitle: ${prompt}\nContent: ${content}\n\nGenerate:\n1. SEO meta description (150-160 characters)\n2. 5-7 relevant keywords (comma-separated)\n\nReturn as JSON: { "description": "...", "keywords": "..." }`;
        break;

      case "generate_tags":
        systemPrompt = "You are a content categorization expert.";
        userPrompt = `Based on this blog post content, suggest 5-7 relevant tags:\n\n${content}\n\nReturn as comma-separated tags (e.g., "automation, testing, selenium, QA, software")`;
        break;

      default:
        return res.status(400).json({ error: "Invalid action" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: action === "generate_post" ? 2000 : 500,
    });

    const result = completion.choices[0]?.message?.content || "";

    // Parse JSON responses if needed
    if (action === "generate_title" || action === "generate_seo") {
      try {
        const parsed = JSON.parse(result);
        return res.status(200).json({ result: parsed });
      } catch {
        return res.status(200).json({ result });
      }
    }

    res.status(200).json({ result });
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ 
      error: error.message || "Failed to generate content",
      details: error.response?.data || null
    });
  }
}