import React from "react";
import { motion } from "framer-motion";
import  Restuerant from "../../assets/Images/ProjectImage/restuerant.png"
import Book from "../../assets/Images/ProjectImage/book.png"
import portfolio from "../../assets/Images/ProjectImage/portfolio.png"
import Poem from "../../assets/Images/ProjectImage/poem.png"

export default function Projects() {
  const mainProjects = [
    {
      title: "Restaurant Website",
      description: "Fully responsive restaurant website with menu, booking, and animations.",
      tech: ["React", "Tailwind", "Framer Motion"],
      image: Restuerant,
      link: "https://example.com"
    },
    {
      title: "Portfolio Website",
      description: "Modern personal portfolio with dark mode and stunning UI animations.",
      tech: ["React", "Tailwind", "Dark Mode"],
      image: portfolio,
      link: "https://example.com"
    },
    {
      title: "French Poem Generator",
      description: "A web app that generates French poems using API integration, built with HTML and CSS for a clean and interactive user interface.",
      tech: ["HTML", "CSS", "API"],
      image: Poem,
      link: "https://frenc-poem-generator.netlify.app/"
    },
    {
      title: "Book Store UI",
      description: "A sleek and interactive book store interface featuring search, filters, and smooth animations for browsing books.",
      tech: ["React", "Tailwind"],
      image: Book,
      link: "https://book-store-b.netlify.app/"
    }
  ];

  return (
    <section
      id="projects"
      className="py-20 bg-[#EEEEEE] dark:bg-black text-gray-900 dark:text-white"
    >
      <div className="w-full max-w-6xl mx-auto px-10">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white">
            Projects
          </h2>
          <p className="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-400">
            A selection of major projects I have worked on
          </p>
        </div>

        {/* Projects Grid — 4 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {mainProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg overflow-hidden w-full max-w-[300px] cursor-pointer"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 text-xs mb-4">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-200 dark:bg-zinc-700 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  className="inline-block font-semibold text-[#0b3d91] hover:underline"
                >
                  View Project →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Projects Button */}
        <div className="flex justify-center mt-10">
          <a
            href="/projectsPage"
            className="px-8 py-3 bg-[#0b3d91] text-white rounded-full font-medium hover:bg-[#092d6b] duration-300"
          >
            More Projects
          </a>
        </div>
      </div>
    </section>
  );
}
