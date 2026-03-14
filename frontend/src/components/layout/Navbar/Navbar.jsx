import React, { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LogoImage from "../../../assets/Images/logo.png";

const Menu = [
  { id: 1, title: "Home", link: "/" },
  { id: 2, title: "About", link: "#about" },
  { id: 3, title: "Projects", link: "#projects" },
  { id: 4, title: "Skills", link: "#skills" },
  { id: 5, title: "Contact", link: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-[#030014]/90 backdrop-blur-md border-b border-gray-100 dark:border-blue-900/20">
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex items-center max-w-[1400px] mx-auto px-10 py-5 justify-between">
        
        {/* LEFT: Branding */}
        <Link 
          to="/" 
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.history.pushState(null, "", "/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2 group"
        >
          <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Meklit
          </span>
        </Link>

        {/* RIGHT: Navigation Links + Action Buttons */}
        <div className="flex items-center gap-10">
          <nav className="flex items-center gap-8">
            {Menu.map((item) => (
              item.link.startsWith("#") ? (
                <a
                  key={item.id}
                  href={item.link}
                  className="text-[18px] font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item.title}
                </a>
              ) : (
                <Link
                  key={item.id}
                  to={item.link}
                  onClick={(e) => {
                    if (item.link === "/" && window.location.pathname === "/") {
                      e.preventDefault();
                      window.history.pushState(null, "", "/");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="text-[18px] font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item.title}
                </Link>
              )
            ))}
            <a 
              href="#testimonials" 
              className="text-[18px] font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Reviews
            </a>
          </nav>

          <div className="flex items-center gap-5">
            <Link
              to="/projectsPage"
              className="px-7 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 text-sm whitespace-nowrap"
            >
              All Projects
            </Link>
            
            {/* Theme Toggle Styled with Gradient */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl shadow-md hover:shadow-purple-500/30 transition-all"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden flex items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link 
          to="/" 
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.history.pushState(null, "", "/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Meklit
        </Link>

        {/* Right: Theme + Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>

          <button onClick={() => setOpen(!open)} className="p-1">
            {open ? (
              <HiX className="text-3xl text-gray-900 dark:text-gray-100" />
            ) : (
              <HiMenu className="text-3xl text-gray-900 dark:text-gray-100" />
            )}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="md:hidden absolute top-full right-4 mt-2 w-64 bg-white/95 dark:bg-[#030014]/95 backdrop-blur-xl border border-gray-200 dark:border-blue-900/30 rounded-2xl shadow-2xl p-6 overflow-hidden"
          >
            <nav className="flex flex-col gap-4">
              {Menu.map((item) => (
                item.link.startsWith("#") ? (
                  <a
                    key={item.id}
                    href={item.link}
                    onClick={() => setOpen(false)}
                    className="text-lg font-bold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {item.title}
                  </a>
                ) : (
                  <Link
                    key={item.id}
                    to={item.link}
                    onClick={(e) => {
                      setOpen(false);
                      if (item.link === "/" && window.location.pathname === "/") {
                        e.preventDefault();
                        window.history.pushState(null, "", "/");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className="text-lg font-bold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {item.title}
                  </Link>
                )
              ))}
              <div className="h-px w-full bg-gray-100 dark:bg-blue-900/20 my-2" />
              <Link
                to="/projectsPage"
                onClick={() => setOpen(false)}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl text-center shadow-lg shadow-blue-500/20"
              >
                All Projects
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
