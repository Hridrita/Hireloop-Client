import { serverfetch } from "../core/server"

export const getPlanById = async(planId) =>{
    return serverfetch(`/api/plans?plan_id=${planId}`)
}