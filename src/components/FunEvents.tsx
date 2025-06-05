// src/components/FunEvents.tsx
import React from "react";
import { motion } from "framer-motion";
import img1 from "../assets/illustrations/GmlaTal2.png";
import img2 from "../assets/illustrations/college1.png";
import img3 from "../assets/illustrations/college2.png";

interface FunEvent {
  title: string;
  description: string;
  image: string;
  alt?: string;
}

const funEvents: FunEvent[] = [
  {
    title: "Cultural Night",
    description: "Dance, drama, music, and more! Let your inner artist shine.",
    image: img1,
    alt: "Cultural Night",
  },
  {
    title: "Gaming Arena",
    description: "Console + LAN battles, retro to modern — test your reflexes!",
    image: img2,
    alt: "Gaming Arena",
  },
  {
    title: "Open Mic & Comedy",
    description: "Roast, rant, or rhyme — the mic is yours.",
    image: img3,
    alt: "Open Mic & Comedy",
  },
  // {
  //   title: "Battle of Bands",
  //   description: "Unleash the rhythm — rock, metal, or desi swag!",
  //   image: "/images/battle-of-bands.jpg",
  //   alt: "Battle of Bands",
  // },
  // {
  //   title: "Art Exhibition",
  //   description: "Showcasing the finest student artworks across mediums.",
  //   image: "/images/art-exhibition.jpg",
  //   alt: "Art Exhibition",
  // },
  // {
  //   title: "Photography Contest",
  //   description: "Capture moments that tell a story.",
  //   image: "/images/photography-contest.jpg",
  //   alt: "Photography Contest",
  // },
  // {
  //   title: "Dance Marathon",
  //   description: "Groove non-stop and win amazing prizes!",
  //   image: "/images/dance-marathon.jpg",
  //   alt: "Dance Marathon",
  // },
  // {
  //   title: "Food Fest",
  //   description: "Delight your taste buds with global cuisines.",
  //   image: "/images/food-fest.jpg",
  //   alt: "Food Fest",
  // },
  // {
  //   title: "Tech Talk",
  //   description: "Cutting-edge tech discussions with industry experts.",
  //   image: "/images/tech-talk.jpg",
  //   alt: "Tech Talk",
  // },
];

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const FunEvents: React.FC = () => {
  return (
    <section id="fun-events" className="py-20 px-6 max-w-7xl mx-auto font-sans">
      <motion.h2
        className="text-5xl font-extrabold mb-14 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Fun Events
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {funEvents.map(({ title, description, image, alt }, idx) => (
          <motion.div
            key={idx}
            className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer group"
            variants={cardVariants}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            tabIndex={0}
          >
            <img
              src={image}
              alt={alt || title}
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4"
              aria-hidden="true"
            >
              <h3 className="text-xl font-semibold text-pink-400 mb-2">{title}</h3>
              <p className="text-sm text-gray-300">{description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FunEvents;
