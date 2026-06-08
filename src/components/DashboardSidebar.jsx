"use client";

import { useState } from "react";
import { House, Magnifier, Bell, Envelope, Person, Gear, Bars, Xmark } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: House, label: "Home", href: "/dashboard" },
    { icon: Magnifier, label: "Search", href: "/browse-jobs" },
    { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
    { icon: Envelope, label: "Messages", href: "/dashboard/messages" },
    { icon: Person, label: "Profile", href: "/dashboard/profile" },
    { icon: Gear, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <>
      {/* trigger */}
      <button
        onClick={() => {
    console.log("clicked, isOpen:", isOpen);
    setIsOpen(true);
  }}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/20 text-white text-sm hover:bg-white/5 transition-colors cursor-pointer"
      >
        <Bars className="w-4 h-4" />
        Menu
      </button>

      {/* overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* drawer panel */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#0d0d0d] border-r border-white/10 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <Image src="/images/logo.png" alt="HireLoop" width={100} height={32} />
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            <Xmark className="w-5 h-5" />
          </button>
        </div>

        {/* nav */}
        <nav className="flex flex-col gap-1 p-3 mt-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors"
            >
              <item.icon className="w-5 h-5 text-white/40" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}