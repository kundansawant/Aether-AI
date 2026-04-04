"use client";

import { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Key, 
  Loader2, 
  ChevronRight, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Hash
} from "lucide-react";
import Link from "next/link";
import { signInAction, signUpAction, verifyOtpAction } from "./actions";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerifyingManual, setIsVerifyingManual] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setIsError(false);

    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const formData = { email, password, origin };
      
      if (isLogin) {
        const result = await signInAction(formData);
        if (!result.success) throw new Error(result.error);
        window.location.href = "/";
      } else {
        const result = await signUpAction(formData);
        if (!result.success) throw new Error(result.error);
        setSubmitted(true);
        setMessage("Verification code sent! Please check your email.");
      }
    } catch (err: any) {
      console.error("Auth Tunnel Failed:", err);
      setIsError(true);
      setMessage(err.message || "Connection refused by secure node.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setMessage(null);
    setIsError(false);

    try {
      const result = await verifyOtpAction({ email, token: otp });
      if (!result.success) throw new Error(result.error);
      
      setMessage("Identity Verified! Redirecting to Hub...");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err: any) {
      console.error("OTP Verification Failed:", err);
      setIsError(true);
      setMessage(err.message || "Invalid or expired verification code.");
    } finally {
      setIsVerifying(false);
    }
  };

  if (submitted || isVerifyingManual) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center p-6 selection:bg-amber-400 selection:text-black font-sans">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full max-w-md space-y-8 relative z-10 animate-in fade-in zoom-in-95 duration-700">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="w-20 h-20 rounded-[2.5rem] bg-emerald-500 flex items-center justify-center text-black shadow-[0_0_50px_rgba(16,185,129,0.2)]">
              <Mail className="w-10 h-10 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Identity Verification</h1>
              <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                {isVerifyingManual 
                  ? "Enter your Node-Email and the 6-digit cryptographic code sent to you."
                  : `Enter the 6-digit cryptographic code sent to ${email} to activate your node.`
                }
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="w-full space-y-6 bg-zinc-900/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[2.5rem]">
               <div className="space-y-4">
                  {isVerifyingManual && (
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 group-focus-within:text-amber-400 transition-colors ml-1">Node Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                        <input 
                          type="email" 
                          placeholder="name@provider.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/30 transition-all placeholder:text-zinc-700"
                          required
                        />
                      </div>
                    </div>
                  )}
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 group-focus-within:text-amber-400 transition-colors ml-1">Verification Code</label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                      <input 
                        type="text" 
                        placeholder="123456"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-center text-2xl font-mono tracking-[0.5em] focus:outline-none focus:ring-1 focus:ring-amber-400/30 transition-all placeholder:text-zinc-800 placeholder:tracking-normal"
                        required
                      />
                    </div>
                  </div>
               </div>

               {message && (
                  <div className={`p-4 rounded-xl flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300 ${isError ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                    {isError ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
                    <p className="text-xs font-medium">{message}</p>
                  </div>
                )}

               <button 
                disabled={isVerifying || otp.length < 6 || (isVerifyingManual && !email)}
                type="submit"
                className="w-full py-5 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 group/btn disabled:opacity-50"
               >
                  {isVerifying ? <Loader2 className="animate-spin" size={18} /> : (
                    <>
                      Verify Node Identity
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
               </button>
            </form>

            <div className="pt-4">
              <button 
                onClick={() => { setSubmitted(false); setIsVerifyingManual(false); }}
                className="text-[10px] font-black text-zinc-600 uppercase tracking-widest hover:text-white transition-colors"
              >
                Back to Auth Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center p-6 selection:bg-amber-400 selection:text-black font-sans">
      {/* Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col items-center space-y-4">
          <Link href="/" className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest mb-2">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>
          
          {/* Mode Switcher */}
          <div className="bg-zinc-900/80 p-1.5 rounded-2xl flex items-center gap-1 border border-white/5 w-64 shadow-2xl">
            <button 
              onClick={() => { setIsLogin(true); setSubmitted(false); }}
              className={`flex-1 py-2 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${isLogin ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20' : 'text-zinc-500 hover:text-white'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => { setIsLogin(false); setSubmitted(false); }}
              className={`flex-1 py-2 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${!isLogin ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-zinc-500 hover:text-white'}`}
            >
              Initialize Node
            </button>
          </div>

          <div className="text-center pt-2">
            <h1 className="text-3xl font-bold tracking-tight mb-1">
              {isLogin ? "Aether Core Login" : "Join Aether Network"}
            </h1>
            <p className="text-zinc-500 text-sm font-medium">
              {isLogin ? "Resync with your existing secure node." : "Generate a new cryptographic AI identity."}
            </p>
          </div>
        </div>

        <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/5 p-10 rounded-[3rem] shadow-2xl space-y-8">
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 group-focus-within:text-amber-400 transition-colors ml-1">Email Identity</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                  <input 
                    type="email" 
                    placeholder="name@provider.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/30 transition-all placeholder:text-zinc-700"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 group-focus-within:text-amber-400 transition-colors ml-1">Secure Key</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/30 transition-all placeholder:text-zinc-700"
                    required
                  />
                </div>
              </div>
            </div>

            {message && (
              <div className={`p-4 rounded-xl flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300 ${isError ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                {isError ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
                <p className="text-xs font-medium">{message}</p>
              </div>
            )}

            <button 
              disabled={loading}
              type="submit"
              className={`w-full py-5 font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2 group/btn ${isLogin ? 'bg-amber-400 text-black shadow-[0_20px_40px_-10px_rgba(251,191,36,0.3)]' : 'bg-emerald-500 text-black shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)]'}`}
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (
                <>
                  {isLogin ? "Authenticate Node" : "Initialize Identity"}
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-white/5 text-center">
            <button 
              onClick={() => { setIsVerifyingManual(true); setMessage(null); }}
              className="text-[10px] font-black text-amber-400 hover:text-white uppercase tracking-widest transition-all"
            >
              Already have a code? Verify Secure Node
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[10px] font-medium text-zinc-700 flex items-center justify-center gap-2">
            <Lock size={10} />
            Midnight Protocol Enabled
          </p>
        </div>
      </div>
    </div>
  );
}
