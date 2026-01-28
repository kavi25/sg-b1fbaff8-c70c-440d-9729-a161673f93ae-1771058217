import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SEO 
        title="ITProBit - Software Testing & Development Company in UK"
        description="Leading software testing and development company offering web development, mobile apps, AI solutions, automation testing, and digital services in the UK."
        image="/og-image.png"
      />
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        <Hero />
        <Services />
        <Stats />
        <WhyChooseUs />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
}