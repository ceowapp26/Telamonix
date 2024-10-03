"use client"
import React, { useRef, useState, useEffect } from 'react';
import $ from 'jquery';
import Header from './_components/Header';
import Hero from './_components/Hero';
import Services from './_components/Services';
import Techstack from './_components/Techstack';
import Testimonials from './_components/Testimonials';
import WhyChooseUs from './_components/WhyChooseUs';
import Process from './_components/Process';
import Portfolio from './_components/Portfolio';
import CallToAction from './_components/CallToAction';
import FAQ from './_components/FAQ';
import Contact from './_components/Contact';
import Footer from "@/components/footer";
import AnimatedSection from './_components/AnimatedSection';
import Navigation from './_components/Navigation';
import Blog from './_components/Blog';

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const heroSectionRef = useRef(null);
  const servicesSectionRef = useRef(null);
  const techstackSectionRef = useRef(null);
  const testimonialsSectionRef = useRef(null);
  const whychooseusSectionRef = useRef(null);
  const processSectionRef = useRef(null);
  const portfolioSectionRef = useRef(null);
  const calltoactionSectionRef = useRef(null);
  const faqSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const blogSectionRef = useRef(null);
  const footerSectionRef = useRef(null);

  const refs = [
    heroSectionRef,
    servicesSectionRef,
    techstackSectionRef,
    testimonialsSectionRef,
    whychooseusSectionRef,
    processSectionRef,
    portfolioSectionRef,
    calltoactionSectionRef,
    faqSectionRef,
    contactSectionRef,
    blogSectionRef,
    footerSectionRef
  ];

  const handleSectionClick = (section) => {
    setActiveSection(section);
    refs[section - 1].current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionOffsets = refs.map(ref => ref.current.offsetTop);
      const scrollPosition = document.body.scrollTop + window.innerHeight / 2;
      const scrollTop = document.body.scrollTop;
      const heroSectionHeight = heroSectionRef.current.clientHeight;
      const contactSectionBottom = contactSectionRef.current.offsetTop + contactSectionRef.current.clientHeight;

      for (let i = sectionOffsets.length - 1; i >= 0; i--) {
        if (scrollPosition >= sectionOffsets[i]) {
          //setActiveSection(i + 1);
          break;
        }
      }

      if (scrollTop > heroSectionHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      /*if (scrollTop + window.innerHeight >= contactSectionBottom) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }*/
    };

    $(document.body).on('scroll', handleScroll);

    return () => {
      $(document.body).off('scroll', handleScroll);
    };
  }, [refs]);

  return (
    <React.Fragment>
      <Header />
      <main>
        <div className="flex items-center justify-center w-full">
          <Navigation activeSection={activeSection} handleSectionClick={handleSectionClick} isSticky={isSticky} isVisible={isVisible} />
        </div>
        <div ref={heroSectionRef}>
          <Hero />
        </div>
        <AnimatedSection animation="slideFromLeft">
          <div ref={servicesSectionRef}>
            <Services />
          </div>
        </AnimatedSection>
        <div ref={techstackSectionRef}>
          <Techstack />
        </div>
        <AnimatedSection animation="scale">
          <div ref={testimonialsSectionRef}>
            <Testimonials />
          </div>
        </AnimatedSection>
        <AnimatedSection animation="slideFromBottom">
          <div ref={whychooseusSectionRef}>
            <WhyChooseUs />
          </div>
        </AnimatedSection>
        <AnimatedSection animation="scale">
          <div ref={processSectionRef}>
            <Process />
          </div>
        </AnimatedSection>
        <AnimatedSection animation="fadeIn">
          <div ref={portfolioSectionRef}>
            <Portfolio />
          </div>
        </AnimatedSection>
        <AnimatedSection animation="slideFromRight">
          <div ref={calltoactionSectionRef}>
            <CallToAction />
          </div>
        </AnimatedSection>
        <AnimatedSection animation="slideFromTop">
          <div ref={faqSectionRef}>
            <FAQ />
          </div>
        </AnimatedSection>
        <AnimatedSection animation="slideFromLeft">
          <div ref={contactSectionRef}>
            <Contact />
          </div>
        </AnimatedSection>
         <AnimatedSection animation="fadeIn">
          <div ref={blogSectionRef}>
            <Blog />
          </div>
        </AnimatedSection>
      </main> 
      <div ref={footerSectionRef}>
        <Footer />
      </div>   
    </React.Fragment>
  );
};

export default LandingPage;
