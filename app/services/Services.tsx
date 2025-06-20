"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  featured?: boolean;
}

const services: Service[] = [
  { 
    id: 1, 
    title: "Oil and Filter Change", 
    description: "Premium synthetic oils and genuine filters for optimal engine performance",
    image: "/t-1.jpg",
    featured: true 
  },
  { 
    id: 2, 
    title: "AC/Cooling System", 
    description: "Complete diagnostics and repair for all climate control systems",
    image: "/f-6.jpg" 
  },
  { 
    id: 3, 
    title: "Brake & Tire Service", 
    description: "Safety inspection and performance upgrades for your braking system",
    image: "/f-2.jpg",
    featured: true 
  },
  { 
    id: 4, 
    title: "Electrical Repairs", 
    description: "Advanced diagnostics and wiring solutions for modern vehicles",
    image: "/f-4.jpg" 
  },
  { 
    id: 5, 
    title: "Bodywork Repair", 
    description: "Dent removal, painting, and full collision restoration",
    image: "/f-5.jpg" 
  },
  { 
    id: 6, 
    title: "Performance Upgrades", 
    description: "Turbo installations, exhaust systems, and ECU tuning",
    image: "/f-7.jpg",
    featured: true 
  },
  { 
    id: 7, 
    title: "Custom Paint & Wraps", 
    description: "Color changes, protective coatings, and custom designs",
    image: "/f-3.jpg" 
  },
  { 
    id: 8, 
    title: "Genuine Parts Only", 
    description: "All repairs use OEM-certified components for lasting quality",
    image: "/f-1.jpg" 
  },
];

const Services = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section 
      ref={containerRef}
      className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black"
      id="services"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="text-red-500 font-semibold mb-2 block">OUR EXPERTISE</span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Premium <span className="text-red-600">Auto Services</span>
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          At Turbo Cars, we deliver precision engineering and exceptional care for your vehicle.
        </p>
      </motion.div>

      {/* All Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard 
            key={service.id}
            service={service} 
            index={index} 
            isInView={isInView} 
          />
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        // transition={{ delay: 0.6 }}
        className="text-center mt-20"
      >
        <button className="relative overflow-hidden group bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300">
          <span className="relative z-10">View All Services</span>
          <span className="absolute inset-0 bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </motion.div>
    </section>
  );
};

const ServiceCard = ({ service, index, isInView }: { service: Service, index: number, isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ 
      duration: 0.6, 
      // delay: index * 0.6,
      type: "spring",
      damping: 10,
      stiffness: 100
    }}
    whileHover={{ 
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(220, 38, 38, 0.1)"
    }}
    className="bg-gray-800 rounded-xl overflow-hidden shadow-xl transition-all duration-300 border-b-4 border-red-500"
  >
    <div className="relative h-64 overflow-hidden">
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover transition-transform duration-700 hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={index < 3} // optionally prioritize first 3 images
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
    </div>
    
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
      <p className="text-gray-400 mb-4 min-h-[60px]">{service.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-red-500 font-medium">Learn More →</span>
      </div>
    </div>
  </motion.div>
);

export default Services;
