import React from "react";
import ServiceCard from "../components/ServiceCard";
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { useInsForge } from "../hooks/useInsForge";
import { fetchServices, type Service } from "../lib/api";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

const WHATSAPP_BASE =
  "https://wa.me/919343236290?text=Hi%20Abeer!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20book%20a%20free%20consultation%20call.";

const Services: React.FC = () => {
  const { data: services, loading, error } = useInsForge<Service[]>(fetchServices, []);

  return (
    <div className="relative min-h-screen pt-20 sm:pt-32 pb-10 sm:pb-20 px-2 sm:px-4 flex flex-col items-center justify-start overflow-x-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Decorative blurred gradient background */}
      <div className="absolute top-0 left-0 w-full h-32 sm:h-72 bg-gradient-to-r from-cyan-400/30 via-purple-400/20 to-transparent blur-2xl pointer-events-none z-0" />

      <motion.h1
        className="relative z-10 text-2xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-4 text-center drop-shadow-lg text-cyan-300"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Business Services
      </motion.h1>

      <motion.p
        className="relative z-10 max-w-xs sm:max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-center mb-4 sm:mb-6 text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Unlock your potential with expert-led services. Whether you're a professional, entrepreneur, or student — I help you grow, stand out, and succeed.
      </motion.p>

      {/* Book a Free Call + Phone CTA */}
      <motion.div
        className="relative z-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-6 sm:mb-10 w-full justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
      >
        <a
          href="tel:+919343236290"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800/80 border border-green-500/40 text-green-400 hover:bg-green-900/40 hover:border-green-400 transition-all duration-200 text-sm sm:text-base font-semibold w-full sm:w-auto justify-center"
        >
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          +91 93432 36290
        </a>
        <a
          href={WHATSAPP_BASE}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold shadow-lg hover:shadow-green-500/30 transition-all duration-200 text-sm sm:text-base w-full sm:w-auto justify-center"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          Book a Free Call
        </a>
      </motion.div>

      <motion.h2
        className="relative z-10 text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-6 text-center text-cyan-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
      >
        Choose Your Solution
      </motion.h2>

      {/* Service Cards */}
      {loading ? (
        <div className="relative z-10 w-full">
          <LoadingState message="Loading services..." />
        </div>
      ) : error ? (
        <div className="relative z-10 w-full">
          <ErrorState message={error} />
        </div>
      ) : (
        <div className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-6 sm:gap-y-10 justify-center mt-2 mb-6 sm:mb-10">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -2 }}
              className="transition-all duration-300 flex justify-center"
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                price={service.price}
                images={service.image_urls}
                feedbacks={service.feedbacks}
                features={service.features}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
