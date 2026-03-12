"use client";

import { motion } from "framer-motion";

const gridItems = [
  {
    title: "100K+ Rows",
    description: "Virtual scrolling handles massive datasets",
    emoji: "📊",
    colorFrom: "blue-500",
    colorTo: "cyan-500",
  },
  {
    title: "Multi-Tenant",
    description: "Switch departments seamlessly",
    emoji: "🏢",
    colorFrom: "violet-500",
    colorTo: "purple-500",
  },
  {
    title: "AI Insights",
    description: "Gemini API integration",
    emoji: "🤖",
    colorFrom: "pink-500",
    colorTo: "rose-500",
  },
  {
    title: "Real-time",
    description: "Streaming token responses",
    emoji: "⚡",
    colorFrom: "amber-500",
    colorTo: "orange-500",
  },
  {
    title: "Fuzzy Search",
    description: "Filter across columns",
    emoji: "🔍",
    colorFrom: "green-500",
    colorTo: "emerald-500",
  },
  {
    title: "Cmd+K",
    description: "Quick command access",
    emoji: "⌘",
    colorFrom: "indigo-500",
    colorTo: "blue-500",
  },
];

export function BentoGrid() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Core Capabilities
          </h2>
          <p className="text-zinc-500 text-lg">
            Built for enterprise-grade data analytics
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {gridItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group relative"
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 border border-zinc-700/50 hover:border-zinc-600 transition-all duration-300 h-full backdrop-blur-sm">
                <div className={`text-4xl mb-4 inline-block p-3 rounded-xl bg-gradient-to-br from-${item.colorFrom} to-${item.colorTo} bg-opacity-10`}>
                  {item.emoji}
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
