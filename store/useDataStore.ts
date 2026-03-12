import { create } from "zustand";
import { DataRecord } from "@/lib/dataService";

interface DataState {
  dataset: DataRecord[] | null;
  searchTerm: string;
  stateFilter: string;
  yearFilter: string;
  setDataset: (data: DataRecord[]) => void;
  setSearchTerm: (term: string) => void;
  setStateFilter: (state: string) => void;
  setYearFilter: (year: string) => void;
  getFilteredCount: () => number;
  getTotalCount: () => number;
  getCurrentFilters: () => {
    search?: string;
    state?: string;
    year?: string;
  };
}

export const useDataStore = create<DataState>((set, get) => ({
  dataset: null,
  searchTerm: "",
  stateFilter: "all",
  yearFilter: "all",
  
  setDataset: (data) => set({ dataset: data }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setStateFilter: (state) => set({ stateFilter: state }),
  setYearFilter: (year) => set({ yearFilter: year }),
  
  getFilteredCount: () => {
    const { dataset, searchTerm, stateFilter, yearFilter } = get();
    if (!dataset) return 0;
    
    return dataset.filter((record) => {
      const textMatch = Object.values(record).some((field) =>
        String(field).toLowerCase().includes(searchTerm.toLowerCase())
      );
      const stateMatch = stateFilter === "all" || record.state === stateFilter;
      const yearMatch = yearFilter === "all" || String(record.year) === yearFilter;
      return textMatch && stateMatch && yearMatch;
    }).length;
  },
  
  getTotalCount: () => {
    return get().dataset?.length || 0;
  },
  
  getCurrentFilters: () => {
    const { searchTerm, stateFilter, yearFilter } = get();
    return {
      search: searchTerm || undefined,
      state: stateFilter !== "all" ? stateFilter : undefined,
      year: yearFilter !== "all" ? yearFilter : undefined,
    };
  },
}));
