import { Button } from "@heroui/react";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-red-500/10 rounded-full">
            <ShieldAlert className="w-16 h-16 text-red-500" strokeWidth={1.5} />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Access Denied
          </h1>
          <p className="text-gray-400">
            You don't have permission to access this page. Please make sure you
            are logged in with the correct account type.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Link href={"/"}>
            <Button className="bg-linear-to-tr from-blue-600 to-purple-600 text-white font-medium rounded-xl">
              Back to Home
            </Button>
          </Link>

          <Link href={"/sign-in"}>
            <Button
              variant="bordered"
              className="border-white/10 bg-white/15 text-white font-medium rounded-xl px-8 py-6 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-95"
            >
              Sign In with Another Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
