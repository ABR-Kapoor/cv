import React, { useEffect, useState } from "react";
import axios from "axios";


// interface PayAndFeedbackProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   description: string;
//   price: number; // number for payment
//   images: string[];
//   feedbacks: string[];
// }

// const PayAndFeedback: React.FC<PayAndFeedbackProps> = ({
//   isOpen,
//   onClose,
//   title,
//   description,
//   price,
//   images,
//   feedbacks,
// }) => {
//   useEffect(() => {
//     // Dynamically load Razorpay script if not already loaded
//     if (!document.getElementById("razorpay-script")) {
//       const script = document.createElement("script");
//       script.id = "razorpay-script";
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.async = true;
//       document.body.appendChild(script);
//     }
//   }, []);

//   const handlePayment = async () => {
//     try {
//       // Call your backend to create an order
//       const res = await fetch("/api/create_order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ amount: price * 100 }), // amount in paise
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Failed to create order");

//       const options = {
//         key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
//         amount: data.amount, // in paise
//         currency: data.currency,
//         name: "Radhe's Portfolio",
//         description: title,
//         order_id: data.id, // Razorpay order ID
//         handler: function (response: any) {
//           alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
//           onClose();
//           // You can also verify payment here by calling your backend
//         },
//         modal: {
//           ondismiss: function () {
//             alert("Payment cancelled");
//           },
//         },
//         prefill: {
//           name: "", // Optional customer details
//           email: "",
//           contact: "",
//         },
//         theme: {
//           color: "#6b46c1",
//         },
//       };

//       const rzp = new (window as any).Razorpay(options);
//       rzp.open();
//     } catch (error: any) {
//       alert("Payment failed: " + error.message);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-4xl w-full relative"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//           onClick={onClose}
//           aria-label="Close"
//         >
//           ✕
//         </button>

//         <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
//         <p className="mb-6 text-gray-700 dark:text-gray-300">{description}</p>
//         <div className="flex space-x-4 overflow-x-auto mb-6">
//           {images.map((src, idx) => (
//             <img
//               key={idx}
//               src={src}
//               alt={`${title} image ${idx + 1}`}
//               className="w-32 h-20 rounded-md object-cover shadow-md"
//             />
//           ))}
//         </div>
//         <div className="mb-6">
//           <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Feedbacks</h3>
//           <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
//             {feedbacks.map((fb, idx) => (
//               <li key={idx}>{fb}</li>
//             ))}
//           </ul>
//         </div>
//         <button
//           onClick={handlePayment}
//           className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md transition"
//         >
//           Pay ₹{price}
//         </button>
//       </div>
//     </div>
//   );
// };


type Props = {
  price: number;
};

const PayAndFeedback: React.FC<Props> = ({ price }) => {
  const handlePayment = async () => {
    try {
      const response = await axios.get("http://localhost:8080/about");
      alert(response.data.msg);
    } catch (error) {
      console.error("API Error:", error);
      alert("CORS or server error occurred");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md transition"
    >
      Pay ₹{price}
    </button>
  );
};

export default PayAndFeedback;


