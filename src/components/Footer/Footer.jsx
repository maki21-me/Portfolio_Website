import React, { useEffect, useState } from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import LogoImage from "../../assets/Images/logo.png";

export default function Footer() {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowArrow(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-gray-50 dark:bg-zinc-900 py-12"> {/* reduced vertical padding */}
      <div className="max-w-6xl mx-auto px-6">

        {/* Connect Section */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Connect with me
          </h2>
          <div className="flex justify-center items-center gap-6">
            {[{
              href: "https://github.com/maki21-me",
              icon: <FaGithub className="text-gray-800 dark:text-gray-200" />,
              hover: "hover:text-black dark:hover:text-white"
            },{
              href: "https://www.linkedin.com/in/meklit-anteneh-87454b360",
              icon: <FaLinkedin className="text-blue-600" />,
              hover: "hover:text-blue-800"
            },{
              href: "https://www.instagram.com/meklit_anteneh/",
              icon: <FaInstagram className="text-pink-500" />,
              hover: "hover:text-pink-700"
            }].map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className={`w-16 h-16 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow-md transition ${item.hover}`} // increased size
              >
                <span className="text-2xl">{item.icon}</span> {/* bigger icons */}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="w-full border-t border-gray-300 dark:border-gray-700 mb-6"></div> {/* reduced margin */}

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <img src={LogoImage} alt="logo" className="w-9 h-9 object-contain" />
            <span className="font-semibold text-gray-900 dark:text-gray-200 text-base">
              Meklit
            </span>
          </motion.div>

          {/* Copyright */}
          <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-right">
            © 2025 Meklit Anteneh. All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll To Top Arrow */}
      <AnimatePresence>
        {showArrow && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed right-6 bottom-6 w-12 h-12 flex items-center justify-center 
                       border-2 border-gray-600 dark:border-gray-400 
                       text-gray-700 dark:text-gray-300 
                       rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 shadow-lg transition"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="text-lg" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
