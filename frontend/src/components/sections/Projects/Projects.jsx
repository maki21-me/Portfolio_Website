import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getApiUrl } from "../../../utils/api";
import { normalizeImageUrl } from "../../../utils/imageUtils";

// We can keep placeholder image references if the db imageUrl is empty, or just rely on db.
import portfolio from "../../../assets/Images/ProjectImage/portfolio.png";

export default function Projects() {
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(getApiUrl('/projects'));
        const data = await res.json();
        if (Array.isArray(data)) {
          // Filter to only show featured projects on the home page
          const featured = data.filter(p => p.isFeatured);
          setFeaturedProjects(featured);
        } else {
          console.error("API returned non-array data:", data);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);
  return (
    <section id="projects" className="py-16 bg-transparent dark:bg-transparent transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6" />
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Here are some of my recent works that showcase my skills and experience in web development.
            </p>
          </motion.div>
        </div>

        {/* PROJECTS GRID - Wider cards, minimized height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white dark:bg-[#030014]/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/20 dark:border-blue-900/20 transition-all duration-500 hover:shadow-blue-500/10 h-full flex flex-col"
            >
              {/* Image Container - High-impact height */}
              <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-zinc-800">
                <img 
                  src={normalizeImageUrl(project.imageUrl) || portfolio} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a 
                    href={project.github || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-all border border-white/10"
                  >
                    <FiGithub size={22} />
                  </a>
                  <a 
                    href={project.link || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg transition-all"
                  >
                    <FiExternalLink size={22} />
                  </a>
                </div>
              </div>

              {/* Content - Increased padding (p-6) */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.techStack?.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-800/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* VIEW ALL BUTTON */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Link
            to="/projectsPage"
            className="group relative px-10 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full overflow-hidden shadow-lg hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-3"
          >
            <span className="relative z-10 text-lg">View All Projects</span>
            <svg 
              className="w-5 h-5 relative z-10 transform transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
