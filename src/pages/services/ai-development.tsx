import Head from "next/head";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Cpu, Bot, Sparkles, Database, Workflow, CheckCircle2, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function AIDevelopment() {
  const benefits = [
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Build intelligent systems that learn from data and improve over time"
    },
    {
      icon: Bot,
      title: "AI Chatbots",
      description: "Conversational AI assistants for customer support and engagement"
    },
    {
      icon: Cpu,
      title: "Computer Vision",
      description: "Image recognition, object detection, and visual AI solutions"
    },
    {
      icon: Sparkles,
      title: "Natural Language Processing",
      description: "Text analysis, sentiment detection, and language understanding"
    },
    {
      icon: Database,
      title: "Predictive Analytics",
      description: "Data-driven forecasting and business intelligence solutions"
    },
    {
      icon: Workflow,
      title: "AI Integration",
      description: "Seamlessly integrate AI capabilities into existing systems"
    }
  ];

  const useCases = [
    { title: "Customer Service Automation", description: "AI-powered chatbots that handle customer inquiries 24/7" },
    { title: "Recommendation Systems", description: "Personalized product and content recommendations" },
    { title: "Fraud Detection", description: "Real-time anomaly detection and security monitoring" },
    { title: "Document Processing", description: "Automated data extraction from documents and forms" },
    { title: "Predictive Maintenance", description: "AI-driven equipment monitoring and failure prediction" },
    { title: "Content Generation", description: "Automated content creation and optimization" }
  ];

  const technologies = [
    "TensorFlow", "PyTorch", "OpenAI GPT", "Hugging Face", "LangChain", "Pinecone",
    "Scikit-learn", "Keras", "BERT", "Stable Diffusion", "Anthropic Claude", "Google Gemini"
  ];

  const process = [
    { step: "1", title: "Problem Definition", description: "Understand business challenges and AI opportunities" },
    { step: "2", title: "Data Preparation", description: "Collect, clean, and prepare training data" },
    { step: "3", title: "Model Development", description: "Build and train AI models with optimal architecture" },
    { step: "4", title: "Testing & Validation", description: "Rigorous testing and performance optimization" },
    { step: "5", title: "Deployment & Monitoring", description: "Deploy to production and continuous improvement" }
  ];

  return (
    <>
      <Head>
        <title>AI Development Services - ITProBit | Machine Learning & AI Solutions</title>
        <meta name="description" content="Professional AI development services including machine learning, chatbots, computer vision, NLP, and predictive analytics. Transform your business with artificial intelligence." />
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
                  <Brain className="w-12 h-12 text-primary" />
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-blue-600">
                AI Development Services
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Harness the power of artificial intelligence to automate processes, gain insights, 
                and create intelligent solutions that drive business growth.
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
              <h2 className="text-4xl font-bold mb-4">Our AI Services</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Comprehensive artificial intelligence solutions tailored to your business needs
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

        {/* Use Cases Section */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">AI Use Cases</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Real-world applications of AI technology across industries
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-5 h-5 text-primary" />
                        <CardTitle className="text-lg">{useCase.title}</CardTitle>
                      </div>
                      <CardDescription>{useCase.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">AI Technologies We Use</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Cutting-edge AI frameworks and tools for powerful solutions
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-4 justify-center">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="px-6 py-3 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full border border-primary/20 hover:border-primary/40 transition-colors">
                    <span className="font-medium">{tech}</span>
                  </div>
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
              <h2 className="text-4xl font-bold mb-4">Our AI Development Process</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A systematic approach to building effective AI solutions
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
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-6">Why Choose Our AI Services?</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Partner with AI experts who deliver intelligent solutions that drive real business value
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Expert AI Team</h3>
                      <p className="text-muted-foreground">Data scientists and ML engineers with proven track records</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Custom AI Solutions</h3>
                      <p className="text-muted-foreground">Tailored AI models designed for your specific use case</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Ethical AI Development</h3>
                      <p className="text-muted-foreground">Responsible AI practices with bias mitigation and transparency</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Scalable Infrastructure</h3>
                      <p className="text-muted-foreground">Cloud-native AI solutions that scale with your business</p>
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
                  <h3 className="text-2xl font-bold mb-6">AI Impact Metrics</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Process Automation</span>
                      <span className="text-2xl font-bold text-primary">85%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Cost Reduction</span>
                      <span className="text-2xl font-bold text-primary">60%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Accuracy Improvement</span>
                      <span className="text-2xl font-bold text-primary">95%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Customer Satisfaction</span>
                      <span className="text-2xl font-bold text-primary">92%</span>
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
              <h2 className="text-4xl font-bold mb-6">Ready to Transform with AI?</h2>
              <p className="text-xl mb-8 opacity-90">
                Let's explore how artificial intelligence can revolutionize your business
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="secondary" className="text-lg px-8">
                    Start AI Journey
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