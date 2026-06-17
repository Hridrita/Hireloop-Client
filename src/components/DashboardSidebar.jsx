"use client";
import { useState, forwardRef, useImperativeHandle } from "react";
import {
  House,
  Magnifier,
  Briefcase,
  Envelope,
  Person,
  Gear,
  Xmark,
  Dice4,
  FileText,
  CreditCard,
  Bookmark
} from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";
import { BriefcaseBusiness, Building2, LayoutDashboard, Settings, Users } from "lucide-react";

export function DashboardSidebar({ onToggle, isOpen, setIsOpen }) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex items-center gap-2 text-white/50 text-sm">
        <Spinner size="sm" />
        Loading...
      </div>
    );
  }
  const user = session?.user;

  const recruiterNavLinks = [
    { icon: House, label: "Home", href: "/" },
    { icon: Dice4, label: "Dashboard", href: "/dashboard/recruiter" },
    { icon: Magnifier, label: "Jobs", href: "/dashboard/recruiter/jobs" },
    { icon: Briefcase, label: "Company Profile", href: "/dashboard/recruiter/company" },
    { icon: Envelope, label: "Messages", href: "/dashboard/messages" },
    { icon: Person, label: "Profile", href: "/dashboard/profile" },
    { icon: Gear, label: "Settings", href: "/dashboard/recruiter/settings" },
  ]

  
    const seekerNavLinks = [
  { icon: House, label: "Home", href: "/" },
  { icon: Dice4, label: "Dashboard", href: "/dashboard/seeker" },
  { icon: Magnifier, label: "Find Jobs", href: "/browse-jobs" }, 
  { icon: Briefcase, label: "Applied Jobs", href: "/dashboard/seeker/applications" },
  { icon: Bookmark, label: "Saved Jobs", href: "/dashboard/seeker/saved-jobs" },
  { icon: CreditCard, label: "Billing", href: "/dashboard/seeker/billing" },
  { icon: Gear, label: "Settings", href: "/dashboard/seeker/settings" },
];

const adminNavLinks = [
  { icon: House, label: "Home", href: "/" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/admin" },
  { icon: Users, label: "Users", href: "/dashboard/admin/users" },
  { icon: Building2, label: "Companies", href: "/dashboard/admin/companies" },
  { icon: BriefcaseBusiness, label: "Jobs", href: "/dashboard/admin/jobs" },
  { icon: CreditCard, label: "Payments", href: "/dashboard/admin/payments" },
  { icon: Settings, label: "Settings", href: "/dashboard/admin/settings" },
];

const navLinksMap = {
  seeker: seekerNavLinks,
  recruiter: recruiterNavLinks,
  admin: adminNavLinks
}
  

  const navItems = navLinksMap[user?.role || 'seeker'];


  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <Image src="/images/logo.png" alt="HireLoop" width={100} height={32} />
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden text-white/40 hover:text-white transition-colors cursor-pointer"
        >
          <Xmark className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-white text-sm font-medium truncate">
            {user?.name}
          </span>
          <span className="text-white/40 text-xs truncate">{user?.email}</span>
        </div>
      </div>
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
  );

  return (
    <>
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-[#0d0d0d] border-r border-white/10 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>

      <div className="hidden lg:flex flex-col fixed top-0 left-0 h-full w-64 bg-[#0d0d0d] border-r border-white/10 z-30">
        <SidebarContent />
      </div>
    </>
  );
}
