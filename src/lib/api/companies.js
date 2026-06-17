import { protectedFetch, serverfetch } from "../core/server";

export const dynamic = 'force-dynamic';

export const getRecruiterCompany = async(recruiterId,token) =>{
    return protectedFetch(`/api/my/companies?recruiterId=${recruiterId}`,token)
}

export const getCompanies = async(token)=>{
    // return serverfetch(`/api/companies`);

    return protectedFetch(`/api/companies`,token);
}