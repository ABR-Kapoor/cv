import React from "react";
import ServiceCard from "../components/ServiceCard";
import { motion } from "framer-motion";
import servicesData from '../data/services.json';
import { useNavigate } from 'react-router-dom';

const Services: React.FC = () => {
  const navigate = useNavigate();
  const services = servicesData;

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-start overflow-x-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Decorative blurred gradient background */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-r from-cyan-400/30 via-purple-400/20 to-transparent blur-2xl pointer-events-none z-0" />
      <motion.h1
        className="relative z-10 text-4xl md:text-5xl font-extrabold mb-4 text-center drop-shadow-lg text-cyan-300"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Business Services
      </motion.h1>
      <motion.p
        className="relative z-10 max-w-2xl mx-auto text-base md:text-lg text-center mb-6 text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Unlock your potential with our expert-led services. Whether you're a professional, entrepreneur, or student, we help you grow, stand out, and succeed.
      </motion.p>
      <motion.h2
        className="relative z-10 text-lg md:text-xl font-semibold mb-4 text-center text-cyan-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Choose Your Solution
      </motion.h2>
      <div className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 justify-center mt-2 mb-10">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(6,182,212,0.12)", y: -2 }}
            className="transition-all duration-300 flex justify-center"
          >
            <ServiceCard {...service} />
          </motion.div>
        ))}
      </div>
      <motion.div
        className="relative z-10 flex flex-col items-center mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
      </motion.div>
    </div>
  );
};

export default Services;
