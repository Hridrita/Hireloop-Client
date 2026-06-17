'use server'

import { serverMutation } from "../core/server"

export const submitApplication = async(applicationData,token) => {
    return serverMutation('/api/applications', applicationData,token)
}

