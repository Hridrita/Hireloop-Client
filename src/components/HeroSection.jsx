"use client";

import { Briefcase, Magnifier, MapPin } from "@gravity-ui/icons";

export default function HeroSection() {
  const trendingTags = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

  return (
    <section className="bg-black text-white px-6 pt-50 flex flex-col items-center justify-center">
      {/* Badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm mb-8">
        <Briefcase className="w-4 h-4 text-orange-500" />
        <span className="text-gray-300">50,000+ NEW JOBS THIS MONTH</span>
      </div>

      {/* Heading & Subtext */}
      <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-center">
        Find Your Dream Job Today
      </h1>
      <p className="text-gray-400 max-w-xl text-center mb-10 leading-relaxed">
        HireLoop connects top talent with world-class companies. Browse thousands of
        curated opportunities and land your next role — faster.
      </p>

      {/* Search Bar */}
      <div className="flex items-center bg-white/[0.03] border border-white/10 rounded-2xl p-2 w-full max-w-2xl backdrop-blur-md mb-6">
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
      </div>

      {/* Trending Tags */}
      <div className="flex items-center gap-3 text-sm text-gray-400">
        <span>Trending Position</span>
        <div className="flex gap-2">
          {trendingTags.map((tag) => (
            <button key={tag} className="px-3 py-1 rounded-full border border-white/10 hover:bg-white/5 transition">
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}