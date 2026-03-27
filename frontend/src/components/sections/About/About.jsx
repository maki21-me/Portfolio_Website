import React from "react";
import { motion } from "framer-motion";
import { HiCode, HiColorSwatch, HiLightningBolt, HiUsers } from "react-icons/hi";
import WorkspaceImg from "../../../assets/Images/workspace_about.png";

const features = [
  {
    icon: <HiCode className="text-2xl" />,
    title: "Clean Code",
    desc: "Writing maintainable and scalable code following best practices",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
  },
  {
    icon: <HiColorSwatch className="text-2xl" />,
    title: "Creative Design",
    desc: "Crafting beautiful and intuitive user interfaces",
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
  },
  {
    icon: <HiLightningBolt className="text-2xl" />,
    title: "Performance",
    desc: "Building fast and optimized web applications",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
  },
  {
    icon: <HiUsers className="text-2xl" />,
    title: "Collaboration",
    desc: "Working effectively in team environments",
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
  }
];

export default function About() {
  return (
    <section id="about" className="py-16 bg-transparent dark:bg-transparent transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div className="flex flex-col lg:flex-row items-center gap-20">

          {/* LEFT: Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative group"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
              <img
                src={WorkspaceImg}
                alt="Workspace"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Background Accent */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[2rem] blur-2xl -z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          {/* RIGHT: Content Column */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                  About Me
                </h2>
                <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
              </div>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                I'm a full-stack developer and designer with over 1+ year of experience building web applications.
                I love turning complex problems into simple, beautiful, and intuitive designs.
              </p>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-10 leading-relaxed font-light">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects,
                or sharing knowledge with the developer community.
              </p>
            </motion.div>

            {/* FEATURE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className={`p-3 rounded-2xl ${feature.color} flex-shrink-0 shadow-sm transition-transform hover:scale-110 duration-300`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-snug">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
