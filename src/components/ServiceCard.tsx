import React, { useState } from "react";
import PayAndFeedback from "./PayAndFeedback";
import img1 from "../assets/illustrations/GmlaTal2.png";
import img2 from "../assets/illustrations/college1.png";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string; // keep string if you want, else number recommended
  darkMode?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  price,
  darkMode,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Dummy images and feedbacks - replace or pass as props as needed
  const images = [img1, img2];

  const feedbacks = [
    "Amazing service! Highly recommended.",
    "Helped me a lot with my career growth.",
  ];

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className={`p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h3
          className={`text-2xl font-bold mb-2 ${
            darkMode ? "text-purple-300" : "text-blue-800"
          }`}
        >
          {title}
        </h3>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          {description}
        </p>
        <p
          className={`font-semibold text-xl ${
            darkMode ? "text-cyan-400" : "text-blue-600"
          }`}
        >
          ₹{price}
        </p>
      </div>

      <PayAndFeedback
        // isOpen={modalOpen}
        // onClose={() => setModalOpen(false)}
        // title={title}
        // description={description}
        price={Number(price)}
        // images={images}
        // feedbacks={feedbacks}
      />
    </>
  );
};

export default ServiceCard;

// <>
//   <h3 className={`text-2xl font-bold mb-2 ${darkMode ? "text-purple-300" : "text-blue-800"}`}>{title}</h3>
//   <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{description}</p>
//   <p className={`font-semibold text-xl ${darkMode ? "text-cyan-400" : "text-blue-600"}`}>₹{price}</p>

// </>
