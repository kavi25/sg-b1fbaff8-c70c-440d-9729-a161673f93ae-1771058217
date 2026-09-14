import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  FolderKanban,
  Plus,
  Sparkles,
  BarChart3,
  FileCode,
  PlayCircle,
  CheckCircle2,
  XCircle,
  Clock,
  LogOut,
  Settings,
  User
} from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description: string | null;
  application_type: string;
  application_url: string | null;
  status: string;
  created_at: string;
}

interface Stats {
  totalProjects: number;
  activeProjects: number;
  totalTests: number;
  passedTests: number;
}

export default function AITestDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    activeProjects: 0,
    totalTests: 0,
    passedTests: 0
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        router.push("/ai-test/login");
        return;
      }

      setUser(user);
      await loadProjects(user.id);
    } catch (error) {
      router.push("/ai-test/login");
    } finally {
      setLoading(false);
    }
  };

  const loadProjects = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("ai_test_projects")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;

      setProjects(data || []);
      
      setStats({
        totalProjects: data?.length || 0,
        activeProjects: data?.filter(p => p.status === "active").length || 0,
        totalTests: 0,
        passedTests: 0
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/ai-test/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-purple-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Dashboard - AI Test Engineer"
        description="Manage your AI-powered testing projects and view test results."
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

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.user_metadata?.full_name || "Test Engineer"}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your testing projects and view insights
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Projects
                    </CardTitle>
                    <FolderKanban className="w-4 h-4 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalProjects}</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Active Projects
                    </CardTitle>
                    <PlayCircle className="w-4 h-4 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.activeProjects}</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Tests
                    </CardTitle>
                    <FileCode className="w-4 h-4 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalTests}</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Pass Rate
                    </CardTitle>
                    <BarChart3 className="w-4 h-4 text-orange-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {stats.totalTests > 0 ? Math.round((stats.passedTests / stats.totalTests) * 100) : 0}%
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Projects Section */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Projects</CardTitle>
                      <CardDescription>Your latest testing projects</CardDescription>
                    </div>
                    <Link href="/ai-test/projects/new">
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                        <Plus className="w-4 h-4 mr-2" />
                        New Project
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {projects.length === 0 ? (
                    <div className="text-center py-12">
                      <FolderKanban className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Create your first project to start testing
                      </p>
                      <Link href="/ai-test/projects/new">
                        <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                          <Plus className="w-4 h-4 mr-2" />
                          Create Project
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <Link key={project.id} href={`/ai-test/projects/${project.id}`}>
                          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="pt-6">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-grow">
                                  <h3 className="font-semibold text-lg mb-1">{project.name}</h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    {project.description || "No description"}
                                  </p>
                                  <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <Badge variant="outline" className="capitalize">
                                      {project.application_type}
                                    </Badge>
                                    <span>
                                      {new Date(project.created_at).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                                <Badge
                                  variant={project.status === "active" ? "default" : "secondary"}
                                  className="capitalize"
                                >
                                  {project.status}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/ai-test/projects/new">
                    <Button className="w-full justify-start" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Project
                    </Button>
                  </Link>
                  <Button className="w-full justify-start" variant="outline" disabled>
                    <FileCode className="w-4 h-4 mr-2" />
                    View All Tests
                  </Button>
                  <Button className="w-full justify-start" variant="outline" disabled>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Reports
                  </Button>
                  <Button className="w-full justify-start" variant="outline" disabled>
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>Learn the basics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Create a project</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Set up your first testing project
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Upload application</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Provide URL or upload APK/IPA
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Generate tests</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Let AI create test cases for you
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Run tests</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Execute and view results
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}