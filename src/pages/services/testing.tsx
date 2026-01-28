import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { TestTube, CheckCircle2, Zap, Shield, Clock, Target } from "lucide-react";

const testingServices = [
  {
    icon: CheckCircle2,
    title: "Functional Testing",
    description: "Comprehensive testing of all features and functionalities to ensure your software works as intended.",
  },
  {
    icon: Zap,
    title: "Automation Testing",
    description: "Accelerate your testing process with automated test scripts for regression and continuous integration.",
  },
  {
    icon: Shield,
    title: "Security Testing",
    description: "Identify vulnerabilities and ensure your application is protected against security threats.",
  },
  {
    icon: Clock,
    title: "Performance Testing",
    description: "Load testing, stress testing, and performance optimization to handle peak traffic.",
  },
  {
    icon: Target,
    title: "UAT Testing",
    description: "User Acceptance Testing to validate software meets business requirements and user expectations.",
  },
  {
    icon: TestTube,
    title: "API Testing",
    description: "Thorough testing of APIs for functionality, reliability, performance, and security.",
  },
];

export default function SoftwareTesting() {
  return (
    <>
      <SEO 
        title="Software Testing Services - ITProBit | QA & Test Automation"
        description="Professional software testing services including functional, automation, regression, UAT, and API testing to ensure flawless software quality."
      />
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary mb-8">
                <TestTube className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white">
                Software <span className="gradient-text">Testing</span> Services
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Comprehensive QA and testing solutions to ensure your software is bug-free, secure, and performs flawlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/pricing">
                  <Button size="lg" className="gradient-primary text-white text-lg px-8">
                    View Pricing
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-primary">
                    Request Quote
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Our Testing <span className="gradient-text">Expertise</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                We offer a complete range of testing services to cover every aspect of your software quality assurance needs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testingServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4">
                        <service.icon className="h-7 w-7 text-white" />
                      </div>
                      <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Our Testing <span className="gradient-text">Process</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Requirements Analysis", desc: "Understanding your software and testing needs" },
                { step: "02", title: "Test Planning", desc: "Creating comprehensive test strategies and cases" },
                { step: "03", title: "Test Execution", desc: "Running tests and documenting all findings" },
                { step: "04", title: "Reporting & Support", desc: "Delivering detailed reports and ongoing support" },
              ].map((phase, index) => (
                <motion.div
                  key={phase.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl font-black gradient-text mb-4">{phase.step}</div>
                  <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{phase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 gradient-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ensure Your Software Quality?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Let our expert QA team help you deliver flawless software to your users.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}