import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  {
    title: "Expert Team",
    description: "Our team consists of highly skilled professionals with years of experience in their respective fields.",
  },
  {
    title: "Quality Assurance",
    description: "We follow rigorous testing methodologies to ensure the highest quality deliverables for our clients.",
  },
  {
    title: "Timely Delivery",
    description: "We understand the importance of deadlines and strictly adhere to project timelines.",
  },
  {
    title: "Competitive Pricing",
    description: "Get premium services at competitive rates without compromising on quality.",
  },
  {
    title: "24/7 Support",
    description: "Our dedicated support team is always available to assist you with any queries or issues.",
  },
  {
    title: "Client-Centric Approach",
    description: "We prioritize our clients' needs and work closely with them to achieve their business goals.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 dark:text-white">
              Why Choose <span className="gradient-text">ITProBit?</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              We combine technical expertise with industry best practices to deliver exceptional results. Our commitment to quality and innovation sets us apart from the competition.
            </p>
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              {/* Abstract decorative element representing technology/growth */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center p-8 text-white">
                <div className="text-center">
                  <div className="text-6xl font-black mb-2">100%</div>
                  <div className="text-xl">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <div className="grid gap-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">{reason.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}