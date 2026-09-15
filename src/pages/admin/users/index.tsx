import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Users,
  Search,
  Mail,
  Calendar,
  Activity,
  FolderKanban,
  TestTube,
  Clock,
  ArrowLeft,
  Loader2,
  User
} from "lucide-react";
import Link from "next/link";

interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
  updated_at: string;
  projects?: number;
  testCases?: number;
  executions?: number;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/admin/login");
        return;
      }

      // Check if user is admin
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!profile || profile.role !== "admin") {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page",
          variant: "destructive"
        });
        router.push("/admin");
        return;
      }

      setIsAdmin(true);
      loadUsers();
    } catch (error) {
      console.error("Error checking admin access:", error);
      router.push("/admin/login");
    }
  };

  const loadUsers = async () => {
    try {
      setLoading(true);

      // Get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      // Get user statistics
      const usersWithStats = await Promise.all(
        (profiles || []).map(async (profile) => {
          // Count projects
          const { count: projectCount } = await supabase
            .from("ai_test_projects")
            .select("*", { count: "exact", head: true })
            .eq("user_id", profile.id);

          // Count test cases
          const { count: testCaseCount } = await supabase
            .from("ai_test_cases")
            .select("*", { count: "exact", head: true })
            .eq("project_id", profile.id);

          // Count executions
          const { count: executionCount } = await supabase
            .from("ai_test_executions")
            .select("*", { count: "exact", head: true })
            .eq("project_id", profile.id);

          return {
            ...profile,
            projects: projectCount || 0,
            testCases: testCaseCount || 0,
            executions: executionCount || 0
          };
        })
      );

      setUsers(usersWithStats);
      setFilteredUsers(usersWithStats);
    } catch (error: any) {
      console.error("Error loading users:", error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = users.filter(
        (user) =>
          user.email?.toLowerCase().includes(query) ||
          user.full_name?.toLowerCase().includes(query) ||
          user.id.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const getTotalStats = () => {
    return {
      totalUsers: users.length,
      totalProjects: users.reduce((sum, user) => sum + (user.projects || 0), 0),
      totalTestCases: users.reduce((sum, user) => sum + (user.testCases || 0), 0),
      totalExecutions: users.reduce((sum, user) => sum + (user.executions || 0), 0)
    };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading users...</p>
        </div>
      </div>
    );
  }

  const stats = getTotalStats();

  return (
    <>
      <SEO
        title="User Management - Admin Dashboard"
        description="Manage user accounts and view user statistics"
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold">User Management</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              View and manage all registered users
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-4 gap-6 mb-8"
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-purple-600" />
                  <div className="text-3xl font-bold">{stats.totalUsers}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <FolderKanban className="w-8 h-8 text-blue-600" />
                  <div className="text-3xl font-bold">{stats.totalProjects}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Test Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <TestTube className="w-8 h-8 text-green-600" />
                  <div className="text-3xl font-bold">{stats.totalTestCases}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Executions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Activity className="w-8 h-8 text-orange-600" />
                  <div className="text-3xl font-bold">{stats.totalExecutions}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Card>
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search users by email, name, or ID..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Users List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Registered Users</CardTitle>
                    <CardDescription>
                      {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""} found
                    </CardDescription>
                  </div>
                  <Button onClick={loadUsers} variant="outline" size="sm">
                    <Activity className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No users found</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {searchQuery ? "Try adjusting your search query" : "No registered users yet"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredUsers.map((user, index) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="hover:shadow-md transition-shadow">
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-4 flex-1">
                                {/* Avatar */}
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 flex items-center justify-center flex-shrink-0">
                                  {user.avatar_url ? (
                                    <img
                                      src={user.avatar_url}
                                      alt={user.full_name || "User"}
                                      className="w-full h-full rounded-full object-cover"
                                    />
                                  ) : (
                                    <User className="w-6 h-6 text-purple-600" />
                                  )}
                                </div>

                                {/* User Info */}
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-lg">
                                      {user.full_name || "Unnamed User"}
                                    </h3>
                                    <Badge
                                      variant={user.role === "admin" ? "default" : "secondary"}
                                      className="capitalize"
                                    >
                                      {user.role}
                                    </Badge>
                                  </div>

                                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    <span className="flex items-center gap-1">
                                      <Mail className="w-4 h-4" />
                                      {user.email || "No email"}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-4 h-4" />
                                      Joined {formatDate(user.created_at)}
                                    </span>
                                  </div>

                                  {/* User Statistics */}
                                  <div className="grid grid-cols-3 gap-4 mt-4">
                                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
                                      <div className="text-2xl font-bold text-purple-600">
                                        {user.projects || 0}
                                      </div>
                                      <div className="text-xs text-gray-600 dark:text-gray-400">
                                        Projects
                                      </div>
                                    </div>
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                                      <div className="text-2xl font-bold text-blue-600">
                                        {user.testCases || 0}
                                      </div>
                                      <div className="text-xs text-gray-600 dark:text-gray-400">
                                        Test Cases
                                      </div>
                                    </div>
                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                                      <div className="text-2xl font-bold text-green-600">
                                        {user.executions || 0}
                                      </div>
                                      <div className="text-xs text-gray-600 dark:text-gray-400">
                                        Executions
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex flex-col gap-2 ml-4">
                                <Badge variant="outline" className="text-xs">
                                  ID: {user.id.slice(0, 8)}...
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}