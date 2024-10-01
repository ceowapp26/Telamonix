import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const testimonials = [
  { name: 'John Doe', role: 'CEO, Tech Corp', quote: 'Their IT solutions transformed our business operations.', rating: 5, avatar: '/api/placeholder/80/80' },
  { name: 'Jane Smith', role: 'CTO, Innovate Inc', quote: 'Exceptional service and cutting-edge technology.', rating: 4, avatar: '/api/placeholder/80/80' },
  { name: 'Mike Johnson', role: 'Founder, StartUp', quote: 'They helped us scale our infrastructure seamlessly.', rating: 5, avatar: '/api/placeholder/80/80' },
  { name: 'Emily Brown', role: 'COO, Global Solutions', quote: 'Their team expertise is unmatched in the industry.', rating: 5, avatar: '/api/placeholder/80/80' },
  { name: 'Alex Lee', role: 'IT Director, Enterprise Co', quote: 'Reliable, innovative, and always ahead of the curve.', rating: 4, avatar: '/api/placeholder/80/80' },
  { name: 'Sarah Chen', role: 'VP of Engineering, TechGiant', quote: 'Their solutions have consistently exceeded our expectations.', rating: 5, avatar: '/api/placeholder/80/80' },
];

const TestimonialCard = ({ name, role, quote, avatar, rating }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    
    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      gsap.to(card, {
        rotationY: -20 * (x - 0.5),
        rotationX: 20 * (y - 0.5),
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className="group w-full sm:w-80 h-auto sm:h-96 bg-neutral-800 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 relative perspective-1000">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 z-[9999]">
          <div className="bg-transparent group-hover:scale-150 -top-8 -left-8 absolute shadow-yellow-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-48 h-48"></div>
          <div className="bg-transparent group-hover:scale-150 top-1 left-1 absolute shadow-red-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-32 h-32"></div>
          <div className="bg-transparent group-hover:scale-150 top-8 left-8 absolute shadow-sky-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-12 h-12"></div>
          <div className="bg-transparent group-hover:scale-150 top-10 left-11 absolute shadow-red-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-6 h-6"></div>
          <div className="bg-transparent group-hover:scale-150 bottom-4 right-4 absolute shadow-green-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"></div>
          <div className="bg-transparent group-hover:scale-150 -bottom-3 -right-3 absolute shadow-sky-800 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-48 h-48"></div>
          <div className="bg-transparent group-hover:scale-150 bottom-10 right-10 absolute shadow-sky-500 shadow-inner rounded-full transition-all ease-in-out group-hover:duration-1000 duration-1000 w-12 h-12"></div>
        </div>
      <div className="w-full h-full shadow-xl shadow-neutral-900/50 p-6 bg-neutral-900/80 backdrop-blur-sm rounded-2xl flex flex-col justify-between z-10 relative transform-style-3d group-hover:translate-z-10 transition-transform duration-500">
        <div>
          <div className="flex items-center mb-4">
            <Image 
              src={avatar || "/api/placeholder/80/80"} 
              alt={name} 
              width={64}
              height={64}
              className="rounded-full mr-4 border-2 border-blue-500"
              objectFit="cover"
            />
            <div>
              <h3 className="font-bold text-xl text-neutral-50">{name}</h3>
              <p className="text-sm text-blue-300">{role}</p>
            </div>
          </div>
          <p className="text-neutral-200 text-base italic mb-6 line-clamp-4 group-hover:line-clamp-none transition-all duration-300">"{quote}"</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-6 h-6 ${i < rating ? 'text-yellow-400' : 'text-gray-400'} fill-current transition-colors duration-300 ease-in-out`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-neutral-400 text-sm">{rating.toFixed(1)}/5.0</span>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const containerRef = useRef(null);
  const columnRefs = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const columns = columnRefs.current;
    const container = containerRef.current;

    // Text animation for title and subtitle
    gsap.from(titleRef.current, {
      duration: 0.5,
      opacity: 0,
      y: 50,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      }
    });

    gsap.from(subtitleRef.current.children, {
      duration: 1,
      opacity: 0,
      y: 20,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 60%',
        end: 'top 50%',
        toggleActions: 'play none none reverse',
      }
    });

    // Scrolling animation for testimonial cards
    const scrollAnimations = columns.map((column, index) => {
      return gsap.to(column.children, {
        y: index % 2 === 0 ? '-50%' : '50%',
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.3,
        },
      });
    });

    // Parallax effect for background elements
    gsap.to('.parallax-bg', {
      y: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      scrollAnimations.forEach(anim => anim.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 overflow-hidden relative">
      <div className="parallax-bg absolute inset-0 opacity-20">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>
      <div className="container mx-auto px-4 relative z-[50]">
        <h2 
          ref={titleRef} 
          className="text-6xl sm:text-7xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
        >
          What Our Clients Say
        </h2>
        <p 
          ref={subtitleRef} 
          className="text-2xl sm:text-3xl font-light text-center mb-20 mt-8 text-blue-200 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
        >
          <span className="inline-block px-2">Trusted by</span>
          <span className="inline-block px-2">industry leaders</span>
          <span className="inline-block px-2">worldwide</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[0, 1, 2].map((colIndex) => (
            <div
              key={colIndex}
              ref={(el) => (columnRefs.current[colIndex] = el)}
              className="flex flex-col space-y-8 overflow-hidden"
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
