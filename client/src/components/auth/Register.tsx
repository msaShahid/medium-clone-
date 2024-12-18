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
import { REGISTER_URL } from "@/lib/ApiEndPoint"
import axios from "axios"
import React, { useState } from 'react'
import { toast } from "react-toastify"


export default function Register() {

    const [authState, setAuthState] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({
        name: [],
        email: [],
        password: [],
    });

    const handleSubmit = (event:React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
    
        axios.post(REGISTER_URL, authState, {
            headers: {
                Accept: 'application/json'
            }
        }).then((res) => {
            setLoading(false);
            const response = res.data;
            console.log(response);

            if(response?.status == 200){
                toast.success(response?.message, { theme: "colored"})
            }

            setAuthState({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            })

        }).catch((err) => {
            setLoading(false); 
            console.log("Error at the time of register : ", err);
            const apiErrors = err?.response?.data?.errors
            if(apiErrors){
                setErrors(apiErrors)
            }
        });
    }
    

  return (
    <TabsContent value="register">
        <Card>
            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                    Welcome to medium, now register your self to write...
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <form action="" onSubmit={handleSubmit}>                
                    <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text" 
                            placeholder="Enter your name..." 
                            value={authState.name}
                            onChange={(event) => setAuthState({...authState, name:event.target.value})}
                        />
                        <span className="text-red-500">{errors?.name?.[0]}</span>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" 
                            placeholder="Enter your email..." 
                            value={authState.email}
                            onChange={(event) => setAuthState({...authState, email:event.target.value})}
                        />
                        <span className="text-red-500">{errors?.email?.[0]}</span>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password"
                            placeholder="Enter your password..."
                            value={authState.password}
                            onChange={(event) => setAuthState({...authState, password:event.target.value})}
                        />
                        <span className="text-red-500">{errors?.password?.[0]}</span>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="confirmPassword">Confirm password</Label>
                        <Input id="confirmPassword" type="password" 
                            placeholder="Enter your confirm password.."
                            value={authState.confirmPassword}
                            onChange={(event) => setAuthState({...authState, confirmPassword:event.target.value})}
                        />
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
