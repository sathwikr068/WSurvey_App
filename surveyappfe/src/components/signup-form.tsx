import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { useState, type FormEvent } from "react"
import { userAuth } from "@/context/AuthContext"

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [Loading,setLoading] = useState(Boolean)
  const [error,setError] = useState('')

  const {signUpNewUser} = userAuth();


  const handleSignup = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setLoading(true);
    try{
      const result = await signUpNewUser(email,password)
      if(result.success){
        navigate('/dashboard')
      }
    }catch(err){
      console.error(err);
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign up for your account</CardTitle>
          <CardDescription>
            Enter your email and password below to register to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                onChange={(e)=>{setEmail(e.target.value)}}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  
                </div>
                <Input onChange={(e)=>{setPassword(e.target.value)}} id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
               Already have an account?{" "}
              <a href="/signin" className="underline underline-offset-4">
                Log in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
