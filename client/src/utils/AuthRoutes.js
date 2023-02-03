import { Outlet, Navigate } from 'react-router-dom'


function AuthRoutes() {
    let user = JSON.parse(localStorage.getItem("user"));
  return (
    user ? <Outlet /> : <Navigate to="/login" />
  )
}

export default AuthRoutes;