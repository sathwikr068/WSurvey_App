import { createBrowserRouter } from "react-router-dom"
import Signin from "./component/Signin"
import Signup from "./component/Signup"
import Dashboard from "./component/Dashboard"
import SurveyPage from "./component/SurveyPage"
import { App } from "./App"
import PrivateRoute from "./components/privateRoute"


// import React from 'react'


export const router = createBrowserRouter([
    {path:"/", element: <App/>},
    {path:"/signin", element: <Signin/>},
    {path:"/signup", element: <Signup/>},
    {path:"/dashboard", element: <PrivateRoute><Dashboard/></PrivateRoute>},
    {path:"/survey", element: <PrivateRoute><SurveyPage/></PrivateRoute>},
])