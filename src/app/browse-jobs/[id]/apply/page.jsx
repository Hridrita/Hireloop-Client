import { getJobById } from '@/lib/api/jobs';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import JobApply from './JobApply';

const ApplyPage = async({params}) => {
    const {id} = await params;
    const sessionResponse = await auth.api.getSession({
        headers: await headers()
    });

    const user = sessionResponse?.data?.session?.user || sessionResponse?.user || null;

    if(!user){
        redirect(`/sign-in?redirect=/browse-jobs/${id}/apply`)
    }

    if(user.role !== 'seeker'){
        return (
            <div className="w-full min-h-screen bg-zinc-900 flex flex-col justify-center items-center text-white p-6">
                
                    <h3 className="text-xl font-bold text-zinc-100 mb-2">Access Restricted</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        Only job seekers can apply for positions. Please sign in with a seeker account to proceed.
                    </p>
                    
                </div>
            
        );
    }

    const job = await getJobById(id);

    return (
        <div className="min-h-screen bg-zinc-950 pb-20">
            <div className="max-w-4xl mx-auto pt-28 px-4">
               
                <div className="mb-6">
                    <span className="text-blue-600 font-semibold text-sm">Application Portal</span>
                    <h2 className="text-3xl font-extrabold text-white mt-1">Apply for {job.title}</h2>
                </div>
                
                
                <JobApply applicant={user} job={job} />
            </div>
        </div>
    );
};

export default ApplyPage;