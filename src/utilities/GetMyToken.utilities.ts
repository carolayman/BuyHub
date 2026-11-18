'use server'

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken(){
    const decodedToken = (await cookies()).get(`next-auth.session-token`)?.value || // development phase
                         (await cookies()).get(`__Secure-next-auth.session-token`)?.value ; // production phase
    const token = await decode({token:decodedToken , secret:process.env.NEXTAUTH_SECRET!})
    return token?.token
}