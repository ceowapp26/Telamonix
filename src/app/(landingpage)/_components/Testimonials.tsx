'use client'
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { name: 'John Doe', role: 'CEO, Tech Corp', quote: 'Their IT solutions transformed our business operations.', rating: 5, avatar: '/api/placeholder/80/80' },
  { name: 'Jane Smith', role: 'CTO, Innovate Inc', quote: 'Exceptional service and cutting-edge technology.', rating: 4, avatar: '/api/placeholder/80/80' },
  { name: 'Mike Johnson', role: 'Founder, StartUp', quote: 'They helped us scale our infrastructure seamlessly.', rating: 5, avatar: '/api/placeholder/80/80' },
  { name: 'Emily Brown', role: 'COO, Global Solutions', quote: 'Their team expertise is unmatched in the industry.', rating: 5, avatar: '/api/placeholder/80/80' },
  { name: 'Alex Lee', role: 'IT Director, Enterprise Co', quote: 'Reliable, innovative, and always ahead of the curve.', rating: 4, avatar: '/api/placeholder/80/80' },
  { name: 'Sarah Chen', role: 'VP of Engineering, TechGiant', quote: 'Their solutions have consistently exceeded our expectations.', rating: 5, avatar: '/api/placeholder/80/80' },
];

const Card = ({ name, role, quote, avatar, rating, size }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col justify-between ${size === 'large' ? 'col-span-2 row-span-2' : ''}`}>
      <div>
        <div className="flex items-center mb-4">
          <Image 
            src={avatar || "/api/placeholder/80/80"} 
            alt={name} 
            width={size === 'large' ? 80 : 64}
            height={size === 'large' ? 80 : 64}
            className="rounded-full mr-4"
            objectFit="cover"
          />
          <div>
            <h3 className={`font-semibold ${size === 'large' ? 'text-xl' : 'text-lg'}`}>{name}</h3>
            <p className="text-sm text-gray-600">{role}</p>
          </div>
        </div>
        <p className={`text-gray-700 mb-4 italic ${size === 'large' ? 'text-lg' : ''}`}>"{quote}"</p>
      </div>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={size === 'large' ? 24 : 20}
            className={`${
              i < rating ? 'text-yellow-400' : 'text-gray-300'
            } fill-current`}
          />
        ))}
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionRef = useRef(null);

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % Math.ceil(testimonials.length / 5));
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + Math.ceil(testimonials.length / 5)) % Math.ceil(testimonials.length / 5));
  };

  useEffect(() => {
    const section = sectionRef.current;

    gsap.fromTo(
      section.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      }
    );
  }, [currentSection]);

  const currentTestimonials = testimonials.slice(currentSection * 5, (currentSection + 1) * 5);

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Client Testimonials</h2>
        <div className="relative">
          <div 
            ref={sectionRef}
            className="grid grid-cols-4 grid-rows-2 gap-6 h-[640px]"
          >
            {currentTestimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"}
              >
                <Card {...testimonial} size={index === 0 ? 'large' : 'small'} />
              </div>
            ))}
          </div>
          <button 
            onClick={prevSection}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSection}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="flex justify-center mt-8">
          {[...Array(Math.ceil(testimonials.length / 5))].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`w-3 h-3 rounded-full mx-1 ${
                currentSection === index ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;