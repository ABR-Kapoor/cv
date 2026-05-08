import { useState, useEffect } from "react";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import personalInfo from "./data/personal_info.json";
import FloatingNavCard from "./components/FloatingNavCard";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const handleScroll = () => setShowScrollTop(window.scrollY > 400);
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isLoading]);

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      {!isLoading && (
        <BrowserRouter>
          <div
            className="min-h-screen flex flex-col"
            style={{ background: "#f7f6f3", minHeight: "100vh", cursor: "none" }}
          >
            <Navbar />
            <main className="flex-grow">
              <AppRoutes />
            </main>
            <Footer personalInfo={personalInfo} darkMode={false} />
            <FloatingNavCard />
            <AnimatePresence>
              {showScrollTop && (
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="fixed right-5 bottom-20 md:bottom-6 z-40 w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    background: "var(--bg-card-strong)",
                    border: "1px solid var(--border-strong)",
                    boxShadow: "var(--shadow-md)",
                    color: "var(--text-muted)",
                  }}
                  aria-label="Back to top"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 11V3M3 6l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </AnimatePresence>
          </div>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
