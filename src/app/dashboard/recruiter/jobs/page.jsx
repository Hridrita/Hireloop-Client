import { getCompanyJobs } from '@/lib/api/jobs';

const statusStyle = {
  active:   { bg: "bg-emerald-950/40", text: "text-emerald-400", border: "border-emerald-900/50" },
  inactive: { bg: "bg-red-950/40",     text: "text-red-400",     border: "border-red-900/50" },
  draft:    { bg: "bg-amber-950/40",   text: "text-amber-400",   border: "border-amber-900/50" },
};

const RecruiterJobs = async () => {
  const jobs = await getCompanyJobs("company_123") || [];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Manage all jobs</h2>
        <p className="text-sm text-zinc-400 mt-1">View, update, and manage your current job postings.</p>
      </div>
 
      <div className="rounded-2xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 text-zinc-400 font-medium">
            <tr>
              <th className="text-left px-5 py-3 border-b border-zinc-800">Job title</th>
              <th className="text-left px-4 py-3 border-b border-zinc-800">Type / category</th>
              <th className="text-left px-4 py-3 border-b border-zinc-800">Location</th>
              <th className="text-left px-4 py-3 border-b border-zinc-800">Status</th>
              <th className="text-left px-4 py-3 border-b border-zinc-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-zinc-500">No jobs found.</td>
              </tr>
            ) : jobs.map((job) => {
              const s = statusStyle[job.status] || statusStyle.draft;
              return (
                <tr key={job._id} className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                  <td className="px-5 py-3 font-medium text-white">{job.title}</td>
                  <td className="px-4 py-3">
                    <span className="text-white">{job.jobType}</span>
                    <span className="block text-xs text-zinc-400">{job.category}</span>
                  </td>
                  <td className="px-4 py-3 text-zinc-400">
                    {job.isRemote ? "🌐 Remote" : job.location}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium capitalize ${s.bg} ${s.text} ${s.border}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="p-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z"/><circle cx="12" cy="12" r="3" strokeWidth={1.5}/></svg>
                      </button>
                      <button className="p-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/></svg>
                      </button>
                      <button className="p-1.5 rounded-lg border border-zinc-700 text-red-500 hover:text-red-400 hover:border-red-800 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecruiterJobs;