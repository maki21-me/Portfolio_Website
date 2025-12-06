import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import LogoImage from "../../assets/Images/logo.png";

const Menu = [
  { id: 1, title: "Home", link: "/" },
  { id: 2, title: "Projects", link: "/projectsPage" },
  { id: 3, title: "Contact", link: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply the theme on initial render
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50
      bg-white/40 dark:bg-black/30 backdrop-blur-xl
      shadow-lg border-b border-white/20 dark:border-zinc-700/30"
    >
      <div className="max-w-[1500px] mx-auto px-4 py-2 grid grid-cols-3 items-center">
        
        {/* LEFT: Logo + Dark Mode SVG */}
        <div className="flex items-center ml-3">
          {/* LOGO */}
          <a href="/" className="flex flex-col items-center select-none mr-6">
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              src={LogoImage}
              alt="logo"
              className="w-7 h-7 object-contain"
            />
            <span className="text-xs font-semibold text-gray-900 dark:text-gray-200 mt-1">
              Meklit
            </span>
          </a>

          {/* DARK MODE BUTTON */}
          <div className="ml-6">
            <button
              onClick={toggleDarkMode}
              className="btn bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 px-4 py-2 rounded-md transition-colors"
              aria-label="Switch to dark mode"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-sun"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* CENTER MENU (DESKTOP) */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="
            hidden md:flex justify-center items-center gap-5
            bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl
            px-10 py-3 rounded-full shadow-xl
            border border-gray-300/40 dark:border-zinc-700/40
          "
        >
          {Menu.map((menu) => (
            <Link
              key={menu.id}
              to={menu.link}
              className="
                text-[18px] font-semibold px-5 py-2.5 rounded-full transition
                text-gray-800 dark:text-gray-200
                hover:bg-gray-200 dark:hover:bg-zinc-700
                hover:text-black dark:hover:text-white
                hover:scale-110
              "
            >
              {menu.title}
            </Link>
          ))}
        </motion.nav>

        <div className="hidden md:block"></div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden flex justify-end">
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <HiX className="text-3xl text-gray-900 dark:text-gray-100" />
            ) : (
              <HiMenu className="text-3xl text-gray-900 dark:text-gray-100" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="md:hidden bg-white/90 dark:bg-zinc-900/90 
            p-4 space-y-4 shadow-lg rounded-xl backdrop-blur-xl"
        >
          {Menu.map((menu) => (
            <Link
              key={menu.id}
              to={menu.link}
              onClick={() => setOpen(false)}
              className="
                block w-full text-left px-4 py-2 rounded-lg text-base font-medium transition
                text-gray-700 dark:text-gray-300
                hover:bg-gray-200 dark:hover:bg-zinc-700
                hover:text-black dark:hover:text-white
                hover:scale-105
              "
            >
              {menu.title}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  );
}
