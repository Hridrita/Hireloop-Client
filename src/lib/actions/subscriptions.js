'use server'

import { serverMutation } from "../core/server"

export const createSubscription = async(subsInfo,token) =>{
    return serverMutation('/api/subscriptions', subsInfo,token)
}