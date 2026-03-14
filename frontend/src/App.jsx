import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "./components/layout/Navbar/Navbar";
import Home from "./pages/Home/Home";
import About from "./components/sections/About/About";
import Skills from "./components/sections/Skills/Skills";
import Projects from "./components/sections/Projects/Projects";
import Testimonials from "./components/sections/Testimonials/Testimonials";
import Footer from "./components/layout/Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import Contact from "./components/sections/Contact/Contact";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import FloatingBackground from "./components/layout/FloatingBackground";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  return (
    <div className="bg-[#f8f9ff] dark:bg-[#030014] transition-colors duration-500 min-h-screen overflow-x-hidden relative flex flex-col">
      <FloatingBackground />
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full flex-grow flex flex-col"
      >
        <Routes>
          {/* HOME PAGE */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <About />
                <Projects />
                <Skills />
                <Testimonials />
                <Contact />
              </>
            }
          />
          <Route path="/projectsPage" element={<ProjectsPage />} />
        </Routes>
      </motion.div>
      <Footer />
    </div>
  );
}

export default function App() {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
