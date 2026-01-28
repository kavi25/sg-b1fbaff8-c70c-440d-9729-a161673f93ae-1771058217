import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Code, Layout, Smartphone, Zap, ShoppingCart, Database } from "lucide-react";

const webServices = [
  {
    icon: Layout,
    title: "Custom Web Applications",
    description: "Tailored web solutions built with modern frameworks like React, Next.js, and Vue.js.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Development",
    description: "Full-featured online stores with secure payment integration and inventory management.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Mobile-first designs that look perfect on all devices and screen sizes.",
  },
  {
    icon: Database,
    title: "CMS Development",
    description: "Content management systems for easy website updates and content control.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Lightning-fast websites optimized for speed, SEO, and user experience.",
  },
  {
    icon: Code,
    title: "API Integration",
    description: "Seamless integration with third-party services and custom API development.",
  },
];

export default function WebDevelopment() {
  return (
    <>
      <SEO 
        title="Web Development Services - ITProBit | Custom Web Solutions"
        description="Professional web development services including custom applications, e-commerce, responsive design, and CMS development."
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
                <Code className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white">
                Web <span className="gradient-text">Development</span> Services
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Build powerful, scalable web applications that drive business growth and deliver exceptional user experiences.
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
                Web Development <span className="gradient-text">Solutions</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                From concept to launch, we deliver complete web solutions tailored to your business needs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {webServices.map((service, index) => (
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

        {/* Technologies */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Technologies We <span className="gradient-text">Master</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {["React", "Next.js", "Vue.js", "Node.js", "TypeScript", "Tailwind CSS"].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-shadow"
                >
                  <h3 className="font-bold text-lg">{tech}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 gradient-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Web Application?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Let's transform your ideas into powerful web solutions that drive results.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Start Your Project
              </Button>
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}