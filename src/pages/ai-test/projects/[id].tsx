import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  Upload,
  Globe,
  Sparkles,
  FileCode,
  PlayCircle,
  BarChart3,
  Settings,
  Brain,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description: string | null;
  application_type: string;
  status: string;
  created_at: string;
  user_id: string;
}

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [applicationUrl, setApplicationUrl] = useState("");
  const [uploadingApp, setUploadingApp] = useState(false);

  useEffect(() => {
    if (id) {
      loadProject();
    }
  }, [id]);

  const loadProject = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/ai-test/login");
        return;
      }

      const { data, error } = await supabase
        .from("ai_test_projects")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      if (error) throw error;

      setProject(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load project",
        variant: "destructive"
      });
      router.push("/ai-test/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadApplication = async () => {
    if (!applicationUrl.trim()) {
      toast({
        title: "Missing URL",
        description: "Please enter the application URL",
        variant: "destructive"
      });
      return;
    }

    setUploadingApp(true);

    try {
      // Update project status to analyzing
      const { error } = await supabase
        .from("ai_test_projects")
        .update({ status: "analyzing" })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Analysis Started!",
        description: "AI is analyzing your application. This may take a few minutes."
      });

      // Reload project
      await loadProject();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to start analysis",
        variant: "destructive"
      });
    } finally {
      setUploadingApp(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-purple-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  const getStatusIcon = () => {
    switch (project.status) {
      case "setup":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "analyzing":
        return <Brain className="w-5 h-5 text-blue-600 animate-pulse" />;
      case "active":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (project.status) {
      case "setup":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "analyzing":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "active":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <>
      <SEO
        title={`${project.name} - AI Test Engineer`}
        description={`Manage testing for ${project.name}`}
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
          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {project.description || "No description provided"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="capitalize">
                  {project.application_type}
                </Badge>
                <Badge className={`capitalize ${getStatusColor()} flex items-center gap-2`}>
                  {getStatusIcon()}
                  {project.status}
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tests" disabled={project.status === "setup"}>Test Cases</TabsTrigger>
              <TabsTrigger value="automation" disabled={project.status === "setup"}>Automation</TabsTrigger>
              <TabsTrigger value="executions" disabled={project.status === "setup"}>Executions</TabsTrigger>
              <TabsTrigger value="reports" disabled={project.status === "setup"}>Reports</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {project.status === "setup" && (
                <Card className="border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                        <Upload className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle>Upload Your Application</CardTitle>
                        <CardDescription>
                          Provide your application details to begin AI analysis
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {project.application_type === "web" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="url">Application URL *</Label>
                          <div className="flex gap-3">
                            <div className="relative flex-grow">
                              <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                              <Input
                                id="url"
                                type="url"
                                placeholder="https://your-app.com"
                                className="pl-10"
                                value={applicationUrl}
                                onChange={(e) => setApplicationUrl(e.target.value)}
                              />
                            </div>
                            <Button
                              onClick={handleUploadApplication}
                              disabled={uploadingApp || !applicationUrl.trim()}
                              className="bg-gradient-to-r from-purple-600 to-blue-600"
                            >
                              {uploadingApp ? "Starting..." : "Analyze"}
                            </Button>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Enter the URL of your web application. AI will automatically discover pages and user flows.
                          </p>
                        </div>
                      </div>
                    )}

                    {project.application_type === "mobile" && (
                      <div className="text-center py-8">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">Upload Mobile App</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Upload your APK (Android) or IPA (iOS) file
                        </p>
                        <Button disabled className="bg-gradient-to-r from-purple-600 to-blue-600">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload App File
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">Coming soon</p>
                      </div>
                    )}

                    {project.application_type === "api" && (
                      <div className="text-center py-8">
                        <FileCode className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">API Documentation</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Upload OpenAPI/Swagger specification
                        </p>
                        <Button disabled className="bg-gradient-to-r from-purple-600 to-blue-600">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload API Spec
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">Coming soon</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {project.status === "analyzing" && (
                <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10">
                  <CardContent className="pt-6">
                    <div className="text-center py-12">
                      <Brain className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-pulse" />
                      <h3 className="text-lg font-semibold mb-2">AI Analysis in Progress</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Our AI is analyzing your application structure, identifying pages, controls, and user journeys...
                      </p>
                      <div className="max-w-md mx-auto">
                        <div className="space-y-3 text-left">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span className="text-sm">Application loaded</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                            <span className="text-sm">Discovering pages and components...</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-500">Identifying user journeys</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-500">Generating test scenarios</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {project.status === "active" && (
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileCode className="w-5 h-5 text-purple-600" />
                        Test Cases
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">0</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        AI-generated test cases
                      </p>
                      <Button className="w-full mt-4" variant="outline" size="sm" disabled>
                        View Tests
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PlayCircle className="w-5 h-5 text-blue-600" />
                        Executions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">0</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Test runs completed
                      </p>
                      <Button className="w-full mt-4" variant="outline" size="sm" disabled>
                        Run Tests
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-green-600" />
                        Reports
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">0</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Test reports generated
                      </p>
                      <Button className="w-full mt-4" variant="outline" size="sm" disabled>
                        View Reports
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            {/* Other tabs - Coming soon */}
            <TabsContent value="tests">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <FileCode className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Test Cases</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      View and manage AI-generated test cases
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="automation">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Automation Scripts</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Generate and manage automation scripts
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="executions">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <PlayCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Test Executions</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      View test execution history and results
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Test Reports</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Generate and download professional test reports
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}