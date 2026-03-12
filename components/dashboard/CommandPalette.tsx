"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";

export function CommandPalette() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsVisible((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={() => setIsVisible(false)}>
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4">
        <Command className="glass border border-zinc-700 rounded-xl shadow-2xl overflow-hidden">
          <div className="flex items-center border-b border-zinc-800 px-4">
            <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Command.Input 
              placeholder="Search commands..." 
              className="w-full px-4 py-4 bg-transparent outline-none text-lg"
            />
            <kbd className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-xs text-zinc-400">
              ESC
            </kbd>
          </div>
          <Command.List className="p-2 max-h-96 overflow-y-auto">
            <Command.Group heading="Pages" className="text-xs text-zinc-500 px-2 py-2">
              <Command.Item 
                onSelect={() => { router.push("/"); setIsVisible(false); }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 cursor-pointer transition-colors"
              >
                <span className="text-xl">🏠</span>
                <div className="flex-1">
                  <div className="font-medium">Home</div>
                  <div className="text-xs text-zinc-500">Return to landing page</div>
                </div>
              </Command.Item>
              <Command.Item 
                onSelect={() => { router.push("/dashboard"); setIsVisible(false); }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 cursor-pointer transition-colors"
              >
                <span className="text-xl">📊</span>
                <div className="flex-1">
                  <div className="font-medium">Dashboard</div>
                  <div className="text-xs text-zinc-500">View analytics</div>
                </div>
              </Command.Item>
            </Command.Group>
            
            <Command.Group heading="Quick Actions" className="text-xs text-zinc-500 px-2 py-2 mt-2">
              <Command.Item 
                onSelect={() => setIsVisible(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 cursor-pointer transition-colors"
              >
                <span className="text-xl">📥</span>
                <div className="flex-1">
                  <div className="font-medium">Export Data</div>
                  <div className="text-xs text-zinc-500">Save as CSV file</div>
                </div>
              </Command.Item>
              <Command.Item 
                onSelect={() => setIsVisible(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 cursor-pointer transition-colors"
              >
                <span className="text-xl">🔄</span>
                <div className="flex-1">
                  <div className="font-medium">Refresh</div>
                  <div className="text-xs text-zinc-500">Reload data source</div>
                </div>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
