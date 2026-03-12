import { create } from "zustand";

export type Department = "health" | "agriculture";
export type Role = "admin" | "viewer";

interface OrgState {
  department: Department;
  role: Role;
  setDepartment: (dept: Department) => void;
  setRole: (role: Role) => void;
}

export const useOrgStore = create<OrgState>((set) => ({
  department: "health",
  role: "admin",
  setDepartment: (department) => set({ department }),
  setRole: (role) => set({ role }),
}));
