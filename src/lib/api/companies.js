import { serverfetch } from "../core/server";

export const dynamic = 'force-dynamic';

export const getRecruiterCompany = async(recruiterId) =>{
    return serverfetch(`/api/my/companies?recruiterId=${recruiterId}`)
}

export const getCompanies = async()=>{
    return serverfetch(`/api/companies`);
}