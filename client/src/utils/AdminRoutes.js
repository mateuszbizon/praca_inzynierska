import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function AdminRoutes() {
    let user = JSON.parse(localStorage.getItem("user"));

  return (
    user && user.result.isAdmin ? <Outlet /> : <Navigate to="/" />
  )
}

export default AdminRoutes