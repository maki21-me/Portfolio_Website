import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="pt-32 pb-20 bg-[#EEEEEE] dark:bg-black"  // adds space from navbar
    >
      <div className="w-full max-w-[1100px] mx-auto px-6">  {/* same layout as Home */}
        
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="bg-[#F3F4F6] dark:bg-zinc-800 p-10 rounded-2xl shadow-lg"
        >
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-6"
          >
            About Me
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-zinc-700 dark:text-zinc-300 mb-10 text-lg leading-relaxed"
          >
            I am a dedicated web developer with a passion for creating modern,
            responsive, and user-friendly websites. With strong attention to
            design and detail, I transform ideas into clean, visually appealing,
            and functional digital experiences.
          </motion.p>

          {/* Stats aligned to left */}
          <motion.div className="flex flex-wrap items-center justify-start gap-10">
            {[ 
              { value: "10+", label: "Projects completed" }, 
              { value: "1+", label: "Years of experience" } 
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.15 }}
                viewport={{ once: false, amount: 0.3 }}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-start cursor-pointer"
              >
                <span className="text-4xl font-bold text-[#0b3d91] mb-2">
                  {item.value}
                </span>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
