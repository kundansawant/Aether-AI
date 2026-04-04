"use client";

import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Zap, 
  Clock, 
  ShieldCheck, 
  LayoutGrid,
  Cpu,
  ChevronRight,
  Flame,
  Award,
  Sparkles
} from "lucide-react";
import { MODELS, Model } from "@/lib/models";
import { ModelCard } from "@/components/model-card";
import { Skeleton } from "@/components/ui-states";
import { Navbar } from "@/components/navbar";

const CATEGORIES = ["All", "NLP", "Computer Vision", "Audio", "Finance", "Healthcare"];

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading for premium feel
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);
  
  const filteredModels = activeCategory === "All" 
    ? MODELS 
    : MODELS.filter(m => m.category === activeCategory);

  const featuredModel = MODELS[0];
  const trendingModels = MODELS.slice(1, 4);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto px-6 space-y-12 pt-12 mt-20">
          <div className="space-y-4">
            <Skeleton className="h-12 w-1/2 rounded-2xl" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1,2,3].map(i => <Skeleton key={i} className="h-[300px] rounded-[2rem]" />)}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-6 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 py-10 mt-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">AI Model Marketplace</h1>
        <p className="text-zinc-500 font-medium tracking-tight">Discover and deploy verifiable AI models for your next session.</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-white/5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === cat 
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of model cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredModels.map(model => (
          <ModelCard key={model.id} model={model} />
        ))}
      </section>

      {/* Call to action section */}
      <section className="bg-gradient-to-br from-primary/5 via-card to-transparent border border-white/5 rounded-[3rem] p-12 text-center space-y-6">
        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mx-auto">
          <Zap size={32} />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Cant find the model you need?</h2>
        <p className="text-zinc-400 max-w-lg mx-auto leading-relaxed">
          We are constantly onboarded new verifiable models to our decentralized marketplace. 
          Contact our developer hub to request custom circuit integration.
        </p>
        <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all">
          Request Model Integration
        </button>
      </section>
      </main>
    </div>
  );
}
