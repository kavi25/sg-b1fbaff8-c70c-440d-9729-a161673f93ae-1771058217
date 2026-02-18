import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Database, Mail, ExternalLink, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy - ITProBit"
        description="Learn how ITProBit collects, uses, and protects your personal information. Our comprehensive privacy policy outlines your rights and our data practices."
      />
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                Your privacy is important to us
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last Updated: February 18, 2026
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-8">
                  <p className="text-lg leading-relaxed mb-4">
                    At ITProBit, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    By using our website, you consent to the data practices described in this policy. Please read this policy carefully to understand our views and practices regarding your personal data.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Database className="w-6 h-6 text-blue-600" />
                    Information We Collect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20">1</Badge>
                      Personal Information
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      We may collect personal information that you voluntarily provide when you:
                    </p>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 ml-6">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Fill out contact forms or request information about our services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Subscribe to our newsletter or blog updates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Create an account or register for our services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Leave comments on our blog posts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Make a purchase or payment</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm font-medium">
                        <strong>This may include:</strong> Name, email address, phone number, company name, postal address, payment information, and any other information you choose to provide.
                      </p>
                    </div>
                  </div>

                  {/* Automatic Information */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20">2</Badge>
                      Automatically Collected Information
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      When you visit our website, we automatically collect certain information about your device:
                    </p>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 ml-6">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>IP address and browser type</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Operating system and device information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Pages viewed and time spent on pages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Referring website or search engine</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>Clickstream data and website navigation patterns</span>
                      </li>
                    </ul>
                  </div>

                  {/* Cookies and Tracking */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20">3</Badge>
                      Cookies and Tracking Technologies
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      We use cookies and similar tracking technologies to track activity on our website. See our{" "}
                      <Link href="/cookie-policy" className="text-blue-600 hover:underline">
                        Cookie Policy
                      </Link>{" "}
                      for detailed information about the cookies we use and how to manage them.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* How We Use Information */}
        <section className="pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Eye className="w-6 h-6 text-green-600" />
                    How We Use Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We use the information we collect for various purposes, including:
                  </p>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span><strong>Provide Services:</strong> To deliver, maintain, and improve our software testing and development services</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span><strong>Communication:</strong> To respond to your inquiries, send updates, and provide customer support</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span><strong>Marketing:</strong> To send promotional materials, newsletters, and information about our services (with your consent)</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span><strong>Analytics:</strong> To analyze website usage and improve user experience</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span><strong>Security:</strong> To protect against fraud, unauthorized access, and ensure website security</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span><strong>Legal Compliance:</strong> To comply with legal obligations and enforce our terms of service</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Information Sharing */}
        <section className="pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <ExternalLink className="w-6 h-6 text-purple-600" />
                    How We Share Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following circumstances:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-600 pl-4">
                      <h4 className="font-semibold mb-2">Service Providers</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        We may share information with trusted third-party service providers who assist us in operating our website, conducting business, or servicing you (e.g., payment processors, hosting providers, email services).
                      </p>
                    </div>

                    <div className="border-l-4 border-green-600 pl-4">
                      <h4 className="font-semibold mb-2">Legal Requirements</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        We may disclose your information if required by law, court order, or governmental regulation, or to protect our rights, property, or safety.
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-600 pl-4">
                      <h4 className="font-semibold mb-2">Business Transfers</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        If ITProBit is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
                      </p>
                    </div>

                    <div className="border-l-4 border-orange-600 pl-4">
                      <h4 className="font-semibold mb-2">With Your Consent</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        We may share your information for any other purpose with your explicit consent.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Data Security */}
        <section className="pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Lock className="w-6 h-6 text-red-600" />
                    Data Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <h4 className="font-semibold mb-2">Technical Measures</h4>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• SSL/TLS encryption</li>
                        <li>• Secure data storage</li>
                        <li>• Regular security audits</li>
                        <li>• Firewall protection</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-semibold mb-2">Organizational Measures</h4>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• Access controls</li>
                        <li>• Employee training</li>
                        <li>• Data minimization</li>
                        <li>• Regular backups</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Important:</strong> While we strive to protect your personal information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Your Rights */}
        <section className="pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Your Privacy Rights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Depending on your location and applicable laws (including GDPR, CCPA), you may have the following rights:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-semibold mb-2">Access & Portability</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Request a copy of your personal data and receive it in a structured, commonly used format.
                      </p>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-semibold mb-2">Correction</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Request correction of inaccurate or incomplete personal information we hold about you.
                      </p>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-semibold mb-2">Deletion</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Request deletion of your personal data, subject to legal obligations and legitimate interests.
                      </p>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-semibold mb-2">Opt-Out</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Unsubscribe from marketing communications and opt-out of certain data processing activities.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm">
                      To exercise any of these rights, please contact us at:{" "}
                      <a href="mailto:privacy@itprobit.com" className="text-blue-600 hover:underline font-medium">
                        privacy@itprobit.com
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Third-Party Links */}
        <section className="pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Third-Party Links and Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our website may contain links to third-party websites, services, or applications. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies before providing any personal information.
                  </p>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold mb-2">Third-Party Services We Use:</h4>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <li>• Google Analytics (for website analytics)</li>
                      <li>• Stripe (for payment processing)</li>
                      <li>• Supabase (for data storage and authentication)</li>
                      <li>• Social media platforms (for sharing features)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Children's Privacy */}
        <section className="pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Children's Privacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our services are not directed to individuals under the age of 13 (or 16 in the EU). We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately, and we will take steps to delete such information.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Changes to Policy */}
        <section className="pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Changes to This Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. We will notify you of any material changes by:
                  </p>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 ml-6 mb-4">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Posting the updated policy on this page with a new "Last Updated" date</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Sending an email notification to registered users</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Displaying a prominent notice on our website</span>
                    </li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Contact Us */}
        <section className="pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Mail className="w-6 h-6 text-blue-600" />
                    Contact Us About Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="space-y-2 text-gray-700 dark:text-gray-200">
                    <p><strong>Email:</strong> <a href="mailto:privacy@itprobit.com" className="text-blue-600 hover:underline">privacy@itprobit.com</a></p>
                    <p><strong>Company:</strong> ITProBit</p>
                    <p><strong>Address:</strong> United Kingdom</p>
                    <p><strong>Response Time:</strong> We aim to respond within 48 hours</p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/cookie-policy">
                      <Badge variant="outline" className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30">
                        Cookie Policy
                      </Badge>
                    </Link>
                    <Link href="/contact">
                      <Badge variant="outline" className="cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/30">
                        Contact Us
                      </Badge>
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