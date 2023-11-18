
import Swal from "sweetalert2";
import { useState } from "react";
import { TextInput, Button } from "../../../component";
import { dataIsRequired } from "../../../constant/String";
import { userLogin } from "../../../services/UserService";
import useAlertOption from "../../../hooks/useAlertOption";
import { Routes } from "../../../types/Routes.enum";
import { useLoadingContext } from "../../../context/LoadingContext/LoadingContext";

export default function Login() {
  const [username,setUsername] = useState<string>('');
  const [password,setPassword] = useState<string>('');
  const {alertWarning,alertError} = useAlertOption(); 
  const {openLoading,handleCloseLoading,loading} = useLoadingContext();

  async function handleLogin(){
    try {
      if(!username){
        alertWarning(dataIsRequired('Username'));
        return;
      }

      if(!password){
        alertWarning(dataIsRequired('Password'));
        return;
      }
      openLoading();
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
      handleCloseLoading();
      if(loading){
        return;
      }
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
      alertError();
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
