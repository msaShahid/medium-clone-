import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { VERIFY_CREDENTIALS_URL } from "@/lib/ApiEndPoint"
import axios from "axios"
import { redirect } from "next/dist/server/api-utils"
import React, { useState } from 'react'
import { toast } from "react-toastify"
import { signIn } from "next-auth/react";



export default function Login() {

    const [authState, setAuthState] = useState({
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({
        email: [],
        password: [],
    });

    const resetAuthState = () => {
        setAuthState({ email: "", password: "" });
        setErrors({ email: [], password: [] });
    };

    const handleSubmit = (event:React.FormEvent) => {
        event.preventDefault()
        setLoading(true);        
        axios.post(VERIFY_CREDENTIALS_URL, authState, {
            headers:{
                Accept: "application/json"
            }
        })
        .then((res) => {
            setLoading(false);
            const response = res.data;
            console.log(response);

            if (response?.status === 401) {
                toast.error(response?.message || "Unauthorized access", { theme: "colored" });
            } else if (response?.status === 200) {
                const result =  signIn("credentials", {
                    email: authState.email,
                    password: authState.password,
                    callbackUrl: "/",
                    redirect: true
                });

                console.log('result :',result);
                // if (result?.error) {
                //     toast.error("Invalid credentials. Please try again."); 
                //     console.log(result);
                // } else {
                //     window.location.href = result?.url || "/"; 
                // }


            } else {
                toast.error("An unexpected error occurred", { theme: "colored" });
            }
            

            // Call the function to reset states
            resetAuthState();
            
        })
        .catch((err) => {
            setLoading(false); 
            // setErrors({
            //     email: [],
            //     password: []
            // });
           // console.log("Error at the time of login : ", err);
            const apiErrors = err?.response?.data?.errors;
            if (apiErrors) {
                setErrors(apiErrors)
            } else {
                toast.error("Network error or server not responding.", { theme: "colored" });
            }
        });
    }

  return (
    <TabsContent value="login">
        <Card>
            <CardHeader>
                <CardTitle>login</CardTitle>
                <CardDescription>
                    Welcome back to your account.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <form action="" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email"
                            placeholder="Enter your email..."
                            value={authState.email}
                            onChange={(event) => setAuthState({...authState, email:event.target.value})}
                        />
                         <span className="text-red-500">{errors?.email}</span>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password"
                            placeholder="Enter your password..."
                            value={authState.password}
                            onChange={(event) => setAuthState({...authState, password:event.target.value})}
                        />
                         <span className="text-red-500">{errors?.password}</span>
                    </div>
                    <div className="mt-2">
                        <Button type="submit" color="primary" className="w-full" disabled={loading}>
                                {loading ? "Processing..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </CardContent>
            
        </Card>
    </TabsContent>
  )
}
