"use client";
import { StatCard } from "@/components/StatCard";
import { authClient } from "@/lib/auth-client";
import { Spinner, Button } from "@heroui/react";
import {
  FileText,
  Persons,
  Thunderbolt,
  SealCheck,
  Plus,
} from "@gravity-ui/icons";
import { useState } from "react";
import NewJobPostForm from "./jobs/new/NewJobPostForm";

const RecruiterDashboardClient = ({ company }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const recruiterStats = [
    { title: "Total Job Posts", value: 48, icon: FileText },
    { title: "Total Applicants", value: 1284, icon: Persons },
    { title: "Active Jobs", value: 18, icon: Thunderbolt },
    { title: "Jobs Closed", value: 32, icon: SealCheck },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-6">
        Welcome back, {user?.name}
      </h1>

      <StatCard stats={recruiterStats} />

      <div className="fixed bottom-8 right-8 z-50 group">
        <Button
          isIconOnly
          color="primary"
          aria-label="Add"
          className="w-14 h-14 rounded-full bg-violet-600 hover:bg-violet-700 shadow-xl"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-8 h-8" />
        </Button>

        <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-zinc-800 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Post a Job
        </span>
      </div>

      <NewJobPostForm
        isOpen={isModalOpen}
        company={company}
        onClose={() => setIsModalOpen(false)}
      ></NewJobPostForm>
    </div>
  );
};

export default RecruiterDashboardClient;
