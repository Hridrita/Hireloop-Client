// import { serverfetch } from "../core/server";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const getJobs = async () =>{
//     return serverfetch('/api/jobs');
// }

// export const getJobById = async(jobId) =>{
//     return serverfetch(`/api/jobs/${jobId}`)
// }

// export const getCompanyJobs = async (companyId, status = 'active') =>{
//     const res  = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`)
//     return res.json();

// }



const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getJobs = async () => {
    const res = await fetch(`${baseUrl}/api/jobs`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
}

export const getJobById = async(jobId) => {
    const res = await fetch(`${baseUrl}/api/jobs/${jobId}`);
    if (!res.ok) return null;
    return res.json();
}

export const getCompanyJobs = async (companyId, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
    return res.json();
}