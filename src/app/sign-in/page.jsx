"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeSlash, Envelope, Lock } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { redirect } from "next/navigation";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (formData) => {
    // console.log("Form data", formData);

   const {data,error} = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
    });
    // console.log("data:", data, "error", error);
    
    if(error){
        toast.error(error.message || "Something went wrong!")
    } else {
        toast.success("Login successful!");
        redirect("/");
    }
  };



  return (
    <main className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4 relative">
        <Toaster></Toaster>

      
      <div
        className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[560px] h-[260px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(108,63,212,0.32) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-[200px] left-[15%] w-[300px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(80,40,180,0.12) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[100px] right-[10%] w-[250px] h-[250px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(108,63,212,0.1) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-[400px]">

        
        <div className="flex justify-center mb-7 mt-20">
          <Link href="/">
            <Image src="/images/logo.png" alt="HireLoop" width={120} height={40} priority />
          </Link>
        </div>

       
        <div
          className="rounded-2xl p-7 backdrop-blur-xl"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.05) 100%)",
            border: "0.5px solid rgba(255,255,255,0.12)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <h1 className="text-white text-xl font-bold mb-1 text-center">Welcome back</h1>
          <p className="text-gray-500 text-xs mb-5 text-center">Sign in to continue your job search.</p>

          {/* Google */}
          <button
            
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-2.5 hover:bg-white/[0.09] border border-white/10 rounded-xl py-3 text-[#ddd] text-sm font-medium transition-colors mb-5 cursor-pointer disabled:opacity-60"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {googleLoading ? "Redirecting..." : "Continue with Google"}
          </button>

          {/* divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-gray-500 text-[11px]">or with email</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2.5">

            {/* Email */}
            <div>
              <div
                className="flex items-center rounded-xl px-4 py-3 focus-within:border-violet-500/60 transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.1)" }}
              >
                <Envelope className="w-4 h-4 text-[#555] shrink-0" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-transparent outline-none text-[#ccc] text-sm pl-2.5 placeholder:text-[#3a3a3a]"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1 pl-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <div
                className="flex items-center rounded-xl px-4 py-3 focus-within:border-violet-500/60 transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.1)" }}
              >
                <Lock className="w-4 h-4 text-[#555] shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Password"
                  className="w-full bg-transparent outline-none text-[#ccc] text-sm pl-2.5 pr-2 placeholder:text-[#3a3a3a] [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#444] hover:text-[#777] transition-colors cursor-pointer shrink-0"
                >
                  {showPassword ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1 pl-1">{errors.password.message}</p>}
            </div>

            {/* forgot password */}
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-violet-400 hover:text-violet-300 text-[11px] transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-all cursor-pointer hover:opacity-90 active:scale-[0.98] disabled:opacity-60 mt-1"
              style={{ background: "linear-gradient(135deg, #5b2fc9, #7c3aed)" }}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-gray-500 text-xs mt-5">
            New to hireloop?{" "}
            <Link href="/sign-up" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}