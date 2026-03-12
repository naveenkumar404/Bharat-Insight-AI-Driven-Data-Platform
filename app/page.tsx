import Link from "next/link";
import { HeroSection } from "@/components/landing/HeroSection";
import { BentoGrid } from "@/components/landing/BentoGrid";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { StatsSection } from "@/components/landing/StatsSection";

/**
 * Landing Page Component
 * 
 * My approach here was to create a modern, engaging landing page that:
 * 1. Captures attention with animated elements
 * 2. Clearly communicates the platform's value
 * 3. Maintains 60fps performance
 * 4. Works great on mobile devices
 * 
 * The gradient backgrounds and glass morphism effects give it a premium feel
 * while keeping the code clean and maintainable.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Subtle gradient backgrounds for depth - I find this creates nice ambiance */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-violet-500/5 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Navigation bar - kept simple and functional */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Custom logo - simple but effective */}
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BI</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Bharat Insight
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard" 
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg transition-all duration-300 font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
            >
              Launch Dashboard
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Main content sections */}
      <div className="relative">
        <HeroSection />
        <StatsSection />
        <BentoGrid />
        <FeaturesSection />
        
        {/* Footer - keeping it minimal */}
        <footer className="border-t border-zinc-800/50 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-6 text-center text-zinc-500">
            <p>Built for Regrip India Assignment • Powered by Indian Public Data</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
