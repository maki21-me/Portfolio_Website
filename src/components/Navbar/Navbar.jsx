import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";   // ⬅ IMPORTANT
import DarkMode from "./DarkMode";
import LogoImage from "../../assets/Images/logo.png";

const Menu = [
  { id: 1, title: "Home", link: "/" },
  { id: 2, title: "Projects", link: "/projectsPage" },
  { id: 3, title: "Contact", link: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent shadow-none">
      <div className="max-w-[1400px] mx-auto px-6 py-3 grid grid-cols-3 items-center">
        
   {/* LEFT: Logo + DarkMode */}
<div className="flex items-center gap-4">
  {/* Logo + Name */}
  <a href="/" className="flex flex-col items-center ml-2 select-none">
    <motion.img
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      src={LogoImage}
      alt="logo"
      className="w-6 h-6 object-contain" // small logo
    />
    <span className="text-xs font-semibold text-gray-900 dark:text-gray-200 mt-1">
      Meklit
    </span>
  </a>

  {/* Dark Mode button */}
  <button
    className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 px-3 py-1.5 rounded-full transition-colors"
    aria-label="Switch dark/light mode"
  >
    <DarkMode />
  </button>
</div>


        {/* CENTER MENU */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="
            hidden md:flex justify-center items-center gap-3
            bg-white dark:bg-zinc-800
            px-6 py-1 rounded-full shadow-md
            border border-gray-200 dark:border-zinc-700
            mx-auto
          "
        >
          {Menu.map((menu) => (
            <Link
              key={menu.id}
              to={menu.link}
              className="
                text-[15px] font-medium px-3 py-1 rounded-full transition
                text-gray-700 dark:text-gray-300
                hover:bg-gray-200 dark:hover:bg-zinc-700
                hover:text-black dark:hover:text-white
                hover:scale-105
              "
            >
              {menu.title}
            </Link>
          ))}
        </motion.nav>

        <div className="hidden md:block"></div>

        {/* MOBILE MENU TOGGLE */}
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
          className="md:hidden bg-white dark:bg-zinc-900 p-4 space-y-4 shadow-lg rounded-xl"
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
