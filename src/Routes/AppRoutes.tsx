import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Services from "../Pages/Service";
// import ConsultingPayment from "../Pages/ConsultingPay";
// import ProductOrderPayment from "../Pages/ProductOrderPay";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/services" element={<Services />} />
  </Routes>
);

export default AppRoutes;