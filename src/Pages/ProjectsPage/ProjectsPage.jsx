import React from "react";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const projects = [
    {
       id: 1,
       title:"Portfolio Website",
        desc: "A modern and responsive portfolio built with React and Tailwind CSS.", 
        img: "https://via.placeholder.com/400x250"
       },

    {
       id: 2,
       title: "Todo App", 
       desc: "A productive task-management app with local storage support.", 
       img: "https://via.placeholder.com/400x250" 
      },

    { 
      id: 3, 
      title: "Weather App",
       desc: "Live weather updates using API, clean UI and animations.", 
       img: "https://via.placeholder.com/400x250" 
      },

    {
       id: 4, 
      title: "E-commerce UI", 
      desc: "A clean e-commerce frontend with product filtering.", 
      img: "https://via.placeholder.com/400x250" },

    { 
      id: 5, 
      title: "Chat App", 
      desc: "Real-time chat interface using Firebase.", 
      img: "https://via.placeholder.com/400x250" 
    },

      
    { 
      id: 6, 
      title: "Food Delivery UI", 
      desc: "A sleek app design for ordering food from nearby restaurants.", 
      img: "https://via.placeholder.com/400x250" 
    },

    { 
      id: 7, 
      title: "Blog Website", 
      desc: "A minimal blogging UI with markdown support.", 
      img: "https://via.placeholder.com/400x250" 
    },

    { 
      id: 8, 
      title: "Landing Page", 
      desc: "A responsive landing page built using Tailwind.", 
      img: "https://via.placeholder.com/400x250" 
    },

    { 
      id: 9, 
      title: "Dashboard UI", 
      desc: "A modern admin dashboard with charts and stats.", 
      img: "https://via.placeholder.com/400x250"
     },
  ];

  return (
    <div className="pt-32 pb-20 bg-[#EEEEEE] dark:bg-black min-h-screen">
      
      {/* Page Intro */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-[1100px] mx-auto px-6 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white"
        >
          My Projects
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto"
        >
          Here are some of the projects I’ve worked on — combining creativity,
          clean code, and modern tools. I build user-friendly interfaces, sleek
          designs, and powerful web applications that solve real problems.
        </motion.p>
      </motion.div>

      {/* Project Grid */}
      <div className="max-w-[1100px] mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
              className="
                bg-white dark:bg-zinc-900 
                p-4 rounded-2xl shadow-md border 
                border-gray-200 dark:border-zinc-700
                hover:shadow-xl transition duration-300
              "
            >
              <motion.img
                src={project.img}
                alt={project.title}
                className="w-full h-48 object-cover rounded-xl"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>

                <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {project.desc}
                </p>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    mt-4 px-4 py-2 text-sm rounded-full
                    bg-primary text-white hover:bg-secondary
                    transition duration-300
                  "
                >
                  View More
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
