import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CarouselItem = styled(motion.div)`
  padding: 0 10px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 20px;
  color: white;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 15px;
`;

const Button = styled(motion.a)`
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const ProgressBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: #3498db;
`;

const Blog = () => {
  const items = [
    {
      image: "/global/additionals/ai.jpg",
      link: "/blogs",
      title: "The AI Revolution",
      description: "Explore how AI is transforming industries and our daily lives."
    },
    {
      image: "/global/additionals/ai-1.jpg",
      link: "/blogs",
      title: "The Future of Work",
      description: "Discover how AI and automation are reshaping the job market."
    },
    {
      image: "/global/additionals/ai-2.jpg",
      link: "/blogs",
      title: "Ethical AI",
      description: "Delve into the ethical considerations surrounding AI development."
    },
    {
      image: "/global/additionals/ai-3.jpg",
      link: "/blogs",
      title: "AI in Healthcare",
      description: "Learn about the groundbreaking applications of AI in medicine."
    },
    {
      image: "/global/additionals/ai-4.jpg",
      link: "/blogs",
      title: "AI and Creativity",
      description: "Explore how AI is influencing art, music, and design."
    },
    {
      image: "/global/additionals/ai-5.jpg",
      link: "/blogs",
      title: "AI in Education",
      description: "Discover how AI is revolutionizing learning and teaching methods."
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Latest Blog Posts</h2>
        <Carousel
          responsive={responsive}
          showDots={false}
          autoPlay
          infinite
          autoPlaySpeed={5000}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {items.map((item, index) => (
            <CarouselItem key={index} whileHover={{ scale: 1.05 }}>
              <CarouselImage src={item.image} alt={item.title} />
              <Overlay
                initial={{ opacity: 0, y: 50 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Title>{item.title}</Title>
                <Description>{item.description}</Description>
                <Button
                  target="_blank"
                  href={item.link}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read More
                </Button>
              </Overlay>
              <ProgressBar
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear", repeat: Infinity }}
              />
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Blog;