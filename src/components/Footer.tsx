import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../utils/animations";
import { Heart } from "lucide-react";

const Footer: React.FC = () => (
  <motion.footer
    className="relative bg-black text-gray-400 text-center py-8 px-4 border-t border-gray-700 mt-auto"
    variants={fadeInUp}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
  >
    <div className="flex flex-col items-center space-y-2">
      <p className="text-sm">
        Made with{" "}
        <span className="inline-flex items-center text-pink-500">
          <Heart size={16} className="mx-1 animate-pulse" />{" "}
        </span>
        & code © {new Date().getFullYear()} <span className="text-white font-semibold">YourName</span>
      </p>
      <p className="text-xs tracking-widest uppercase text-gray-500">All rights reserved</p>
    </div>
  </motion.footer>
);

export default Footer;
