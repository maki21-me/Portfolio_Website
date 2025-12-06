import React from "react";
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProfileLight from "../../assets/Images/LightMode.jpg";
import ProfileDark from "../../assets/Images/Dark.png";
import Resume from "../../assets/Files/resume.pdf";

export default function Home() {
  return (
    <div className="min-h-[520px] sm:min-h-[600px] flex items-center pt-40 pb-20 bg-[#EEEEEE] dark:bg-black relative">
      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-16">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center sm:justify-start mt-10 sm:mt-16 lg:mt-20"
          >
            <div className="w-[380px] h-[380px] rounded-full overflow-hidden relative shadow-[0_0_90px_-20px_rgba(0,0,0,0.4)] border-4 border-white/20 dark:border-white/10">
              <img
                src={ProfileLight}
                alt="Profile Light"
                className="w-full h-full object-cover dark:hidden"
              />
              <img
                src={ProfileDark}
                alt="Profile Dark"
                className="w-full h-full object-cover hidden dark:block"
              />
            </div>
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex flex-col justify-center items-start gap-5"
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-darktext leading-snug">
              <ReactTyped
                strings={["Hi, I'm Meklit Anteneh"]}
                typeSpeed={85}
                backSpeed={60}
                showCursor={true}
                cursorChar="|"
                loop={true}
              />
            </h1>

            <p className="text-base sm:text-lg text-subtle dark:text-darksubtle leading-relaxed tracking-wide">
              A developer who thrives on turning imagination into interaction.
              From crafting smooth interfaces to shaping elegant code, I build
              projects that reflect passion, precision, and personality.
            </p>

            <div className="flex gap-4 mt-4 flex-wrap">
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}>
                <Link
                  to="/contact"
                  className="px-6 h-12 flex items-center justify-center bg-primary text-white rounded-full hover:bg-secondary duration-300 font-medium"
                >
                  Connect
                </Link>
              </motion.div>

              <motion.a
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                href={Resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 h-12 flex items-center justify-center bg-white dark:bg-black text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-white duration-300 font-medium"
              >
                Resume
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
