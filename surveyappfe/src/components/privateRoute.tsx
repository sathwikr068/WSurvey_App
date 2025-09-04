import { userAuth } from "@/context/AuthContext";
import {type ReactNode} from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: ReactNode
}

const PrivateRoute = ({children}: PrivateRouteProps)=>{
    const {session, isLoading} = userAuth();

    if(isLoading){
        return(
            <h1 className="text-primary-foreground">Loading..</h1>
        )
    }

    if(!session){
        return <Navigate to="/signup" replace/>
    }

    return <>{children}</>
}
export default PrivateRoute