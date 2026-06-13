"use client";
import { useState, useEffect } from "react";
import JobCard from "@/components/JobCard";
import { getJobs } from "@/lib/api/jobs";
import JobFilter from "@/components/JobFilter";

export default function Page() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    jobType: "All",
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getJobs();
      setJobs(data);
      setFilteredJobs(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = jobs;

    if (filters.search) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.companyName.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    if (filters.category && filters.category !== "All") {
      filtered = filtered.filter((job) => job.category === filters.category);
    }

    if (filters.jobType && filters.jobType !== "All") {
      if (filters.jobType === "Remote") {
        filtered = filtered.filter((job) => job.isRemote === true);
      } else {
        filtered = filtered.filter((job) => job.jobType === filters.jobType);
      }
    }

    setFilteredJobs(filtered);
  }, [filters, jobs]);

  return (
    <div className="min-h-screen max-w-7xl mx-auto pt-28 px-4">
      <div className="pb-10">
        <h2 className="text-3xl font-bold">Open Positions</h2>
        <p className="text-zinc-400 mt-2">
          Discover your next engineering challenge
        </p>
      </div>

      <JobFilter onFilterChange={setFilters} filters={filters} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job._id?.$oid || job._id} job={job} />
          ))
        ) : (
          <p className="text-center col-span-full py-10">
            No jobs found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
}
