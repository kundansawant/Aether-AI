"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
// Removed supabase import
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Session is now handled via server-side cookies
    // This callback is currently just a placeholder redirect
    router.push("/");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center space-y-6 animate-pulse">
        <div className="w-16 h-16 rounded-[2rem] bg-amber-400 flex items-center justify-center text-black shadow-[0_0_40px_rgba(251,191,36,0.2)]">
          <Loader2 className="animate-spin" size={32} />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold tracking-tight uppercase tracking-[0.2em]">Verifying Node Identity</h1>
          <p className="text-zinc-500 text-xs font-medium">Syncing cryptographic keys with Aether Core...</p>
        </div>
      </div>
    </div>
  );
}
