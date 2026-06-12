import { serverfetch } from "../core/server";

export const dynamic = 'force-dynamic';

export const getRecruiterCompany = async(recruiterId) =>{
    return serverfetch(`/api/my/companies?recruiterId=${recruiterId}`)

    
    // const res = await fetch(`${baseUrl}/api/companies?recruiterId=${recruiterId}`);
    // return res.json();
}