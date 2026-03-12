"use client";

import { useState } from "react";
import { signIn } from "@/lib/supabase";
import { useOrgStore } from "@/store/useOrgStore";

export function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setRole } = useOrgStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await signIn(email, password);
      const userRole = data.user?.user_metadata?.role || "viewer";
      setRole(userRole);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials for testing
  const fillDemoCredentials = (role: "admin" | "viewer") => {
    if (role === "admin") {
      setEmail("admin@demo.com");
      setPassword("demo123");
    } else {
      setEmail("viewer@demo.com");
      setPassword("demo123");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 glass border border-zinc-800/50 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
        Sign In
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-zinc-900/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-zinc-900/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg transition-all font-semibold disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-zinc-800">
        <p className="text-sm text-zinc-500 mb-3 text-center">Demo Credentials:</p>
        <div className="flex gap-2">
          <button
            onClick={() => fillDemoCredentials("admin")}
            className="flex-1 px-3 py-2 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-lg text-sm transition-colors"
          >
            👑 Admin
          </button>
          <button
            onClick={() => fillDemoCredentials("viewer")}
            className="flex-1 px-3 py-2 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-lg text-sm transition-colors"
          >
            👁️ Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
