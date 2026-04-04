"use client";

import { Search, Bell, User } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-8 bg-background/50 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search models, requests, or providers..." 
            className="w-full bg-card/50 border border-border rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
        </button>

        <div className="h-8 w-[1px] bg-border mx-2 hidden sm:block"></div>

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">Austin Robertson</p>
            <p className="text-[11px] text-zinc-400 font-medium tracking-tight">Node ID: aeth_8f2d9a</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center overflow-hidden">
            <User className="text-primary" size={24} />
          </div>
        </div>
      </div>
    </header>
  );
}
