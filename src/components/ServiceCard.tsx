import React, { useState } from "react";
import PayAndFeedback from "./PayAndFeedback";
import { ArrowRight, Tag } from "lucide-react"; // Using lucide-react for icons
import { motion } from "framer-motion";

// The interface is now more flexible with the price type from JSON
interface ServiceCardProps {
    title: string;
    description: string;
    price: string | number; // Handles both string from JSON and number
    images?: string[];
    feedbacks?: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({
                                                     title,
                                                     description,
                                                     price,
                                                     images = [],
                                                     feedbacks = [],
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
                className="group flex flex-col justify-between h-full p-6 rounded-2xl bg-gray-800/50 border border-gray-700 cursor-pointer transition-all duration-300 ease-in-out hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10"
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
            >
                {/* Main Content */}
                <div>
                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-3 text-cyan-300 group-hover:text-cyan-200 transition-colors">
                        {title}
                    </h3>

                    {/* Description - Clamped to 3 lines to keep card heights consistent */}
                    <p className="mb-6 text-gray-400 line-clamp-3">
                        {description}
                    </p>
                </div>

                {/* Footer section of the card */}
                <div className="mt-auto">
                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                        <Tag className="w-5 h-5 text-purple-400" />
                        <p className="font-semibold text-2xl text-purple-300">
                            ₹{numericPrice.toLocaleString('en-IN')}
                        </p>
                    </div>

                    {/* Call to Action */}
                    <div className="flex items-center text-cyan-400 font-semibold">
                        <span>View Details</span>
                        <ArrowRight className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
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
                    features: []
                }}
            />
        </>
    );
};

export default ServiceCard;