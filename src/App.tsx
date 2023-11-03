import { BrowserRouter,Routes as ReactRoutes,Route } from 'react-router-dom';
import './App.css';
import { Button, Navigation } from './component';
import { Routes } from './types/Routes.enum';
import {  useMemo } from 'react';
import useGetAccountFromStorage from './hooks/useGetAccountFromStorage';
import DriverLogin from './pages/auth/driverlogin';
import Register from './pages/auth/register';
import Cvehicles from './pages/customer/vehicles';
import UnAuth from './RouterComponents/UnAuth';
import Renter from './RouterComponents/Renter';
import ModalContextProvider from './context/ModalContext/ModalContext';
import Owner from './RouterComponents/Owner';


function App() {
  const {user,isLoading} = useGetAccountFromStorage();

  
  const loading = () =>{
    return (<div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
       <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" >
         <i className="fas fa-circle-notch fa-spin fa-5x"></i>
       </span>
     </div>)
   }

  const checkRoutes = useMemo(()=>{
    if(isLoading){
      return loading();
    }
    
    if(user === undefined){
      return <UnAuth/>
    }

    if(user){
    
      if(user.user_type === 'RENTER'){
        return <Renter/>
      }

      if(user.user_type === 'OWNER'){
        return <Owner/>
      }
    }
   
  },[user,isLoading])

  return (
   <>
   <ModalContextProvider>
    <BrowserRouter>
      <Navigation/>
      {checkRoutes}     
    </BrowserRouter>
    </ModalContextProvider>
   </>
   
  );
}

export default App;
