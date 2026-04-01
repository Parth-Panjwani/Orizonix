"use client";

import { useState, useEffect } from "react";
import { 
  Users, Trash2, Calendar, IndianRupee, Mail, Phone, ExternalLink, 
  Search, Filter, ChevronRight, Save, LayoutDashboard, Target, Activity, Settings, RefreshCcw, Tag
} from "lucide-react";
import { format } from "date-fns";

type LeadStatus = "New" | "Contacted" | "In Progress" | "Closed" | "Lost";

interface Lead {
  _id: string;
  name: string;
  phone: string;
  company: string;
  website: string;
  budget: string;
  timestamp: string;
  status: LeadStatus;
  notes: string;
  followUpDate?: string;
  value?: number;
}

const statusColors: Record<LeadStatus, string> = {
  New: "bg-blue-100 text-blue-700 border-blue-200",
  Contacted: "bg-yellow-100 text-yellow-700 border-yellow-200",
  "In Progress": "bg-purple-100 text-purple-700 border-purple-200",
  Closed: "bg-green-100 text-green-700 border-green-200",
  Lost: "bg-red-100 text-red-700 border-red-200",
};

export default function RecordsDashboard() {
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "All">("All");

  /* ── Auth Flow ── */
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/records?password=${encodeURIComponent(password)}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setAuthenticated(true);
        setLeads(data.submissions);
      } else {
        setAuthError(data.error || "Invalid password.");
      }
    } catch {
      setAuthError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const refreshLeads = async () => {
    try {
      const res = await fetch(`/api/records?password=${encodeURIComponent(password)}`);
      const data = await res.json();
      if (data.success) {
        setLeads(data.submissions);
        if (selectedLead) {
          const updatedSelected = data.submissions.find((l: Lead) => l._id === selectedLead._id);
          if (updatedSelected) setSelectedLead(updatedSelected);
        }
      }
    } catch {}
  };

  /* ── Lead Management API Calls ── */
  const updateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      const res = await fetch(`/api/records/${id}?password=${encodeURIComponent(password)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        refreshLeads();
      } else {
        alert("Failed to update lead");
      }
    } catch {
      alert("Network error.");
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this lead?")) return;
    try {
      const res = await fetch(`/api/records/${id}?password=${encodeURIComponent(password)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSelectedLead(null);
        refreshLeads();
      } else {
        alert("Failed to delete lead");
      }
    } catch {
      alert("Network error.");
    }
  };

  /* ── Authentication Screen ── */
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 font-body">
        <form onSubmit={handleAuth} className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard size={24} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Orizonix CRM</h1>
            <p className="text-sm text-slate-500">Secure access required.</p>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm text-center">
              {authError}
            </div>
          )}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin Password"
            className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 mb-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            autoFocus
          />

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    );
  }

  /* ── Filter & Search Logic ── */
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      lead.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeLeadsCount = leads.filter(l => l.status !== "Closed" && l.status !== "Lost").length;

  return (
    <div className="min-h-screen bg-slate-50 font-body flex overflow-hidden">
      
      {/* ── Sidebar Navigation ── */}
      <div className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col h-screen shrink-0">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Target size={22} className="text-blue-600" />
            Orizonix CRM
          </h1>
        </div>
        
        <div className="p-4 space-y-1 flex-grow">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-blue-50 text-blue-700 rounded-lg font-medium text-sm">
            <Users size={18} /> Leads Pipeline
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg font-medium text-sm transition-colors">
            <Activity size={18} /> Analytics (Soon)
          </button>
        </div>
        
        <div className="p-4 border-t border-slate-100 space-y-1">
          <button onClick={() => setAuthenticated(false)} className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg font-medium text-sm transition-colors">
            <Settings size={18} /> Logout
          </button>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden">
        
        {/* Header Metrics */}
        <header className="bg-white border-b border-slate-200 p-4 shrink-0 flex items-center justify-between">
          <div className="flex gap-4">
            <MetricCard label="Total Leads" value={leads.length.toString()} />
            <MetricCard label="Active Pipeline" value={activeLeadsCount.toString()} />
          </div>
          <button onClick={refreshLeads} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Refresh">
            <RefreshCcw size={20} />
          </button>
        </header>

        {/* Dashboard Tools (Search/Filter) */}
        <div className="p-6 border-b border-slate-200 bg-white shrink-0 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or company..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={16} className="text-slate-400" />
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value as LeadStatus | "All")}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              {Object.keys(statusColors).map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lead List Box */}
        <div className="flex-grow overflow-auto bg-slate-50 p-6 flex gap-6">
          <div className={`flex-grow bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all ${selectedLead ? "w-1/2 hidden lg:flex" : "w-full flex"} flex-col`}>
            {filteredLeads.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8">
                <Users size={48} className="mb-4 opacity-20" />
                <p>No leads found.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 overflow-y-auto h-full">
                {filteredLeads.map((lead) => (
                  <button
                    key={lead._id}
                    onClick={() => setSelectedLead(lead)}
                    className={`w-full text-left p-4 hover:bg-blue-50/50 transition-colors flex items-center justify-between group ${
                      selectedLead?._id === lead._id ? "bg-blue-50/80" : ""
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-slate-900">{lead.name}</h3>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${statusColors[lead.status]}`}>
                          {lead.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 flex items-center gap-1.5">
                        {lead.company} <span className="text-slate-300">•</span> {new Date(lead.timestamp).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                      </p>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Panel: Lead Detail View */}
          {selectedLead && (
            <div className="w-full lg:w-[480px] bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col shrink-0 overflow-hidden h-full">
              <LeadDetailPanel 
                lead={selectedLead} 
                onClose={() => setSelectedLead(null)} 
                onUpdate={(updates) => updateLead(selectedLead._id, updates)}
                onDelete={() => deleteLead(selectedLead._id)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Subcomponents ── */

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-2">
      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">{label}</p>
      <p className="text-xl font-bold text-slate-900 leading-none">{value}</p>
    </div>
  );
}

function LeadDetailPanel({ 
  lead, onClose, onUpdate, onDelete 
}: { 
  lead: Lead; onClose: () => void; onUpdate: (u: Partial<Lead>) => void; onDelete: () => void;
}) {
  const [draftNotes, setDraftNotes] = useState(lead.notes);

  // Sync draft notes when lead changes
  useEffect(() => { setDraftNotes(lead.notes); }, [lead]);

  const handleSaveNotes = () => {
    if (draftNotes !== lead.notes) onUpdate({ notes: draftNotes });
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Detail Header */}
      <div className="p-6 border-b border-slate-100 flex items-start justify-between shrink-0 bg-slate-50/50">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">{lead.name}</h2>
          <p className="text-sm text-slate-500 font-medium">{lead.company}</p>
        </div>
        <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-slate-600 rounded-lg">
          <ChevronRight size={20} className="rotate-180 lg:rotate-0" />
        </button>
      </div>

      {/* Detail Scrollable Body */}
      <div className="flex-grow overflow-y-auto p-6 space-y-8">
        
        {/* Contact Info */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Contact Details</h3>
            <span className="text-xs text-slate-400">{format(new Date(lead.timestamp), "MMM d, yyyy 'at' h:mm a")}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 font-medium uppercase break-all flex items-center gap-1.5"><Phone size={12}/> Phone</span>
              <a href={`tel:${lead.phone}`} className="text-sm text-blue-600 hover:underline font-medium block truncate" title={lead.phone}>{lead.phone}</a>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 font-medium uppercase break-all flex items-center gap-1.5"><ExternalLink size={12}/> Website</span>
              {lead.website ? (
                <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline font-medium block truncate" title={lead.website}>
                  {lead.website.replace(/^https?:\/\//, "")}
                </a>
              ) : (
                <span className="text-sm text-slate-400">Not provided</span>
              )}
            </div>
            <div className="space-y-1 col-span-2">
              <span className="text-[11px] text-slate-400 font-medium uppercase break-all flex items-center gap-1.5"><IndianRupee size={12}/> Stated Budget</span>
              <div className="text-sm font-semibold text-slate-800 bg-slate-100 inline-block px-3 py-1.5 rounded-lg border border-slate-200">
                {lead.budget}
              </div>
            </div>
          </div>
        </section>

        {/* CRM Actions */}
        <section className="p-5 bg-blue-50/50 border border-blue-100 rounded-xl space-y-5">
          <div className="flex gap-4">
            <div className="w-1/2 space-y-1.5">
              <label className="text-[11px] text-slate-500 font-medium uppercase flex items-center gap-1.5"><Tag size={12}/> Pipeline Status</label>
              <select 
                value={lead.status}
                onChange={(e) => onUpdate({ status: e.target.value as LeadStatus })}
                className={`w-full text-sm font-medium px-3 py-2 rounded-lg border outline-none cursor-pointer transition-colors ${statusColors[lead.status]}`}
              >
                {Object.keys(statusColors).map((status) => (
                  <option key={status} value={status} className="bg-white text-slate-900">{status}</option>
                ))}
              </select>
            </div>
            <div className="w-1/2 space-y-1.5">
              <label className="text-[11px] text-slate-500 font-medium uppercase flex items-center gap-1.5"><Calendar size={12}/> Follow-up Date</label>
              <input
                type="date"
                value={lead.followUpDate ? new Date(lead.followUpDate).toISOString().split('T')[0] : ""}
                onChange={(e) => onUpdate({ followUpDate: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 outline-none focus:border-blue-500 cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* Notes */}
        <section className="space-y-3 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Private Notes</h3>
            {draftNotes !== lead.notes && (
              <button onClick={handleSaveNotes} className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700">
                <Save size={14} /> Save Notes
              </button>
            )}
          </div>
          <textarea
            value={draftNotes}
            onChange={(e) => setDraftNotes(e.target.value)}
            placeholder="Log call notes, strategy thoughts, next steps..."
            className="w-full h-40 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none text-slate-700 leading-relaxed"
          />
        </section>
      </div>

      {/* Delete Footer */}
      <div className="p-6 border-t border-slate-100 flex justify-end shrink-0">
        <button 
          onClick={onDelete}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-semibold transition-colors"
        >
          <Trash2 size={16} /> Delete Lead
        </button>
      </div>
    </div>
  );
}
