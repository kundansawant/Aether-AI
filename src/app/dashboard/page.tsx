"use client";

import { useState, useEffect } from "react";
import { 
  BarChart3, 
  ShieldCheck, 
  Activity, 
  Clock, 
  Lock, 
  Zap, 
  Cpu,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Navbar } from "@/components/navbar";

const STATS = [
  { name: "Total Inferences", value: "1,284", icon: MessageSquareIcon, color: "text-amber-400", change: "+12%" },
  { name: "Verified Proofs", value: "99.9%", icon: ShieldCheck, color: "text-emerald-400", change: "Stable" },
  { name: "ZK-Nodes Active", value: "42", icon: Cpu, color: "text-primary", change: "+4" },
  { name: "Data Secured (MB)", value: "850.4", icon: Lock, color: "text-primary", change: "+200" },
];

function MessageSquareIcon({ size, className }: { size?: number, className?: string }) {
  return <Zap size={size} className={className} />;
}

import { getInferenceLogsAction } from "./actions";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [logs, setLogs] = useState<any[]>([]);

  const [nodeId, setNodeId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLogs() {
      const savedId = localStorage.getItem("aether_node_id");
      if (savedId) setNodeId(savedId);
      
      const { success, data, error } = await getInferenceLogsAction();

      const timer = setTimeout(() => {
        const storedLogs = JSON.parse(localStorage.getItem("aether_proof_logs") || "[]");
        
        if (success && data && data.length > 0) {
          // Merge MySQL logs with any local ones
          const formattedLogs = data.map((log: any) => ({
            id: log.id.toString(),
            model: log.model_name,
            status: log.status,
            time: new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            hash: log.proof_hash ? (log.proof_hash.length > 10 ? log.proof_hash.substring(0, 10) + "..." : log.proof_hash) : "N/A",
            type: "Text"
          }));
          setLogs(formattedLogs);
        } else {
          const defaultLogs = [
            { id: "pf-8291", model: "Aether Assistant", status: "Verified", time: "2h ago", hash: "0x72...91a", type: "Text" },
            { id: "pf-8290", model: "Vision OCR", status: "Verified", time: "5h ago", hash: "0x12...45b", type: "OCR" },
            { id: "pf-8289", model: "FraudLens", status: "Verified", time: "1d ago", hash: "0x98...21c", type: "ML" }
          ];
          setLogs(storedLogs.length > 0 ? storedLogs : defaultLogs);
        }
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
    fetchLogs();
  }, []);


  if (isLoading) {
    return <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <RefreshCw className="animate-spin text-primary" size={32} />
    </div>;
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 pt-32 pb-20 space-y-12 animate-in fade-in duration-1000">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">System Performance</h1>
            <div className="flex items-center gap-3">
              <p className="text-zinc-500 font-medium">Monitoring real-time confidential inference and proof generation across the network.</p>
              {nodeId && (
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
                  <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Active Node:</span>
                  <span className="text-[10px] font-mono text-amber-400 font-bold">{nodeId}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Network Live</span>
             </div>
             <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all">
                <RefreshCw size={18} />
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div key={stat.name} className="p-8 rounded-[2rem] bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all group">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color} border border-white/5 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={24} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-zinc-500'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">{stat.name}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-bold tracking-tight">{stat.value}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Audit & Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Logs Table */}
          <div className="lg:col-span-2 bg-zinc-900/30 border border-white/5 rounded-[3rem] overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Activity size={20} />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Recent Proof Logs</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 bg-black/40 border border-white/5 rounded-xl px-4 py-2">
                  <Search size={14} className="text-zinc-600" />
                  <input type="text" placeholder="Search hash..." className="bg-transparent border-none focus:outline-none text-[10px] font-bold text-zinc-300 w-32" />
                </div>
                <button className="p-2 bg-white/5 border border-white/10 rounded-xl text-zinc-500 hover:text-white transition-all">
                  <Filter size={18} />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-8 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Hash ID</th>
                    <th className="px-8 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Model</th>
                    <th className="px-8 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-primary transition-colors">
                            <Lock size={14} />
                          </div>
                          <span className="font-mono text-xs text-zinc-400 font-bold">{log.hash}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-zinc-200">{log.model}</p>
                          <p className="text-[9px] font-black text-zinc-600 uppercase tracking-tighter">{log.type}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-[10px] uppercase tracking-widest">
                          <div className="w-1 h-1 rounded-full bg-emerald-500" />
                          {log.status}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-xs text-zinc-500 font-medium">{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-white/[0.01] text-center">
               <button className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] hover:text-white transition-all">Load More History</button>
            </div>
          </div>

          {/* Visualization Section */}
          <div className="space-y-8">
             <div className="bg-gradient-to-br from-primary/10 via-card to-transparent border border-white/5 rounded-[3rem] p-10 space-y-8 relative overflow-hidden group">
                <BarChart3 size={120} className="absolute -right-10 -bottom-10 text-primary/10 rotate-12 transition-transform group-hover:scale-110" />
                <div className="space-y-2 relative z-10">
                   <h3 className="text-xl font-bold tracking-tight">Execution Fingerprint</h3>
                   <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Live ZK-Binding Activity</p>
                </div>
                
                <div className="flex items-center justify-center py-10 relative">
                   <div className="w-32 h-32 rounded-full border-4 border-primary/20 flex items-center justify-center relative shadow-[0_0_50px_rgba(var(--primary),0.1)]">
                      <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin duration-[3s]" />
                      <ShieldCheck size={48} className="text-primary animate-pulse" />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                   <div className="p-4 bg-black/40 border border-white/5 rounded-2xl space-y-1 text-center">
                      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Proof Latency</p>
                      <p className="text-sm font-bold text-zinc-300">0.82s</p>
                   </div>
                   <div className="p-4 bg-black/40 border border-white/5 rounded-2xl space-y-1 text-center">
                      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Integrity</p>
                      <p className="text-sm font-bold text-emerald-400">100%</p>
                   </div>
                </div>
             </div>

             <div className="bg-zinc-900/50 border border-white/5 rounded-[3rem] p-10 space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <AlertCircle size={20} />
                   </div>
                   <h3 className="text-lg font-bold tracking-tight">Node Security</h3>
                </div>
                <div className="space-y-4">
                   {[
                     { label: "Memory Isolation", status: "Active" },
                     { label: "Confidential Compute", status: "Enabled" },
                     { label: "Input Sanitization", status: "Rigid" }
                   ].map(item => (
                     <div key={item.label} className="flex items-center justify-between">
                        <span className="text-xs text-zinc-400 font-medium">{item.label}</span>
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{item.status}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
