import { motion } from "framer-motion";
import { Users, Briefcase, Clock, Award } from "lucide-react";

const stats = [
  {
    icon: Clock,
    value: "5+",
    label: "Years Experience",
  },
  {
    icon: Briefcase,
    value: "100+",
    label: "Projects Completed",
  },
  {
    icon: Users,
    value: "50+",
    label: "Happy Clients",
  },
  {
    icon: Award,
    value: "20+",
    label: "Awards Won",
  },
];

export function Stats() {
  return (
    <section className="py-20 gradient-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <stat.icon className="h-10 w-10 opacity-90" />
              </div>
              <div className="text-4xl md:text-5xl font-black mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-medium opacity-90">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}