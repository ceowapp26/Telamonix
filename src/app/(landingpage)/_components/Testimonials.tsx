import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const testimonials = [
  { name: 'John Doe', role: 'CEO, Tech Corp', quote: 'Their IT solutions transformed our business operations.' },
  { name: 'Jane Smith', role: 'CTO, Innovate Inc', quote: 'Exceptional service and cutting-edge technology.' },
  { name: 'Mike Johnson', role: 'Founder, StartUp', quote: 'They helped us scale our infrastructure seamlessly.' },
];

const Testimonials = () => {
  const sectionRef = useRef();

  useEffect(() => {
    gsap.from(sectionRef.current.children, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-blue-50 h-screen" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Client Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;