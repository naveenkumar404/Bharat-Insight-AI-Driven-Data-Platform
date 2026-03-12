import { DataGrid } from "@/components/dashboard/DataGrid";
import { OrgSwitcher } from "@/components/dashboard/OrgSwitcher";
import { CommandPalette } from "@/components/dashboard/CommandPalette";
import { AIInsightPanel } from "@/components/dashboard/AIInsightPanel";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <CommandPalette />
      
      <header className="border-b border-zinc-800/50 glass sticky top-0 z-40">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BI</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Analytics Dashboard</h1>
              <p className="text-xs text-zinc-500">Real-time data insights</p>
            </div>
          </div>
          <OrgSwitcher />
        </div>
      </header>

      <main className="flex">
        <div className="flex-1 p-6">
          <DataGrid />
        </div>
        <AIInsightPanel />
      </main>
    </div>
  );
}
