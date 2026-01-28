import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Code, Smartphone, TestTube, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const slides = [
  {
    icon: TestTube,
    title: "Software Testing Excellence",
    subtitle: "Quality Assurance That Drives Success",
    description: "Comprehensive testing solutions including functional, automation, regression, and UAT testing services.",
  },
  {
    icon: Code,
    title: "Web Development & Design",
    subtitle: "Building Digital Experiences",
    description: "Custom web applications, responsive designs, and scalable solutions tailored to your business needs.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    subtitle: "Your Ideas, Our Innovation",
    description: "Native and cross-platform mobile applications that engage users and drive business growth.",
  },
  {
    icon: Palette,
    title: "3D Interior Design",
    subtitle: "Visualize Your Dream Space",
    description: "Photorealistic 3D interior designs and architectural visualizations for residential and commercial projects.",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 py-24 md:py-32 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary mb-8"
            >
              {(() => {
                const Icon = slides[currentSlide].icon;
                return <Icon className="h-10 w-10 text-white" />;
              })()}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-black mb-4 text-gray-900 dark:text-white"
            >
              {slides[currentSlide].title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-semibold gradient-text mb-6"
            >
              {slides[currentSlide].subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              {slides[currentSlide].description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/services">
                <Button size="lg" className="gradient-primary text-white text-lg px-8 py-6 hover:opacity-90">
                  Explore Services
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-white">
                  Get a Quote
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2 mt-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-primary" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}