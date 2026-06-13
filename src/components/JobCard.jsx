"use client";

import { Card, Chip, Button } from "@heroui/react";
import { MapPin, DollarSign, Calendar, ExternalLink, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function JobCard({ job }) {
  
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active": return "success";
      case "closed": return "danger";
      default: return "default";
    }
  };

  return (
    <Card className="w-full p-5 bg-default-50/50 border border-default-200 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl group">
     
      <div className="flex gap-4 mb-5">
        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-default-100 flex items-center justify-center overflow-hidden shrink-0">
          <Image
            src={job.companyLogo}
            alt={job.companyName}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-default-900 truncate">{job.title}</h3>
          <p className="text-sm font-medium text-primary">{job.companyName}</p>
        </div>
        <div className="shrink-0">
          <Chip 
            color={getStatusColor(job.status)} 
            variant="flat" 
            size="sm" 
            className="font-bold uppercase tracking-wider"
          >
            {job.status}
          </Chip>
        </div>
      </div>

      
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="px-2.5 py-1 rounded-full bg-blue-50 text-xs font-medium text-blue-600 flex items-center border border-blue-100">
          <Briefcase size={12} className="mr-1" /> {job.category}
        </div>
        <div className="px-2.5 py-1 rounded-full bg-zinc-100 text-xs font-medium text-zinc-600 border border-zinc-200">
          {job.jobType}
        </div>
        {job.isRemote && (
          <div className="px-2.5 py-1 rounded-full bg-emerald-50 text-xs font-medium text-emerald-600 border border-emerald-100">
            Remote
          </div>
        )}
      </div>

     
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-default-500 flex items-center gap-2"><MapPin size={16} /> Location</span>
          <span className="font-semibold text-default-800">{job.location}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-default-500 flex items-center gap-2"><DollarSign size={16} /> Salary</span>
          <span className="font-semibold text-emerald-600">{job.salaryRange}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-default-500 flex items-center gap-2"><Calendar size={16} /> Deadline</span>
          <span className="font-semibold text-default-800">
            {new Date(job.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
          </span>
        </div>
      </div>

      <Link href={`/browse-jobs/${job._id}`}>
      <Button
        as="span"
        fullWidth
        className="font-bold h-11 text-white bg-linear-to-tr from-blue-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
        endContent={<ExternalLink size={16} />}
      >
        Apply Now
      </Button>
      </Link>
      
    </Card>
  );
}