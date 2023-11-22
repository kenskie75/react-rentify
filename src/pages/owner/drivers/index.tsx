import { useMemo } from "react";
import { Button } from "../../../component";
import useGetDriversByOwner from "../../../hooks/drivers/useGetDriversByOwner";
import { Routes } from "../../../types/Routes.enum";
import { formatFullName } from "../../../utils/string";
import { configVariable } from "../../../constant/ConfigVariable";


export default function Drivers() {
    const {data} = useGetDriversByOwner();
  
    const displayDrivers = useMemo(() => {
        return data?.map((val:any,i:number)=>(
            <div className=" border-b py-5 px-3 border-b-slate-400 flex flex-row">
                <div>
                    <img src={configVariable.BASE_URL+val.driver_pic} alt='driver' className=" h-28 w-28"/>
                </div>
                <div className=" px-10">
                    <p className=" font-bold">{formatFullName({firstName:val.firstName,middleName:val.middleName,lastName:val.lastName})}</p>
                    <div className=" h-5"/>
                    <p><span className=" font-bold mr-5">Username:</span>{val.username}</p>
                    <p><span className=" font-bold mr-5">Contact No.:</span>{val.contactNumber}</p>
                </div>
               
            </div>
        ))
    }, [data]);

    return (
    <div className=' pt-32 flex justify-center'>
        <div className=" bg-white w-1/2 p-8">
            <div className=' flex w-full '>
                <div className=' flex flex-1 items-center'>
                    <h1 className=" font-bold text-lg">My Drivers</h1>
                </div>
                <div className=' flex flex-1 justify-end'>
                    <Button text='Add Driver'  onClick={()=>window.location.href=Routes.CREATE_DRIVER}/>
                </div>
            </div>
            <div className=" h-10"/>
            {displayDrivers}
        </div>
    </div>
  )
}
