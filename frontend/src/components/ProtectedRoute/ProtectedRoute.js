import React from "react";
import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import getUserAuth from "../../store/User/selectors";
import Layout from "../Layout/Layout";

function ProtectedRoute() {
  const isAuth = useSelector(getUserAuth)
  const location = useLocation()

  if (!isAuth) {
    return <Navigate to='/' state={{ from: location }} />
  }
  return <Layout />
}

export default ProtectedRoute
