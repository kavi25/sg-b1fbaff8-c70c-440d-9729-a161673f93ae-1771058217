import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import {
  ArrowLeft,
  PlayCircle,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  FileBarChart,
  Calendar,
  Filter,
  Download,
  Eye,
  BarChart3,
  AlertCircle
} from "lucide-react";

interface Execution {
  id: string;
  project_id: string;
  execution_name: string;
  execution_type: string;
  status: string;
  browser: string;
  environment: string;
  total_tests: number;
  passed_tests: number;
  failed_tests: number;
  skipped_tests: number;
  execution_duration: number | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  ai_test_projects?: {
    name: string;
    application_type: string;
  };
}

interface ExecutionResult {
  id: string;
  execution_id: string;
  test_case_id: string;
  test_name: string;
  status: string;
  execution_time: number;
  error_message: string | null;
  stack_trace: string | null;
  logs: string | null;
  screenshots: any;
  ai_analysis: any;
  suggested_fixes: string | null;
  created_at: string;
  ai_test_cases?: {
    title: string;
    priority: string;
  };
}

export default function ExecutionsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [selectedExecution, setSelectedExecution] = useState<Execution | null>(null);
  const [executionResults, setExecutionResults] = useState<ExecutionResult[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/ai-test/login");
        return;
      }

      await loadExecutions();
    } catch (error) {
      console.error("Auth error:", error);
      router.push("/ai-test/login");
    }
  };

  const loadExecutions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("ai_test_executions")
        .select(`
          *,
          ai_test_projects!inner(name, application_type, user_id)
        `)
        .eq("ai_test_projects.user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setExecutions(data || []);
    } catch (error: any) {
      console.error("Error loading executions:", error);
      toast({
        title: "Error",
        description: "Failed to load execution history",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadExecutionResults = async (executionId: string) => {
    try {
      const { data, error } = await supabase
        .from("ai_test_results")
        .select(`
          *,
          ai_test_cases(title, priority)
        `)
        .eq("execution_id", executionId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      setExecutionResults(data || []);
    } catch (error: any) {
      console.error("Error loading results:", error);
      toast({
        title: "Error",
        description: "Failed to load execution results",
        variant: "destructive"
      });
    }
  };

  const handleViewExecution = async (execution: Execution) => {
    setSelectedExecution(execution);
    await loadExecutionResults(execution.id);
    setActiveTab("details");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "running":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "skipped":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
      case "completed":
        return <CheckCircle2 className="w-5 h-5" />;
      case "failed":
        return <XCircle className="w-5 h-5" />;
      case "running":
        return <PlayCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const calculateSuccessRate = () => {
    if (executions.length === 0) return 0;
    const completed = executions.filter(e => e.status === "completed");
    const successful = completed.filter(e => e.failed_tests === 0);
    return Math.round((successful.length / completed.length) * 100) || 0;
  };

  const getTotalTestsRun = () => {
    return executions.reduce((sum, e) => sum + e.total_tests, 0);
  };

  const getAverageDuration = () => {
    const completed = executions.filter(e => e.execution_duration !== null);
    if (completed.length === 0) return 0;
    const total = completed.reduce((sum, e) => sum + (e.execution_duration || 0), 0);
    return Math.round(total / completed.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading execution history...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Test Execution History - AI Test Engineer"
        description="View and track your test execution history, results, and performance metrics"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/ai-test/dashboard">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Test Execution History
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Track and analyze your test runs
                  </p>
                </div>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="all">All Executions</TabsTrigger>
              <TabsTrigger value="details">Execution Details</TabsTrigger>
            </TabsList>

            {/* All Executions Tab */}
            <TabsContent value="all" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total Executions</p>
                          <p className="text-3xl font-bold mt-1">{executions.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                          <PlayCircle className="w-6 h-6 text-purple-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Tests Run</p>
                          <p className="text-3xl font-bold mt-1">{getTotalTestsRun()}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                          <p className="text-3xl font-bold mt-1">{calculateSuccessRate()}%</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Avg Duration</p>
                          <p className="text-3xl font-bold mt-1">{getAverageDuration()}s</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                          <Clock className="w-6 h-6 text-orange-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Executions List */}
              {executions.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <FileBarChart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Executions Yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Start running tests to see execution history
                    </p>
                    <Link href="/ai-test/dashboard">
                      <Button>Go to Dashboard</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {executions.map((execution, idx) => (
                    <motion.div
                      key={execution.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => handleViewExecution(execution)}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold">
                                  {execution.ai_test_projects?.name || "Unknown Project"}
                                </h3>
                                <Badge variant="outline">
                                  {execution.ai_test_projects?.application_type || "web"}
                                </Badge>
                                <Badge className={getStatusColor(execution.status)}>
                                  {execution.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(execution.created_at).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {execution.execution_duration ? `${execution.execution_duration}s` : "In progress"}
                                </span>
                                <span>Environment: {execution.environment}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-8 ml-6">
                              <div className="text-center">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                  {execution.total_tests}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Total</p>
                              </div>
                              <div className="text-center">
                                <p className="text-2xl font-bold text-green-600">
                                  {execution.passed_tests}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Passed</p>
                              </div>
                              <div className="text-center">
                                <p className="text-2xl font-bold text-red-600">
                                  {execution.failed_tests}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Failed</p>
                              </div>
                              <div className="text-center">
                                <p className="text-2xl font-bold text-yellow-600">
                                  {execution.skipped_tests}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Skipped</p>
                              </div>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Execution Details Tab */}
            <TabsContent value="details" className="space-y-6">
              {selectedExecution ? (
                <>
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl">
                            {selectedExecution.ai_test_projects?.name || "Execution Details"}
                          </CardTitle>
                          <CardDescription className="text-base mt-2">
                            Executed on {new Date(selectedExecution.created_at).toLocaleString()}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(selectedExecution.status)} variant="outline">
                          {getStatusIcon(selectedExecution.status)}
                          <span className="ml-2">{selectedExecution.status}</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Execution Summary */}
                      <div className="grid md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total Tests</p>
                          <p className="text-2xl font-bold">{selectedExecution.total_tests}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Passed</p>
                          <p className="text-2xl font-bold text-green-600">{selectedExecution.passed_tests}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Failed</p>
                          <p className="text-2xl font-bold text-red-600">{selectedExecution.failed_tests}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                          <p className="text-2xl font-bold">{selectedExecution.execution_duration || 0}s</p>
                        </div>
                      </div>

                      {/* Individual Test Results */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Test Case Results</h3>
                        {executionResults.length === 0 ? (
                          <p className="text-gray-600 dark:text-gray-400">No test results available</p>
                        ) : (
                          <div className="space-y-3">
                            {executionResults.map((result) => (
                              <Card key={result.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-3 mb-2">
                                        <h4 className="font-semibold">
                                          {result.ai_test_cases?.title || "Unknown Test"}
                                        </h4>
                                        <Badge variant="outline" className={
                                          result.ai_test_cases?.priority === "critical" ? "border-red-500 text-red-700" :
                                          result.ai_test_cases?.priority === "high" ? "border-orange-500 text-orange-700" :
                                          "border-gray-500 text-gray-700"
                                        }>
                                          {result.ai_test_cases?.priority || "medium"}
                                        </Badge>
                                        <Badge className={getStatusColor(result.status)}>
                                          {getStatusIcon(result.status)}
                                          <span className="ml-1">{result.status}</span>
                                        </Badge>
                                      </div>
                                      {result.error_message && (
                                        <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                                          <div className="flex items-start gap-2">
                                            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-red-800 dark:text-red-300">{result.error_message}</p>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    <div className="text-right ml-6">
                                      <p className="text-sm text-gray-600 dark:text-gray-400">Execution Time</p>
                                      <p className="text-lg font-semibold">{result.execution_time}ms</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <FileBarChart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Execution Selected</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Select an execution from the list to view details
                    </p>
                    <Button onClick={() => setActiveTab("all")} variant="outline">
                      View All Executions
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}