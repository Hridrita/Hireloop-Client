// import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverfetch = async(path) =>{
    const res = await fetch(`${baseUrl}${path}`, { cache: 'no-store' });
    if (!res.ok) return null;
    
    const text = await res.text();
    return text ? JSON.parse(text) : null;
}

// export const authHeader = async() =>{
//     const token = await getUserToken();
//     const header = {
//         authorization: `Bearer ${token}`
//     }
//     return token ? header : {};
// }

export const authHeader = (token) =>{ 
    return token ? { authorization: `Bearer ${token}` } : {};
}

export const protectedFetch = async(path, token) =>{
    const res = await fetch(`${baseUrl}${path}`,
        {
        headers: authHeader(token)
    });
    return res.json()
}

export const serverMutation = async(path, data, token) =>{
    const res = await fetch(`${baseUrl}${path}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader(token)
        },
        body: JSON.stringify(data)
    });

    //handle 401,404,403
    return res.json();
}


export const serverUpdate = async(path, data, token) =>{
    const res = await fetch(`${baseUrl}${path}`,{
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json',
            ...authHeader(token)
         },
        body: JSON.stringify(data)
    });
    return res.json();
}