"use client";

import { useState, useEffect } from "react";

interface Submission {
  _id: string;
  name: string;
  phone: string;
  company: string;
  website: string;
  budget: string;
  timestamp: string;
}

export default function RecordsPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/records?password=${encodeURIComponent(password)}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setAuthenticated(true);
        setSubmissions(data.submissions);
      } else {
        setAuthError(data.error || "Invalid password.");
      }
    } catch {
      setAuthError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/records?password=${encodeURIComponent(password)}`);
      const data = await res.json();
      if (data.success) setSubmissions(data.submissions);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center px-4">
        <form
          onSubmit={handleAuth}
          className="w-full max-w-sm space-y-5"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-heading font-bold text-white mb-2">
              Admin Access
            </h1>
            <p className="text-sm text-zinc-500">
              Enter admin password to view submissions.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {authError}
            </div>
          )}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-base focus:outline-none focus:border-blue-600/50 focus:ring-2 focus:ring-blue-600/10"
          />

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Checking..." : "Access Records"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] px-4 py-8 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">
              Submissions
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              {submissions.length} record{submissions.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={refresh}
            disabled={loading}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {submissions.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-500">No submissions yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="px-5 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr
                    key={sub._id}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-5 py-4 text-sm text-zinc-200 font-medium">
                      {sub.name}
                    </td>
                    <td className="px-5 py-4 text-sm text-zinc-300">
                      {sub.phone}
                    </td>
                    <td className="px-5 py-4 text-sm text-zinc-300">
                      {sub.company}
                    </td>
                    <td className="px-5 py-4 text-sm">
                      {sub.website ? (
                        <a
                          href={sub.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          {sub.website.replace(/^https?:\/\//, "")}
                        </a>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-sm text-zinc-300">
                      {sub.budget}
                    </td>
                    <td className="px-5 py-4 text-sm text-zinc-500">
                      {new Date(sub.timestamp).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
