import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <SEO
        title="Contact Us - ITProBit | Get In Touch For Software Services"
        description="Contact ITProBit for software testing, web development, mobile apps, and digital solutions. Call +44 7438 834547 or send us a message." />

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        
        <section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16">

              <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white">
                Get In <span className="gradient-text">Touch</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Ready to start your project? Contact us today for a free consultation and quote.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6">

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Phone className="h-6 w-6 text-primary" />
                      Phone
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a href="tel:+447438834547" className="text-lg font-semibold text-primary hover:underline">+447718320149

                    </a>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Monday - Friday: 9am - 6pm GMT
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Mail className="h-6 w-6 text-primary" />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a href="mailto:info@itprobit.com" className="text-lg font-semibold text-primary hover:underline break-all">
                      info@itprobit.com
                    </a>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      We'll respond within 24 hours
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <MapPin className="h-6 w-6 text-primary" />
                      Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">
                      123 Tech Street<br />
                      London, United Kingdom<br />
                      SW1A 1AA
                    </p>
                  </CardContent>
                </Card>

                <Card className="gradient-primary text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Clock className="h-6 w-6" />
                      Business Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="space-y-1">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2">

                <Card className="shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-3xl">Send Us a Message</CardTitle>
                    <p className="text-gray-600 dark:text-gray-400">
                      Fill out the form below and we'll get back to you as soon as possible
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            required />

                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            required />

                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+44 7438 834547"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)} />

                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="service">Service Interested In *</Label>
                          <Select value={formData.service} onValueChange={(value) => handleChange("service", value)} required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="testing">Software Testing</SelectItem>
                              <SelectItem value="web">Web Development</SelectItem>
                              <SelectItem value="mobile">Mobile App Development</SelectItem>
                              <SelectItem value="ai">AI Development</SelectItem>
                              <SelectItem value="seo">SEO Services</SelectItem>
                              <SelectItem value="interior">3D Interior Design</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Your Message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your project requirements..."
                          rows={6}
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          required />

                      </div>

                      {submitStatus === "success" &&
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-green-700 dark:text-green-300">
                          Thank you for your message! We'll get back to you within 24 hours.
                        </div>
                      }

                      <Button
                        type="submit"
                        className="w-full gradient-primary text-white text-lg py-6"
                        disabled={isSubmitting}>

                        {isSubmitting ? "Sending..." : "Send Message"}
                        <Send className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>);

}