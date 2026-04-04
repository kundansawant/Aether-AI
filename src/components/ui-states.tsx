"use client";

import { AlertCircle, HelpCircle, ArrowRight, Github, Twitter, Linkedin, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";

/**
 * Skeleton Loader
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-white/5 border border-white/5 rounded-2xl ${className}`} />
  );
}

/**
 * Empty State
 */
export function EmptyState({ 
  title, 
  description, 
  icon: Icon = HelpCircle,
  actionLabel,
  onAction
}: { 
  title: string; 
  description: string; 
  icon?: any;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-6 bg-card/30 border border-border/50 rounded-[3rem] border-dashed">
      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-600">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <div className="space-y-2 max-w-sm">
        <h3 className="text-xl font-bold tracking-tight text-zinc-300">{title}</h3>
        <p className="text-sm text-zinc-500 font-normal leading-relaxed">{description}</p>
      </div>
      {actionLabel && (
        <button 
          onClick={onAction}
          className="flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-white hover:bg-white/10 transition-all"
        >
          {actionLabel} <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}

/**
 * Platform Footer
 */
export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5 pt-20 pb-12 bg-background relative overflow-hidden">
      {/* Subtle Gradient Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1 space-y-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-black text-lg shadow-lg shadow-primary/20">
              A
            </div>
            <span className="font-bold text-lg tracking-tight">Aether AI</span>
          </Link>
          <p className="text-xs text-zinc-500 leading-relaxed font-normal">
            The decentralized compute layer for privacy-preserving AI inference. Verifiable, sovereign, and secure.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-zinc-600 hover:text-primary transition-colors"><Twitter size={18} /></Link>
            <Link href="#" className="text-zinc-600 hover:text-primary transition-colors"><Github size={18} /></Link>
            <Link href="#" className="text-zinc-600 hover:text-primary transition-colors"><Linkedin size={18} /></Link>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Platform</h4>
          <ul className="space-y-3">
             {["Explore Models", "Developer Workspace", "Activity Logs", "Node Statistics"].map(link => (
               <li key={link}><Link href="#" className="text-xs text-zinc-500 hover:text-white transition-colors">{link}</Link></li>
             ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Security</h4>
          <ul className="space-y-3">
             {["ZK-Proof Pipeline", "Protocol Whitepaper", "Security Audits", "Privacy Policy"].map(link => (
               <li key={link}><Link href="#" className="text-xs text-zinc-500 hover:text-white transition-colors">{link}</Link></li>
             ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Enterprise</h4>
          <ul className="space-y-3">
             {["Custom Models", "Dedicated Nodes", "SLA Support", "Contact Sales"].map(link => (
               <li key={link}>
                 <Link href="#" className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
                   {link} <ExternalLink size={10} className="text-zinc-700" />
                 </Link>
               </li>
             ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
         <p>© 2026 Aether Labs. All rights reserved.</p>
         <div className="flex gap-8">
            <Link href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-zinc-400 transition-colors">Cookie Policy</Link>
            <Link href="#" className="hover:text-zinc-400 transition-colors">Uptime Status</Link>
         </div>
      </div>
    </footer>
  );
}
