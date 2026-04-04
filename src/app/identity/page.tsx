"use client";

import { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Cpu, 
  Key, 
  Lock, 
  Zap, 
  Activity, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  QrCode,
  Fingerprint,
  ChevronRight,
  Server,
  Database
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/navbar";

export default function IdentityPage() {
  const [step, setStep] = useState(1);
  const [isNodeActive, setIsNodeActive] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [nodeId, setNodeId] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function syncIdentity() {
      const savedActive = localStorage.getItem("aether_node_active") === "true";
      const savedId = localStorage.getItem("aether_node_id");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (savedActive && savedId) {
        setIsNodeActive(true);
        setNodeId(savedId);
        setStep(3);
        
        // Sync to Supabase with user_id if logged in
        await supabase
          .from('identities')
          .upsert({ 
            node_id: savedId, 
            is_active: true,
            user_id: user?.id || null 
          }, { onConflict: 'node_id' });
      }
    }
    syncIdentity();
  }, []);

  const generateKeys = () => {
    setIsActivating(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        const newId = "AID-" + Math.random().toString(36).substring(2, 11).toUpperCase();
        setNodeId(newId);
        setIsActivating(false);
        setStep(2);
      }
    }, 50);
  };

  const activateNode = async () => {
    setIsNodeActive(true);
    localStorage.setItem("aether_node_active", "true");
    localStorage.setItem("aether_node_id", nodeId);
    
    // Save to Supabase
    await supabase
      .from('identities')
      .upsert({ node_id: nodeId, is_active: true }, { onConflict: 'node_id' });
      
    setStep(3);
  };

  const deactivateNode = async () => {
    if (nodeId) {
      await supabase
        .from('identities')
        .update({ is_active: false })
        .eq('node_id', nodeId);
    }
    
    setIsNodeActive(false);
// ...
    localStorage.removeItem("aether_node_active");
    localStorage.removeItem("aether_node_id");
    setStep(1);
    setNodeId("");
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col selection:bg-amber-400 selection:text-black">
      <Navbar />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 pt-32 pb-20 animate-in fade-in duration-1000">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Setup & Control */}
          <div className="lg:col-span-7 space-y-12">
             <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                    <ShieldCheck size={24} />
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight">Identity & Node Hub</h1>
               </div>
               <p className="text-zinc-500 font-medium max-w-xl">Configure and activate your Secure Identity Node for verifiable AI computing.</p>
             </div>

             <div className="relative p-12 bg-zinc-900/40 border border-white/5 rounded-[3.5rem] overflow-hidden group shadow-2xl">
                {/* Background Decoration */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-amber-400/5 rounded-full blur-[100px] group-hover:bg-amber-400/10 transition-all duration-700" />
                
                {step === 1 && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
                    <div className="space-y-2">
                       <h3 className="text-2xl font-bold tracking-tight">Node Initialization</h3>
                       <p className="text-sm text-zinc-500 leading-relaxed max-w-md">Begin by generating a cryptographically unique Identity Key for your browser node.</p>
                    </div>

                    <div className="p-8 bg-black/40 border border-white/5 rounded-[2.5rem] flex items-center justify-center">
                       {isActivating ? (
                         <div className="flex flex-col items-center gap-6 w-full max-w-xs">
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                               <div className="h-full bg-amber-400 transition-all duration-300" style={{ width: `${progress}%` }} />
                            </div>
                            <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.4em] animate-pulse">Generating Secure Keys...</span>
                         </div>
                       ) : (
                         <button 
                           onClick={generateKeys}
                           className="flex flex-col items-center gap-4 group/btn"
                         >
                            <div className="w-20 h-20 rounded-3xl bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-600 group-hover/btn:text-amber-400 group-hover/btn:border-amber-400/30 group-hover/btn:scale-110 transition-all duration-500">
                               <RefreshCw size={32} />
                            </div>
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] group-hover/btn:text-white transition-colors">Start Key Generation</span>
                         </button>
                       )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs font-medium text-zinc-600">
                       <div className="flex items-center gap-2">
                          <Lock size={14} className="text-zinc-700" />
                          <span>End-to-End Encryption</span>
                       </div>
                       <div className="w-1 h-1 rounded-full bg-zinc-800" />
                       <div className="flex items-center gap-2">
                          <Fingerprint size={14} className="text-zinc-700" />
                          <span>Local Binding Active</span>
                       </div>
                    </div>
                  </div>
                )}

                {step === 2 && nodeId && (
                  <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
                    <div className="space-y-2">
                       <h3 className="text-2xl font-bold tracking-tight text-white">Identity Binding</h3>
                       <p className="text-sm text-zinc-500 leading-relaxed">Your unique Identifier has been generated. Bind it to your browser to activate the node.</p>
                    </div>

                    <div className="p-8 bg-amber-400/5 border border-amber-400/10 rounded-[2.5rem] space-y-6">
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Node ID Generated</span>
                          <ShieldCheck size={18} className="text-amber-400" />
                       </div>
                       <div className="bg-black/60 p-6 rounded-2xl border border-white/5 font-mono text-2xl text-center tracking-[0.5em] text-white">
                          {nodeId}
                       </div>
                    </div>

                    <div className="flex flex-col gap-4">
                       <button 
                         onClick={activateNode}
                         className="w-full py-5 bg-amber-400 text-black font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_-10px_rgba(251,191,36,0.2)]"
                       >
                          Activate Secure Node
                       </button>
                       <button 
                        onClick={() => setStep(1)}
                        className="text-[10px] font-black text-zinc-600 uppercase tracking-widest hover:text-white transition-all underline underline-offset-8"
                       >
                          Re-generate Identity
                       </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-top-8 duration-500">
                    <div className="flex items-start justify-between">
                       <div className="space-y-4">
                          <div className="flex items-center gap-3">
                             <h3 className="text-3xl font-bold tracking-tight text-white">Node Fully Active</h3>
                             <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse" />
                          </div>
                          <p className="text-sm text-zinc-500 leading-relaxed max-w-md">Your Secure Identity Node is officially bound to the Aether Network. You can now perform verifiable, zero-knowledge inferences.</p>
                       </div>
                       <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl text-emerald-400">
                          <Zap size={32} />
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                       <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-3">
                          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                             <ShieldCheck size={16} />
                          </div>
                          <div className="space-y-1">
                             <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Security Status</p>
                             <p className="text-lg font-bold text-zinc-100">Verified & Bound</p>
                          </div>
                       </div>
                       <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-3">
                          <div className="w-8 h-8 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                             <Cpu size={16} />
                          </div>
                          <div className="space-y-1">
                             <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Compute Level</p>
                             <p className="text-lg font-bold text-zinc-100">L3 Isolated</p>
                          </div>
                       </div>
                    </div>

                    <div className="p-10 bg-black/40 border border-white/5 rounded-[3rem] space-y-8 relative overflow-hidden group/card shadow-2xl">
                       <div className="absolute right-0 top-0 w-32 h-32 bg-amber-400/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                       
                       <div className="space-y-2 relative z-10">
                          <h4 className="text-xs font-black text-amber-500 uppercase tracking-[0.3em]">Next Step Journey</h4>
                          <h3 className="text-lg font-bold text-white">Start Your First Confidential Chat</h3>
                          <p className="text-sm text-zinc-500 leading-relaxed">Head over to the Chat Hub to use specialized models like BioShield or FraudLens. Every query will now be signed with your Node ID.</p>
                       </div>

                       <div className="flex flex-col gap-4 relative z-10">
                          <button 
                            onClick={() => window.location.href = "/"}
                            className="w-full py-6 bg-amber-400 text-black font-black uppercase text-[11px] tracking-[0.4em] rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_-10px_rgba(251,191,36,0.3)] flex items-center justify-center gap-3"
                          >
                             Go To Inference Hub
                             <ChevronRight size={16} />
                          </button>
                          <button 
                            onClick={deactivateNode}
                            className="py-2 text-[10px] font-black text-zinc-800 uppercase tracking-widest hover:text-red-500 transition-all text-center"
                          >
                             Reset Node Identity
                          </button>
                       </div>
                    </div>
                  </div>
                )}

             </div>
          </div>

          {/* Right: Telemetry & Metrics */}
          <div className="lg:col-span-5 space-y-8">
             <div className="p-10 bg-zinc-900/30 border border-white/5 rounded-[3rem] space-y-10">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <Activity size={20} />
                   </div>
                   <h3 className="text-xl font-bold tracking-tight">Node Telemetry</h3>
                </div>

                <div className="grid grid-cols-1 gap-6">
                   {[
                      { icon: Cpu, label: "Private Core Engine", value: "Ready", status: "Active" },
                      { icon: Server, label: "Local Compute Pool", value: "128.4 MB", status: "Secure" },
                      { icon: Database, label: "Encrypted Storage", value: "A-Delta", status: "Locked" }
                   ].map(item => (
                     <div key={item.label} className="p-6 bg-white/[0.01] border border-white/5 rounded-[2rem] flex items-center justify-between group hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-2xl bg-zinc-800 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-blue-400 transition-colors">
                              <item.icon size={18} />
                           </div>
                           <div className="space-y-1">
                              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{item.label}</p>
                              <p className="text-sm font-bold text-zinc-300">{item.value}</p>
                           </div>
                        </div>
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest px-2 py-1 bg-emerald-500/10 rounded-lg">{item.status}</span>
                     </div>
                   ))}
                </div>

                <div className="p-10 bg-gradient-to-br from-amber-400/5 via-transparent to-transparent border border-amber-400/10 rounded-[2.5rem] relative overflow-hidden group">
                   <QrCode size={120} className="absolute -right-8 -bottom-8 text-amber-400/5 rotate-12 transition-transform group-hover:scale-110" />
                   <div className="space-y-6 relative z-10">
                      <div className="space-y-2">
                         <h4 className="text-lg font-bold tracking-tight">Aether Delta Sync</h4>
                         <p className="text-xs text-zinc-500 leading-relaxed">Connect your mobile node to synchronize private sessions across devices securely.</p>
                      </div>
                      <button className="px-6 py-3 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-amber-400 hover:text-black transition-all">
                        Generate Pair Code
                      </button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
