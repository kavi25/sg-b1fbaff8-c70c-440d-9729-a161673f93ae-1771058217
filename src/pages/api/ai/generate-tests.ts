import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { projectId, userId } = req.body;

    if (!projectId || !userId) {
      return res.status(400).json({ error: "Project ID and User ID are required" });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get project details
    const { data: project, error: projectError } = await supabase
      .from("ai_test_projects")
      .select("*")
      .eq("id", projectId)
      .eq("user_id", userId)
      .single();

    if (projectError || !project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Generate test scenarios based on application type
    const scenarios = generateScenarios(project.application_type);
    const testCases = generateTestCases(project.application_type);

    let scenariosCreated = 0;
    let testCasesCreated = 0;

    // Insert test scenarios
    for (const scenario of scenarios) {
      const { error } = await supabase
        .from("ai_test_scenarios")
        .insert({
          project_id: projectId,
          title: scenario.title,
          description: scenario.description,
          test_type: scenario.test_type,
          priority: scenario.priority,
          user_flows: scenario.user_flows
        });

      if (!error) scenariosCreated++;
    }

    // Insert test cases
    for (const testCase of testCases) {
      const { error } = await supabase
        .from("ai_test_cases")
        .insert({
          project_id: projectId,
          title: testCase.title,
          description: testCase.description,
          priority: testCase.priority,
          test_type: testCase.test_type,
          preconditions: testCase.preconditions,
          test_steps: testCase.test_steps,
          expected_results: testCase.expected_results,
          status: "draft"
        });

      if (!error) testCasesCreated++;
    }

    return res.status(200).json({
      success: true,
      scenariosCreated,
      testCasesCreated,
      message: "Test cases generated successfully"
    });
  } catch (error: any) {
    console.error("Error generating tests:", error);
    return res.status(500).json({ error: error.message || "Failed to generate tests" });
  }
}

function generateScenarios(applicationType: string) {
  const webScenarios = [
    {
      title: "User Registration Flow",
      description: "Complete user registration process from landing page to account creation",
      test_type: "functional",
      priority: "high",
      user_flows: ["Navigate to registration", "Fill registration form", "Verify email", "Complete profile"]
    },
    {
      title: "User Login and Authentication",
      description: "User login with valid credentials and session management",
      test_type: "functional",
      priority: "critical",
      user_flows: ["Navigate to login", "Enter credentials", "Submit form", "Verify dashboard access"]
    },
    {
      title: "Search Functionality",
      description: "Search for items/products with various filters",
      test_type: "functional",
      priority: "high",
      user_flows: ["Enter search query", "Apply filters", "Sort results", "View item details"]
    },
    {
      title: "Checkout Process",
      description: "Complete purchase flow from cart to payment confirmation",
      test_type: "functional",
      priority: "critical",
      user_flows: ["Add items to cart", "Proceed to checkout", "Enter shipping details", "Complete payment"]
    },
    {
      title: "Profile Management",
      description: "User profile update and settings modification",
      test_type: "functional",
      priority: "medium",
      user_flows: ["Navigate to profile", "Update personal information", "Change password", "Save changes"]
    }
  ];

  const mobileScenarios = [
    {
      title: "App Launch and Onboarding",
      description: "First-time user onboarding experience",
      test_type: "functional",
      priority: "critical",
      user_flows: ["Launch app", "View onboarding screens", "Grant permissions", "Complete setup"]
    },
    {
      title: "Push Notifications",
      description: "Receive and interact with push notifications",
      test_type: "functional",
      priority: "high",
      user_flows: ["Receive notification", "Tap notification", "Navigate to content", "Verify action"]
    },
    {
      title: "Offline Mode",
      description: "App functionality when network is unavailable",
      test_type: "functional",
      priority: "medium",
      user_flows: ["Disable network", "Attempt operations", "Enable network", "Sync data"]
    }
  ];

  const apiScenarios = [
    {
      title: "Authentication API",
      description: "API authentication and token management",
      test_type: "api",
      priority: "critical",
      user_flows: ["POST /auth/login", "Receive access token", "Use token in headers", "Token refresh"]
    },
    {
      title: "CRUD Operations",
      description: "Create, Read, Update, Delete operations",
      test_type: "api",
      priority: "high",
      user_flows: ["POST create", "GET retrieve", "PUT update", "DELETE remove"]
    }
  ];

  if (applicationType === "mobile") return mobileScenarios;
  if (applicationType === "api") return apiScenarios;
  return webScenarios;
}

function generateTestCases(applicationType: string) {
  const webTestCases = [
    {
      title: "TC001: Successful User Registration",
      description: "Verify user can register with valid credentials",
      priority: "critical",
      test_type: "functional",
      preconditions: ["User is on registration page", "User has valid email address"],
      test_steps: [
        "Navigate to registration page",
        "Enter valid email address",
        "Enter valid password (min 8 characters)",
        "Confirm password",
        "Accept terms and conditions",
        "Click Register button"
      ],
      expected_results: [
        "Registration form validates successfully",
        "User receives confirmation email",
        "User is redirected to dashboard",
        "Success message is displayed"
      ]
    },
    {
      title: "TC002: Login with Valid Credentials",
      description: "Verify user can login with correct email and password",
      priority: "critical",
      test_type: "functional",
      preconditions: ["User has a registered account", "User is on login page"],
      test_steps: [
        "Navigate to login page",
        "Enter registered email address",
        "Enter correct password",
        "Click Login button"
      ],
      expected_results: [
        "User is authenticated successfully",
        "User is redirected to dashboard",
        "User session is created",
        "Welcome message is displayed"
      ]
    },
    {
      title: "TC003: Login with Invalid Credentials",
      description: "Verify appropriate error message for invalid login",
      priority: "high",
      test_type: "negative",
      preconditions: ["User is on login page"],
      test_steps: [
        "Navigate to login page",
        "Enter invalid email or password",
        "Click Login button"
      ],
      expected_results: [
        "Login fails",
        "Error message 'Invalid credentials' is displayed",
        "User remains on login page",
        "Password field is cleared"
      ]
    },
    {
      title: "TC004: Search Product by Name",
      description: "Verify search functionality returns relevant results",
      priority: "high",
      test_type: "functional",
      preconditions: ["User is logged in", "Products exist in database"],
      test_steps: [
        "Navigate to search page",
        "Enter product name in search field",
        "Click Search button or press Enter"
      ],
      expected_results: [
        "Search results are displayed",
        "Results match search query",
        "Product images and details are visible",
        "Result count is shown"
      ]
    },
    {
      title: "TC005: Add Item to Cart",
      description: "Verify user can add products to shopping cart",
      priority: "high",
      test_type: "functional",
      preconditions: ["User is logged in", "User is viewing a product"],
      test_steps: [
        "Select product from catalog",
        "View product details",
        "Select quantity (if applicable)",
        "Click 'Add to Cart' button"
      ],
      expected_results: [
        "Product is added to cart",
        "Cart count increases",
        "Success notification appears",
        "Cart icon updates with new count"
      ]
    },
    {
      title: "TC006: Complete Checkout Process",
      description: "Verify end-to-end checkout with payment",
      priority: "critical",
      test_type: "functional",
      preconditions: ["User has items in cart", "User is logged in"],
      test_steps: [
        "Click on cart icon",
        "Review cart items",
        "Click 'Proceed to Checkout'",
        "Enter shipping address",
        "Select shipping method",
        "Enter payment details",
        "Review order summary",
        "Click 'Place Order'"
      ],
      expected_results: [
        "Order is created successfully",
        "Payment is processed",
        "Order confirmation page is displayed",
        "Confirmation email is sent"
      ]
    },
    {
      title: "TC007: Update User Profile",
      description: "Verify user can update their profile information",
      priority: "medium",
      test_type: "functional",
      preconditions: ["User is logged in", "User is on profile page"],
      test_steps: [
        "Navigate to profile settings",
        "Update name, email, or phone",
        "Upload profile picture (optional)",
        "Click 'Save Changes' button"
      ],
      expected_results: [
        "Profile information is updated",
        "Success message is displayed",
        "Updated information is reflected across the app",
        "Changes persist after logout/login"
      ]
    },
    {
      title: "TC008: Password Reset Flow",
      description: "Verify user can reset forgotten password",
      priority: "high",
      test_type: "functional",
      preconditions: ["User is on login page"],
      test_steps: [
        "Click 'Forgot Password' link",
        "Enter registered email address",
        "Click 'Send Reset Link'",
        "Check email for reset link",
        "Click reset link",
        "Enter new password",
        "Confirm new password",
        "Submit password reset"
      ],
      expected_results: [
        "Password reset email is received",
        "Reset link is valid and works",
        "Password is successfully changed",
        "User can login with new password"
      ]
    },
    {
      title: "TC009: Logout Functionality",
      description: "Verify user can logout successfully",
      priority: "medium",
      test_type: "functional",
      preconditions: ["User is logged in"],
      test_steps: [
        "Click on user profile menu",
        "Click 'Logout' option",
        "Confirm logout if prompted"
      ],
      expected_results: [
        "User session is terminated",
        "User is redirected to login/home page",
        "Protected pages are inaccessible",
        "Cart and session data is cleared"
      ]
    },
    {
      title: "TC010: Form Validation",
      description: "Verify input validation on registration form",
      priority: "high",
      test_type: "negative",
      preconditions: ["User is on registration page"],
      test_steps: [
        "Leave required fields empty",
        "Enter invalid email format",
        "Enter password less than 8 characters",
        "Enter mismatched passwords",
        "Click Register button"
      ],
      expected_results: [
        "Form submission is prevented",
        "Validation errors are displayed for each field",
        "Error messages are clear and specific",
        "User remains on registration page"
      ]
    }
  ];

  const mobileTestCases = [
    {
      title: "TC001: App Launch Successfully",
      description: "Verify app launches without crashes",
      priority: "critical",
      test_type: "functional",
      preconditions: ["App is installed on device"],
      test_steps: [
        "Tap app icon",
        "Wait for app to load",
        "Verify splash screen appears",
        "Verify main screen loads"
      ],
      expected_results: [
        "App launches successfully",
        "No crashes or errors",
        "UI elements load properly",
        "App is responsive"
      ]
    },
    {
      title: "TC002: Push Notification Received",
      description: "Verify app receives push notifications",
      priority: "high",
      test_type: "functional",
      preconditions: ["Notifications are enabled", "User is logged in"],
      test_steps: [
        "Trigger push notification from backend",
        "Verify notification appears",
        "Tap on notification",
        "Verify app opens to correct screen"
      ],
      expected_results: [
        "Notification is received",
        "Notification displays correct content",
        "Tapping opens relevant screen",
        "Notification is cleared after tapping"
      ]
    }
  ];

  const apiTestCases = [
    {
      title: "TC001: POST Authentication Endpoint",
      description: "Verify API returns valid JWT token",
      priority: "critical",
      test_type: "api",
      preconditions: ["Valid user credentials exist"],
      test_steps: [
        "Send POST request to /api/auth/login",
        "Include valid credentials in request body",
        "Verify response status code",
        "Extract access token from response"
      ],
      expected_results: [
        "Status code 200 is returned",
        "Response contains access_token",
        "Token is valid JWT format",
        "Token expiry is included"
      ]
    }
  ];

  if (applicationType === "mobile") return mobileTestCases;
  if (applicationType === "api") return apiTestCases;
  return webTestCases;
}