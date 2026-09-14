import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Services as ServicesList } from "@/components/Services";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
    {
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies",
      icon: "🌐",
      href: "/services/web-development",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "App Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
      icon: "📱",
      href: "/services/app-development",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "AI Development",
      description: "Intelligent solutions powered by machine learning and artificial intelligence",
      icon: "🤖",
      href: "/services/ai-development",
      gradient: "from-green-500 to-teal-500"
    },
    {
      title: "AI Testing",
      description: "AI-powered automated testing platform for web, mobile, and API applications",
      icon: "🧪",
      href: "/services/ai-testing",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      title: "SEO Services",
      description: "Search engine optimization to improve your online visibility",
      icon: "🔍",
      href: "/services/seo",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Software Testing",
      description: "Comprehensive quality assurance and testing services",
      icon: "✅",
      href: "/services/testing",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      title: "3D Interior Design",
      description: "Professional 3D visualization and interior design services",
      icon: "🏠",
      href: "/services/interior-design",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

export default function ServicesPage() {
  return (
    <>
      <SEO 
        title="Our Services - ITProBit | Comprehensive Digital Solutions"
        description="Explore our range of services including software testing, web development, mobile apps, AI solutions, and 3D interior design."
      />
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        
        <section className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white"
            >
              Expert <span className="gradient-text">Solutions</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10"
            >
              We deliver end-to-end technology services tailored to your unique business needs.
            </motion.p>
          </div>
        </section>

        <ServicesList />

        <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve your digital goals with our expert services.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Get a Free Consultation
              </Button>
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}