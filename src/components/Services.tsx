import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TestTube, Code, Smartphone, Brain, Search, Palette, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: TestTube,
    title: "Software Testing",
    description: "Comprehensive testing services including functional, automation, regression, UAT, and API testing to ensure your software quality.",
    features: ["Functional Testing", "Automation Testing", "Regression Testing", "UAT Testing"],
    link: "/services/testing",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Custom web applications and websites built with modern technologies, responsive design, and optimized performance.",
    features: ["Custom Web Apps", "E-commerce", "CMS Development", "API Integration"],
    link: "/services/web-development",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.",
    features: ["iOS Development", "Android Apps", "Cross-platform", "UI/UX Design"],
    link: "/services/app-development",
  },
  {
    icon: Brain,
    title: "AI Development",
    description: "Cutting-edge AI and machine learning solutions to automate processes and drive intelligent decision-making.",
    features: ["Machine Learning", "NLP Solutions", "Computer Vision", "AI Chatbots"],
    link: "/services/ai-development",
  },
  {
    icon: Search,
    title: "SEO Services",
    description: "Strategic SEO optimization to improve your search rankings, drive organic traffic, and boost online visibility.",
    features: ["On-page SEO", "Technical SEO", "Link Building", "Content Strategy"],
    link: "/services/seo",
  },
  {
    icon: Palette,
    title: "3D Interior Design",
    description: "Photorealistic 3D interior designs and architectural visualizations that bring your vision to life.",
    features: ["3D Modeling", "Rendering", "Virtual Tours", "Space Planning"],
    link: "/services/interior-design",
  },
];

export function Services() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive digital solutions to transform your business and drive growth
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary group">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={service.link}>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}