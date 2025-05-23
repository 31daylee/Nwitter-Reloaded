import { Navigate } from "react-router-dom";
import { auth } from "../firebase"

export default function ProtectedRoute({
    children,
}:{
    children: React.ReactNode

}){
    const user = auth.currentUser; // Check the currently signed-in user using firebase func
    if(!user){
        return <Navigate to="/login"/>
    }
    return children
}