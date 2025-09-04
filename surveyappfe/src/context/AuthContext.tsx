import { supabase } from "@/supabaseClient";
import { createContext, useContext, useEffect, useState } from "react";
import { type ReactNode } from "react";
import {type Session} from "@supabase/supabase-js"

interface AuthContextType{
    session: Session | null;
    signUpNewUser: (email: string, password:string) => Promise<{success: boolean; error?:any ; data?: any}>
    signInUser: (credentials: SignInCredentials) => Promise<{success: boolean; error?:any ; data?: any}>
    signOut: () => Promise<void>;
    isLoading: boolean;
}

interface SignInCredentials{
    email:string;
    password:string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps{
    children: ReactNode;
}

export const AuthContextProvider = ({children}: AuthContextProviderProps) =>{
    const [session,setSession] = useState<Session | null>(null);
    const [isLoading,setIsLoading] = useState(true);

    //signup
    const signUpNewUser = async (email:string,password:string) =>{
        const {data,error} = await supabase.auth.signUp({
            email: email.toLowerCase(),
            password:password,

        });
        if (error){
            console.error("problem signing up",error);
            return {success:false,error};
        }
        return {success:true,data}
    }


    //signin
    const signInUser = async ({email,password}: SignInCredentials) =>{
        try{
            const {data,error} = await supabase.auth.signInWithPassword({
            email: email,
            password:password,
        });
        if (error){
            console.error("problem signing in",error);
            return {success:false,error};
        }
        console.log('signed in successfully', data)
        return {success:true,data}
        
        }catch(error){
            console.error("error signing in",error);
            return {success:false,error};
        }
    }

    useEffect(()=>{
        setIsLoading(true);
        supabase.auth.getSession().then(({data:{session}})=>{
            setSession(session);
            console.log(session);
            setIsLoading(false);
        });
        supabase.auth.onAuthStateChange((_event,session)=>{
            setSession(session);
            setIsLoading(false);
        });
    },[]);

    //sign out
    const signOut = async()=>{
        const {error} = await supabase.auth.signOut();
        if(error){
            console.error("error signing out",error);
        }
    }

    return (
        <AuthContext.Provider value={{isLoading,session,signUpNewUser,signInUser,signOut}}>
            {children}
        </AuthContext.Provider>
    )
};

export const userAuth = ():AuthContextType =>{
    const context = useContext(AuthContext);
    if (context=== undefined){
        throw new Error("userauth must be used within a provider");
    }
    return context;
};