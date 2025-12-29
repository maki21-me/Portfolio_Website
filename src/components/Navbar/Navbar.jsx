import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-zinc-700">
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex items-center max-w-[1500px] mx-auto px-6 py-3 justify-between">
        {/* LEFT: Logo */}
        <Link to="/" className="flex flex-col items-center">
          <img src={LogoImage} alt="logo" className="w-10 h-10" />
          <span className="text-base font-semibold text-gray-900 dark:text-gray-200">
            Meklit
          </span>
        </Link>

        {/* CENTER: Empty for spacing */}
        <div />

        {/* RIGHT: Links + Theme */}
        <div className="flex items-center gap-6">
          {/* Navbar Links */}
          <nav className="flex gap-4 bg-white/80 dark:bg-zinc-800/80 px-5 py-2 rounded-full shadow-md">
            {Menu.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="px-4 py-2 text-[18px] font-semibold rounded-full
                  text-gray-800 dark:text-gray-200
                  hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Dark/Light Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-200 dark:bg-zinc-700 px-3 py-2 rounded-md text-lg"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex flex-col items-center">
          <img src={LogoImage} alt="logo" className="w-7 h-7" />
          <span className="text-xs font-semibold text-gray-900 dark:text-gray-200">
            Meklit
          </span>
        </Link>

        {/* Right: Theme + Hamburger */}
        <div className="flex items-center gap-3">
          {/* Dark/Light Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-200 dark:bg-zinc-700 px-3 py-2 rounded-md text-lg"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <HiX className="text-3xl text-gray-900 dark:text-gray-100" />
            ) : (
              <HiMenu className="text-3xl text-gray-900 dark:text-gray-100" />
            )}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="md:hidden bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700 shadow-lg">
          <nav className="flex flex-col items-end px-6 py-6 gap-6">
            {Menu.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                onClick={() => setOpen(false)}
                className="text-lg font-semibold text-gray-800 dark:text-gray-200"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
