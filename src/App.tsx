import { BrowserRouter,Routes as ReactRoutes,Route } from 'react-router-dom';
import './App.css';
import { Button, Navigation } from './component';
import { Routes } from './types/Routes.enum';
import Home from './pages/homepage';
import Login from './pages/auth/login';
import { getDataFromStorage } from './utils/storage';
import {  useMemo } from 'react';
import useGetAccountFromStorage from './hooks/useGetAccountFromStorage';
import DriverLogin from './pages/auth/driverlogin';
import Register from './pages/auth/register';
import Cvehicles from './pages/customer/vehicles';
import UnAuth from './RouterComponents/UnAuth';
import Renter from './RouterComponents/Renter';


function App() {
  const {user} = useGetAccountFromStorage();

  
  const loading = () =>{
    return (<div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
       <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" >
         <i className="fas fa-circle-notch fa-spin fa-5x"></i>
       </span>
     </div>)
   }

  const checkRoutes = useMemo(()=>{
    if(!user){
      return <UnAuth/>
    }

    if(user){
    
      if(user.user_type === 'RENTER'){
        return <Renter/>
      }
    }
    loading();
  },[user])

  return (
   <>
    <BrowserRouter>
      <Navigation/>
      {checkRoutes}     
    </BrowserRouter>
   </>
  );
}

export default App;
