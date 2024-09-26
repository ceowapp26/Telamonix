import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const steps = [
  { number: '01', title: 'Consultation', description: 'We discuss your needs and goals, understanding your vision and challenges.' },
  { number: '02', title: 'Planning', description: 'We create a tailored strategy, outlining milestones and deliverables.' },
  { number: '03', title: 'Development', description: 'We build your custom solution, leveraging cutting-edge technologies.' },
  { number: '04', title: 'Implementation', description: 'We deploy and integrate the solution seamlessly into your workflow.' },
  { number: '05', title: 'Support', description: 'We provide ongoing maintenance and support to ensure long-term success.' },
];

const Process = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const [hoveredStep, setHoveredStep] = useState(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section id="process" className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Process
        </motion.h2>
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <motion.div 
                className={`bg-white rounded-lg shadow-lg p-6 h-full transition-all duration-300 ${hoveredStep === index ? 'scale-105 shadow-xl' : ''}`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-300 transform -translate-y-1/2" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Process;