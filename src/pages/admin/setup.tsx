import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserPlus, AlertCircle, CheckCircle2 } from "lucide-react";

export default function AdminSetup() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@itprobit.com");
  const [password, setPassword] = useState("admin123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [connectionTest, setConnectionTest] = useState<boolean | null>(null);

  const testConnection = async () => {
    try {
      const { data, error } = await supabase.from("profiles").select("count").limit(1);
      if (error) {
        setConnectionTest(false);
        return false;
      }
      setConnectionTest(true);
      return true;
    } catch (err) {
      setConnectionTest(false);
      return false;
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Test connection first
      const isConnected = await testConnection();
      if (!isConnected) {
        throw new Error("Cannot connect to Supabase. Please check your internet connection and Supabase configuration.");
      }

      // Sign up the admin user with email confirmation disabled
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin/login`,
          data: {
            role: "admin",
            is_admin: true,
          },
        },
      });

      if (error) {
        // Handle specific error cases
        if (error.message.includes("fetch")) {
          throw new Error("Network error: Cannot reach Supabase servers. Check your internet connection.");
        }
        if (error.message.includes("User already registered")) {
          throw new Error("This email is already registered. Try logging in instead.");
        }
        throw error;
      }

      if (data.user) {
        // Check if email confirmation is required
        const requiresConfirmation = data.user.identities && data.user.identities.length === 0;
        
        if (requiresConfirmation) {
          setSuccess("Admin user created! Please check your email to confirm your account before logging in.");
        } else {
          // Update profile to set admin role
          const { error: profileError } = await supabase
            .from("profiles")
            .update({
              role: "admin",
              is_admin: true,
            })
            .eq("id", data.user.id);

          if (profileError) {
            console.error("Profile update error:", profileError);
            setError("User created but failed to set admin role. Please contact support.");
            return;
          }

          setSuccess("Admin user created successfully! Redirecting to login...");
          setTimeout(() => {
            router.push("/admin/login");
          }, 2000);
        }
      }
    } catch (error: any) {
      console.error("Admin creation error:", error);
      
      // Provide user-friendly error messages
      let errorMessage = "Failed to create admin user. ";
      
      if (error.message) {
        errorMessage += error.message;
      } else if (error.toString().includes("fetch")) {
        errorMessage += "Network connection error. Please check:\n";
        errorMessage += "• Your internet connection\n";
        errorMessage += "• Firewall settings\n";
        errorMessage += "• Supabase service status";
      } else {
        errorMessage += "Please try again or contact support.";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Admin Setup - ITProBit"
        description="Create admin account"
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <UserPlus className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Create Admin Account</CardTitle>
            <CardDescription>
              Set up your first admin user for ITProBit
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Connection Status */}
            <div className="mb-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full"
                onClick={testConnection}
                disabled={loading}
              >
                {connectionTest === null && "Test Supabase Connection"}
                {connectionTest === true && (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                    Connected to Supabase
                  </>
                )}
                {connectionTest === false && (
                  <>
                    <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
                    Connection Failed
                  </>
                )}
              </Button>
            </div>

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="whitespace-pre-line">{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-50 text-green-800 border-green-200">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              {connectionTest === false && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Troubleshooting Steps:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Check your internet connection</li>
                      <li>Verify .env.local has correct Supabase credentials</li>
                      <li>Check if firewall is blocking Supabase</li>
                      <li>Restart the Next.js server</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Admin Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@itprobit.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <p className="text-xs text-gray-500">
                  Password must be at least 6 characters long
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || connectionTest === false}
              >
                {loading ? "Creating Admin..." : "Create Admin Account"}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Button
                  type="button"
                  variant="link"
                  className="p-0"
                  onClick={() => router.push("/admin/login")}
                >
                  Login here
                </Button>
              </div>
            </form>

            {/* Environment Info */}
            <div className="mt-6 p-3 bg-gray-50 rounded text-xs space-y-1">
              <p className="font-semibold">Environment Check:</p>
              <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✓ Configured" : "✗ Missing"}</p>
              <p>Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✓ Configured" : "✗ Missing"}</p>
              <p>Site URL: {process.env.NEXT_PUBLIC_SITE_URL || "Using default"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}