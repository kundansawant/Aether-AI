"use client";

import { 
  BarChart3, 
  ShieldCheck, 
  Menu, 
  X, 
  Zap,
  Cpu,
  Activity,
  Fingerprint,
  Settings as SettingsIcon,
  LayoutDashboard
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { name: "Inference", href: "/inference", icon: Zap },
  { name: "Marketplace", href: "/marketplace", icon: BarChart3 },
  { name: "Dashboard", href: "/dashboard", icon: Activity },
  { name: "Identity", href: "/access", icon: Fingerprint },
  { name: "Settings", href: "/settings", icon: SettingsIcon },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card border border-border rounded-lg text-primary"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`fixed inset-y-0 left-0 z-40 w-64 glass transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 px-2 mb-10 group cursor-pointer">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-black text-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-xl tracking-tight leading-none">Aether AI</span>
              <span className="text-[10px] font-medium text-zinc-500 tracking-wider">Private inference</span>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]" 
                      : "text-zinc-400 hover:bg-white/5 hover:text-primary"
                  }`}
                >
                  <item.icon size={18} />
                  <span className="tracking-wide">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-10">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-medium tracking-wider text-zinc-500">Secure node</span>
              </div>
              <p className="text-xs font-medium text-primary">Active: Shield v1.2</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
