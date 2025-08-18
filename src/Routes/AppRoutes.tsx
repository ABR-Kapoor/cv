import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Services from "../Pages/Service";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
        </Routes>
    );
};

export default AppRoutes;
