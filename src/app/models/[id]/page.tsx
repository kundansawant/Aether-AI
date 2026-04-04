"use client";

import { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Cpu, 
  Star, 
  Zap, 
  Activity, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft,
  Flame,
  Award,
  Globe,
  Lock,
  Loader2,
  BarChart3,
  Clock,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { MODELS, Model } from "@/lib/models";
import { Navbar } from "@/components/navbar";

export default function ModelDetailsPage({ params }: { params: { id: string } }) {
  const [model, setModel] = useState<Model | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    // Small timeout for premium feel
    const timer = setTimeout(() => {
      const foundModel = MODELS.find(m => m.id === params.id);
      if (foundModel) setModel(foundModel);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-400" size={32} />
      </div>
    );
  }

  if (!model) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-500">
           <Zap size={32} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Model Cluster Not Found</h2>
        <Link href="/marketplace" className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Back to Marketplace</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col selection:bg-amber-400 selection:text-black">
      <Navbar />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 pt-32 pb-20 animate-in fade-in duration-1000">
        {/* Breadcrumb & Navigation */}
        <div className="mb-12 flex items-center justify-between">
           <Link href="/marketplace" className="flex items-center gap-3 text-zinc-500 hover:text-white transition-all group">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                 <ArrowLeft size={16} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">Back to Marketplace</span>
           </Link>
           
           <div className="flex items-center gap-2 px-4 py-2 border border-amber-400/20 bg-amber-400/5 rounded-xl">
              <ShieldCheck size={14} className="text-amber-400" />
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">A-Delta Cluster Verified</span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Model Header & Overview */}
          <div className="lg:col-span-8 space-y-16">
             <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                   <div className="space-y-4">
                      <div className="flex items-center gap-3">
                         <span className="px-3 py-1 bg-amber-400 text-black text-[9px] font-black uppercase tracking-widest rounded-lg">Level-4 Verified</span>
                         <span className="px-3 py-1 bg-white/5 border border-white/5 text-zinc-500 text-[9px] font-black uppercase tracking-widest rounded-lg">{model.category}</span>
                      </div>
                      <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">{model.name}</h1>
                   </div>
                   
                   <div className="flex items-center gap-6">
                      <div className="text-right">
                         <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Total Usage</p>
                         <p className="text-2xl font-bold text-zinc-300">{model.usage}</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-white/5 flex items-center justify-center text-amber-400">
                         <Flame size={24} />
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   {[
                      { icon: Clock, label: "Latency", value: model.latency, color: "text-blue-400" },
                      { icon: Activity, label: "Accuracy", value: model.accuracy, color: "text-emerald-400" },
                      { icon: Zap, label: "Inference", value: `${model.cost} CR`, color: "text-amber-400" },
                      { icon: Globe, label: "Uptime", value: "99.98%", color: "text-white" }
                   ].map(stat => (
                     <div key={stat.label} className="p-6 bg-zinc-900/30 border border-white/5 rounded-3xl space-y-2">
                        <stat.icon size={18} className={stat.color} />
                        <div className="space-y-0.5">
                           <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{stat.label}</p>
                           <p className="text-lg font-bold text-zinc-200">{stat.value}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="space-y-10">
                <div className="space-y-4">
                   <h3 className="text-xl font-bold tracking-tight">Model Overview</h3>
                   <p className="text-lg text-zinc-400 leading-relaxed font-normal">{model.overview}</p>
                </div>

                <div className="space-y-4 pt-6 border-t border-white/5">
                   <h3 className="text-xl font-bold tracking-tight">Technical Features</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {["End-to-End Encryption", "ZKML Verification", "Sensitive Data Masking", "Immutable Proofs", "Local Node Execution"].map(feature => (
                        <div key={feature} className="flex items-center gap-3">
                           <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                              <CheckCircle2 size={12} />
                           </div>
                           <span className="text-sm text-zinc-500 font-medium">{feature}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          {/* Right: Developer Info & Action */}
          <div className="lg:col-span-4 space-y-8">
             <div className="p-10 bg-zinc-900/50 border border-white/5 rounded-[3rem] space-y-10 sticky top-32">
                <div className="space-y-6">
                   <div className="flex items-start justify-between">
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Model Developer</p>
                         <h3 className="text-2xl font-bold tracking-tight">{model.developer.name}</h3>
                      </div>
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-600">
                         <Award size={28} />
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl w-fit">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Verified Auditor</span>
                   </div>
                </div>

                <div className="p-8 bg-black/40 border border-white/5 rounded-[2.5rem] space-y-8">
                   <div className="space-y-2">
                      <div className="flex justify-between items-center">
                         <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Node Compatibility</p>
                         <span className="text-[10px] font-bold text-amber-400">100% Match</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-amber-400 w-full" />
                      </div>
                   </div>

                   <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                      This model is fully compatible with your browser-based Identity Node. Activating this model will bind it to your local verification cluster.
                   </p>
                </div>

                <button 
                  onClick={() => {
                    setIsDeploying(true);
                    setTimeout(() => {
                      window.location.href = `/?model=${model.id}`;
                    }, 1500);
                  }}
                  disabled={isDeploying}
                  className={`w-full py-6 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all active:scale-95 ${
                    isDeploying 
                      ? "bg-zinc-800 text-zinc-500 animate-pulse" 
                      : "bg-amber-400 text-black hover:scale-105 shadow-[0_20px_40px_-10px_rgba(251,191,36,0.3)]"
                  }`}
                >
                   {isDeploying ? (
                     <>
                        <Loader2 className="animate-spin" size={16} />
                        Deploying Cluster...
                     </>
                   ) : (
                     <>
                        Activate & Deploy To Node
                        <ChevronRight size={18} />
                     </>
                   )}
                </button>

                <p className="text-center text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em] pt-4">Aether AI | Verifiable Marketplace V1</p>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
