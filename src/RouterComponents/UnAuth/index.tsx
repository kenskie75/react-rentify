import React from 'react'
import { Routes as ReactRoutes,Route } from 'react-router-dom';
import { Routes } from '../../types/Routes.enum';
import Home from '../../pages/homepage';
import DriverLogin from '../../pages/auth/driverlogin';
import Login from '../../pages/auth/login';
import Register from '../../pages/auth/register';
export default function UnAuth() {
  return (
    <ReactRoutes>
        <Route
          path={Routes.HOME}
          element={<Home/>}
        />
        <Route
          path={Routes.LOGIN}
          element={<Login/>}
        />
          <Route
          path={Routes.DRIVER_LOGIN}
          element={<DriverLogin/>}
        />
        <Route
          path={Routes.REGISTER}
          element={<Register/>}
        />
    </ReactRoutes>
  )
}
