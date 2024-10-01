import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Smartphone, Database, Zap, Building2, Workflow, Brain, Wifi, Gamepad2, Bitcoin, QrCode } from 'lucide-react';
import { BsHeadsetVr } from 'react-icons/bs';
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Tabs, Tab } from "@nextui-org/react";

const services = [
  { id: "web", title: 'Web App Development', description: 'Custom web applications tailored to your needs', icon: Code, videoId: 'dQw4w9WgXcQ' },
  { id: "mobile", title: 'Mobile App Development', description: 'Native and cross-platform mobile solutions', icon: Smartphone, videoId: 'dQw4w9WgXcQ' },
  { id: "data", title: 'Data Analytics', description: 'Unlock insights from your data', icon: Database, videoId: 'dQw4w9WgXcQ' },
  { id: "automation", title: 'Business Automation', description: 'Streamline your operations', icon: Zap, videoId: 'dQw4w9WgXcQ' },
  { id: "bim", title: 'BIM Technology', description: 'Advanced building information modeling', icon: Building2, videoId: 'dQw4w9WgXcQ' },
  { id: "api", title: 'API Integration', description: 'Seamless connection of systems', icon: Workflow, videoId: 'dQw4w9WgXcQ' },
  { id: "ai", title: 'AI Services', description: 'AI model training and applications', icon: Brain, videoId: 'dQw4w9WgXcQ' },
  { id: "iot", title: 'IoT (Internet of Things)', description: 'Connect and control smart devices', icon: Wifi, videoId: 'dQw4w9WgXcQ' },
  { id: "gamification", title: 'Gamification', description: 'Engage users through game mechanics', icon: Gamepad2, videoId: 'dQw4w9WgXcQ' },
  { id: "blockchain", title: 'Blockchain', description: 'Secure and decentralized solutions', icon: Bitcoin, videoId: 'dQw4w9WgXcQ' },
  { id: "qr", title: 'QR Technology', description: 'Quick Response code solutions', icon: QrCode, videoId: 'dQw4w9WgXcQ' },
  { id: "vr", title: 'VR & AR', description: 'Immersive virtual and augmented experiences', icon: BsHeadsetVr, videoId: 'dQw4w9WgXcQ' },
];

const ServiceContent = memo(({ serviceId }) => {
  const contentMap = {
    web: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold">Web App Development</h3>
        <p>Our web application development service delivers cutting-edge, responsive, and scalable solutions tailored to your unique business needs. We leverage the latest technologies and best practices to create powerful, user-friendly web applications that drive growth and enhance user engagement.</p>
        <Tabs aria-label="Web App Development Features">
          <Tab key="frontend" title="Frontend">
            <ul className="list-disc pl-5 space-y-2">
              <li>Responsive design for seamless experiences across all devices</li>
              <li>Modern frameworks like React, Vue, or Angular for dynamic UIs</li>
              <li>Progressive Web App (PWA) capabilities for offline functionality</li>
              <li>Accessibility compliance (WCAG) for inclusive design</li>
            </ul>
          </Tab>
          <Tab key="backend" title="Backend">
            <ul className="list-disc pl-5 space-y-2">
              <li>Scalable server-side architectures using Node.js, Python, or Java</li>
              <li>RESTful API design and implementation</li>
              <li>Database integration (SQL and NoSQL solutions)</li>
              <li>Cloud deployment and serverless computing options</li>
            </ul>
          </Tab>
          <Tab key="features" title="Key Features">
            <ul className="list-disc pl-5 space-y-2">
              <li>Single Page Application (SPA) development for smooth user experiences</li>
              <li>Real-time data synchronization and WebSocket integration</li>
              <li>Third-party API integrations for extended functionality</li>
              <li>Robust security measures including encryption and authentication</li>
            </ul>
          </Tab>
        </Tabs>
        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-2">Our Web App Development Process</h4>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Requirements gathering and analysis</li>
            <li>UI/UX design and prototyping</li>
            <li>Frontend and backend development</li>
            <li>Quality assurance and testing</li>
            <li>Deployment and ongoing support</li>
          </ol>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Why Choose Us for Web App Development?</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Expertise in latest web technologies and frameworks</li>
            <li>Focus on scalable, maintainable, and performant code</li>
            <li>User-centric design approach for maximum engagement</li>
            <li>Agile development methodology for flexibility and faster time-to-market</li>
            <li>Comprehensive testing and quality assurance processes</li>
          </ul>
        </div>
      </div>
    ),
    mobile: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold">Mobile App Development</h3>
        <p>Our mobile app development service creates innovative, high-performance applications for iOS and Android platforms. We focus on delivering intuitive user experiences, robust functionality, and seamless integration with device features to ensure your app stands out in the competitive mobile landscape.</p>
        <Tabs aria-label="Mobile App Development Options">
          <Tab key="native" title="Native Apps">
            <ul className="list-disc pl-5 space-y-2">
              <li>iOS development using Swift and SwiftUI</li>
              <li>Android development with Kotlin and Jetpack Compose</li>
              <li>Optimized performance and native UI components</li>
              <li>Full access to device features and APIs</li>
            </ul>
          </Tab>
          <Tab key="cross-platform" title="Cross-Platform">
            <ul className="list-disc pl-5 space-y-2">
              <li>React Native for code reusability across platforms</li>
              <li>Flutter for beautiful, natively compiled applications</li>
              <li>Xamarin for .NET and C# based cross-platform development</li>
              <li>Efficient development process with shared codebase</li>
            </ul>
          </Tab>
          <Tab key="features" title="Key Features">
            <ul className="list-disc pl-5 space-y-2">
              <li>Offline functionality and data synchronization</li>
              <li>Push notifications and real-time updates</li>
              <li>Integration with device features (camera, GPS, sensors)</li>
              <li>Secure authentication and data encryption</li>
            </ul>
          </Tab>
        </Tabs>
        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-2">Our Mobile App Development Process</h4>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Market research and concept validation</li>
            <li>UI/UX design and prototyping</li>
            <li>App development and integration</li>
            <li>Thorough testing on multiple devices</li>
            <li>App store submission and launch</li>
            <li>Ongoing maintenance and updates</li>
          </ol>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Why Choose Us for Mobile App Development?</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Expertise in both native and cross-platform development</li>
            <li>Focus on creating engaging and intuitive user experiences</li>
            <li>Rigorous testing processes to ensure app stability and performance</li>
            <li>Experience with app store guidelines and submission processes</li>
            <li>Ongoing support and maintenance to keep your app up-to-date</li>
          </ul>
        </div>
      </div>
    ),
  };

  return contentMap[serviceId] || <div>Content not available</div>;
});

const ServiceCard = ({ service, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card isPressable onPress={handleOpen} className="w-full h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">{service.title}</p>
            <h4 className="text-white/90 font-medium text-xl">{service.description}</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt={service.title}
            className="z-0 w-full h-full object-cover"
            src={`/global/images/service/${service.id.toLowerCase().replace(/ /g, '-')}.png`}
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-2 items-center">
              <service.icon className="w-10 h-11 text-white" />
              <p className="text-tiny text-white/60">Learn More</p>
            </div>
            <Button radius="full" size="sm" color="primary">Explore</Button>
          </CardFooter>
        </Card>
      </motion.div>
      <ServiceModal
        title={service.title}
        content={<ServiceContent serviceId={service.id} />}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onClose={handleClose}
      />
    </>
  );
}

const ServiceModal = ({ title, content, isOpen, onOpenChange, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      size="full"
      scrollBehavior="inside"
      aria-labelledby="modal-title"
      backdrop="blur"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            scale: 0.95,
            transition: {
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
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
            <div className="p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
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

const ScrollBanner = () => {
  const items = ["AI-Powered", "Secure", "Scalable", "Customizable", "Efficient", "Collaborative"];
  
  return (
    <div className="relative w-full overflow-hidden py-8 top-8 bg-black rounded-md">
      <div className="flex animate-scroll">
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex-shrink-0 mx-8 h-16 flex items-center relative">
            <div className="text-white font-bold bg-white/30 backdrop-blur-lg rounded-full px-4 py-2 z-10">
              {item}
            </div>
            <svg className="absolute left-full top-1/2 w-16 h-8 -translate-y-1/2" viewBox="0 0 100 50">
              <path 
                d="M0,25 Q25,0 50,25 T100,25" 
                fill="none" 
                stroke="rgba(255,255,255,0.3)" 
                strokeWidth="2"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 50 25"
                  to="360 50 25"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
              <circle cx="0" cy="25" r="3" fill="white">
                <animate
                  attributeName="cx"
                  from="0"
                  to="100"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="100" cy="25" r="3" fill="white">
                <animate
                  attributeName="cx"
                  from="100"
                  to="0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

const Services = () => {
  const [visibleServices, setVisibleServices] = useState(8);

  return (
    <section id="services" className="py-20 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {services.slice(0, visibleServices).map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </AnimatePresence>
        </div>
        {visibleServices < services.length && (
          <div className="text-center mt-12">
            <motion.button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setVisibleServices(prev => Math.min(prev + 4, services.length))}
            >
              Load More
            </motion.button>
          </div>
        )}
        <ScrollBanner />
      </div>
    </section>
  );
};

export default Services;


