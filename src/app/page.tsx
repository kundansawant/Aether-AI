"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  Cpu, 
  ShieldCheck, 
  Clock, 
  Star, 
  Zap, 
  Activity, 
  Lock, 
  Loader2, 
  Send, 
  Upload, 
  Copy, 
  Download, 
  CheckCircle2,
  ChevronRight,
  BarChart3,
  History,
  Info,
  ExternalLink,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { MODELS, Model } from "@/lib/models";
import { Skeleton, EmptyState } from "@/components/ui-states";
import { Navbar } from "@/components/navbar";
import { supabase } from "@/lib/supabase";

function ChatContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const modelId = searchParams.get("model") || "minimax/minimax-m2.5:free";
  
  const [model, setModel] = useState<Model | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Inference State
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [isNodeActive, setIsNodeActive] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [logs, setLogs] = useState<any[]>([]);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  const fetchLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('inference_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (data) setLogs(data);
    } catch (err) {
      console.error("Failed to fetch node logs:", err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages, isRunning]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth");
        return;
      }
      fetchLogs();
    };
    
    checkUser();

    const savedActive = localStorage.getItem("aether_node_active") === "true";
    const savedId = localStorage.getItem("aether_node_id");
    if (savedActive && savedId) {
      setIsNodeActive(true);
      setActiveNodeId(savedId);
    }

    const foundModel = MODELS.find(m => m.id === modelId);
    if (foundModel) {
      setModel(foundModel);
      setIsLoading(false);
    } else {
      setModel(MODELS[0]);
      setIsLoading(false);
    }
  }, [modelId, router]);

  const handleRun = async () => {
    if (!input || !model) return;
    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    const currentRemoteId = model.remoteId;
    setInput("");
    setIsRunning(true);
    setStatus("Initiating Secure Compute Node...");
    
    try {
      const response = await fetch('/api/inference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelId: currentRemoteId, input: currentInput, isPrivate })
      });
      const data = await response.json();
      if (data.answer) {
        setStatus("Generating ZK-Proof...");
        setTimeout(fetchLogs, 1000); 
        const aiMessage = { 
          role: "ai", 
          content: data.answer,
          proof: data.proof_details,
          metadata: {
            cost: model.cost,
            safety: data.safety_score,
            privacy: data.privacy,
            model: data.model_used
          }
        };
        setMessages(prev => [...prev, aiMessage]);
        setStatus("Verified");
      } else {
        setMessages(prev => [...prev, { role: "ai", content: `Error: ${data.error || "Execution failed"}`, isError: true }]);
        setStatus("Execution failed");
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: "ai", content: "Error: Connection failed. Check your network.", isError: true }]);
      setStatus("Connection error");
    } finally {
      setIsRunning(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setInput((prev) => (prev ? prev + " " : "") + `[Attach: ${file.name}]`);
  };

  const [showProofModal, setShowProofModal] = useState(false);
  const [selectedProof, setSelectedProof] = useState<any>(null);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 space-y-8 pt-10">
        <Skeleton className="h-12 w-1/3 rounded-2xl" />
        <Skeleton className="h-[500px] w-full rounded-[2.5rem]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#0d0d0d] overflow-x-hidden text-[15px]">
      <Navbar />
      <main className="flex-1 flex flex-col pt-20 overflow-y-auto custom-scrollbar">
        <div ref={scrollContainerRef} className="flex-1 px-6 py-10 relative">
          {messages.length === 0 ? (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-700">
              <div className="h-16 w-16 bg-white/5 rounded-[2rem] border border-white/5 flex items-center justify-center text-zinc-700 shadow-inner">
                <MessageSquare size={32} />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tighter text-white">
                  How can <span className="text-amber-400">{model?.name}</span> help you today?
                </h2>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] select-none flex items-center gap-3 justify-center">
                  <span className={isNodeActive ? "text-emerald-500" : "text-zinc-800"}>
                    {isNodeActive ? "Secure Node Active" : "Standard Mode"}
                  </span>
                  {isNodeActive && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-zinc-800" />
                      <span className="text-zinc-500 tracking-widest font-mono">ID: {activeNodeId}</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto w-full space-y-12 pb-10">
              {messages.map((msg, i) => (
                <div key={i} className="flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 group">
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border transition-all ${
                    msg.role === "user" ? "bg-zinc-800 border-zinc-700 text-zinc-400" : "bg-primary border-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.2)]"
                  }`}>
                    {msg.role === "user" ? <div className="font-bold text-[10px]">ME</div> : <Cpu size={14} />}
                  </div>
                  <div className="flex flex-col flex-1 space-y-4 pt-1">
                    <div className="text-zinc-200 font-medium leading-[1.8] prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                    </div>
                    {msg.role === "ai" && msg.metadata && (
                      <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button onClick={() => { setSelectedProof(msg.proof); setShowProofModal(true); }} className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-600 hover:text-emerald-400 transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                          <ShieldCheck size={14} /> Verify
                        </button>
                        <button onClick={() => navigator.clipboard.writeText(msg.content)} className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-600 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                          <Copy size={14} /> Copy
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isRunning && (
                <div className="flex items-center gap-3 text-[10px] font-bold text-primary/60 uppercase tracking-widest ml-14 animate-pulse">
                   <Loader2 size={12} className="animate-spin" /> {status}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex-shrink-0 pb-10 pt-4 px-6 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d] to-transparent">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="relative bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] shadow-2xl transition-all focus-within:border-primary/20 group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
                <button 
                  onClick={() => setIsPrivate(!isPrivate)}
                  className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all ${isPrivate ? "bg-amber-400 text-black shadow-[0_0_20px_rgba(251,191,36,0.3)]" : "bg-white/5 text-zinc-500 hover:text-white"}`}
                >
                  <Lock size={18} />
                </button>
              </div>
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleRun(); } }}
                placeholder="Secure Query Entry..."
                className="w-full bg-transparent pl-20 pr-32 py-6 text-[15px] focus:outline-none resize-none placeholder:text-zinc-700 min-h-[68px] text-zinc-200"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                <button onClick={() => fileInputRef.current?.click()} className="p-2.5 rounded-xl text-zinc-600 hover:text-white"><Upload size={18} /></button>
                <button onClick={handleRun} disabled={isRunning || !input.trim()} className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${input.trim() ? "bg-white text-black shadow-xl" : "bg-zinc-800/50 text-zinc-600"}`}>
                  {isRunning ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={20} />}
                </button>
              </div>
            </div>
            <p className="text-center text-[9px] font-black text-zinc-800 uppercase tracking-[0.4em]">Aether AI | Trustless Computing | Network Proofs Active</p>
          </div>
        </div>

        {logs.length > 0 && (
          <div className="max-w-4xl mx-auto w-full px-6 py-20 border-t border-white/5 space-y-10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                   <BarChart3 className="text-amber-400" size={18} /> Verifiable Identity Audit
                </h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mt-1">Real-time Cloud Sync Proofs</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Network Live</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 pb-20">
              {logs.map((log) => (
                <div key={log.id} className="group flex items-center gap-6 p-6 bg-zinc-900/20 border border-white/5 rounded-3xl hover:bg-zinc-900/40 hover:border-white/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-amber-400 transition-colors">
                    <History size={18} />
                  </div>
                  <div className="flex-1 grid grid-cols-4 gap-8">
                    <div className="flex flex-col gap-1">
                      <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Node</p>
                      <p className="text-xs font-bold text-zinc-300 truncate font-mono">{log.node_id}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Model</p>
                      <p className="text-xs font-bold text-zinc-300 truncate">{log.model_name}</p>
                    </div>
                    <div className="flex flex-col gap-1 col-span-2">
                       <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Integrity Proof</p>
                       <p className="text-[10px] font-mono text-emerald-400/70 truncate bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">{log.proof_hash}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
                      <CheckCircle2 size={12} /> Verified
                    </span>
                    <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">
                       {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {showProofModal && selectedProof && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl">
          <div className="absolute inset-0" onClick={() => setShowProofModal(false)}></div>
          <div className="relative w-full max-w-xl bg-[#080808] border border-white/10 rounded-[3.5rem] p-12 space-y-10 shadow-2xl">
            <div className="flex justify-between items-start">
               <div className="flex gap-5">
                  <div className="w-14 h-14 bg-emerald-400/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-400/20"><ShieldCheck size={28} /></div>
                  <div><h3 className="text-2xl font-bold text-white">Verification Center</h3><p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest mt-1">Proof Sequence Alpha</p></div>
               </div>
               <button onClick={() => setShowProofModal(false)} className="text-zinc-600 hover:text-white"><ChevronRight size={22} className="rotate-180" /></button>
            </div>
            <div className="space-y-6">
              <div className="p-8 bg-white/[0.01] border border-white/5 rounded-[2.5rem] space-y-4">
                <div className="flex justify-between border-b border-white/5 pb-4"><span className="text-[10px] font-bold text-zinc-500">Model</span><span className="text-xs text-zinc-400 font-mono">{selectedProof.modelId}</span></div>
                <div className="flex justify-between border-b border-white/5 pb-4"><span className="text-[10px] font-bold text-zinc-500">Hash</span><span className="text-[10px] text-emerald-400 font-mono italic break-all">{selectedProof.hash}</span></div>
                <div className="flex justify-between"><span className="text-[10px] font-bold text-zinc-500">Time</span><span className="text-xs text-zinc-400">{selectedProof.timestamp}</span></div>
              </div>
            </div>
            <button onClick={() => setShowProofModal(false)} className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-zinc-400 hover:text-white transition-all">Dismiss Audit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-400" size={48} />
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}
