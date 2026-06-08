"use client";

import { Briefcase, Magnifier, MapPin } from "@gravity-ui/icons";
import { motion } from "motion/react";

export default function HeroSection() {
  const trendingTags = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

  return (
    <section className="bg-black text-white px-6 pt-50 flex flex-col items-center justify-center">

      {/* Badge */}
      <motion.div
        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm mb-8"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Briefcase className="w-4 h-4 text-orange-500" />
        <span className="text-gray-300">50,000+ NEW JOBS THIS MONTH</span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
      >
        Find Your Dream Job Today
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="text-gray-400 max-w-xl text-center mb-10 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        HireLoop connects top talent with world-class companies. Browse thousands of
        curated opportunities and land your next role — faster.
      </motion.p>

      {/* Search Bar */}
      <motion.div
        className="flex items-center bg-white/[0.03] border border-white/10 rounded-2xl p-2 w-full max-w-2xl backdrop-blur-md mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      >
        <div className="flex-1 flex items-center gap-3 px-4 border-r border-white/10">
          <Magnifier className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Job title, skill or company"
            className="bg-transparent outline-none w-full py-3 text-sm placeholder-gray-600"
          />
        </div>
        <div className="flex-1 flex items-center gap-3 px-4">
          <MapPin className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Location or Remote"
            className="bg-transparent outline-none w-full py-3 text-sm placeholder-gray-600"
          />
        </div>
        <button className="bg-violet-600 p-3 rounded-xl hover:bg-violet-700 transition">
          <Magnifier className="w-5 h-5 text-white" />
        </button>
      </motion.div>

      {/* Trending Tags */}
      <motion.div
        className="flex items-center gap-3 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        <span>Trending Position</span>
        <motion.div
          className="flex gap-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
          }}
        >
          {trendingTags.map((tag) => (
            <motion.button
              key={tag}
              variants={{
                hidden: { opacity: 0, scale: 0.85 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 rounded-full border border-white/10 hover:bg-white/5 transition"
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}