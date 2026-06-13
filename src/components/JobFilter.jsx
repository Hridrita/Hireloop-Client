"use client";

import { TextField, Label, InputGroup } from "@heroui/react";
import { Search } from "lucide-react";

export default function JobFilter({ onFilterChange, filters }) {
  const updateFilter = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 shadow-sm">
     
      <TextField
        className="md:col-span-2 flex flex-col"
        value={filters.search}
        onChange={(value) => updateFilter("search", value)}
      >
        <Label className="font-semibold text-sm mb-2 text-zinc-300">Search</Label>
        <InputGroup className="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
          <InputGroup.Prefix className="pl-3 text-zinc-400">
            <Search size={18} />
          </InputGroup.Prefix>
          <InputGroup.Input
            placeholder="Search by title or company..."
            className="bg-transparent text-zinc-100 placeholder:text-zinc-500 px-2 py-2.5 outline-none w-full"
          />
        </InputGroup>
      </TextField>

      
      <div className="flex flex-col">
        <label className="font-semibold text-sm mb-2 text-zinc-300">Category</label>
        <select
          value={filters.category}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-100 px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="All">All Categories</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      
      <div className="flex flex-col">
        <label className="font-semibold text-sm mb-2 text-zinc-300">Job Type</label>
        <select
          value={filters.jobType}
          onChange={(e) => updateFilter("jobType", e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-100 px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="All">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
           <option value="Remote">Remote</option>
        </select>
      </div>
    </div>
  );
}