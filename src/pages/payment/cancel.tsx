import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, ArrowLeft, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentCancel() {
  return (
    <>
      <SEO 
        title="Payment Cancelled - ITProBit"
        description="Your payment was cancelled. Please try again or contact us for assistance."
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
              <Card className="border-2 border-orange-500 shadow-2xl">
                <CardHeader className="text-center pb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900 mx-auto mb-6"
                  >
                    <XCircle className="h-10 w-10 text-orange-600 dark:text-orange-400" />
                  </motion.div>
                  <CardTitle className="text-4xl font-black mb-4">Payment Cancelled</CardTitle>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Your payment was not completed. No charges have been made to your account.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                    <h3 className="font-bold mb-3 text-gray-900 dark:text-white">Why was my payment cancelled?</h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li>• You clicked the back button or closed the payment window</li>
                      <li>• Your session timed out</li>
                      <li>• There was an issue with your payment method</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold mb-3 text-gray-900 dark:text-white">Need Assistance?</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                      If you encountered any issues during checkout or have questions about our services, we're here to help!
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-gray-700 dark:text-gray-300">Call us at:</span>
                      <a href="tel:+447438834547" className="text-primary font-semibold hover:underline">
                        +44 7438 834547
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/pricing" className="flex-1">
                      <Button className="w-full gradient-primary text-white">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Try Again
                      </Button>
                    </Link>
                    <Link href="/contact" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Contact Support
                      </Button>
                    </Link>
                  </div>

                  <div className="text-center pt-4">
                    <Link href="/" className="text-sm text-primary hover:underline">
                      Return to Homepage
                    </Link>
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