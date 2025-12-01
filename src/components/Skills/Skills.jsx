import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaJsSquare, FaHtml5, FaCss3Alt, FaGitAlt } from "react-icons/fa";
import { SiTailwindcss, SiGithub } from "react-icons/si";

export default function Skills() {
  const skills = [
    { name: "HTML5", icon: <FaHtml5 size={28} className="text-[#E34F26]" />, description: "User Interface", level: 90 },
    { name: "CSS3", icon: <FaCss3Alt size={28} className="text-[#1572B6]" />, description: "User Interface", level: 70 },
    { name: "JavaScript", icon: <FaJsSquare size={28} className="text-[#F7DF1E]" />, description: "Interaction", level: 80 },
    { name: "React", icon: <FaReact size={28} className="text-[#61DAFB]" />, description: "Framework", level: 60 },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={28} className="text-[#38B2AC]" />, description: "User Interface", level: 50 },
    { name: "Git", icon: <FaGitAlt size={28} className="text-[#F05032]" />, description: "Version Control", level: 75 },
    { name: "GitHub", icon: <SiGithub size={28} className="text-black dark:text-white" />, description: "Version Control", level: 85 },
  ];

  return (
    <section
      id="skills"
      className="py-20 bg-[#EEEEEE] dark:bg-black text-gray-900 dark:text-white"
    >
      <div className="w-full max-w-6xl mx-auto px-10">

        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white">
            My Skills
          </h2>
          <p className="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Technologies and tools I use to build amazing projects
          </p>
        </motion.div>

        {/* Skills – 4 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm w-56 cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center gap-4 mb-4">
                {skill.icon}
                <div>
                  <h3 className="font-semibold text-black dark:text-white">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {skill.description}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>Proficiency</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-[#0b3d91] rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
