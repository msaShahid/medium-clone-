import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions';
import Link from 'next/link';
import {signOut} from "next-auth/react";
import axios from 'axios';
import { LOGOUT_URL } from '@/lib/ApiEndPoint';
import { toast } from 'react-toastify';



export default function UserProfileAvatar({user}:{user:CustomUser}) {

    const logout =  () => {
        axios.post(LOGOUT_URL, {}, {
            headers:{
                Authorization:  `Bearer ${user.token}`,
                Accept:'application/json'
            }
        }).then((res) => {
            toast.success("logout successfully!", {theme:'colored'})
            signOut({
                callbackUrl: '/',
                redirect: true,
            })
        })
        .catch((err) => {
            toast.error("something went wrong!", {theme:'colored'})
        })

    }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild >
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{user.name?.[2].toLocaleUpperCase()}</AvatarFallback>
                </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Link href="dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

  )
}
