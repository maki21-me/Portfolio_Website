import React from "react";
import { motion } from "framer-motion";
import Weather from "../../assets/Images/ProjectImage/weather.png";
import WorldClock from "../../assets/Images/ProjectImage/WorldClock.png";
import Calculator from "../../assets/Images/ProjectImage/Calculator.png";
import Music from "../../assets/Images/ProjectImage/Music.png";
import StopWatch from "../../assets/Images/ProjectImage/Stopwatch.png";
import Tictac from "../../assets/Images/ProjectImage/tictac.png";
import Insure from "../../assets/Images/ProjectImage/Insure.png";
import Image from "../../assets/Images/ProjectImage/Image.png";
import Weath from "../../assets/Images/ProjectImage/weather2.png";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Insurance Company Website",
      desc: "A full insurance website with multiple pages, modern UI, responsive design, and a clean layout built using HTML and CSS.",
      img: Insure,
      link: "https://github.com/maki21-me/project-2.git",
    },
    {
      id: 2,
      title: "World Clock",
      desc: "A world clock app that displays real‑time time zones using JavaScript date functions.",
      img: WorldClock,
      link: "https://github.com/maki21-me/World_Clock.git",
    },
    {
      id: 3,
      title: "Weather App",
      desc: "A weather application using API to fetch real‑time weather data with a modern and animated UI.",
      img: Weather,
      link: "https://github.com/maki21-me/PRODIGY_WD_05.git",
    },
    {
      id: 4,
      title: "Calculator App",
      desc: "A simple but powerful calculator built using JavaScript with clean UI and smooth interactions.",
      img: Calculator,
      link: "https://github.com/maki21-me/CodeAlpha_Calculator.git",
    },
    {
      id: 5,
      title: "Music Player App",
      desc: "A functional music player app with play, pause, next, and previous features.",
      img: Music,
      link: "https://github.com/maki21-me/CodeAlpha_MusicPlayer.git",
    },
    {
      id: 6,
      title: "Stop Watch",
      desc: "A stopwatch with start, stop, reset, and lap features built using JavaScript.",
      img: StopWatch,
      link: "https://github.com/yourusername/stopwatch",
    },
    {
      id: 7,
      title: "Tic Tac Toe",
      desc: "A fun tic‑tac‑toe game with a clean UI, built using JavaScript logic.",
      img: Tictac,
      link: "https://github.com/maki21-me/PRODIGY_WD_03.git",
    },
    {
      id: 8,
      title: "Image Gallery",
      desc: "A responsive image gallery built using modern CSS grid layout techniques.",
      img: Image,
      link: "https://github.com/maki21-me/CodeAlpha_ImageGallery.git",
    },
    {
      id: 9,
      title: "Weather App V2",
      desc: "An improved weather application with better UI, animations, and performance.",
      img: Weath,
      link: "https://github.com/maki21-me/ShecodesProject-Vanilla-weather-app.git",
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
          clean code, and modern tools.
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
              className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-md border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition duration-300"
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

                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 inline-block px-4 py-2 text-sm rounded-full bg-primary text-white hover:bg-secondary transition duration-300"
                >
                  View on GitHub
                </motion.a>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
