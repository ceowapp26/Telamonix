import { motion } from 'framer-motion';
import { FaRocket, FaUsers, FaLightbulb, FaShieldAlt } from 'react-icons/fa';

const reasons = [
  { icon: FaRocket, title: 'Innovative Solutions', description: 'Cutting-edge technology to keep you ahead' },
  { icon: FaUsers, title: 'Expert Team', description: 'Skilled professionals with years of experience' },
  { icon: FaLightbulb, title: 'Customized Approach', description: 'Tailored solutions to fit your unique needs' },
  { icon: FaShieldAlt, title: 'Reliable Security', description: 'Top-notch security measures to protect your data' },
];

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-20 bg-gray-100 h-screen">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <reason.icon className="text-4xl text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;