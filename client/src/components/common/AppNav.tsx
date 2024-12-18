"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { AuthModal } from "../auth/AuthModal";
import { CustomSession } from "@/app/api/auth/[...nextauth]/authOptions";
import UserProfileAvatar from "./UserProfileAvatar";
import Link from "next/link";


export default function AppNav({session}:{session:CustomSession | null}){
    return(
        <nav className="flex justify-between items-center p-2 border-b">
            <div className="flex space-x-4 items-center">
                <Image src="/logo.png" alt="logo" width={50} height={50} />
                <Input className="rouneded-3xl" placeholder="Search..." />
            </div>
            <div>
                {
                session?.user ?
                <div className="flex space-x-4 items-center">
                <Link href={'/write-artical'} className="flex items-center"> 
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                    Write
                </Link>
                <UserProfileAvatar user={session.user!} />

                </div> 
                :  
                <AuthModal />
                }

            </div>
        </nav>
    )
}