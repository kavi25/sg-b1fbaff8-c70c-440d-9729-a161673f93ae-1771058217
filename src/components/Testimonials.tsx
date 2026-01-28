import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart UK",
    content: "ITProBit transformed our digital presence. Their testing services ensured a flawless launch for our new platform. Highly recommended!",
  },
  {
    name: "David Chen",
    role: "Director, Interior Designs Ltd",
    content: "The 3D visualization work they did for our architectural projects was stunning. It helped us close multiple high-value deals.",
  },
  {
    name: "Michael Smith",
    role: "Founder, AppWorks",
    content: "Their mobile app development team is top-notch. They delivered our iOS and Android apps ahead of schedule and within budget.",
  },
  {
    name: "Emma Wilson",
    role: "Marketing Manager, GrowthCo",
    content: "We saw a 200% increase in organic traffic within 3 months of using their SEO services. Real results from a dedicated team.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <div className="p-2">
                    <Card className="border-none shadow-lg bg-gray-50 dark:bg-gray-900">
                      <CardContent className="flex flex-col gap-4 p-8">
                        <Quote className="h-10 w-10 text-primary/20" />
                        <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                          "{testimonial.content}"
                        </p>
                        <div className="mt-4">
                          <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                          <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}