"use client";

import { motion } from "framer-motion";

const capabilities = [
  {
    heading: "High-Performance Virtualization",
    details: "Handle 100,000+ rows effortlessly with virtual scrolling technology. Only visible rows exist in the DOM for optimal 60fps performance.",
    technologies: ["TanStack Virtual", "React 18", "Optimized Rendering"],
  },
  {
    heading: "Multi-Tenant Architecture",
    details: "Seamlessly switch between departments with instant updates. Features dynamic theming, role-based permissions, and isolated data contexts.",
    technologies: ["Zustand", "Context Isolation", "RBAC"],
  },
  {
    heading: "AI-Powered Insights",
    details: "Get real-time analysis powered by Google Gemini. Experience streaming responses, reasoning states, and context-aware intelligence.",
    technologies: ["Gemini API", "Streaming", "Context Awareness"],
  },
];

export function FeaturesSection() {
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
            Engineered for Scale
          </h2>
          <p className="text-zinc-500 text-lg">
            Enterprise architecture with modern design principles
          </p>
        </motion.div>

        <div className="space-y-8">
          {capabilities.map((capability, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -25 : 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.18 }}
              className="glass border border-zinc-800/50 rounded-2xl p-8 hover:border-zinc-700 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                    {capability.heading}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    {capability.details}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {capability.technologies.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="px-3 py-1 bg-zinc-800/50 border border-zinc-700 rounded-full text-xs text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-48 h-32 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl border border-zinc-700 flex items-center justify-center">
                  <div className="text-6xl opacity-20">
                    {idx === 0 ? "⚡" : idx === 1 ? "🏢" : "🤖"}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
