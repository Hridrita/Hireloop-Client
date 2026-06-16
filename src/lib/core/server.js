import { headers } from "next/headers";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverfetch = async(path) =>{
    const res = await fetch(`${baseUrl}${path}`, { cache: 'no-store' });
    if (!res.ok) return null;
    
    const text = await res.text();
    return text ? JSON.parse(text) : null;
}

export const authHeader = async() =>{
    const token = await getUserToken();
    const header = {
        authorization: `Bearer ${token}`
    }
    return token ? header : {};
}

export const protectedFetch = async(path) =>{
    const res = await fetch(`${baseUrl}${path}`,
        {
        headers: await authHeader()
    }
    );
    return res.json()
}

export const serverMutation = async(path, data) =>{
    const res = await fetch(`${baseUrl}${path}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ... await authHeader()
        },
        body: JSON.stringify(data)
    });

    //handle 401,404,403
    return res.json();
}


export const serverUpdate = async(path, data) =>{
    const res = await fetch(`${baseUrl}${path}`,{
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json',
            ... await authHeader()
         },
        body: JSON.stringify(data)
    });
    return res.json();
}