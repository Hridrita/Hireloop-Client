import { protectedFetch } from "../core/server"

export const getApplicationByApplicant = async(applicantId, token) =>{
    return protectedFetch(`/api/applications?applicantId=${applicantId}`, token)
}