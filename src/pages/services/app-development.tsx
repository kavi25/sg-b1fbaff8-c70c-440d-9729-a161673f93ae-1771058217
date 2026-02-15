import Head from "next/head";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Tablet, Code2, Zap, Shield, Users, CheckCircle2, Layers } from "lucide-react";
import Link from "next/link";

export default function AppDevelopment() {
  const benefits = [
    {
      icon: Smartphone,
      title: "iOS Development",
      description: "Native iOS apps built with Swift and SwiftUI for optimal performance on iPhone and iPad"
    },
    {
      icon: Tablet,
      title: "Android Development",
      description: "High-performance Android apps using Kotlin and Jetpack Compose for all Android devices"
    },
    {
      icon: Code2,
      title: "Cross-Platform Apps",
      description: "Build once, deploy everywhere with React Native and Flutter for maximum reach"
    },
    {
      icon: Zap,
      title: "Progressive Web Apps",
      description: "Fast, reliable web apps that work offline and feel like native mobile apps"
    },
    {
      icon: Shield,
      title: "App Security",
      description: "Enterprise-grade security measures to protect user data and prevent vulnerabilities"
    },
    {
      icon: Users,
      title: "User Experience Design",
      description: "Intuitive UI/UX design that keeps users engaged and drives app adoption"
    }
  ];

  const technologies = [
    { name: "React Native", description: "Cross-platform mobile development" },
    { name: "Flutter", description: "Beautiful native apps from a single codebase" },
    { name: "Swift/SwiftUI", description: "Native iOS development" },
    { name: "Kotlin", description: "Modern Android development" },
    { name: "Firebase", description: "Backend services and analytics" },
    { name: "GraphQL", description: "Efficient data fetching" }
  ];

  const process = [
    { step: "1", title: "Discovery & Planning", description: "Understand your requirements and define app features" },
    { step: "2", title: "Design & Prototyping", description: "Create wireframes and interactive prototypes" },
    { step: "3", title: "Development", description: "Build your app with agile methodology" },
    { step: "4", title: "Testing & Launch", description: "Rigorous testing and App Store deployment" },
    { step: "5", title: "Maintenance & Updates", description: "Ongoing support and feature enhancements" }
  ];

  return (
    <>
      <Head>
        <title>Mobile App Development - ITProBit | iOS & Android Apps</title>
        <meta name="description" content="Professional mobile app development services for iOS, Android, and cross-platform. Build native apps, PWAs, and hybrid solutions with cutting-edge technology." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Header />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary/10 rounded-2xl">
                  <Smartphone className="w-12 h-12 text-primary" />
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-blue-600">
                Mobile App Development
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your ideas into powerful mobile applications. We build native iOS, Android, 
                and cross-platform apps that deliver exceptional user experiences.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="text-lg px-8">
                    Get Started
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Our App Development Services</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Comprehensive mobile app solutions tailored to your business needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-primary/10">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                        <benefit.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{benefit.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Technologies We Use</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Cutting-edge tools and frameworks for modern mobile app development
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Layers className="w-5 h-5 text-primary" />
                        {tech.name}
                      </CardTitle>
                      <CardDescription>{tech.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Our Development Process</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A streamlined approach to deliver your app on time and within budget
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                        {item.step}
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-6">Why Choose ITProBit?</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Partner with experienced mobile app developers who deliver results
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Expert Development Team</h3>
                      <p className="text-muted-foreground">Skilled iOS, Android, and cross-platform developers</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Agile Methodology</h3>
                      <p className="text-muted-foreground">Flexible development with regular updates and feedback</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Quality Assurance</h3>
                      <p className="text-muted-foreground">Rigorous testing on real devices for bug-free apps</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Post-Launch Support</h3>
                      <p className="text-muted-foreground">Ongoing maintenance and feature updates</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-4">App Development Stats</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Apps Delivered</span>
                        <span className="text-primary font-bold">200+</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-primary to-purple-600" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Client Satisfaction</span>
                        <span className="text-primary font-bold">98%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full w-[98%] bg-gradient-to-r from-primary to-purple-600" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">App Store Rating</span>
                        <span className="text-primary font-bold">4.8/5</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full w-[96%] bg-gradient-to-r from-primary to-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary via-purple-600 to-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Ready to Build Your App?</h2>
              <p className="text-xl mb-8 opacity-90">
                Let's turn your app idea into reality with our expert development team
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="secondary" className="text-lg px-8">
                    Start Your Project
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 hover:bg-white/20 text-white border-white">
                    Explore All Services
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}