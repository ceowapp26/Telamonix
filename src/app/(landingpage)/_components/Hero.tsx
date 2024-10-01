import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion, useAnimation } from 'framer-motion';
import React, { useRef, useState, useMemo, useEffect, Suspense, useCallback } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { Decal, Float, OrbitControls, Preload, useTexture, Text, Billboard, Sphere, MeshDistortMaterial, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { technologies } from "@/constants/landing";
import FloatLaptop from "./FloatLaptop";
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa';

const CustomButton = ({ text = 'Explore', onClick }) => {
  return (
    <div className="relative w-full sm:w-[200px] md:w-[220px] lg:w-[250px] h-[40px] sm:h-[45px] md:h-[50px]">
      <motion.button
        className="tracking-wider bg-transparent text-white relative outline-none border border-white/50 h-full w-full text-xs sm:text-sm overflow-hidden group flex items-center justify-between px-3 sm:px-4"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        onClick={onClick}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ x: "-50%" }}
          whileHover={{ x: "50%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-white opacity-20"
          initial={{ x: "0%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.3, delay: 0.1, ease: "easeInOut" }}
        />
        <motion.span
          className="relative z-10 flex items-center justify-between w-full"
          initial={{ x: "50%" }}
          whileHover={{ x: "0%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <span>{text}</span>
          <FaArrowRight className="text-white text-sm sm:text-base md:text-lg lg:text-xl" />
        </motion.span>
      </motion.button>
    </div>
  );
};

const TypewriterEffect = ({ texts, speed = 50, delayBetweenTexts = 2000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const cursorControls = useAnimation();
  const charControls = useAnimation();

  const typeText = useCallback(() => {
    const currentText = texts[currentTextIndex];
    
    if (!isDeleting && displayedText.length < currentText.length) {
      setDisplayedText(currentText.slice(0, displayedText.length + 1));
      charControls.start({
        scale: [1, 1.2, 1],
        transition: { duration: 0.2 }
      });
    } else if (isDeleting && displayedText.length > 0) {
      setDisplayedText(displayedText.slice(0, -1));
    } else if (displayedText.length === currentText.length) {
      setTimeout(() => setIsDeleting(true), delayBetweenTexts);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }
  }, [texts, currentTextIndex, displayedText, isDeleting, charControls, delayBetweenTexts]);

  useEffect(() => {
    const timeout = setTimeout(typeText, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [typeText, isDeleting, speed]);

  useEffect(() => {
    cursorControls.start({
      opacity: [0, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    });
  }, [cursorControls]);

  return (
    <div className="relative text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-wider">
      {displayedText.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={i === displayedText.length - 1 ? charControls : { opacity: 1 }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      <motion.div
        className="inline-block overflow-hidden absolute w-[2px] sm:w-[3px] h-[18px] sm:h-[24px] ml-1 bg-white"
        animate={cursorControls}
      />
    </div>
  );
};

const HeroInfo = () => {
  const maskImages = [
    '/global/images/hero/hero-background-bottom-line-1.png',
    '/global/images/hero/hero-background-bottom-line-2.png',
    '/global/images/hero/hero-background-bottom-line-3.png',
    '/global/images/hero/hero-background-bottom-line-4.png',
    '/global/images/hero/hero-background-bottom-ray.png'
  ];

  const companyLogos = [
    '/global/images/partner/logo_facebook.png',
    '/global/images/partner/logo_google.png',
    '/global/images/partner/logo_microsoft.png',
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-screen bg-[#0a0118]">
        <div className="absolute top-[10%] sm:top-[15%] md:top-[20%] left-0 sm:left-[8%] pointer-events-none w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] z-50">
          <div className="relative w-full h-[202px] mb-[85px] bg-hero-background-top bg-no-repeat bg-contain">
            <div 
              className="w-full h-full absolute top-0 left-0 mix-blend-overlay bg-no-repeat bg-contain"
              style={{ 
                '-webkit-mask-image': 'url(/global/images/hero/hero-background-top-mask.png)', 
                'mask-image': 'url(/global/images/hero/hero-background-top-mask.png)'
              }}
            >
            <div 
              className="relative top-0 animate-topAnimation bg-hero-gradient-top h-[200px] w-full translate-y-[-202px]"
            ></div>
            </div>
          </div>
          <div className="hero-background-bottom">
            <div className="hero-background-bottom-background">
              <picture>
                <source media="(max-width: 1248px)" srcSet="/global/images/hero/mobile/hero-background.png" />
                <img alt="alt_text_1" src="/global/images/hero/hero-background-bottom.png" />
              </picture>
            </div>
            <div
              style={{ 'mask-image': "url('/global/images/hero/hero-background-bottom-line-1.png')" }}
              className="lazy-background-image lazy-background-image-maskImage-1 lazy-background-image-loaded hero-background-bottom-line-animation"
            >
              <div></div>
            </div>
            <div
              style={{ 'mask-image': "url('/global/images/hero/hero-background-bottom-line-2.png')" }}
              className="lazy-background-image lazy-background-image-maskImage-2 lazy-background-image-loaded hero-background-bottom-line-animation"
            >
              <div></div>
            </div>
            <div
              style={{ 'mask-image': "url('/global/images/hero/hero-background-bottom-line-3.png')" }}
              className="lazy-background-image lazy-background-image-maskImage-3 lazy-background-image-loaded hero-background-bottom-line-animation"
            >
              <div></div>
            </div>
            <div
              style={{ 'mask-image': "url('/global/images/hero/hero-background-bottom-line-4.png')" }}
              className="lazy-background-image lazy-background-image-maskImage-4 lazy-background-image-loaded hero-background-bottom-line-animation"
            >
              <div></div>
            </div>
            <div
              style={{ 'mask-image': "url('/global/images/hero/hero-background-bottom-ray.png')" }}
              className="lazy-background-image lazy-background-image-maskImage-5 lazy-background-image-loaded hero-background-bottom-ray-animation"
            >
              <div></div>
            </div>
          </div>
          <div className="absolute top-[15%] left-0 xl:left-[8%] flex flex-col justify-center w-full xl:w-1/2 mx-0 h-[30%] px-3">
            <div className="flex">
              <div className="w-1/2">
                <h2 className="text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Telamonix <span>provide solutions for</span></h2>
              </div>
              <div className="flex justify-center items-center w-full">
                <b className="relative h-[50px] float-left top-0 overflow-hidden">
                  <div className="relative inline-block whitespace-nowrap text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-purple-600 bg-clip-text animate-gradient bg-[200%_200%] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl px-1 animate-moveTxt">
                    INDIVIDUALS<br />
                    STARTUPS<br />
                    ENTERPRICES
                  </div>
                </b>
              </div>
            </div>
            <hr className="w-full h-full flex" />
            <div className="relative w-full h-full py-4 sm:py-6 md:py-8 lg:py-10">
              <TypewriterEffect 
                texts={[
                  "Telamonix provides optimal solutions to your problems.",
                  "We transform ideas into reality.",
                  "Innovate, Create, Succeed with Telamonix."
                ]} 
                speed={50} 
                delayBetweenTexts={2000}
              />
            </div>
            <div className="mt-4 sm:mt-6 md:mt-8">
              <h3 className="text-white text-sm sm:text-base md:text-lg">Partnered With</h3>
              <div className="mt-2 sm:mt-4 overflow-hidden">
                <div className="flex animate-marquee max-w-[200px] sm:max-w-[250px]">
                  {companyLogos.map((logo, index) => (
                    <Image
                      key={index}
                      src={logo}
                      alt={`Company Logo ${index + 1}`}
                      width={24} 
                      height={24}
                      className="mx-2 sm:mx-4"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-4 sm:mt-6 md:mt-8">
              <div className="text-center">
                <h4 className="text-white text-xs sm:text-sm md:text-base">Projects</h4>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">50+</div>
              </div>
              <div className="text-center">
                <h4 className="text-white text-xs sm:text-sm md:text-base">Experience</h4>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">5+</div>
              </div>
              <div className="text-center">
                <h4 className="text-white text-xs sm:text-sm md:text-base">Rating</h4>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">5</div>
              </div>
            </div>
            <div className="relative mt-4 sm:mt-6 md:mt-8 pointer-events-auto cursor-pointer">
              <CustomButton text="Booking" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const Hero = () => {
  const headingRef = useRef();
  
  useEffect(() => {
    gsap.from(headingRef.current, {
      duration: 1,
      y: 100,
      opacity: 0,
      ease: 'power3.out',
    });
  }, []);

  return (
    <section className="relative w-full h-full bg-black rounded-b-3xl overflow-hidden">
      <div className="container mx-auto px-0 xl:px-4">
        <div className="flex flex-col xl:flex-row min-h-screen h-full">
          <div className="w-full flex xl:w-1/2 py-8 xl:py-0">
            <HeroInfo />
          </div>
          <div className="hidden xl:block w-1/2 relative">
            <HeroScene />
          </div>
        </div>
      </div>
    </section>
  );
};

const Ball = ({ texture, name, text, position }) => {
  const [decal] = useTexture([texture]);
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    meshRef.current.lookAt(x, y, 5);
  });

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        castShadow
        receiveShadow
        scale={clicked ? 1 : 0.75}
        onClick={() => setClicked(!clicked)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={hovered ? '#ff8eb3' : '#ffffff'}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={2}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

const Cloud = ({ technologies }) => {
  const groupRef = useRef();
  const positions = useMemo(() => {
    return technologies.map(() => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 1.75 + Math.random() * 2;
      return new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta) + 3,
        radius * Math.cos(phi)
      );
    });
  }, [technologies]);

  const targetX = 3;
  const startX = 0;
  const animationDuration = 2; // Duration in seconds
  const startTime = useRef(null);

  useEffect(() => {
    startTime.current = Date.now() / 1000; // Set start time when component mounts
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      const currentTime = Date.now() / 1000;
      const elapsedTime = currentTime - startTime.current;
      const progress = Math.min(elapsedTime / animationDuration, 1);
      
      // Easing function (ease-out cubic)
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      const newX = startX + (targetX - startX) * easeOutCubic(progress);
      groupRef.current.position.x = newX;
    }
  });

  return (
    <group ref={groupRef} position={[startX, 2.5, 12.5]}>
      {technologies.map((tech, index) => (
        <Ball key={`${tech.name}-${index}`} texture={tech.texture} name={tech.name} text={tech.text} position={positions[index]} />
      ))}
    </group>
  );
};

const Scene = () => {
  const groupRef = useRef();
  const { viewport } = useThree();

  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    //groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.1, 0.1);
    //groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.1, 0.1);
  });

  return (
    <group ref={groupRef} position={[8, -5, -10.5]} scale={1.2} rotation={[0, -Math.PI / 4, 0]}>
      <FloatLaptop />
      <Cloud technologies={technologies} />
    </group>
  );
};

const HeroScene = () => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 20], fov: 55 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <React.Suspense fallback={null}>
        <Scene />
        <Environment preset="city" />
      </React.Suspense>
      <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />
      <Preload all />
    </Canvas>
  );
};

export default Hero;



