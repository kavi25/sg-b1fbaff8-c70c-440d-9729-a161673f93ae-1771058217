import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Globe, 
  Code2, 
  Brain, 
  CheckCircle2, 
  Zap, 
  FileCode, 
  BarChart3,
  PlayCircle,
  FileText,
  Sparkles,
  ArrowRight,
  Target,
  Shield,
  Clock,
  Users,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

export default function AITestingPage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Upload your application and let AI automatically analyze pages, controls, APIs, and user journeys.",
      color: "text-purple-600"
    },
    {
      icon: FileCode,
      title: "Auto Test Generation",
      description: "Generate comprehensive test scenarios and detailed test cases from your application structure.",
      color: "text-blue-600"
    },
    {
      icon: Code2,
      title: "Automation Scripts",
      description: "Convert test cases into automation scripts for Selenium, Playwright, Appium, Cypress, and more.",
      color: "text-green-600"
    },
    {
      icon: PlayCircle,
      title: "Test Execution",
      description: "Run automated tests directly from the platform with real-time progress tracking.",
      color: "text-orange-600"
    },
    {
      icon: BarChart3,
      title: "AI Failure Analysis",
      description: "Get instant AI insights on test failures with root cause analysis and suggested fixes.",
      color: "text-red-600"
    },
    {
      icon: FileText,
      title: "Professional Reports",
      description: "Generate detailed test reports with charts, metrics, and executive summaries.",
      color: "text-indigo-600"
    }
  ];

  const applicationTypes = [
    {
      icon: Globe,
      title: "Web Applications",
      description: "Test web apps, SPAs, and responsive websites",
      frameworks: ["Selenium", "Playwright", "Cypress", "WebdriverIO"],
      badge: "Most Popular"
    },
    {
      icon: Smartphone,
      title: "Mobile Applications",
      description: "Test Android and iOS native & hybrid apps",
      frameworks: ["Appium", "Espresso", "XCUITest", "Detox"],
      badge: "Native Support"
    },
    {
      icon: Code2,
      title: "API Testing",
      description: "Test REST APIs, GraphQL, and microservices",
      frameworks: ["REST Assured", "Postman", "Supertest", "Axios"],
      badge: "Coming Soon"
    }
  ];

  const workflow = [
    { step: 1, title: "Create Project", description: "Start a new testing project with a name and description" },
    { step: 2, title: "Upload Application", description: "Provide URL, APK, or API documentation" },
    { step: 3, title: "AI Analysis", description: "AI analyzes your application structure automatically" },
    { step: 4, title: "Generate Tests", description: "Review AI-generated test scenarios and cases" },
    { step: 5, title: "Create Automation", description: "Convert tests to automation scripts" },
    { step: 6, title: "Execute & Report", description: "Run tests and get professional reports" }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "90% Time Savings",
      description: "Reduce test creation time from weeks to hours"
    },
    {
      icon: Target,
      title: "Higher Coverage",
      description: "AI identifies edge cases humans might miss"
    },
    {
      icon: Shield,
      title: "Consistent Quality",
      description: "Standardized test cases across all projects"
    },
    {
      icon: TrendingUp,
      title: "Continuous Learning",
      description: "AI improves test quality with every execution"
    }
  ];

  const automationFrameworks = [
    { name: "Selenium", languages: ["Java", "Python", "C#", "JavaScript"] },
    { name: "Playwright", languages: ["JavaScript", "TypeScript", "Python"] },
    { name: "Cypress", languages: ["JavaScript", "TypeScript"] },
    { name: "Appium", languages: ["Java", "Python", "C#", "JavaScript"] },
    { name: "WebdriverIO", languages: ["JavaScript", "TypeScript"] },
    { name: "REST Assured", languages: ["Java"] }
  ];

  return (
    <>
      <SEO
        title="AI Testing Services - Automated Test Generation & Execution | AI Test Engineer"
        description="AI-powered software testing platform that analyzes applications, generates test cases, creates automation scripts, and produces professional test reports. Support for Web, Mobile, and API testing."
        image="/og-image.png"
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Header />

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 py-24">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center text-white"
            >
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered Testing Platform
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                AI Test Engineer
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-blue-100">
                AI-powered testing from requirements to automation
              </p>
              <p className="text-lg mb-8 text-blue-200">
                Upload your application. Generate tests. Automate everything.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  <Link href="/ai-test/signup" className="flex items-center">
                    Start Testing Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="#demo">
                    Watch Demo
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Complete Testing Workflow
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                From application analysis to professional reports, everything automated by AI
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow border-t-4 border-t-purple-600">
                    <CardHeader>
                      <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Types */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Supported Application Types</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Test any application with AI-powered automation
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {applicationTypes.map((app, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="relative h-full hover:shadow-2xl transition-all hover:-translate-y-2">
                    {app.badge && (
                      <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                        {app.badge}
                      </Badge>
                    )}
                    <CardHeader>
                      <app.icon className="w-16 h-16 text-purple-600 mb-4" />
                      <CardTitle className="text-2xl">{app.title}</CardTitle>
                      <CardDescription className="text-base">
                        {app.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold mb-2 text-sm text-gray-600 dark:text-gray-400">
                        Frameworks:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {app.frameworks.map((framework, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {framework}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Six simple steps from application to automation
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {workflow.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6 mb-8 last:mb-0"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                  {index < workflow.length - 1 && (
                    <div className="flex-shrink-0">
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Why Choose AI Test Engineer</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Transform your testing workflow with AI automation
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Automation Frameworks */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Supported Automation Frameworks</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Generate automation scripts in your preferred framework and language
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {automationFrameworks.map((framework, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        {framework.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {framework.languages.map((lang, idx) => (
                          <Badge key={idx} variant="secondary">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-white max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-4">
                Ready to Transform Your Testing?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of QA engineers using AI to test faster and smarter
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  <Link href="/ai-test/signup" className="flex items-center">
                    Start Free Trial
                    <Zap className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/contact">
                    Contact Sales
                  </Link>
                </Button>
              </div>
              <p className="mt-6 text-sm text-blue-200">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}