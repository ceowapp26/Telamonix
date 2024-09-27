import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion } from 'framer-motion';
import React, { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { Decal, Float, OrbitControls, Preload, useTexture, Text, Billboard, Sphere, MeshDistortMaterial, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { technologies } from "@/constants/landing";
import FloatLaptop from "./FloatLaptop";
import Image from 'next/image'

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
        <div className="absolute top-[133px] left-[8%] pointer-events-none w-[1248px] z-50">
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
          <div className="absolute top-[30%] left-[8%] flex flex-col justify-center w-1/2 h-[30%]">
            <div className="flex">
              <div className="w-1/2">
                <h2 className="text-2xl font-bold text-white">The all-in-one education platform for</h2>
              </div>
              <div className="w-1/2">
                <b>
                  <div className="text-2xl font-bold text-white">
                    STUDENTS<br />
                    TEACHERS<br />
                    EDUCATORS
                  </div>
                </b>
              </div>
            </div>
            <hr className="w-[30%] my-4 ml-[15%] border-white" />
            <p className="text-lg text-white">
              K2Edu provides the best education tools and knowledge base for everyone.
            </p>
            <div className="mt-8">
              <h4 className="text-[#F8F8FA]">Trusted By Trailblazers</h4>
              <div className="mt-4 overflow-hidden">
                <div className="flex animate-marquee max-w-[250px]">
                  {companyLogos.map((logo, index) => (
                    <Image
                      key={index}
                      src={logo}
                      alt={`Company Logo ${index + 1}`}
                      width={32} 
                      height={32}
                      className="mx-4"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-around mt-8">
              <div className="text-center">
                <h4 className="text-white">Wallets</h4>
                <div className="text-2xl font-bold text-white">25m</div>
              </div>
              <div className="text-center">
                <h4 className="text-white">Developers</h4>
                <div className="text-2xl font-bold text-white">170k</div>
              </div>
              <div className="text-center">
                <h4 className="text-white">Funding</h4>
                <div className="text-2xl font-bold text-white">$80m+</div>
              </div>
            </div>
            <div className="mt-8">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Get Started
              </button>
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
    <section className="relative h-screen w-full bg-black overflow-hidden">
      <HeroScene />
      <HeroInfo />
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
    <group ref={groupRef} position={[20, -5, -10.5]} scale={1.2} rotation={[0, -Math.PI / 4, 0]}>
      <FloatLaptop />
      <Cloud technologies={technologies} />
    </group>
  );
};

const HeroScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 55 }} style={{ width: '100vw', height: '100vh' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={null}>
        <Scene />
        <Environment preset="city" />
      </Suspense>
      <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />
      <Preload all />
    </Canvas>
  );
};

export default Hero;

