import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaPinterest, FaLinkedin } from "react-icons/fa"; // react-icons ইনস্টল করে নিতে পারেন

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-16 px-6 border-t border-white/10">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Logo and Description */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="text-2xl font-bold text-white">
            <Image
              src="/images/logo.png"
              alt="Hireloop Logo"
              width={120}
              height={40}
              priority
            />
          </Link>
          <p className="text-sm max-w-xs">
            The AI-native career platform. Built for people who take their work
            seriously.
          </p>
          <div className="flex gap-4 pt-4">
            <Link href="#" className="hover:text-white">
              <FaFacebook size={20} />
            </Link>
            <Link href="#" className="hover:text-white">
              <FaPinterest size={20} />
            </Link>
            <Link href="#" className="hover:text-white">
              <FaLinkedin size={20} />
            </Link>
          </div>
        </div>

        {/* Links Sections */}
        <div>
          <h4 className="text-blue-500 font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-blue-400">
                Job discovery
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-400">
                Worker AI
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-400">
                Companies
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-400">
                Salary data
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-blue-500 font-semibold mb-4">Navigations</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-blue-400">
                Help center
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-400">
                Career library
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-blue-500 font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-blue-400">
                Brand Guideline
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-400">
                Newsroom
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mx-auto max-w-7xl mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between text-xs gap-4">
        <p>Copyright 2024 — Hire Loop</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-white">
            Terms & Policy
          </Link>
          <Link href="#" className="hover:text-white">
            Privacy Guideline
          </Link>
        </div>
      </div>
    </footer>
  );
}
