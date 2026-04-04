"use client";

import { 
  Star, 
  ArrowUpRight, 
  Cpu, 
  ShieldCheck, 
  BarChart3,
  Clock,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { Model } from "@/lib/models";

interface ModelCardProps {
  model: Model;
  featured?: boolean;
}

export function ModelCard({ model, featured }: ModelCardProps) {
  return (
    <Link 
      href={`/models/${model.id}`}
      className={`group relative flex flex-col bg-card border border-border rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 ${
        featured ? "md:col-span-2 md:flex-row h-full" : ""
      }`}
    >
      <div className={`p-8 flex flex-col justify-between flex-1 ${featured ? "md:w-3/5" : ""}`}>
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 ${featured ? "w-16 h-16" : ""}`}>
                <Cpu size={featured ? 32 : 24} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className={`font-bold tracking-tight ${featured ? "text-2xl" : "text-lg"}`}>{model.name}</h3>
                  {model.developer.verified && <ShieldCheck size={14} className="text-primary" />}
                </div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{model.developer.name}</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <div className="p-1.5 rounded-xl border border-white/5 bg-zinc-900/50 shadow-inner flex items-center gap-1.5 px-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest leading-none">Verifiable</span>
              </div>
              <div className="p-1.5 rounded-xl border border-white/5 bg-zinc-900/50 shadow-inner flex items-center gap-1.5 px-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                <span className="text-[9px] font-black text-primary uppercase tracking-widest leading-none">Confidential</span>
              </div>
            </div>
          </div>

          <p className={`text-zinc-400 font-normal leading-relaxed ${featured ? "text-lg" : "text-sm line-clamp-2"}`}>
            {model.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {model.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-tight">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className={`mt-8 flex items-center gap-6 pt-6 border-t border-border ${featured ? "md:gap-10" : ""}`}>
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Inference</p>
            <p className="text-sm font-bold text-primary">{model.cost} <span className="text-[9px] text-zinc-500">CR</span></p>
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Latency</p>
            <p className="text-sm font-bold text-zinc-300">{model.latency}</p>
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Accuracy</p>
            <p className="text-sm font-bold text-emerald-400">{model.accuracy}</p>
          </div>
          {featured && (
            <div className="ml-auto hidden sm:block">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                Run Model <ChevronRight size={16} />
              </div>
            </div>
          )}
        </div>
      </div>

      {featured && (
        <div className="hidden md:flex flex-1 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent relative p-8 items-center justify-center overflow-hidden">
           <BarChart3 size={200} className="text-primary opacity-5 absolute -right-10 -bottom-10" />
           <div className="relative z-10 w-full p-6 bg-background/50 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Live Activity</span>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Trending Now</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-2/3 rounded-full"></div>
              </div>
              <p className="text-xs text-zinc-400 font-medium">Processing <span className="text-white font-bold">1.2M</span> monthly inferences.</p>
           </div>
        </div>
      )}
    </Link>
  );
}
