"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useState, useMemo, useEffect } from "react";
import { useOrgStore } from "@/store/useOrgStore";
import { fetchDataset, type DataRecord } from "@/lib/dataService";
import { useDataStore } from "@/store/useDataStore";

export function DataGrid() {
  const { department, role } = useOrgStore();
  const { dataset, setDataset, searchTerm, setSearchTerm, stateFilter, setStateFilter, yearFilter, setYearFilter } = useDataStore();
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fetch data whenever department changes
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchDataset(department);
        setDataset(data);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [department, setDataset]);

  // Filter data based on search and dropdown filters
  // Using useMemo to avoid recalculating on every render
  const processedData = useMemo(() => {
    if (!dataset) return [];
    
    return dataset.filter((record) => {
      // Check if search term matches any field
      const textMatch = Object.values(record).some((field) =>
        String(field).toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // Check state filter
      const stateMatch = stateFilter === "all" || record.state === stateFilter;
      
      // Check year filter
      const yearMatch = yearFilter === "all" || String(record.year) === yearFilter;
      
      return textMatch && stateMatch && yearMatch;
    });
  }, [dataset, searchTerm, stateFilter, yearFilter]);

  // Arrow key navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!processedData.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedRow((prev) => {
          const next = prev === null ? 0 : Math.min(prev + 1, processedData.length - 1);
          return next;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedRow((prev) => {
          const next = prev === null ? 0 : Math.max(prev - 1, 0);
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [processedData.length]);

  // Setup virtual scrolling - only renders visible rows for performance
  const rowVirtualizer = useVirtualizer({
    count: processedData.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => 56, // Each row is 56px tall
    overscan: 10, // Render 10 extra rows above/below viewport
  });

  // Get unique values for filter dropdowns
  const uniqueStates = ["all", ...Array.from(new Set((dataset || []).map(r => r.state)))];
  const uniqueYears = ["all", ...Array.from(new Set((dataset || []).map(r => r.year)))];

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading dataset...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="glass border border-zinc-800/50 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-900/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="px-4 py-2.5 bg-zinc-900/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          >
            {uniqueStates.map(s => (
              <option key={s} value={s}>
                {s === "all" ? "All States" : s}
              </option>
            ))}
          </select>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-4 py-2.5 bg-zinc-900/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          >
            {uniqueYears.map(y => (
              <option key={y} value={y}>
                {y === "all" ? "All Years" : y}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="text-zinc-400">
            Displaying <span className="text-blue-400 font-semibold">{processedData.length.toLocaleString()}</span> of <span className="font-semibold">{(dataset?.length || 0).toLocaleString()}</span> records
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-lg transition-colors text-xs">
              Export CSV
            </button>
            <button className="px-3 py-1 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-lg transition-colors text-xs">
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="glass border border-zinc-800/50 rounded-xl overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="h-[calc(100vh-280px)] overflow-auto"
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 flex font-semibold z-10 text-sm">
              <div className="w-20 px-4 py-4 flex items-center">ID</div>
              <div className="w-40 px-4 py-4 flex items-center">State</div>
              <div className="w-28 px-4 py-4 flex items-center">Year</div>
              <div className="w-32 px-4 py-4 flex items-center">Value</div>
              <div className="w-36 px-4 py-4 flex items-center">Category</div>
              <div className="w-32 px-4 py-4 flex items-center">Status</div>
              {role === "admin" && <div className="w-32 px-4 py-4 flex items-center">Actions</div>}
            </div>

            {rowVirtualizer.getVirtualItems().map((virtualItem) => {
              const record = processedData[virtualItem.index];
              const isSelected = selectedRow === virtualItem.index;
              
              return (
                <div
                  key={virtualItem.key}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                  onClick={() => setSelectedRow(virtualItem.index)}
                  className={`flex border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors text-sm cursor-pointer ${
                    isSelected ? "bg-blue-500/10 border-blue-500/50" : ""
                  }`}
                >
                  <div className="w-20 px-4 py-4 flex items-center text-zinc-500">#{record.id}</div>
                  <div className="w-40 px-4 py-4 flex items-center font-medium">{record.state}</div>
                  <div className="w-28 px-4 py-4 flex items-center text-zinc-400">{record.year}</div>
                  <div className="w-32 px-4 py-4 flex items-center font-mono text-blue-400">{record.value.toLocaleString()}</div>
                  <div className="w-36 px-4 py-4 flex items-center">
                    <span className="px-2 py-1 bg-zinc-800 rounded text-xs">{record.category}</span>
                  </div>
                  <div className="w-32 px-4 py-4 flex items-center">
                    <span className={`px-2 py-1 rounded text-xs ${
                      record.status === "Active" ? "bg-green-500/10 text-green-400" :
                      record.status === "Pending" ? "bg-yellow-500/10 text-yellow-400" :
                      "bg-blue-500/10 text-blue-400"
                    }`}>
                      {record.status}
                    </span>
                  </div>
                  {role === "admin" && (
                    <div className="w-32 px-4 py-4 flex items-center gap-2">
                      <button className="text-blue-400 hover:text-blue-300 text-xs">Edit</button>
                      <button className="text-red-400 hover:text-red-300 text-xs">Delete</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
