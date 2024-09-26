import React, { forwardRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  id: number;
  name: string;
  href: string;
}

interface NavigationProps {
  activeSection: number;
  handleSectionClick: (sectionId: number) => void;
  isSticky: boolean;
  isVisible: boolean;
}

const Navigation = forwardRef<HTMLDivElement, NavigationProps>(
  ({ activeSection, handleSectionClick, isSticky, isVisible }, ref) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
      return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const sections: Section[] = [
      { id: 1, name: 'Hero', href: '#hero' },
      { id: 2, name: 'Services', href: '#services' },
      { id: 3, name: 'Testimonials', href: '#testimonials' },
      { id: 4, name: 'Why Choose Us', href: '#whychooseus' },
      { id: 5, name: 'Process', href: '#process' },
      { id: 6, name: 'Portfolio', href: '#portfolio' },
      { id: 7, name: 'Call to Action', href: '#calltoaction' },
      { id: 8, name: 'FAQ', href: '#faq' },
      { id: 9, name: 'Contact', href: '#contact' },
    ];

    return (
      <AnimatePresence>
        <div className="w-full flex items-center justify-center">
          {isVisible && (
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className={`fixed ${isSticky ? 'bottom-8' : 'bottom-4'} transform -translate-x-1/2 z-50 w-full px-4 sm:px-0`}
            >
              <nav className="bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-full shadow-lg overflow-x-auto">
                <ul className="flex justify-around items-center p-2">
                  {sections.map((section) => (
                    <li key={section.id} className="relative">
                      <a
                        href={section.href}
                        onClick={() => handleSectionClick(section.id)}
                        className={`block px-4 py-2 text-sm sm:text-base font-medium transition-colors duration-200 ${
                          activeSection === section.id
                            ? 'text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {section.name}
                      </a>
                      {activeSection === section.id && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    );
  }
);

Navigation.displayName = 'Navigation';

export default Navigation;
