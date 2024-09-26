import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Ensure GSAP plugins are registered
gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Web App', 'Mobile App', 'Data Science', 'AI', 'Cloud Services'];

const projects = [
  { title: 'E-commerce Platform', image: '/api/placeholder/600/400', category: 'Web App' },
  { title: 'Inventory Management System', image: '/api/placeholder/600/400', category: 'Web App' },
  { title: 'Mobile Banking App', image: '/api/placeholder/600/400', category: 'Mobile App' },
  { title: 'Predictive Analytics Dashboard', image: '/api/placeholder/600/400', category: 'Data Science' },
  { title: 'AI-powered Chatbot', image: '/api/placeholder/600/400', category: 'AI' },
  { title: 'Cloud Migration Service', image: '/api/placeholder/600/400', category: 'Cloud Services' },
  { title: 'Machine Learning Model for Finance', image: '/api/placeholder/600/400', category: 'AI' },
  { title: 'IoT Data Visualization', image: '/api/placeholder/600/400', category: 'Data Science' },
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const containerRef = useRef(null);

  useEffect(() => {
    const filteredItems = selectedCategory === 'All'
      ? projects
      : projects.filter(project => project.category === selectedCategory);
    setFilteredProjects(filteredItems);
  }, [selectedCategory]);

  useEffect(() => {
    const container = containerRef.current;
    gsap.fromTo(container.querySelectorAll('.project-item'),
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, [filteredProjects]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-gray-900 text-center mb-12"
        >
          Our Portfolio
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-200'
              } transition-colors duration-200`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="project-item bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-indigo-600 font-medium">{project.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;


