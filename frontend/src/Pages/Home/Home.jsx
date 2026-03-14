import React from "react";
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import ProfileLight from "../../assets/Images/LightMode.jpg";
import ProfileDark from "../../assets/Images/Dark.png";
import Resume from "../../assets/Files/cv1.pdf";

export default function Home() {
  return (
    <div className="min-h-screen flex items-start justify-center pt-12 pb-10 bg-transparent dark:bg-transparent relative overflow-hidden transition-colors duration-500">

      <div className="max-w-[1100px] mx-auto px-6 relative z-10 text-center flex flex-col items-center">

        {/* PROFILE CIRCLE */}
        <motion.div
           initial={{ opacity: 0, scale: 0.5 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
           className="relative w-56 h-56 mb-6 flex items-center justify-center mt-6 md:mt-10"
        >

          <div className="relative w-52 h-52 rounded-full border-4 border-white dark:border-blue-900/30 overflow-hidden shadow-2xl shadow-blue-500/20 z-10">
            <img
              src={ProfileLight}
              alt="Meklit"
              className="w-full h-full object-cover dark:hidden"
            />
            <img
              src={ProfileDark}
              alt="Meklit"
              className="w-full h-full object-cover hidden dark:block"
            />
          </div>
        </motion.div>

        {/* BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50/50 dark:bg-blue-900/20 backdrop-blur-md border border-blue-100 dark:border-blue-800/30 mb-4"
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
          >
            ★
          </motion.span>
          <span className="text-sm md:text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Creative Developer
          </span>
        </motion.div>

        {/* HEADING with Typing Effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 leading-tight tracking-tight px-4"
        >
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <ReactTyped
              strings={["Meklit Anteneh", "a Developer", "a Designer"]}
              typeSpeed={80}
              backSpeed={50}
              loop
            />
          </span>
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-base md:text-lg text-gray-600 dark:text-blue-200/60 max-w-2xl mx-auto mb-6 leading-relaxed font-light"
        >
          A developer who thrives on turning imagination into interaction.
          Crafting smooth interfaces and elegant code with passion and precision.
        </motion.p>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 hover:scale-105 transition-transform"
          >
            Get in Touch
          </Link>
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-blue-900/10 text-gray-800 dark:text-blue-100 font-bold rounded-2xl border border-gray-200 dark:border-blue-800/30 hover:bg-gray-50 dark:hover:bg-blue-800/20 transition-all font-medium"
          >
            View Work
          </a>
        </motion.div>

        {/* SOCIAL LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-4"
        >
          {[
            { icon: <FiGithub size={22} />, link: "https://github.com", label: "GitHub" },
            { icon: <FiLinkedin size={22} />, link: "https://linkedin.com", label: "LinkedIn" },
            { icon: <FiMail size={22} />, link: "mailto:example@gmail.com", label: "Email" }
          ].map((social, i) => (
            <a
              key={i}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white dark:bg-blue-900/10 text-gray-600 dark:text-blue-200/60 rounded-full border border-gray-100 dark:border-blue-800/30 shadow-sm hover:scale-110 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </motion.div>

      </div>

    </div>
  );
}
