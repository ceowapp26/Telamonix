"use client"
import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import $ from 'jquery';
import { Rocket } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent, Card, CardHeader, CardBody, CardFooter, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

const steps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We discuss your needs and goals, understanding your vision and challenges.',
    details: [
      'In-depth analysis of your current situation',
      'Identification of key pain points and opportunities',
      'Discussion of potential solutions and technologies',
      'Setting clear objectives and success metrics'
    ]
  },
  {
    number: '02',
    title: 'Planning',
    description: 'We create a tailored strategy, outlining milestones and deliverables.',
    details: [
      'Development of a comprehensive project roadmap',
      'Resource allocation and team assignment',
      'Risk assessment and mitigation strategies',
      'Definition of key performance indicators (KPIs)'
    ]
  },
  {
    number: '03',
    title: 'Development',
    description: 'We build your custom solution, leveraging cutting-edge technologies.',
    details: [
      'Agile development methodology with regular sprints',
      'Continuous integration and deployment (CI/CD)',
      'Rigorous quality assurance and testing processes',
      'Regular progress updates and client feedback sessions'
    ]
  },
  {
    number: '04',
    title: 'Implementation',
    description: 'We deploy and integrate the solution seamlessly into your workflow.',
    details: [
      'Phased rollout strategy to minimize disruption',
      'Comprehensive user training and documentation',
      'System integration with existing infrastructure',
      'Performance monitoring and optimization'
    ]
  },
  {
    number: '05',
    title: 'Support',
    description: 'We provide ongoing maintenance and support to ensure long-term success.',
    details: [
      '24/7 technical support and issue resolution',
      'Regular system updates and security patches',
      'Performance analytics and improvement recommendations',
      'Scalability planning for future growth'
    ]
  },
];

const StepCard = ({ title, content, isOpen, onOpenChange, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      aria-labelledby="modal-title"
      backdrop="blur"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        }
      }}
      classNames={{
        wrapper: 'z-[99999]',
        body: 'py-6',
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        base: 'border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]',
        header: 'border-b-[1px] border-[#292f46]',
        footer: 'border-t-[1px] border-[#292f46]',
        closeButton: 'hover:bg-white/5 active:bg-white/10',
      }}
    >
      <ModalContent>
       {(onClose) => (
        <>
          <ModalHeader>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
          </ModalHeader>
          <ModalBody>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <div>
                {content}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button auto flat color="error" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </>
      )}
      </ModalContent>
    </Modal>
  );
}

const Process = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);
  const stepPositionsRef = useRef(new Map());
  const rocketRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const sectionTop = sectionRect.top;
    const sectionBottom = sectionRect.bottom;

    // Create a map of step positions
    stepPositionsRef.current = new Map(
      stepsRef.current.map((step, index) => {
        if (!step) return [index, null];
        const stepRect = step.getBoundingClientRect();
        return [
          index,
          {
            top: stepRect.top,
            bottom: stepRect.bottom
          }
        ];
      })
    );

    const handleScroll = () => {
      const scrollTop = $(document.body).scrollTop() + 150;

        console.log("this is scrollTop", scrollTop)

                console.log("this is stepPositionsRef.current", stepPositionsRef.current)


      if (scrollTop < sectionTop || scrollTop > sectionBottom) {
        return;
      }
      const currentStepIndex = Array.from(stepPositionsRef.current.entries()).find(
        ([index, position]) => {
          if (!position) return false;
          return scrollTop >= position.top && scrollTop < position.bottom;
        }
      );

      if (currentStepIndex) {
        setCurrentStep(currentStepIndex[0]);
      }
    };

    $(document.body).on('scroll', handleScroll);
    handleScroll(); 

    return () => {
      $(document.body).off('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    moveRocket(currentStep);
  }, [currentStep]);


  const moveRocket = (stepIndex) => {
    if (!rocketRef.current) return;

    const stepElement = stepsRef.current[stepIndex];
    if (!stepElement) return;

    const rocketRect = rocketRef.current.getBoundingClientRect();
    const stepRect = stepElement.getBoundingClientRect();

    const newTop = stepRect.top - rocketRect.height / 2 + window.pageYOffset;
    rocketRef.current.style.top = `${newTop}px`;

    // Calculate the angle to point towards the step card
    const rocketCenterX = rocketRect.left + rocketRect.width / 2;
    const rocketCenterY = newTop + rocketRect.height / 2;
    const stepCenterX = stepRect.left + stepRect.width / 2;
    const stepCenterY = stepRect.top + stepRect.height / 2;

    const angle = Math.atan2(stepCenterY - rocketCenterY, stepCenterX - rocketCenterX) * (180 / Math.PI);
    
    // Determine the direction of movement
    const direction = stepIndex > previousStep ? 1 : -1;
    
    // Rotate the rocket only when changing steps
    if (stepIndex !== previousStep) {
      rocketRef.current.style.transform = `rotate(${angle + (direction > 0 ? 0 : 180)}deg)`;
    }
  };

  return (
    <section 
      id="process" 
      className="py-20 bg-gradient-to-b from-indigo-100 via-white to-purple-100"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-indigo-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Process
        </motion.h2>
        <div className="relative flex justify-center">
          <div className="absolute left-0 w-1 bg-gradient-to-b from-indigo-200 to-purple-200 h-full">
            <motion.div
              className="absolute left-[-12px] w-6 h-full"
              initial={{ height: 0 }}
              animate={{ height: `${(currentStep + 1) * 25}%` }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 animate-pulse" style={{ filter: 'blur(8px)' }} />
              </div>
            </motion.div>
          </div>
          
          <motion.div
            ref={rocketRef}
            className="absolute left-[-25px] z-10"
            initial={{ top: 0, rotate: 90 }}
            animate={{ 
              top: `${currentStep * 25}%`,
              transition: { duration: 0.5, type: 'spring', stiffness: 100 }
            }}
          >
            <Rocket className="text-indigo-600 h-14 w-14 drop-shadow-lg" />
          </motion.div>
          
          <div className="space-y-24 py-8 max-w-3xl ml-16">
            {steps.map((step, index) => (
              <div key={index} ref={el => stepsRef.current[index] = el}>
                <StepItem 
                  step={step} 
                  index={index} 
                  isActive={index === currentStep}
                  isCompleted={index < currentStep}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StepItem = ({ step, index, isActive, isCompleted }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
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
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className="flex items-start"
    >
      <div className="relative mr-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${isActive ? 'bg-indigo-600' : isCompleted ? 'bg-purple-500' : 'bg-gray-400'}`}>
          {step.number}
        </div>
      </div>
      <motion.div 
        className={`flex-1 p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${isActive ? 'bg-white scale-105 shadow-xl' : 'bg-gray-50'}`}
        whileHover={{ scale: isActive ? 1.05 : 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
        onClick={onOpen}
      >
        <div className="flex items-center mb-4">
          <h3 className={`text-xl font-semibold ${isActive ? 'text-indigo-800' : 'text-gray-800'}`}>{step.title}</h3>
        </div>
        <p className={`${isActive ? 'text-gray-700' : 'text-gray-600'}`}>{step.description}</p>
      </motion.div>
      <StepCard
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={`${step.title} Details`}
        content={
          <ul className="list-disc pl-5">
            {step.details.map((detail, i) => (
              <li key={i} className="text-sm text-gray-200 mb-2">{detail}</li>
            ))}
          </ul>
        }
      />
    </motion.div>
  );
};

export default Process;