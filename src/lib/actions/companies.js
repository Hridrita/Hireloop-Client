'use server'

import { revalidatePath } from "next/cache"
import { serverMutation, serverUpdate } from "../core/server"

export const createCompany = async (newCompanyData,token) =>{
    const result = await serverMutation('/api/companies', newCompanyData,token)
    revalidatePath('/dashboard/recruiter/company')
    return result
}

export const updateCompany = async (id, updatedData,token) =>{
    const result = await serverUpdate(`/api/companies/${id}`, updatedData,token)
    revalidatePath('/dashboard/recruiter/company')
    return result
}


