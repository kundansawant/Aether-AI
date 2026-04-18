"use client";

import { 
  History, 
  LayoutGrid, 
  Terminal, 
  Search, 
  ShieldCheck, 
  User, 
  Menu, 
  X,
  Command,
  MessageSquare,
  BarChart3
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getUserAction, signOutAction } from "@/app/auth/actions";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { name: "Chat", href: "/", icon: MessageSquare },
  { name: "Marketplace", href: "/marketplace", icon: LayoutGrid },
  { name: "Identity", href: "/identity", icon: ShieldCheck },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
];

export function Navbar({ session: initialSession }: { session?: any }) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(initialSession?.user ?? null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    
    // Auth Check
    async function checkAuth() {
      const currentUser = await getUserAction();
      setUser(currentUser);
    }
    
    if (!user) {
      checkAuth();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await signOutAction();
    setUser(null);
    router.push("/auth");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled 
        ? "py-3 bg-[#0d0d0d]/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl" 
        : "py-4 bg-transparent"
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        {/* Left: Branded Logo */}
        <Link href="/" className="flex items-center gap-3 group transition-all active:scale-95">
          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-amber-950 font-black text-xl shadow-[0_0_20px_rgba(251,191,36,0.3)] group-hover:scale-110 transition-transform">
            A
          </div>
          <span className="text-lg font-bold tracking-tight text-white hidden sm:block group-hover:text-amber-400 transition-colors">Aether AI</span>
        </Link>

        {/* Center: Desktop Navigation Pill */}
        <div className="hidden md:flex items-center bg-zinc-900/50 border border-white/5 rounded-2xl p-1 shadow-inner backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                  isActive 
                    ? "bg-zinc-800 text-white shadow-sm" 
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                <link.icon size={14} />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right: Status & Profile */}
        <div className="flex items-center gap-4">
          <div className={`hidden lg:flex items-center gap-2 px-4 py-2 border rounded-xl transition-all ${
            user ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-500" : "border-zinc-800 bg-zinc-900/40 text-zinc-500"
          }`}>
            <ShieldCheck size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              {user ? "Cloud Sync Active" : "Local Node Only"}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
             {user ? (
               <button 
                 onClick={handleLogout}
                 className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-300 transition-all active:scale-95 group"
               >
                 <User size={14} className="group-hover:text-amber-400" />
                 Sign Out
               </button>
             ) : (
               <Link 
                 href="/auth"
                 className="px-6 py-2 bg-amber-400 text-black rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_10px_20px_-5px_rgba(251,191,36,0.2)]"
               >
                 Login / Signup
               </Link>
             )}
             
             {/* Mobile Menu Toggle */}
             <button 
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               className="md:hidden w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white active:scale-90 transition-all font-sans"
             >
               {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0d0d0d]/95 backdrop-blur-3xl border-b border-white/10 p-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
          <div className="space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                  pathname === link.href ? "bg-amber-400/10 text-amber-500 border border-amber-400/20" : "text-zinc-500 hover:bg-white/5"
                }`}
              >
                <link.icon size={18} />
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-2 px-4 py-3 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Network Verified</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
