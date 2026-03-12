"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function HeroSection() {
  const [chartData, setChartData] = useState([42, 68, 35, 78, 61, 48, 72, 55]);

  // Update chart data periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setChartData(prev => prev.map(() => Math.floor(Math.random() * 60) + 30));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const animationConfig = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: delay * 0.15, duration: 0.6 }
    })
  };

  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center relative z-10">
          {/* Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={animationConfig}
            className="inline-block mb-4 md:mb-6"
          >
            <div className="px-3 md:px-4 py-1.5 md:py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs md:text-sm font-medium text-blue-400">
              Next-Gen Analytics Platform
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={animationConfig}
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 leading-tight px-4"
          >
            <div className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
              Unlock India&apos;s Data
            </div>
            <div className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              With Intelligence
            </div>
          </motion.h1>

          {/* Description */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={animationConfig}
            className="text-base md:text-xl lg:text-2xl text-zinc-400 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed px-4"
          >
            Analyze massive datasets in real-time with AI-driven insights and multi-department support
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={animationConfig}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4"
          >
            <a
              href="/dashboard"
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl transition-all duration-300 font-semibold shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transform text-center"
            >
              Open Dashboard
            </a>
            <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-xl transition-all duration-300 font-semibold">
              Learn More
            </button>
          </motion.div>

          {/* Animated chart */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={animationConfig}
            className="mt-12 md:mt-20 relative px-4"
          >
            <div className="glass border border-zinc-800/50 rounded-2xl p-4 md:p-8 shadow-2xl">
              <div className="flex items-end justify-center gap-2 md:gap-3 h-32 md:h-48">
                {chartData.map((height, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-8 md:w-12 bg-gradient-to-t from-blue-600 to-violet-600 rounded-t-lg relative group cursor-pointer"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 px-2 py-1 rounded text-xs whitespace-nowrap">
                      {height}%
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 md:mt-6 flex justify-between text-xs md:text-sm text-zinc-500">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
              </div>
            </div>
            
            {/* Floating cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -left-2 md:-left-4 top-1/4 glass border border-zinc-800/50 rounded-xl p-3 md:p-4 shadow-xl hidden md:block"
            >
              <div className="text-xl md:text-2xl font-bold text-blue-400">100K+</div>
              <div className="text-xs text-zinc-500">Records</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute -right-2 md:-right-4 top-1/3 glass border border-zinc-800/50 rounded-xl p-3 md:p-4 shadow-xl hidden md:block"
            >
              <div className="text-xl md:text-2xl font-bold text-violet-400">AI</div>
              <div className="text-xs text-zinc-500">Enabled</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
