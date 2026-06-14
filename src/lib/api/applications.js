import { serverfetch } from "../core/server"

export const getApplicationByApplicant = async(applicantId) =>{
    return serverfetch(`/api/applications?applicantId=${applicantId}`)
}