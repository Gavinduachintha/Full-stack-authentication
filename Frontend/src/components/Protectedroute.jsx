import { Navigate } from "react-router-dom"

const protectedRoute=(children)=>{
    const token = localStorage.getItem("token")
    if(!token){
        return <Navigate to="/" replace/>
    }
    return children
}

const Protectedroute = () => {
  return (
    <div>Protectedroute</div>
  )
}

export default Protectedroute