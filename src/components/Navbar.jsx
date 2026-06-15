"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  //  console.log(session);

  const user = session?.user;
  console.log(user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  if (pathname.startsWith("/dashboard")) return null;

  const handleSignOut = async(e)=>{
    e.preventDefault();
    await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
        router.refresh();
      router.push("/sign-in");
    },
  },
});
  }

  const dashboardLinks = () =>{
    if(user?.role === "recruiter") return "/dashboard/recruiter";
    if(user?.role === "seeker") return "/dashboard/seeker";
    if(user?.role === "admin") return "/dashboard/admin";
    return "/";
  }

  const dashboardUrl = dashboardLinks();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4">
      <nav className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-black/80 backdrop-blur-md shadow-[0_10px_40px_rgba(59,130,246,0.3)]">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              <Image
                src="/images/logo.png"
                alt="Hireloop Logo"
                width={120}
                height={40}
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/browse-jobs"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Browse Jobs
            </Link>
            <Link
              href="/company"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Companies
            </Link>
            <Link
              href="/plans"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Pricing
            </Link>

            {user && (<Link
              href={dashboardUrl}
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Dashboard
            </Link>)}
          </div>

          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                
                  <Avatar>
                    <Avatar.Image alt="John Doe" src={user?.image} />
                    <Avatar.Fallback className="bg-blue-600 text-white font-bold">
                      {user?.name.charAt(0).toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>
                
                
                  <Link
                  href={"/sign-in"}
                  onClick={handleSignOut}
                    className="text-blue-600 hover:text-white transition-colors font-medium"
                  >
                    Sign out
                  </Link>
                
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-violet-400 hover:text-white transition-colors font-medium"
                >
                  Sign In
                </Link>
                <div className="h-6 w-[1px] bg-white/20"></div>
                <Link href={"/sign-up"}>
                  <Button
                    className="bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-medium rounded-full px-6 shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                    variant="flat"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 p-6 flex flex-col gap-4 text-white animate-in slide-in-from-top-4">
            <Link href="/browse-jobs" onClick={() => setIsMenuOpen(false)}>
              Browse Jobs
            </Link>
            <Link href="/company" onClick={() => setIsMenuOpen(false)}>
              Company
            </Link>
            <Link href="/plans" onClick={() => setIsMenuOpen(false)}>
              Pricing
            </Link>
            <hr className="border-white/10" />
            <Link href={dashboardUrl} onClick={() => setIsMenuOpen(false)}>
              Dashboard
            </Link>
            <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
              Sign In
            </Link>
            <Button
              className="bg-linear-to-tr from-blue-600 to-purple-600 text-white font-medium rounded-full"
              fullWidth
            >
              Get Started
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
}
