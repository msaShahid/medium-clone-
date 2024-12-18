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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Login from "./Login"
import Register from "./Register"
  

export function AuthModal() {
  return (

    <Dialog>
    <DialogTrigger>Login</DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Application</DialogTitle>
        <DialogDescription>

            <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Password</TabsTrigger>
                </TabsList>

                <Login/>
                
                <Register/>
                

               
            </Tabs>

        </DialogDescription>
        </DialogHeader>
    </DialogContent>
    </Dialog>



  )
}
