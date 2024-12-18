
import { LOGIN_URL } from '@/lib/ApiEndPoint';
import axios from "axios";
import { AuthOptions, ISODateString, User } from "next-auth";
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from "next-auth/providers/credentials";

export interface CustomSession {
    user?:CustomUser;
    expires: ISODateString
}

export interface CustomUser {
    id?:number | null;
    name?:string | null;
    email?:string | null;
    token?:string | null;
    image?:string | null;
    created_at?:string | null;
}

export const authOptions: AuthOptions = {

    pages:{
        signIn: '/login',
    },
    callbacks:{
        async jwt({token, user}) {
            if(user){
                token.user = user;
            }
            return token;
        },
        async session({session, token, user}:{
            session:CustomSession;
            token:JWT;
            user: User;
        }) {
            session.user = token.user as CustomUser
            return session
        }
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials, req) {
                try {
                    const res = await axios.post(LOGIN_URL,credentials);
                    const response = res.data; 
                    const user = response?.user; 
                    if (user) {
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error("Authorization error : ", error);
                    return null; 
                }
            },
        }),
    ],
};
