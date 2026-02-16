import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Sparkles, 
  Wand2, 
  FileText, 
  Search, 
  Tags, 
  Lightbulb,
  Copy,
  Check
} from "lucide-react";

interface AIWritingAssistantProps {
  onContentGenerated: (content: string) => void;
  onTitleGenerated: (title: string) => void;
  onExcerptGenerated: (excerpt: string) => void;
  onTagsGenerated: (tags: string) => void;
  currentContent: string;
  currentTitle: string;
  category: string;
}

export function AIWritingAssistant({
  onContentGenerated,
  onTitleGenerated,
  onExcerptGenerated,
  onTagsGenerated,
  currentContent,
  currentTitle,
  category
}: AIWritingAssistantProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const callAI = async (action: string, data: any) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/ai/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...data }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to generate content");
      }

      return result.result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePost = async () => {
    if (!prompt.trim()) {
      setError("Please enter a topic or idea");
      return;
    }

    try {
      const content = await callAI("generate_post", { prompt, category });
      onContentGenerated(content);
      setSuccess("Blog post generated successfully!");
      setPrompt("");
    } catch (err) {
      // Error already set in callAI
    }
  };

  const handleGenerateTitles = async () => {
    if (!prompt.trim()) {
      setError("Please enter a topic");
      return;
    }

    try {
      const titles = await callAI("generate_title", { prompt });
      const titleArray = Array.isArray(titles) ? titles : [titles];
      setGeneratedTitles(titleArray);
      setSuccess("Titles generated! Click to use.");
    } catch (err) {
      // Error already set in callAI
    }
  };

  const handleGenerateExcerpt = async () => {
    if (!currentContent.trim()) {
      setError("Please write some content first");
      return;
    }

    try {
      const excerpt = await callAI("generate_excerpt", { content: currentContent });
      onExcerptGenerated(excerpt);
      setSuccess("Excerpt generated successfully!");
    } catch (err) {
      // Error already set in callAI
    }
  };

  const handleExpandContent = async () => {
    if (!prompt.trim()) {
      setError("Please enter a brief idea to expand");
      return;
    }

    try {
      const expanded = await callAI("expand_content", { content: prompt });
      onContentGenerated(currentContent + "\n\n" + expanded);
      setSuccess("Content expanded successfully!");
      setPrompt("");
    } catch (err) {
      // Error already set in callAI
    }
  };

  const handleImproveContent = async () => {
    if (!currentContent.trim()) {
      setError("Please write some content first");
      return;
    }

    try {
      const improved = await callAI("improve_content", { content: currentContent });
      onContentGenerated(improved);
      setSuccess("Content improved successfully!");
    } catch (err) {
      // Error already set in callAI
    }
  };

  const handleGenerateSEO = async () => {
    if (!currentTitle.trim() || !currentContent.trim()) {
      setError("Please add a title and some content first");
      return;
    }

    try {
      const seo = await callAI("generate_seo", { prompt: currentTitle, content: currentContent });
      if (typeof seo === "object") {
        onExcerptGenerated(seo.description);
        onTagsGenerated(seo.keywords);
      }
      setSuccess("SEO suggestions generated!");
    } catch (err) {
      // Error already set in callAI
    }
  };

  const handleGenerateTags = async () => {
    if (!currentContent.trim()) {
      setError("Please write some content first");
      return;
    }

    try {
      const tags = await callAI("generate_tags", { content: currentContent });
      onTagsGenerated(tags);
      setSuccess("Tags generated successfully!");
    } catch (err) {
      // Error already set in callAI
    }
  };

  const copyTitle = (title: string, index: number) => {
    onTitleGenerated(title);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          AI Writing Assistant
        </CardTitle>
        <CardDescription>
          Use AI to generate, improve, and optimize your blog content
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 border-green-500 text-green-700">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="generate">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="improve">Improve</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="titles">Titles</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-4">
            <div className="space-y-2">
              <Label>Generate Full Blog Post</Label>
              <Textarea
                placeholder="Enter your blog topic or idea (e.g., 'Benefits of automated testing in agile development')"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
              />
              <Button 
                onClick={handleGeneratePost} 
                disabled={loading}
                className="w-full"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                {loading ? "Generating..." : "Generate Complete Blog Post"}
              </Button>
            </div>

            <div className="border-t pt-4 space-y-2">
              <Label>Expand Brief Ideas</Label>
              <Textarea
                placeholder="Enter a brief idea to expand into a full paragraph"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={2}
              />
              <Button 
                onClick={handleExpandContent} 
                disabled={loading}
                variant="outline"
                className="w-full"
              >
                <FileText className="w-4 h-4 mr-2" />
                {loading ? "Expanding..." : "Expand into Full Paragraph"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="improve" className="space-y-4">
            <div className="space-y-2">
              <Label>Improve Current Content</Label>
              <p className="text-sm text-gray-500">
                AI will improve grammar, style, and readability of your current content
              </p>
              <Button 
                onClick={handleImproveContent} 
                disabled={loading || !currentContent.trim()}
                className="w-full"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                {loading ? "Improving..." : "Improve Content"}
              </Button>
            </div>

            <div className="border-t pt-4 space-y-2">
              <Label>Generate Excerpt/Summary</Label>
              <p className="text-sm text-gray-500">
                Create a compelling 2-3 sentence summary from your content
              </p>
              <Button 
                onClick={handleGenerateExcerpt} 
                disabled={loading || !currentContent.trim()}
                variant="outline"
                className="w-full"
              >
                <FileText className="w-4 h-4 mr-2" />
                {loading ? "Generating..." : "Generate Excerpt"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="seo" className="space-y-4">
            <div className="space-y-2">
              <Label>Generate SEO Suggestions</Label>
              <p className="text-sm text-gray-500">
                AI will analyze your content and suggest meta descriptions and keywords
              </p>
              <Button 
                onClick={handleGenerateSEO} 
                disabled={loading || !currentContent.trim() || !currentTitle.trim()}
                className="w-full"
              >
                <Search className="w-4 h-4 mr-2" />
                {loading ? "Analyzing..." : "Generate SEO Suggestions"}
              </Button>
            </div>

            <div className="border-t pt-4 space-y-2">
              <Label>Generate Tags</Label>
              <p className="text-sm text-gray-500">
                Automatically suggest relevant tags based on your content
              </p>
              <Button 
                onClick={handleGenerateTags} 
                disabled={loading || !currentContent.trim()}
                variant="outline"
                className="w-full"
              >
                <Tags className="w-4 h-4 mr-2" />
                {loading ? "Generating..." : "Generate Tags"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="titles" className="space-y-4">
            <div className="space-y-2">
              <Label>Generate Title Ideas</Label>
              <Input
                placeholder="Enter your blog topic"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button 
                onClick={handleGenerateTitles} 
                disabled={loading}
                className="w-full"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {loading ? "Generating..." : "Generate 5 Title Ideas"}
              </Button>
            </div>

            {generatedTitles.length > 0 && (
              <div className="space-y-2 border-t pt-4">
                <Label>Generated Titles (Click to Use)</Label>
                <div className="space-y-2">
                  {generatedTitles.map((title, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 p-3 rounded-lg border hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors cursor-pointer"
                      onClick={() => copyTitle(title, index)}
                    >
                      <div className="flex-1 text-sm">{title}</div>
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}