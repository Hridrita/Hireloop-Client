"use client";

import {
    Briefcase,
    Factory,
    Magnifier,
    Star,
} from "@gravity-ui/icons";
import { motion } from "motion/react"

export default function StatsSection() {
    const stats = [
        { id: 1, icon: <Briefcase className="h-5 w-5" />, value: "50K", label: "Active Jobs" },
        { id: 2, icon: <Factory className="h-5 w-5" />, value: "12K", label: "Companies" },
        { id: 3, icon: <Magnifier className="h-5 w-5" />, value: "2M", label: "Job Seekers" },
        { id: 4, icon: <Star className="h-5 w-5" />, value: "97%", label: "Satisfaction Rate" },
    ];

    return (
        <section className="relative w-full bg-black pt-20 text-white overflow-hidden">
            
            <div 
                className="absolute inset-x-0 top-0 h-[800px] bg-[url('/images/globe.png')] bg-center bg-no-repeat opacity-60 z-0 pointer-events-none"
            />
            
             
            <div className="relative z-10 mx-auto max-w-7xl px-6">
                
                
                <div className="mx-auto max-w-3xl text-center pt-40 pb-20">
                    <h2 className="text-3xl font-medium leading-relaxed text-white/90">
                        Assisting over 15,000 job seekers
                        <br />
                        find their dream positions.
                    </h2>
                </div>

                
                <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}>
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.id}
                            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-md transition-colors duration-300 hover:border-violet-500/30 cursor-default"
                        >
                            <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-white/5 blur-3xl transition duration-300 group-hover:bg-violet-500/10" />
                            
                            <motion.div className="relative z-10 text-white/90"
                            whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}>
                                {stat.icon}
                            </motion.div>
                            
                            <motion.h3 className="relative z-10 mt-10 text-5xl font-bold tracking-tight"
                            variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.15 } },
                }}>
                                {stat.value}
                            </motion.h3>
                            
                            <p className="relative z-10 mt-4 text-base text-gray-300">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}