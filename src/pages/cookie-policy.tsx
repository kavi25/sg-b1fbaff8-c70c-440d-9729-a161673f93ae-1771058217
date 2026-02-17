import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Cookie, Shield, Settings, Clock } from "lucide-react";

export default function CookiePolicy() {
  const lastUpdated = "February 17, 2026";

  const cookieTypes = [
    {
      title: "Strictly Necessary Cookies",
      icon: Shield,
      color: "bg-red-500",
      description: "Essential for the website to function properly. Cannot be disabled.",
      cookies: [
        {
          name: "session_token",
          purpose: "Maintains your login session",
          duration: "Session",
          type: "First-party"
        },
        {
          name: "csrf_token",
          purpose: "Security protection against cross-site request forgery",
          duration: "Session",
          type: "First-party"
        }
      ]
    },
    {
      title: "Functional Cookies",
      icon: Settings,
      color: "bg-blue-500",
      description: "Enable enhanced functionality and personalization.",
      cookies: [
        {
          name: "theme_preference",
          purpose: "Remembers your dark/light mode preference",
          duration: "1 year",
          type: "First-party"
        },
        {
          name: "language_preference",
          purpose: "Stores your language selection",
          duration: "1 year",
          type: "First-party"
        }
      ]
    },
    {
      title: "Analytics Cookies",
      icon: Clock,
      color: "bg-green-500",
      description: "Help us understand how visitors interact with our website.",
      cookies: [
        {
          name: "_ga",
          purpose: "Google Analytics - Distinguishes unique users",
          duration: "2 years",
          type: "Third-party"
        },
        {
          name: "_gid",
          purpose: "Google Analytics - Distinguishes users",
          duration: "24 hours",
          type: "Third-party"
        },
        {
          name: "_gat",
          purpose: "Google Analytics - Throttle request rate",
          duration: "1 minute",
          type: "Third-party"
        }
      ]
    },
    {
      title: "Marketing Cookies",
      icon: Cookie,
      color: "bg-purple-500",
      description: "Track visitors across websites to display relevant advertisements.",
      cookies: [
        {
          name: "_fbp",
          purpose: "Facebook Pixel - Tracks conversions",
          duration: "3 months",
          type: "Third-party"
        },
        {
          name: "ads_data",
          purpose: "Advertisement preferences and targeting",
          duration: "1 year",
          type: "Third-party"
        }
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Cookie Policy | ITProBit</title>
        <meta
          name="description"
          content="Learn about how ITProBit uses cookies to improve your browsing experience and protect your privacy."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />

        <main className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                  <Cookie className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Cookie Policy
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Understanding how we use cookies to enhance your experience on ITProBit
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Last Updated: {lastUpdated}</span>
              </div>
            </motion.div>

            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>What Are Cookies?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing how you use our site, and enabling certain features.
                  </p>
                  <p>
                    We use cookies and similar tracking technologies to track activity on our website and hold certain information. This Cookie Policy explains what cookies are, how we use them, and your choices regarding their use.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cookie Types */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Types of Cookies We Use</h2>
              
              {cookieTypes.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className={`p-3 ${category.color} rounded-lg`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="mb-2">{category.title}</CardTitle>
                            <CardDescription>{category.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {category.cookies.map((cookie, cookieIndex) => (
                            <div key={cookieIndex} className="border-l-4 border-gray-200 dark:border-gray-700 pl-4">
                              <div className="flex items-start justify-between mb-2">
                                <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                  {cookie.name}
                                </code>
                                <Badge variant="outline">{cookie.type}</Badge>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                                <strong>Purpose:</strong> {cookie.purpose}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                <strong>Duration:</strong> {cookie.duration}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Managing Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>How to Manage Cookies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in our cookie banner when you first visit our website.
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Browser Settings</h4>
                    <p className="text-sm mb-2">
                      You can also set or amend your web browser controls to accept or refuse cookies. Here are links to manage cookies in popular browsers:
                    </p>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Google Chrome</li>
                      <li>Mozilla Firefox</li>
                      <li>Safari</li>
                      <li>Microsoft Edge</li>
                      <li>Opera</li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">⚠️ Important Note</h4>
                    <p className="text-sm">
                      If you choose to block or delete cookies, some features of our website may not function properly. Strictly necessary cookies cannot be disabled as they are essential for the website to work.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Third-Party Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Third-Party Cookies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website and deliver advertisements on and through the website.
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Google Analytics</h4>
                      <p className="text-sm">
                        We use Google Analytics to understand how visitors use our site. You can opt-out of Google Analytics by installing the{" "}
                        <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          Google Analytics Opt-out Browser Add-on
                        </a>.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Social Media Cookies</h4>
                      <p className="text-sm">
                        We may use social media cookies from platforms like Facebook, Twitter, and LinkedIn to enable you to share content and track the effectiveness of our campaigns.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Updates to Policy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Updates to This Cookie Policy</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 dark:text-gray-300">
                  <p>
                    We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically to stay informed about how we use cookies.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle>Questions About Cookies?</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 dark:text-gray-300">
                  <p className="mb-4">
                    If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> privacy@itprobit.com</p>
                    <p><strong>Phone:</strong> +44 20 1234 5678</p>
                    <p><strong>Address:</strong> 123 Tech Street, London, UK</p>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex gap-4 flex-wrap">
                    <Link 
                      href="/privacy-policy" 
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    <Link 
                      href="/terms-of-service" 
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium hover:underline"
                    >
                      Terms of Service
                    </Link>
                    <Link 
                      href="/contact" 
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium hover:underline"
                    >
                      Contact Us
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}