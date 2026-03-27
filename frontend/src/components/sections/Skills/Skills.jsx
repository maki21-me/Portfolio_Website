import React from "react";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      { name: "TypeScript", level: 70 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Next.js", level: 70 },
      { name: "React.js", level: 80 },
      { name: "JavaScript", level: 85 }
    ]
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Python", level: 85 },
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 80 },
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 }
    ]
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Docker", level: 85 },
      { name: "AWS", level: 80 },
      { name: "Figma", level: 88 },
      { name: "Git", level: 85 },
      { name: "GitHub", level: 85 }
    ]
  }
];

const stats = [
  { label: "Projects Completed", value: "10+" },
  { label: "Years Experience", value: "1+" },
  { label: "Happy Clients", value: "1+" },
];

export default function Skills() {
  return (
    <section id="skills" className="pt-16 pb-8 bg-transparent dark:bg-transparent transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">

        {/* SECTION HEADER - Matching Projects style */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
              My Skills
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6" />
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and professional achievements.
            </p>
          </motion.div>
        </div>

        {/* SKILLS CATEGORIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#030014]/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20 dark:border-blue-900/20 hover:shadow-blue-500/10 transition-all duration-500"
            >
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-8 border-b border-zinc-100 dark:border-blue-900/30 pb-4">
                {category.title}
              </h3>

              <div className="space-y-8">
                {category.skills.map((skill, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                        {skill.name}
                      </span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-zinc-100 dark:bg-blue-900/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-10 pb-12 border-t border-zinc-100 dark:border-blue-900/30">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h4 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                {stat.value}
              </h4>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-widest text-xs md:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
