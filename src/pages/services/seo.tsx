import Head from "next/head";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, TrendingUp, Globe, BarChart3, FileText, LinkIcon, Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SEOServices() {
  const benefits = [
    {
      icon: Search,
      title: "Keyword Research",
      description: "In-depth keyword analysis to target the right audience and improve search rankings"
    },
    {
      icon: TrendingUp,
      title: "On-Page SEO",
      description: "Optimize website content, meta tags, and structure for better search engine visibility"
    },
    {
      icon: LinkIcon,
      title: "Link Building",
      description: "Strategic backlink acquisition to boost domain authority and search rankings"
    },
    {
      icon: FileText,
      title: "Content Optimization",
      description: "Create and optimize SEO-friendly content that engages users and ranks well"
    },
    {
      icon: Globe,
      title: "Technical SEO",
      description: "Improve site speed, mobile-friendliness, and crawlability for better indexing"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Track performance metrics and provide detailed insights on SEO progress"
    }
  ];

  const process = [
    { step: "1", title: "SEO Audit", description: "Comprehensive analysis of your website's current SEO performance" },
    { step: "2", title: "Strategy Development", description: "Custom SEO strategy tailored to your business goals" },
    { step: "3", title: "Implementation", description: "Execute on-page, off-page, and technical SEO improvements" },
    { step: "4", title: "Monitoring & Optimization", description: "Continuous tracking and refinement for sustained growth" }
  ];

  return (
    <>
      <Head>
        <title>SEO Services - ITProBit | Search Engine Optimization</title>
        <meta name="description" content="Professional SEO services to improve your search rankings, drive organic traffic, and grow your online presence. Expert keyword research, on-page optimization, and link building." />
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
                  <Search className="w-12 h-12 text-primary" />
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-blue-600">
                SEO Services
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Boost your online visibility and drive organic traffic with our comprehensive SEO strategies. 
                We help businesses rank higher on search engines and attract qualified leads.
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
              <h2 className="text-4xl font-bold mb-4">Our SEO Services</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Comprehensive SEO solutions to improve your search engine rankings and online visibility
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

        {/* Process Section */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Our SEO Process</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A proven methodology to achieve sustainable search engine rankings
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-6">Why Choose Our SEO Services?</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Partner with ITProBit for data-driven SEO strategies that deliver measurable results 
                  and sustainable growth for your business.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Proven Track Record</h3>
                      <p className="text-muted-foreground">Successfully ranked hundreds of websites on first page of Google</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">White-Hat Techniques</h3>
                      <p className="text-muted-foreground">Ethical SEO practices that comply with search engine guidelines</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Transparent Reporting</h3>
                      <p className="text-muted-foreground">Regular updates and detailed analytics on your SEO performance</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Customized Strategies</h3>
                      <p className="text-muted-foreground">Tailored SEO plans based on your industry and business goals</p>
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
                  <Award className="w-16 h-16 text-primary mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Award-Winning SEO Agency</h3>
                  <p className="text-muted-foreground mb-6">
                    Recognized for delivering exceptional results and helping businesses achieve 
                    top rankings in competitive markets.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Average 250% increase in organic traffic</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>95% client retention rate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>500+ successful SEO campaigns</span>
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
              <h2 className="text-4xl font-bold mb-6">Ready to Dominate Search Results?</h2>
              <p className="text-xl mb-8 opacity-90">
                Let's discuss your SEO goals and create a strategy that drives real results
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="secondary" className="text-lg px-8">
                    Start Your SEO Journey
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