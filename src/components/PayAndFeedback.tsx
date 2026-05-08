import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
// ...existing code...

interface IService {
  title: string;
  description: string;
  price: number;
  availability: boolean;
  features: string[];
  images: string[];
  feedbacks?: string[];
}

interface PayAndFeedbackProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  service: IService | null;
}

const PayAndFeedback = ({ isOpen, setIsOpen, service }: PayAndFeedbackProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!service) return;
    if (!service.images?.length) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % service.images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [service]);

  if (!service) return null;

  const { title, description, price, features = [], images = [], feedbacks = [] } = service;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer"
          onMouseDown={e => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.97, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.97, y: 20, opacity: 0 }}
            className="bg-gray-800 text-gray-200 p-6 rounded-xl w-full max-w-md shadow-xl cursor-default relative border border-gray-700"
            tabIndex={0}
            aria-modal="true"
            onMouseDown={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-cyan-400 text-xl font-bold"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              ×
            </button>

            {/* Image Carousel */}
            {images.length > 0 && (
                <img
                    src={images[currentImage]}
                    alt={title}
                    className="w-full h-40 object-cover rounded-lg mb-4 border border-gray-700"
                />
            )}

            {/* Title */}
            <h2 className="text-xl font-bold mb-2 text-center text-cyan-300">
              {title}
            </h2>

            {/* Description */}
            <p className="text-gray-400 mb-4 text-sm text-center leading-relaxed">
              {description}
            </p>

            {/* Price */}
            <div className="text-lg font-semibold text-purple-300 text-center mb-4">
              ₹{price.toLocaleString("en-IN")}
            </div>

            {/* Features */}
            {features.length > 0 && (
                <ul className="list-disc list-inside text-sm text-gray-300 mb-4 space-y-1">
                  {features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                  ))}
                </ul>
            )}

            {/* Feedbacks */}
            {feedbacks.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">Feedback</h4>
                  <ul className="list-disc pl-5 text-xs text-gray-400 space-y-1">
                    {feedbacks.map((fb, idx) => (
                        <li key={idx}>{fb}</li>
                    ))}
                  </ul>
                </div>
            )}

            {/* WhatsApp Booking */}
            <a
              href={`https://wa.me/919770075755?text=Hi%20Abeer!%20I%20want%20to%20proceed%20with%20the%20${encodeURIComponent(title)}%20service.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm tracking-wide bg-green-600 hover:bg-green-500 text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 mb-2"
            >
              Book via WhatsApp
            </a>
            <a
              href="tel:+919770075755"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full font-semibold text-sm bg-gray-700 hover:bg-gray-600 text-gray-200 transition-all duration-200"
            >
              Call: +91 97700 75755
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PayAndFeedback;
