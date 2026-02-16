import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Code, Copy, Check } from "lucide-react";

interface CodeEditorProps {
  onInsert: (code: string) => void;
}

export function CodeEditor({ onInsert }: CodeEditorProps) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [title, setTitle] = useState("");
  const [copied, setCopied] = useState(false);

  const languages = [
    "javascript",
    "typescript",
    "python",
    "java",
    "html",
    "css",
    "sql",
    "bash",
    "json",
    "yaml",
    "markdown",
  ];

  const handleInsert = () => {
    const codeBlock = `
${title ? `<h4>${title}</h4>` : ""}
<pre><code class="language-${language}">${code}</code></pre>
    `.trim();
    
    onInsert(codeBlock);
    setCode("");
    setTitle("");
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-semibold flex items-center gap-2">
            <Code className="w-5 h-5" />
            Code Block Editor
          </Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={copyCode}
            disabled={!code}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Code Title (Optional)</Label>
            <Input
              placeholder="e.g., Example Component"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Programming Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Code</Label>
          <Textarea
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={12}
            className="font-mono text-sm"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setCode("");
              setTitle("");
            }}
          >
            Clear
          </Button>
          <Button
            type="button"
            onClick={handleInsert}
            disabled={!code}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Insert Code Block
          </Button>
        </div>

        {code && (
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto">
              {title && <h4 className="text-white font-semibold mb-2">{title}</h4>}
              <pre className="text-sm">
                <code className={`language-${language}`}>{code}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}