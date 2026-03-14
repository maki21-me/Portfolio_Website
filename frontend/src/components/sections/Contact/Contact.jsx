import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

export default function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: form.current.user_name.value,
      email: form.current.user_email.value,
      message: form.current.message.value
    };

    try {
      const res = await fetch("http://localhost:5001/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      setLoading(false);
      if (data.success) {
        setDone(true);
        form.current.reset();
        setTimeout(() => setDone(false), 5000);
      } else {
        alert("Failed to send message: " + data.message);
      }
    } catch (err) {
      setLoading(false);
      alert("Error sending message. Please try again.");
      console.error(err);
    }
  };

  const contactInfo = [
    {
      icon: <FiMail className="text-2xl" />,
      label: "Email",
      value: "meklitanteneh58@gmail.com",
      link: "mailto:meklitanteneh58@gmail.com"
    },
    {
      icon: <FiPhone className="text-2xl" />,
      label: "Phone",
      value: "+251 968327855",
      link: "tel:+251 968327855"
    },
    {
      icon: <FiMapPin className="text-2xl" />,
      label: "Location",
      value: "Addis Abeba, Ethiopia",
      link: "https://maps.google.com"
    }
  ];

  return (
    <section id="contact" className="py-16 bg-transparent dark:bg-transparent transition-colors duration-500 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100/30 dark:bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-10 lg:px-16 relative z-10">

        {/* SECTION HEADER */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] dark:text-white mb-4 tracking-tight">
              Get In Touch
            </h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6" />
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto font-medium">
              Have a project in mind? Let's work together to create something amazing!
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

          {/* LEFT: Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mb-6">
                Contact Information
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed font-medium">
                Feel free to reach out through any of these channels. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 shadow-sm border border-blue-100/50 dark:border-blue-900/30">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#1A1A1A] dark:text-white mb-0.5">
                      {info.label}
                    </p>
                    <a href={info.link} className="text-[17px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {info.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form ref={form} onSubmit={sendEmail} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1A1A1A] dark:text-white ml-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    placeholder="Your name"
                    className="w-full px-6 py-4 bg-white dark:bg-[#030014]/60 border border-zinc-200 dark:border-blue-900/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white transition-all text-base font-medium placeholder:text-zinc-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1A1A1A] dark:text-white ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-6 py-4 bg-white dark:bg-[#030014]/60 border border-zinc-200 dark:border-blue-900/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white transition-all text-base font-medium placeholder:text-zinc-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1A1A1A] dark:text-white ml-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    placeholder="Tell me about your project..."
                    className="w-full px-6 py-4 bg-white dark:bg-[#030014]/60 border border-zinc-200 dark:border-blue-900/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white resize-none transition-all text-base font-medium placeholder:text-zinc-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-purple-500/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-3 disabled:opacity-70 text-[17px] tracking-wide"
              >
                {loading ? "Sending..." : "Send Message"}
                <FiSend className="text-xl" />
              </button>

              {done && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-green-500 font-bold"
                >
                  Message sent successfully!
                </motion.p>
              )}
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
