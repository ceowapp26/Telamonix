import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const categories = ['Technologies', 'Industries'];

const technologies = ["Web", "Mobile", "Application", "Data Science", "AI", "Cloud Services", "Blockchain"];

const industries = ["IT", "Construction", "Hospitality", "E-commerce"];

const projects = [
  { title: 'E-commerce Platform', image: '/global/images/portfolio/product-1.png', link: 'https://wapp-pi.vercel.app', tags: ['Web', 'E-commerce'] },
  { title: 'Inventory Management System', image: '/global/images/portfolio/product-2.png', link: 'http://54.253.104.12:8000/AI.html/', tags: ['Web', 'Application', 'IT'] },
  { title: 'Mobile Banking App', image: '/global/images/portfolio/product-3.png', link: 'http://54.253.104.12:8000/AI.html/', tags: ['Mobile', 'IT'] },
  { title: 'Predictive Analytics Dashboard', image: '/global/images/portfolio/product-4.png', link: 'http://54.253.104.12:8000/AI.html/', tags: ['Data Science', 'IT'] },
  { title: 'AI-powered Chatbot', image: '/global/images/portfolio/product-5.png', link: 'http://54.253.104.12:8000/AI.html/', tags: ['AI', 'IT'] },
  { title: 'Cloud Migration Service', image: '/global/images/portfolio/product-6.png', link: 'http://54.253.104.12:8000/AI.html/', tags: ['Cloud Services', 'IT'] },
  { title: 'Machine Learning Model for Finance', image: '/global/images/portfolio/product-7.png', link: 'http://54.253.104.12:8000/AI.html/', tags: ['AI', 'Data Science', 'IT'] },
  { title: 'IoT Data Visualization', image: '/global/images/portfolio/product-8.png', link: 'http://54.253.104.12:8000/AI.html/', tags: ['Data Science', 'IT'] },
  { title: 'Construction Project Management', image: '/global/images/portfolio/product-9.png', link: 'http://54.253.104.12:8000/AI.html/', tags: ['Web', 'Application', 'Construction'] },
  { title: 'Hotel Booking System', image: '/global/images/portfolio/product-10.png', link: 'http://54.253.104.12:8000/AI.html/', tags: ['Web', 'Mobile', 'Hospitality'] },
];

const TabDropdown = ({ category, items, selectedItem, setSelectedItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium flex items-center justify-between w-48"
      >
        <span>{category}</span>
        <ChevronDown
          className={`ml-2 transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-[1200px] bg-white rounded-lg shadow-xl z-10"
          >
            {items.map((item) => (
              <motion.button
                key={item}
                whileHover={{ backgroundColor: '#EEF2FF' }}
                onClick={() => {
                  setSelectedItem(item);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  selectedItem === item ? 'bg-indigo-100 text-indigo-800' : 'text-gray-800'
                }`}
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Portfolio = () => {
  const [selectedTechnology, setSelectedTechnology] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const containerRef = useRef(null);

  useEffect(() => {
    const filteredItems = projects.filter(project => 
      (selectedTechnology === 'All' || project.tags.includes(selectedTechnology)) &&
      (selectedIndustry === 'All' || project.tags.includes(selectedIndustry))
    );
    setFilteredProjects(filteredItems);
  }, [selectedTechnology, selectedIndustry]);

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold text-gray-900 text-center mb-4"
        >
          Our Portfolio
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 text-center mb-12"
        >
          Explore our diverse range of projects across various domains
        </motion.p>

        <div className="flex justify-center space-x-4 mb-16">
          <TabDropdown 
            category="Technologies" 
            items={['All', ...technologies]} 
            selectedItem={selectedTechnology} 
            setSelectedItem={setSelectedTechnology} 
          />
          <TabDropdown 
            category="Industries" 
            items={['All', ...industries]} 
            selectedItem={selectedIndustry} 
            setSelectedItem={setSelectedIndustry} 
          />
        </div>

        <motion.div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="project-item bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover transform hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Link href={`${project.link}`} className="text-white text-lg font-semibold hover:underline">
                      View Project
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;

