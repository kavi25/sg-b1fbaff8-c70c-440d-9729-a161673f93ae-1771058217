import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentSuccess() {
  const router = useRouter();
  const { session_id } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session_id) {
      // Here you would verify the session with your backend
      setLoading(false);
    }
  }, [session_id]);

  return (
    <>
      <SEO 
        title="Payment Successful - ITProBit"
        description="Your payment has been processed successfully. Thank you for choosing ITProBit."
      />
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        
        <section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="border-2 border-green-500 shadow-2xl">
                <CardHeader className="text-center pb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 mx-auto mb-6"
                  >
                    <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
                  </motion.div>
                  <CardTitle className="text-4xl font-black mb-4">Payment Successful!</CardTitle>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Thank you for your purchase. Your order has been confirmed.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!loading && session_id && (
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                      <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Order Details</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Session ID: <span className="font-mono text-xs">{session_id}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        A confirmation email has been sent to your registered email address.
                      </p>
                    </div>
                  )}

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold mb-3 text-gray-900 dark:text-white">What's Next?</h3>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        Our team will contact you within 24 hours to schedule a kickoff meeting
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        You'll receive a detailed project plan and timeline
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        Access to our client portal will be provided for project tracking
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Back to Home
                      </Button>
                    </Link>
                    <Link href="/contact" className="flex-1">
                      <Button className="w-full gradient-primary text-white">
                        Contact Support
                      </Button>
                    </Link>
                  </div>

                  <div className="text-center pt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Need help? Email us at <a href="mailto:info@itprobit.com" className="text-primary hover:underline">info@itprobit.com</a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}