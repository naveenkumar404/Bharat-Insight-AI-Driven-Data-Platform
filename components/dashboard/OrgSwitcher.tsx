"use client";

import { useOrgStore } from "@/store/useOrgStore";

const organizationOptions = [
  { id: "health", name: "Ministry of Health", icon: "🏥", color: "from-blue-500 to-cyan-500" },
  { id: "agriculture", name: "Ministry of Agriculture", icon: "🌾", color: "from-green-500 to-emerald-500" },
];

const accessRoles = [
  { id: "admin", name: "Admin", icon: "👑" },
  { id: "viewer", name: "Viewer", icon: "👁️" },
];

export function OrgSwitcher() {
  const { department, role, setDepartment, setRole } = useOrgStore();

  const activeDept = organizationOptions.find(d => d.id === department);
  const activeRole = accessRoles.find(r => r.id === role);

  return (
    <div className="flex gap-3 items-center">
      <div className="relative group">
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-700 rounded-lg hover:border-zinc-600 transition-all">
          <span className="text-lg">{activeDept?.icon}</span>
          <span className="font-medium">{activeDept?.name}</span>
          <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="absolute top-full mt-2 right-0 w-64 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
          {organizationOptions.map((org) => (
            <button
              key={org.id}
              onClick={() => setDepartment(org.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                org.id === department ? "bg-zinc-800" : ""
              }`}
            >
              <span className="text-xl">{org.icon}</span>
              <span className="flex-1 text-left">{org.name}</span>
              {org.id === department && (
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="relative group">
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-700 rounded-lg hover:border-zinc-600 transition-all">
          <span className="text-lg">{activeRole?.icon}</span>
          <span className="font-medium">{activeRole?.name}</span>
          <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="absolute top-full mt-2 right-0 w-48 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
          {accessRoles.map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                r.id === role ? "bg-zinc-800" : ""
              }`}
            >
              <span className="text-lg">{r.icon}</span>
              <span className="flex-1 text-left">{r.name}</span>
              {r.id === role && (
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
