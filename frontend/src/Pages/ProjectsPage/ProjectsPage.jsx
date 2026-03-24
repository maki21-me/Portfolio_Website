import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiFilter, FiExternalLink, FiGithub } from "react-icons/fi";
import { getApiUrl } from "../../utils/api";

// Fallback Image
import portfolioImg from "../../assets/Images/ProjectImage/portfolio.png";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState([]);
  const categories = ["All", "Web App", "Mobile App", "Dashboard"];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(getApiUrl('/projects'));
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const titleMatch = project.title ? project.title.toLowerCase().includes(searchQuery.toLowerCase()) : false;
      const descMatch = project.description ? project.description.toLowerCase().includes(searchQuery.toLowerCase()) : false;
      const matchesSearch = titleMatch || descMatch;
      const matchesCategory = activeCategory === "All" || project.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, projects]);

  return (
    <div className="pt-32 pb-24 bg-transparent dark:bg-transparent min-h-screen transition-colors duration-500">
      
      {/* Branding Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-10 md:mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6 inline-block tracking-tight">
            All Projects
          </h1>
          <div className="w-24 md:w-32 h-1.5 md:h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 md:mb-8" />
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl">
            Explore my complete portfolio of creative projects and digital solutions
          </p>
        </motion.div>
      </div>

      {/* Filter & Search Bar */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-12 md:mb-20">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 justify-between bg-white/80 dark:bg-zinc-900/50 backdrop-blur-sm p-4 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800">
          
          {/* Search */}
          <div className="relative w-full lg:max-w-md group">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 text-xl group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-3 md:py-4 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-white transition-all text-base md:text-[17px] font-medium placeholder:text-zinc-400"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-3 md:gap-6 overflow-x-auto w-full pb-2 lg:pb-0 scrollbar-hide">
            <div className="flex items-center gap-2 text-zinc-400 font-bold px-2 hidden md:block">
              <FiFilter className="text-xl" />
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-2.5 md:px-8 md:py-3.5 rounded-2xl font-bold text-sm md:text-[15px] transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-xl shadow-zinc-100 dark:shadow-none border border-zinc-100 dark:border-zinc-800 transition-all"
            >
              {/* Image Box */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={project.imageUrl || portfolioImg}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Category Badge */}
                <div className="absolute top-6 right-6 px-4 py-2 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl text-[13px] font-bold text-zinc-900 dark:text-white shadow-sm z-10">
                  {project.category}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <a 
                    href={project.github || "#"}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-all border border-white/10"
                    title="View GitHub"
                  >
                    <FiGithub size={24} />
                  </a>
                  <a 
                    href={project.link || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg transition-all"
                    title="View Demo"
                  >
                    <FiExternalLink size={24} />
                  </a>
                </div>
              </div>

              {/* Content Box */}
              <div className="p-10 space-y-4">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-[17px] leading-relaxed font-medium">
                  {project.description}
                </p>
                {project.techStack && project.techStack.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-800/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-32 space-y-6">
            <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto">
              <FiSearch className="text-4xl text-zinc-300" />
            </div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">
              No projects found
            </p>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
