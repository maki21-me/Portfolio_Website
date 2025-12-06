import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import Fanu from "../../assets/Images/TestimonialsImage/Fanuel.jpg";
import Melye from "../../assets/Images/TestimonialsImage/Melye.jpg";
import Jo from "../../assets/Images/TestimonialsImage/Jo.jpg";
import Leul from "../../assets/Images/TestimonialsImage/Leul.jpg";
import Yoni from "../../assets/Images/TestimonialsImage/Yoni.jpg";
import Ruth from "../../assets/Images/TestimonialsImage/Ruth.jpg";

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
    <section id="testimonials" className="py-20 bg-[#EEEEEE] dark:bg-black">
      {/* UPDATED CONTAINER */}
      <div className="w-full max-w-6xl mx-auto px-10">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-12"
        >
          Reviews
        </motion.h2>

        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={30}
          slidesPerView={2}
          autoplay={{ delay: 3500 }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
          }}
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md 
                px-8 py-6 min-h-[200px] w-full mx-auto
                flex flex-col gap-4"
              >
                {/* Top Info */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <img
                    src={t.image}
                    className="w-14 h-14 rounded-md object-cover"
                    alt={t.name}
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">
                      {t.name}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {t.role}
                    </p>
                  </div>
                </motion.div>

                {/* Feedback */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed"
                >
                  {t.feedback}
                </motion.p>

                {/* Stars */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex mt-auto"
                >
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} className="text-yellow-500 text-lg">★</span>
                  ))}
                </motion.div>
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
