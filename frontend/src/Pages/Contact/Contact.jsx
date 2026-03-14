import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTelegram, FaInstagram } from "react-icons/fa";

export default function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(""); // for backend validation errors

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDone(false);
    setError("");

    // Collect form data
    const formData = {
      name: form.current.user_name.value,
      email: form.current.user_email.value,
      message: form.current.message.value,
    };

    try {
      const res = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setDone(true);          // Show success message
        form.current.reset();   // Reset form
        setTimeout(() => setDone(false), 5000); // Hide after 5 seconds
      } else {
        setError(data.message || "Something went wrong"); // Show backend error
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full pt-40 pb-40 bg-[#EEEEEE] dark:bg-black text-black dark:text-white"
    >
      <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-between"
        >
          <div>
            <h2 className="text-4xl font-bold leading-snug">
              Contact me for <br /> collaboration
            </h2>

            <p className="text-lg leading-relaxed max-w-[90%] mt-6">
              Reach out today to discuss your project needs and start
              collaborating on something amazing!
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-5 mt-11">
            <a
              href="https://www.instagram.com/meklit_anteneh/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-white dark:bg-zinc-800 shadow-lg transition hover:scale-110"
            >
              <FaInstagram className="text-3xl text-gray-600 hover:text-pink-500 transition" />
            </a>

            <a
              href="https://github.com/maki21-me"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-white dark:bg-zinc-800 shadow-lg transition hover:scale-110"
            >
              <FaGithub className="text-3xl text-gray-600 hover:text-black transition" />
            </a>

            <a
              href="https://www.linkedin.com/in/meklit-anteneh-87454b360"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-white dark:bg-zinc-800 shadow-lg transition hover:scale-110"
            >
              <FaLinkedin className="text-3xl text-gray-600 hover:text-[#0A66C2] transition" />
            </a>

            <a
              href="https://t.me/Meklit_A"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-white dark:bg-zinc-800 shadow-lg transition hover:scale-110"
            >
              <FaTelegram className="text-3xl text-gray-600 hover:text-[#229ED9] transition" />
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE – FORM */}
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg flex flex-col gap-6"
        >
          {/* Name */}
          <div>
            <label className="text-sm font-semibold mb-1 block">Name</label>
            <input
              type="text"
              name="user_name"
              required
              placeholder="Meklit Anteneh"
              className="w-full p-3 rounded-xl bg-[#F3F4F6] dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold mb-1 block">Email</label>
            <input
              type="email"
              name="user_email"
              required
              placeholder="meklitanteneh@example.com"
              className="w-full p-3 rounded-xl bg-[#F3F4F6] dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-sm font-semibold mb-1 block">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              placeholder="Hi!"
              className="w-full p-3 rounded-xl bg-[#F3F4F6] dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold shadow transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {/* Messages */}
          {done && <p className="text-green-500 text-center mt-2">Message sent successfully! Thank you.</p>}
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </motion.form>
      </div>
    </section>
  );
}
