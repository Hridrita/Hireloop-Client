import { getApplicationByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import Link from 'next/link';

const page = async () => {
    const user = await getUserSession();
    const jobs = await getApplicationByApplicant(user.id);

    
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'applied': return 'border-blue-500 text-blue-500';
            case 'review': return 'border-orange-500 text-orange-500';
            case 'shortlisted': return 'border-green-500 text-green-500';
            case 'offered': return 'border-purple-500 text-purple-500';
            case 'rejected': return 'border-red-500 text-red-500';
            default: return 'border-gray-500 text-gray-500';
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-2">My Applications</h2>
            <p className="text-gray-400 mb-8">Track your job applications and interview progress in real-time.</p>

            <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="px-6 py-4 text-sm font-medium text-gray-400">Job Title</th>
                            <th className="px-6 py-4 text-sm font-medium text-gray-400">Company</th>
                            <th className="px-6 py-4 text-sm font-medium text-gray-400">Applied</th>
                            <th className="px-6 py-4 text-sm font-medium text-gray-400">Status</th>
                            <th className="px-6 py-4 text-sm font-medium text-gray-400">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {jobs.map((job) => (
                            <tr key={job._id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="font-semibold">{job.jobTitle}</div>
                                    <div className="text-xs text-gray-500">Full-time • Remote</div>
                                </td>
                                <td className="px-6 py-5 text-gray-300">{job.companyName}</td>
                                <td className="px-6 py-5 text-gray-300">
                                    {new Date(job.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-5">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(job.status)}`}>
                                        {job.status || 'Applied'}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <Link href={`/browse-jobs/${job.
jobId}`} className="text-sm text-blue-400 hover:underline">
                                        Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default page;