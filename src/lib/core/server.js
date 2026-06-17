// import { getUserToken } from "./session";

import { redirect } from "next/navigation";

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
    return handleStatusCode(res);
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
     
    return handleStatusCode(res);
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

    return handleStatusCode(res);
    
}

const handleStatusCode = res =>{
    if(res.status === 401){
        redirect("/unauthorized")
     }else if(res.status === 403) {
        redirect('/forbidden')
     }
     return res.json()

}