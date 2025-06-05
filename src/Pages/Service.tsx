import React, { useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { motion } from "framer-motion";
import BulbToggle from "../components/BulbToggle";

const services = [
  {
    title: "🔥 1-on-1 Consulting",
    description: "Personalized career & tech advice.",
    price: "499",
  },
  {
    title: "🚀 Resume Review",
    description: "Supercharge your CV for MNCs.",
    price: "299",
  },
  {
    title: "🎯 Portfolio Feedback",
    description: "Get UI/UX suggestions & code tips.",
    price: "199",
  },
  {
    title: "🧠 Mock Interview",
    description: "Get grilled like a pro before your real one.",
    price: "599",
  },
];

const Services: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      className={`${
        darkMode
          ? "bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-white via-blue-50 to-purple-100 text-gray-900"
      } min-h-screen transition-colors duration-700`}
    >
      <div className="" /> {/* Navbar spacing */}
      <div
        className={`${
          darkMode
            ? "bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white"
            : "bg-gradient-to-br from-white via-blue-50 to-purple-100 text-gray-900"
        } min-h-screen transition-colors duration-700`}
      >
        <div className="flex justify-right max-w-6xl mx-0 py-6 px-15 mb-9">
          <BulbToggle isOn={darkMode} toggle={toggleDarkMode} />
        </div>
        {/* Navbar space placeholder (if navbar fixed) */}
        <div className="h-0"></div>
        {/* Toggle Button */}
        <div className="flex justify-end max-w-6xl mx-auto px-6 mb-8"></div>
        {/* Heading */}
        <motion.h2
          className={`text-4xl md:text-5xl font-extrabold text-center mb-12 max-w-6xl mx-auto
          ${
            darkMode
              ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
              : "text-blue-700"
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🔥 Our Premium Services
        </motion.h2>
        {/* Services Grid */}
        <motion.div
          className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {services.map(({ title, description, price }, idx) => (
            <motion.div
              key={idx}
              className={`rounded-3xl p-8 shadow-2xl cursor-pointer
              ${
                darkMode
                  ? "bg-black/50 backdrop-blur-md border border-purple-700 hover:shadow-[0_0_25px_rgba(99,210,255,0.8)] hover:scale-[1.05] transition-transform"
                  : "bg-white/80 border border-blue-300 hover:shadow-lg hover:scale-[1.05] transition-transform"
              }
            `}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
            >
              <ServiceCard
                title={title}
                description={description}
                price={price}
                darkMode={darkMode}
              />
            </motion.div>
          ))}
        </motion.div>
        <div className="h-32"></div> {/* bottom padding */}
      </div>
    </div>
  );
};

export default Services;
