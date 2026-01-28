import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Palette, Home, Building2, Eye, Lightbulb, Ruler } from "lucide-react";

const designServices = [
  {
    icon: Home,
    title: "Residential Design",
    description: "Beautiful 3D interior designs for homes, apartments, and living spaces.",
  },
  {
    icon: Building2,
    title: "Commercial Spaces",
    description: "Professional office and retail space designs that enhance productivity and brand image.",
  },
  {
    icon: Eye,
    title: "3D Visualization",
    description: "Photorealistic renders that bring your vision to life before construction begins.",
  },
  {
    icon: Lightbulb,
    title: "Lighting Design",
    description: "Strategic lighting plans to create the perfect ambiance and functionality.",
  },
  {
    icon: Ruler,
    title: "Space Planning",
    description: "Optimized layouts that maximize functionality and aesthetic appeal.",
  },
  {
    icon: Palette,
    title: "Color Consultation",
    description: "Expert color schemes that reflect your style and create the desired atmosphere.",
  },
];

export default function InteriorDesign() {
  return (
    <>
      <SEO 
        title="3D Interior Design Services - ITProBit | Architectural Visualization"
        description="Professional 3D interior design and architectural visualization services for residential and commercial projects."
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
                <Palette className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white">
                3D Interior <span className="gradient-text">Design</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Transform your space with stunning 3D visualizations and expert interior design services.
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
                Design <span className="gradient-text">Services</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Comprehensive interior design solutions from concept to completion.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {designServices.map((service, index) => (
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
                Our Design <span className="gradient-text">Process</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Consultation", desc: "Understanding your vision, needs, and preferences" },
                { step: "02", title: "Concept Design", desc: "Creating initial design concepts and mood boards" },
                { step: "03", title: "3D Modeling", desc: "Building detailed 3D models and photorealistic renders" },
                { step: "04", title: "Final Delivery", desc: "Delivering complete design packages and specifications" },
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Let our expert designers bring your interior vision to life with stunning 3D visualizations.
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