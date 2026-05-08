import React, { useState } from "react";
import PayAndFeedback from "./PayAndFeedback";
import { ArrowRight, Tag, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

// The interface is now more flexible with the price type from JSON
interface ServiceCardProps {
    title: string;
    description: string;
    price: string | number; // Handles both string from JSON and number
    images?: string[];
    feedbacks?: string[];
    features?: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({
                                                     title,
                                                     description,
                                                     price,
                                                     images = [],
                                                     feedbacks = [],
                                                     features = [],
                                                 }) => {
    const [modalOpen, setModalOpen] = useState(false);

    // Ensure price is a number for calculations and formatting
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

    const handleOpenModal = () => setModalOpen(true);

    // Make the card accessible via keyboard
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOpenModal();
        }
    };

    return (
        <>
            <motion.div
                onClick={handleOpenModal}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${title}`}
                className="group flex flex-col justify-between h-full p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gray-800/50 border border-gray-700 cursor-pointer transition-all duration-300 ease-in-out hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10"
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
            >
                {/* Main Content */}
                <div>
                    {/* Title */}
                    <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3 text-cyan-300 group-hover:text-cyan-200 transition-colors text-center">
                        {title}
                    </h3>

                    {/* Description - Clamped to 3 lines to keep card heights consistent */}
                    <p className="mb-4 sm:mb-6 text-gray-400 line-clamp-3 text-xs sm:text-base text-center">
                        {description}
                    </p>
                </div>

                {/* Footer section of the card */}
                <div className="mt-auto">
                    {/* Price */}
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-4">
                        <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                        <p className="font-semibold text-base sm:text-2xl text-purple-300">
                            ₹{numericPrice.toLocaleString('en-IN')}
                        </p>
                    </div>

                    {/* Call to Action */}
                    <div className="flex items-center justify-center text-cyan-400 font-semibold text-xs sm:text-base mb-2 sm:mb-3">
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </div>

                    {/* WhatsApp Book button */}
                    <a
                        href={`https://wa.me/919770075755?text=Hi%20Abeer!%20I'm%20interested%20in%20your%20${encodeURIComponent(title)}%20service.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center gap-1.5 w-full py-2 sm:py-2.5 rounded-lg bg-green-600 hover:bg-green-500 text-white text-xs sm:text-sm font-semibold transition-colors duration-200"
                    >
                        <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                        Book via WhatsApp
                    </a>
                </div>
            </motion.div>
            {/* Modal: Pass all service data to PayAndFeedback */}
            <PayAndFeedback
                isOpen={modalOpen}
                setIsOpen={setModalOpen}
                service={{
                    title,
                    description,
                    price: numericPrice,
                    images,
                    feedbacks,
                    availability: true,
                    features
                }}
            />
        </>
    );
};

export default ServiceCard;