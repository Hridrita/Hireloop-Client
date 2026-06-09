"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { BarsDescendingAlignLeft } from "@gravity-ui/icons";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <DashboardSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      
      <div className="lg:ml-64 flex flex-col min-h-screen">

        
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <BarsDescendingAlignLeft className="w-4 h-4" />
          </button>
          
        </div>

        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;