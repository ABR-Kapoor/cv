import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

const App: React.FC = () => (
  <BrowserRouter>
    <div className="flex flex-col min-h-screen h-screen overflow-y-scroll scrollbar-hide">
      <Navbar />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
