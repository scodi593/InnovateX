import React from 'react'
import { Navigate, useLocation } from "react-router-dom";


const CheckAuth = ({ isAuthenticated, user, children }) => {
    const location = useLocation(); // gives you the path name after the localhost
    console.log(location.pathname, isAuthenticated);

    // if user is not authenticatedd and tries to access the home pae or anything else
    if (
        !isAuthenticated &&
        !(
          location.pathname.includes("/login") ||
          location.pathname.includes("/register")
        )
      ) {
        return <Navigate to="/auth/login" />;
      }

       // if user is authenticatedd and tries to access the login or register  page we can redirect based on role
      if (
        isAuthenticated &&
        (location.pathname.includes("/login") ||
          location.pathname.includes("/register"))
      ) {
        if (user?.role === "admin") {
          return <Navigate to="/admin/dashboard" />;
        } else {
          return <Navigate to="/home" />;
        }
      }

      if (
        isAuthenticated &&
        user?.role !== "admin" &&
        location.pathname.includes("admin")
      ) {
        return <Navigate to="/unauth-page" />;
      }

      /*if (
        isAuthenticated &&
        user?.role === "admin" &&
        location.pathname.includes("shop")
      ) {
        return <Navigate to="/admin/dashboard" />;
      }*/
      

  return (
    <>
      {children}
    </>
  )
}

export default CheckAuth
