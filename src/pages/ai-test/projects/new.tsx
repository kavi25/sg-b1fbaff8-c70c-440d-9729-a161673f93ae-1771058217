import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Smartphone,
  Code2,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const applicationTypes = [
    {
      id: "web",
      title: "Web Application",
      description: "Test web apps, SPAs, and responsive websites",
      icon: Globe,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      frameworks: ["Selenium", "Playwright", "Cypress"]
    },
    {
      id: "mobile",
      title: "Mobile Application",
      description: "Test Android and iOS native & hybrid apps",
      icon: Smartphone,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      frameworks: ["Appium", "Espresso", "XCUITest"]
    },
    {
      id: "api",
      title: "API Testing",
      description: "Test REST APIs, GraphQL, and microservices",
      icon: Code2,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      frameworks: ["REST Assured", "Postman", "Supertest"],
      badge: "Coming Soon"
    }
  ];

  const handleCreateProject = async () => {
    if (!formData.name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a project name",
        variant: "destructive"
      });
      return;
    }

    if (!selectedType) {
      toast({
        title: "Missing Information",
        description: "Please select an application type",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/ai-test/login");
        return;
      }

      const { data, error } = await supabase
        .from("ai_test_projects")
        .insert({
          user_id: user.id,
          name: formData.name.trim(),
          description: formData.description.trim() || null,
          application_type: selectedType,
          status: "setup"
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Project Created!",
        description: "Your testing project has been created successfully."
      });

      router.push(`/ai-test/projects/${data.id}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create project. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Create New Project - AI Test Engineer"
        description="Create a new AI-powered testing project"
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/ai-test/dashboard" className="flex items-center gap-2 text-xl font-bold text-purple-600">
                <Sparkles className="w-6 h-6" />
                AI Test Engineer
              </Link>

              <Link href="/ai-test/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Create New Project</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Set up a new AI-powered testing project
              </p>
            </div>

            {/* Project Details */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>
                  Basic information about your testing project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., E-Commerce Web Application Testing"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you'll be testing..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Application Type Selection */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Application Type *</CardTitle>
                <CardDescription>
                  Select the type of application you want to test
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {applicationTypes.map((type) => (
                    <motion.div
                      key={type.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        onClick={() => !type.badge && setSelectedType(type.id)}
                        disabled={!!type.badge}
                        className={`
                          relative w-full p-6 rounded-lg border-2 text-left transition-all
                          ${selectedType === type.id
                            ? "border-purple-600 bg-purple-50 dark:bg-purple-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-purple-300"
                          }
                          ${type.badge ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                        `}
                      >
                        {type.badge && (
                          <Badge className="absolute top-4 right-4 bg-orange-500 text-white text-xs">
                            {type.badge}
                          </Badge>
                        )}
                        
                        <div className={`w-12 h-12 rounded-lg ${type.bgColor} flex items-center justify-center mb-4`}>
                          <type.icon className={`w-6 h-6 ${type.color}`} />
                        </div>

                        <h3 className="font-bold text-lg mb-2">{type.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {type.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {type.frameworks.map((framework, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {framework}
                            </Badge>
                          ))}
                        </div>

                        {selectedType === type.id && (
                          <div className="absolute top-4 right-4">
                            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <Link href="/ai-test/dashboard">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </Link>

              <Button
                onClick={handleCreateProject}
                disabled={loading || !formData.name.trim() || !selectedType}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {loading ? "Creating..." : "Create Project"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}