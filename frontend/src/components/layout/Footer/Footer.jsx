import React, { useEffect, useState } from "react";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowArrow(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const quickLinks = [
    { title: "Home", link: "/" },
    { title: "About", link: "#about" },
    { title: "Projects", link: "#projects" },
    { title: "Contact", link: "#contact" },
  ];

  const socialLinks = [
    { icon: <FiGithub />, link: "https://github.com/maki21-me" },
    { icon: <FiLinkedin />, link: "https://www.linkedin.com/in/meklit-anteneh-87454b360" },
    { icon: <FiTwitter />, link: "https://twitter.com" },
    { icon: <FiMail />, link: "mailto:meklitanteneh58@gmail.com" },
  ];

  return (
    <footer className="relative bg-[#030014] dark:bg-[#030014] text-white pt-20 pb-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">

          {/* Column 1: Branding */}
          <div className="space-y-6">
            <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight inline-block">
              Meklit
            </Link>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-xs font-medium">
              Crafting beautiful digital experiences with creativity and precision.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white tracking-wide">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  {item.link.startsWith("#") ? (
                    <a
                      href={item.link}
                      className="text-zinc-400 hover:text-white transition-colors text-[17px] font-medium"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <Link
                      to={item.link}
                      className="text-zinc-400 hover:text-white transition-colors text-[17px] font-medium"
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white tracking-wide">Connect</h3>
            <div className="flex items-center gap-4">
              {socialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300 text-xl"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Separator */}
        <div className="w-full h-[1px] bg-white/10 mb-10"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-zinc-500 text-[15px] font-medium tracking-wide">
            © {new Date().getFullYear()} Meklit Anteneh. All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll To Top Arrow */}
      <AnimatePresence>
        {showArrow && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            className="fixed right-10 bottom-10 w-14 h-14 flex items-center justify-center 
                       bg-gradient-to-r from-blue-600 to-purple-600 text-white
                       rounded-full shadow-2xl shadow-blue-500/30 z-50 overflow-hidden group"
            aria-label="Scroll to top"
          >
            <FiArrowUp className="text-2xl group-hover:-translate-y-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
