import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-black text-white">ITProBit</span>
            </Link>
            <p className="mb-6 text-gray-400">
              Leading provider of software testing, development, and digital solutions. We turn ideas into reality with cutting-edge technology.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Our Services</h3>
            <ul className="space-y-4">
              <li><Link href="/services/testing" className="hover:text-primary transition-colors">Software Testing</Link></li>
              <li><Link href="/services/web-development" className="hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link href="/services/app-development" className="hover:text-primary transition-colors">Mobile Apps</Link></li>
              <li><Link href="/services/interior-design" className="hover:text-primary transition-colors">3D Interior Design</Link></li>
              <li><Link href="/services/seo" className="hover:text-primary transition-colors">SEO Services</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <span>45 Addingtion Road, London,<br />United Kingdom, CR0 3LW</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+447718320149" className="hover:text-primary transition-colors">+44 7718 320149</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:info@itprobit.com" className="hover:text-primary transition-colors">info@itprobit.com</a>
              </li>
            </ul>
            <div className="mt-8">
              <Link href="/contact">
                <Button className="w-full gradient-primary text-white border-0">
                  Get a Free Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p className="flex items-center justify-center gap-1">
            © 2019 ITProBit. All rights reserved. Made with in UK.
          </p>
        </div>
      </div>
    </footer>);

}