
import Swal from "sweetalert2";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextInput, Button, ModalContent } from "../../../component";
import { dataIsRequired } from "../../../constant/String";
import { userLogin } from "../../../services/UserService";
import useAlertOption from "../../../hooks/useAlertOption";
import { Routes } from "../../../types/Routes.enum";
import { useModalContext } from "../../../context/ModalContext/ModalContext";

export default function Login() {
  const [username,setUsername] = useState<string>('');
  const [password,setPassword] = useState<string>('');
  const {alertWarning,alertError} = useAlertOption(); 
  const {isOpen,setIsOpen,setContent,setIsFullScreen} = useModalContext();

  async function handleLogin(){
    try {
      setIsOpen(!isOpen)
      if(!username){
        alertWarning(dataIsRequired('Username'));
        return;
      }

      if(!password){
        alertWarning(dataIsRequired('Password'));
        return;
      }

      const payload = {
        username,
        password
      }
      const resp = await userLogin(payload);
      const {status,message,data} = resp.data;
      if(status !== 1){
        alertError(message);
        return;
      }

      const userData = JSON.stringify(data);
      localStorage.setItem('account',userData);
      Swal.fire({
        icon:'success',
        title:'Success',
        text:'Successfully Login'
      }).then(e=>{
        if(e.isConfirmed){
          window.location.href=Routes.HOME
        }
      })
    } catch (error) {
      
    }
  }
  
  return (
    <div className=" pt-32 flex flex-1  h-screen justify-center items-center">
        <div className=" bg-white w-1/2 p-8 rounded-md  shadow-md">
            <h1 className=" font-bold text-2xl">Sign In</h1>
            <TextInput label="Username" onChange={(e)=>setUsername(e.target.value)} value={username}/>
            <div className=" h-5"/>
            <TextInput label="Password" type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <div className=" h-6"/>
            <Button onClick={()=>handleLogin()} text="Sign In"/>
            <div className=" h-8"/>
            <p className=" text-center">Dont have any account? <a href={Routes.REGISTER} className=" text-blue-600">Sign Up</a></p>
            <p className=" mt-5 text-gray-500 text-center">Login as a <a href={Routes.DRIVER_LOGIN} className=" text-blue-500 underline">Driver</a></p>
        </div>
    </div>  
  )
}
