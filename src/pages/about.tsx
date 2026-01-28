import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Stats } from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Target, Lightbulb, Users } from "lucide-react";

export default function About() {
  return (
    <>
      <SEO 
        title="About Us - ITProBit | Leading Software Development Company"
        description="Learn about ITProBit, our mission, vision, and the expert team behind our software testing and development success."
      />
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white">
                About <span className="gradient-text">ITProBit</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                We are a team of passionate technologists dedicated to delivering excellence in software quality and digital innovation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  To empower businesses with flawless digital solutions through rigorous testing and innovative development practices.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-6">
                  <Lightbulb className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  To be the global leader in quality assurance and digital transformation, setting new standards for software excellence.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Integrity, Innovation, and Excellence are at the core of everything we do, ensuring we deliver value to our clients.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <Stats />

        {/* Story Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="md:w-1/2">
                <motion.img 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  src="/og-image.png" 
                  alt="Our Office" 
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="md:w-1/2">
                <motion.h2 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl font-black mb-6"
                >
                  Our <span className="gradient-text">Journey</span>
                </motion.h2>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4 text-gray-600 dark:text-gray-300"
                >
                  <p>
                    Founded with a vision to bridge the gap between development speed and software quality, ITProBit has grown from a small testing consultancy to a full-service digital agency.
                  </p>
                  <p>
                    Over the years, we have helped hundreds of businesses, from startups to Fortune 500 companies, launch bug-free products and scale their digital operations.
                  </p>
                  <p>
                    Today, we continue to innovate in AI, automation, and user experience, helping our clients stay ahead in the rapidly evolving digital landscape.
                  </p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="mt-8"
                >
                  <Link href="/contact">
                    <Button size="lg" className="gradient-primary text-white">
                      Join Our Journey
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}