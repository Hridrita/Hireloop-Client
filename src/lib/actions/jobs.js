'use server'

import { serverMutation } from "../core/server"

export const createJob = async(newJobData,token) =>{
    return serverMutation('/api/jobs', newJobData,token);
}

