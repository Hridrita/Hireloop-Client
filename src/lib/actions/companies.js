'use server'

import { revalidatePath } from "next/cache"
import { serverMutation, serverUpdate } from "../core/server"

export const createCompany = async (newCompanyData) =>{
    const result = await serverMutation('/api/companies', newCompanyData)
    revalidatePath('/dashboard/recruiter/company')
    return result
}

export const updateCompany = async (id, updatedData) =>{
    const result = await serverUpdate(`/api/companies/${id}`, updatedData)
    revalidatePath('/dashboard/recruiter/company')
    return result
}


