import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  Code2,
  Brain,
  CheckCircle2,
  ArrowRight,
  Users,
  Globe,
  Smartphone,
  Database
} from "lucide-react";

export default function Home() {
  return (
    <>
      <SEO 
        title="ITProBit - AI-Powered Software Testing & Development Company in UK"
        description="Leading software testing and development company offering AI-powered test automation, web development, mobile apps, API testing, and comprehensive quality assurance services in the UK. Transform your testing with artificial intelligence."
        image="/og-image.png"
      />
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        <Hero />
        <Services />

        {/* AI Testing Platform Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-950">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                🚀 AI-Powered Testing
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Transform Your Testing with AI Test Engineer
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                From requirements to automation, our AI-powered platform generates comprehensive test cases, 
                creates automation scripts, and delivers professional test reports — all in minutes, not days.
              </p>
            </motion.div>

            {/* Key Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: <Zap className="w-8 h-8 text-yellow-600" />,
                  title: "10x Faster Testing",
                  description: "Generate hundreds of test cases in minutes. AI analyzes your application and creates comprehensive test coverage automatically.",
                  stat: "95% time saved"
                },
                {
                  icon: <Brain className="w-8 h-8 text-purple-600" />,
                  title: "AI-Powered Intelligence",
                  description: "Advanced AI understands your application structure, user flows, and edge cases to generate intelligent test scenarios.",
                  stat: "99% accuracy"
                },
                {
                  icon: <Code2 className="w-8 h-8 text-blue-600" />,
                  title: "Instant Automation",
                  description: "Convert test cases to executable code in Selenium, Cypress, Playwright, or Appium with a single click.",
                  stat: "5+ frameworks"
                }
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200 dark:hover:border-purple-800">
                    <CardHeader>
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-xl flex items-center justify-center mb-4">
                        {benefit.icon}
                      </div>
                      <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                      <CardDescription className="text-base">{benefit.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary" className="font-semibold">
                        {benefit.stat}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">How AI Test Engineer Works</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Simple 4-step process from application upload to executable automation scripts
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    step: "1",
                    title: "Upload Application",
                    description: "Provide your web URL, mobile APK, or API specification",
                    icon: <Globe className="w-6 h-6" />
                  },
                  {
                    step: "2",
                    title: "AI Analysis",
                    description: "AI discovers pages, controls, APIs, and user journeys automatically",
                    icon: <Brain className="w-6 h-6" />
                  },
                  {
                    step: "3",
                    title: "Generate Tests",
                    description: "AI creates comprehensive test scenarios and detailed test cases",
                    icon: <CheckCircle2 className="w-6 h-6" />
                  },
                  {
                    step: "4",
                    title: "Automation Scripts",
                    description: "Convert to executable code in your preferred testing framework",
                    icon: <Code2 className="w-6 h-6" />
                  }
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    className="relative"
                  >
                    <Card className="h-full bg-white dark:bg-gray-800">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white font-bold text-xl flex items-center justify-center">
                            {step.step}
                          </div>
                          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-300">
                            {step.icon}
                          </div>
                        </div>
                        <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                      </CardContent>
                    </Card>
                    {idx < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-6">
                        <ArrowRight className="w-6 h-6 text-purple-300 dark:text-purple-700" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Supported Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Test Any Application</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Comprehensive testing support for all your applications
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Globe className="w-12 h-12 text-blue-600" />,
                    title: "Web Applications",
                    features: ["Frontend UI Testing", "Form Validation", "Navigation Flows", "Cross-Browser Testing", "Responsive Design"],
                    frameworks: ["Selenium", "Cypress", "Playwright"]
                  },
                  {
                    icon: <Smartphone className="w-12 h-12 text-green-600" />,
                    title: "Mobile Applications",
                    features: ["Native App Testing", "Gesture Recognition", "Offline Functionality", "Permission Handling", "Device Compatibility"],
                    frameworks: ["Appium", "XCUITest", "Espresso"]
                  },
                  {
                    icon: <Database className="w-12 h-12 text-purple-600" />,
                    title: "API Testing",
                    features: ["REST API Testing", "GraphQL Testing", "Authentication", "Error Handling", "Performance Testing"],
                    frameworks: ["REST Assured", "Postman", "k6"]
                  }
                ].map((app, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all">
                      <CardHeader>
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          {app.icon}
                        </div>
                        <CardTitle className="text-center text-xl mb-2">{app.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Test Coverage:</h5>
                          <ul className="space-y-1">
                            {app.features.map((feature, i) => (
                              <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Frameworks:</h5>
                          <div className="flex flex-wrap gap-2">
                            {app.frameworks.map((framework, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {framework}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Use Cases / Industries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Trusted by Teams Worldwide</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  From startups to enterprises, teams use AI Test Engineer to ship faster
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: "🏦", title: "FinTech", use: "Secure payment testing" },
                  { icon: "🏥", title: "Healthcare", use: "HIPAA-compliant testing" },
                  { icon: "🛒", title: "E-Commerce", use: "Checkout flow validation" },
                  { icon: "📱", title: "SaaS", use: "Multi-tenant testing" },
                  { icon: "🎓", title: "EdTech", use: "Learning platform QA" },
                  { icon: "🚗", title: "Automotive", use: "Connected car apps" },
                  { icon: "🏨", title: "Travel", use: "Booking system testing" },
                  { icon: "🎮", title: "Gaming", use: "Cross-platform testing" }
                ].map((industry, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card className="text-center hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1">
                      <CardContent className="pt-6">
                        <div className="text-4xl mb-3">{industry.icon}</div>
                        <h4 className="font-semibold mb-1">{industry.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{industry.use}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white border-none">
                <CardContent className="py-12 px-6">
                  <Sparkles className="w-16 h-16 mx-auto mb-6 opacity-90" />
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Transform Your Testing?
                  </h3>
                  <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
                    Join thousands of QA engineers using AI Test Engineer to automate their testing workflows. 
                    Start generating professional test cases in minutes.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/ai-test/signup">
                      <Button size="lg" variant="secondary" className="text-lg px-8">
                        Start Free Trial
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <Link href="/services/ai-testing">
                      <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 hover:bg-white/20 text-white border-white/30">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                  <p className="text-sm text-purple-200 mt-6">
                    No credit card required • Free 14-day trial • Cancel anytime
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <Stats />
        <WhyChooseUs />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
}