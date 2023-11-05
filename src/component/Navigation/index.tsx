'use client';
import { MdOutlineLogout } from 'react-icons/md';
import { Routes } from "../../types/Routes.enum";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from 'react-router-dom';

export default  function Navigation() {
    const [user,setUser] = useState<any>(null);
    const location = useLocation();
    async function handleLogout(){
        await localStorage.clear();

        window.location.href=Routes.HOME
    }

    const getUser = async()=>{
        const data = await localStorage.getItem('account');
        if(!data){
            return;
        }
        const userData = JSON.parse(data);

        setUser(userData)
    }

    const displayUser = useMemo(()=>{
        if(!user){
           return(<>
            <li className=" text-white px-4">
                About
            </li>
            <a href={Routes.LOGIN}  className=" text-white px-4 hover:text-slate-300" >
                Login
            </a>
        </>)
           
        }

        if(!user.user_type){
            return(<>
                <a href={Routes.VEHICLE}>
                    <li className=" text-white px-4">
                       Accounts
                    </li>
                </a>
                    <a href={Routes.LOGIN}  className=" text-white px-4 hover:text-slate-300" >
                        {user?.username}
                </a>
                <p className=' text-white px-4 hover:text-slate-300 text-xl' onClick={handleLogout}><MdOutlineLogout/></p>
            </>)   
        }


        if(user.user_type === 'OWNER'){
            return(<>
                <a href={Routes.OWNER_TRANSACTION}>
                    <li className=" text-white px-4">
                       Pending Transaction
                    </li>
                </a>
                <a href={Routes.VEHICLE}>
                    <li className=" text-white px-4">
                       My Vehicle
                    </li>
                </a>
                <a href={Routes.DRIVER}>
                    <li className=" text-white px-4">
                        Drivers
                    </li>
                </a>
                <a href={Routes.LOGIN}  className=" text-white px-4 hover:text-slate-300" >
                        {user?.username}
                </a>
                <p className=' text-white px-4 hover:text-slate-300 text-xl' onClick={handleLogout}><MdOutlineLogout/></p>
            </>)    
        }

        return(<>
            <a href={Routes.REGISTER_OWNER}>
                <li className=" text-white px-4">
                    Become a Owner
                </li>
            </a>
            <a href={Routes.TRANSACTIONS}>
                <li className=" text-white px-4">
                    Transactions
                </li>
            </a>
            <a href={Routes.LOGIN}  className=" text-white px-4 hover:text-slate-300" >
                {user?.username}
            </a>
            <p className=' text-white px-4 hover:text-slate-300 text-xl' onClick={handleLogout}><MdOutlineLogout/></p>
        </>)
        
    },[user])
    
    useEffect(()=>{
        getUser()
    },[])

    const displayNav = useMemo(()=>{
        if(location.pathname.split('/')[1] === 'viewmaps' || location.pathname.split('/')[1] === 'show-maps'){
            return 'hidden';
        }

        return ' p-3 bg-black flex fixed w-screen z-30'
    },[location])
    return (
    <nav className={displayNav}>
        <ul className=" px-4">
            <li className=" p-3 text-white font-bold text-xl">
                Rentify
            </li>
        </ul>
        <ul className=" flex flex-1 py-3 mr-10 justify-end">
            <a href={Routes.HOME}  className=" text-white px-4 hover:text-slate-300" >
                Home
            </a>
            {displayUser}
        </ul>
    </nav>
  )
}
