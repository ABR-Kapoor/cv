import { useState, useEffect } from "react";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import personalInfo from "./data/personal_info.json";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [darkMode, setDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const handleScroll = () => {
        setShowScrollTop(window.scrollY > 300);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isLoading]);

  useEffect(() => {
    const handleToggle = () => setDarkMode((prev) => !prev);
    window.addEventListener('toggleDarkMode', handleToggle);
    return () => window.removeEventListener('toggleDarkMode', handleToggle);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900 text-white" : "bg-[#FFF8E7] text-[#7B5E3B]"} glass`}>
        <Navbar />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer personalInfo={personalInfo} darkMode={darkMode} />
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed right-6 bottom-6 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:shadow-cyan-500/25 z-50"
          >
            <span style={{ display: 'inline-block', transform: 'rotate(-90deg)' }}>&uarr;</span>
          </button>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;