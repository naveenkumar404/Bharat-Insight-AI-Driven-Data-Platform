"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const metrics = [
  { target: 100000, suffix: "+", label: "Data Records", speed: 2 },
  { target: 99, suffix: "%", label: "Uptime", speed: 1.5 },
  { target: 50, suffix: "ms", label: "Response Time", speed: 1.8 },
  { target: 10, suffix: "+", label: "Departments", speed: 1.2 },
];

function CountUpAnimation({ target, speed }: { target: number; speed: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let startValue = 0;
    const step = target / (speed * 60);
    
    const timer = setInterval(() => {
      startValue += step;
      if (startValue >= target) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(startValue));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [target, speed]);

  return <span>{current.toLocaleString()}</span>;
}

export function StatsSection() {
  return (
    <section className="py-16 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                <CountUpAnimation target={metric.target} speed={metric.speed} />
                {metric.suffix}
              </div>
              <div className="text-zinc-500 text-sm md:text-base">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
