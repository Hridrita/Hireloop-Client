import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_pro': 'price_1TiEJkJ03JlSfJze8DrD4kLa',
    'seeker_premium': 'price_1TiEwFJ03JlSfJzevh2grq3d',
    'recruiter_enterprise': 'price_1TiExgJ03JlSfJzei26Zlo6g',
    'recruiter_growth': 'price_1TiExCJ03JlSfJzeMscQnYon'
}