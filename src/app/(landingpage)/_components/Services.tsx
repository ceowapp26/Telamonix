import { motion, AnimatePresence } from "framer-motion";
import { Chip } from "@nextui-org/react";

const items = ["AI-Powered", "Secure", "Scalable", "Customizable", "Efficient", "Collaborative"];

const ScrollBanner = () => {
  const chipVariants = {
    animate: {
      x: ["100%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  return (
    <motion.div
      className="relative w-full max-w-7xl overflow-hidden top-10"
      style={{ height: "40px" }}
    >
        <motion.div
          variants={chipVariants}
          animate="animate"
          className="flex space-x-4"
        >
          {items.map((text, index) => (
            <Chip key={index} color="primary">
              {text}
            </Chip>
          ))}
        </motion.div>
    </motion.div>
  )
}

const services = [
  { title: 'Web Development', description: 'Custom web applications tailored to your needs' },
  { title: 'Mobile App Development', description: 'Native and cross-platform mobile solutions' },
  { title: 'Cloud Services', description: 'Scalable and secure cloud infrastructure' },
  { title: 'IT Consulting', description: 'Expert advice to optimize your IT strategy' },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gray-100 h-screen">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
        <ScrollBanner />
      </div>
    </section>
  );
};

export default Services;