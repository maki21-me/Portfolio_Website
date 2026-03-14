import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import "swiper/css";
import Fanu from "../../../assets/Images/TestimonialsImage/Fanuel.jpg";
import Melye from "../../../assets/Images/TestimonialsImage/Melye.jpg";
import Jo from "../../../assets/Images/TestimonialsImage/Jo.jpg";
import Leul from "../../../assets/Images/TestimonialsImage/Leul.jpg";
import Yoni from "../../../assets/Images/TestimonialsImage/Yoni.jpg";
import Ruth from "../../../assets/Images/TestimonialsImage/Ruth.jpg";

export default function Testimonials() {
  const testimonials = [
  {
    name: "Fanuel Almaw",
    role: "Founder and CEO @ Askuala Link",
    image: Fanu,
    stars: 5,
    feedback:
      "Impressed by the portfolio! The projects showcase clean design and solid functionality. Very professional work.",
  },
  {
    name: "Melat Tesfaye",
    role: "SW Engineer|Programmer A2SVian-(Backed by Google twice)",
    image: Melye,
    stars: 5,
    feedback:
      "The portfolio is modern, well-structured, and highlights technical skills effectively. Clear attention to detail.",
  },
  {
    name: "Yohannes Alemu",
    role: "Full-Stack Developer & Mobile App Expert",
    image: Jo,
    stars: 4,
    feedback:
      "Portfolio demonstrates solid front-end and design skills. Projects are organized and visually appealing.",
  },
  {
    name: "Yonas Tesera",
    role: "SW & DevOps Engineer | Backend .CI/CD Cloud",
    image: Yoni,
    stars: 5,
    feedback:
      "Portfolio is professional and easy to navigate. Projects clearly show coding proficiency and creativity.",
  },
  {
    name: "Leul Esubalew",
    role: "Product Designer|Web Designer",
    image: Leul,
    stars: 4,
    feedback:
      "Well-designed portfolio with clear presentation of skills. Each project highlights both creativity and technical ability.",
  },
  {
    name: "Ruth Gizat",
    role: "SW Engineer | Fullstack Developer",
    image: Ruth,
    stars: 5,
    feedback:
      "Strong portfolio! Demonstrates clean code, well-thought-out design, and excellent implementation of projects.",
  },
];

  const swiperRef = useRef(null);

  const goToSlide = (index) => {
    if (swiperRef.current) swiperRef.current.slideToLoop(index);
  };

  return (
    <section id="testimonials" className="py-16 bg-transparent dark:bg-transparent transition-colors duration-500">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-8">

        {/* SECTION HEADER - Matching Projects/Skills style */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
              Reviews
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6" />
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              What my clients and colleagues say about working with me.
            </p>
          </motion.div>
        </div>

        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={40}
          slidesPerView={2}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
          }}
          className="pb-12"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index} className="py-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative bg-white dark:bg-[#030014]/60 backdrop-blur-xl rounded-[2rem] p-10 
                shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                border border-zinc-100 dark:border-blue-900/20 
                hover:border-purple-500/50 dark:hover:border-purple-500/50
                transition-all duration-500 hover:-translate-y-2
                hover:shadow-[0_20px_40px_rgba(147,51,234,0.15)] dark:hover:shadow-[0_20px_40px_rgba(147,51,234,0.2)]"
              >
                {/* Floating Quote Icon */}
                <div className="absolute -top-6 -left-4 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 transform transition-transform group-hover:scale-110 group-hover:rotate-6">
                  <FaQuoteLeft className="text-white text-2xl" />
                </div>

                {/* Header: Profile + Info */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                    <img
                      src={t.image}
                      className="relative w-20 h-20 rounded-full object-cover border-4 border-white dark:border-blue-900/50 shadow-xl"
                      alt={t.name}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-zinc-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {t.name}
                    </h3>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      {t.role}
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1.5 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span 
                      key={i} 
                      className={`text-xl ${i < t.stars ? "text-yellow-400" : "text-zinc-200 dark:text-zinc-700"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Feedback */}
                <p className="text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed italic font-medium">
                  "{t.feedback}"
                </p>

                {/* Hover Glow Effect Layer */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-4 mt-12">
          {[0, 1, 2].map((index) => (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.4 }}
              key={index}
              onClick={() => goToSlide(index * 2)}
              className="w-3 h-3 rounded-full bg-gray-400 hover:bg-[#0b3d91] transition-all"
            ></motion.button>
          ))}
        </div>

      </div>
    </section>
  );
}
