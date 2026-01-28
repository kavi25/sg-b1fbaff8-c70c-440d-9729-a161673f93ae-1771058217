import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Starter",
    price: "499",
    currency: "£",
    period: "one-time",
    description: "Perfect for small projects and startups",
    features: [
      "Basic Software Testing (up to 50 test cases)",
      "Responsive Website (up to 5 pages)",
      "SEO Optimization",
      "2 Revisions",
      "30 Days Support",
      "Source Code Included",
    ],
    priceId: "price_starter",
    popular: false,
  },
  {
    name: "Professional",
    price: "1,499",
    currency: "£",
    period: "one-time",
    description: "Ideal for growing businesses",
    features: [
      "Comprehensive Testing (up to 200 test cases)",
      "Custom Web Application",
      "Mobile App (iOS or Android)",
      "Advanced SEO & Analytics",
      "API Integration",
      "5 Revisions",
      "90 Days Support",
      "Priority Support",
    ],
    priceId: "price_professional",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "4,999",
    currency: "£",
    period: "one-time",
    description: "For large-scale projects and enterprises",
    features: [
      "Full Testing Suite (unlimited test cases)",
      "Custom Web & Mobile Apps",
      "AI/ML Integration",
      "3D Interior Design (up to 5 rooms)",
      "Complete SEO Campaign",
      "Automation Testing",
      "Unlimited Revisions",
      "1 Year Premium Support",
      "Dedicated Project Manager",
    ],
    priceId: "price_enterprise",
    popular: false,
  },
];

export default function Pricing() {
  const handleCheckout = async (priceId: string, planName: string, price: string) => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId, planName, price }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to initiate checkout. Please try again.");
    }
  };

  return (
    <>
      <SEO 
        title="Pricing - ITProBit | Affordable Software Testing & Development Services"
        description="Transparent pricing for software testing, web development, mobile apps, and digital services. Choose the perfect package for your business needs."
      />
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        
        <section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white">
                Simple, <span className="gradient-text">Transparent Pricing</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Choose the perfect package for your project. All plans include premium support and guaranteed quality.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={plan.popular ? "md:-mt-8" : ""}
                >
                  <Card className={`h-full relative ${plan.popular ? "border-primary border-2 shadow-2xl" : "border-gray-200"}`}>
                    {plan.popular && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                        <span className="gradient-primary text-white px-6 py-2 rounded-full text-sm font-bold">
                          MOST POPULAR
                        </span>
                      </div>
                    )}
                    <CardHeader className="text-center pb-8 pt-8">
                      <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                      <CardDescription className="text-base mb-6">{plan.description}</CardDescription>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-5xl font-black text-gray-900 dark:text-white">
                          {plan.currency}{plan.price}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">/{plan.period}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full text-lg py-6 ${plan.popular ? "gradient-primary text-white" : ""}`}
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => handleCheckout(plan.priceId, plan.name, plan.price)}
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-16"
            >
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Need a custom solution? We'll create a tailored package for your specific needs.
              </p>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                  Request Custom Quote
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}