import { useNavigate } from "react-router-dom"
import { Button } from "./components/ui/button"
import { userAuth } from "./context/AuthContext"

export const App = () => {
  const {session} = userAuth();
  const navigate = useNavigate();
  if (session){
    return(
      <div className="z-10 flex flex-col gap-4">
        <p className="text-primary">Go to dashboard to take surveys</p>
        <Button onClick={()=> navigate('/dashboard')} className="w-full">
          Dashboard
        </Button>
      </div>
    )
  }
  return (
    <div className="z-10 flex flex-col gap-4">
      <h5 className="text-primary text-4xl">WaterLily survey form!</h5>
      <Button onClick={()=> navigate('/dashboard')}>
        Sign In!
      </Button>
      <Button onClick={()=> navigate('/dashboard')}>
        Sign Up!
      </Button>
    </div>
  )
}
