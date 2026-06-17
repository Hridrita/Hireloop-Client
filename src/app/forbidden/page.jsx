import { Button } from "@heroui/react";
import Link from "next/link";
import { Lock, Home, RefreshCcw } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        {/* Icon with Animation */}
        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-red-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="p-6 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl">
              <Lock className="w-16 h-16 text-red-500 animate-pulse" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-6xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-linear-to-b from-white to-gray-500">
            403
          </h1>
          <h2 className="text-2xl font-semibold">Access Forbidden</h2>
          <p className="text-gray-500 leading-relaxed">
            এই এরিয়াটি সুরক্ষিত। আপনার বর্তমান ক্রেডেনশিয়াল দিয়ে এখানে ঢোকার অনুমতি নেই।
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link href="/">
            <Button 
              fullWidth
              startContent={<Home size={18} />}
              className="bg-white text-black font-bold h-12 rounded-lg hover:bg-gray-200 transition-all"
            >
              Back to Safety
            </Button>
          </Link>

          <Link href="/sign-in">
            <Button
              variant="flat"
              fullWidth
              startContent={<RefreshCcw size={18} />}
              className="bg-white/5 text-white border border-white/10 h-12 rounded-lg hover:bg-white/10"
            >
              Retry with different account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}