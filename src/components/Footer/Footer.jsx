import React from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import LogoImage from "../../assets/Images/logo.png"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-b from-[#D6D8DB] to-[#E8E9EB] dark:from-zinc-700 dark:to-zinc-800 py-16 relative">

      <div className="max-w-6xl mx-auto px-6">
        {/* Connect Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Connect with me
          </h2>

         {/* Outline-style social icons */}
<div className="flex items-center space-x-8 text-3xl text-gray-600 dark:text-gray-300">

  <a
    href="https://github.com/maki21-me"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaGithub className="hover:text-black dark:hover:text-white transition cursor-pointer" />
  </a>

  <a
    href="https://www.linkedin.com/in/meklit-anteneh-87454b360"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaLinkedin className="hover:text-blue-600 transition cursor-pointer" />
  </a>

  <a
    href="https://www.instagram.com/meklit_anteneh/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaInstagram className="hover:text-pink-500 transition cursor-pointer" />
  </a>

</div>

        </div>

        {/* Separator line */}
        <div className="w-full border-t border-gray-400 dark:border-gray-600 my-10"></div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          
          <div className="flex items-center gap-8">
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    className="flex flex-col items-center text-center cursor-pointer select-none"
  >
    <img src={LogoImage} alt="logo" className="w-8 h-8 object-contain" />
    <span className="text-sm font-semibold text-gray-900 dark:text-gray-200">
      Meklit
    </span>
  </motion.div>
  </div>

          {/* Copyright */}
          <p className="text-gray-700 dark:text-gray-400 text-sm">
            © 2025 Meklit Anteneh. All rights reserved.
          </p>
        </div>
      </div>

      {/* Up Arrow (separate, on the far-right) */}
      <button
        onClick={scrollToTop}
        className="absolute right-8 bottom-8 w-11 h-11 flex items-center justify-center 
                   border-2 border-gray-600 dark:border-gray-400 text-gray-700 dark:text-gray-300 
                   rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        aria-label="Scroll to top"
      >
        <FaArrowUp className="text-lg" />
      </button>
      
    </footer>
  );
}
