import { serverfetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getJobs = async () =>{
    return serverfetch('/api/jobs');
}

export const getJobById = async(jobId) =>{
    return serverfetch(`/api/jobs/${jobId}`)
}

export const getCompanyJobs = async (companyId, status = 'active') =>{
    const res  = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`)
    return res.json();

}