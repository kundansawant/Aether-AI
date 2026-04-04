"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Supabase will automatically handle the #access_token fragment 
    // and set the session cookie when the client initialized.
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (session) {
        // Identity Verified! Moving to Secure Hub
        router.push("/");
      } else if (error) {
        console.error("Callback Verification Failed:", error.message);
        router.push("/auth?error=verification_failed");
      } else {
        // Fallback: Wait a moment for the hash to be processed
        setTimeout(() => router.push("/"), 2000);
      }
    };

    checkSession();
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
