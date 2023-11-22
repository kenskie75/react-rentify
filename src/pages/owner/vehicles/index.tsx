import { useMemo } from "react";
import useGetVehicleByUserId from "../../../hooks/vehicle/useGetVehicleByUserId";
import { Routes } from "../../../types/Routes.enum";
import { configVariable } from "../../../constant/ConfigVariable";
import { Button } from "../../../component";
import { getUserSubscription } from "../../../services/UserSubscription.service";
import { getDataFromStorage } from "../../../utils/storage";
import Swal from 'sweetalert2';

;
export default function Vehicles() {
    const {data} = useGetVehicleByUserId();
    async function handleAddVehicle(){
        const user = await getDataFromStorage('account')
        if(!user){
            return;
        }
        const resp = await getUserSubscription(user.user_id);

        if(resp?.status?.toString() === '1'){
            window.location.href=Routes.ADD_VEHICLE
            return;
        }else{
            Swal.fire({
                title:"Opps",
                text:"You dont have subscription yet",
                showCancelButton:true,
                cancelButtonText:'Close',
                cancelButtonColor:'red',
                confirmButtonText:'Subscribe Now!'
            }).then(res=>{
                if(res.isConfirmed){
                    window.location.href=Routes.SUBSCRIPTION;
                }else{
                    Swal.close();
                }
            })   
        }
        
    }

    const displayData = useMemo(() => {
        if(data.length < 1){
            return <p className=" text-center">No Vehicle Found</p>
        }

        return data.map((val,i)=>(
            <div className=" flex flex-row border-b border-b-slate-300" key={val.vehicle_id}>
                <div>
                    <img className=" h-52 w-52" src={configVariable.BASE_URL+val.vehicleImage} alt="vehicle"/>
                </div>
                <div className=" py-5 px-8">
                    <p className=" font-bold">{val.description}</p>
                    <div className=" h-5"/>
                    <p className=" py-1"><span>Brand: </span>{val.brand}</p>
                    <p className=" py-1"><span>Model: </span>{val.model}</p>
                    <p className=" py-1"><span>Vehicle Type: </span>{val.vehicle_type}</p>
                    <p className=" py-1"><span>Price: </span>{val.price}</p>
                </div>
            </div>
        ))

    }, [data])

    return (
    <div className=' pt-32 flex justify-center'>
        <div className=" bg-white w-1/2 p-8">
            <div className=" flex flex-row">
                <div className=" flex items-center">
                    <h1 className=" text-xl font-bold">Vehicle</h1>
                </div>
                <div className=" flex flex-1 justify-end">
                    <div className=" w-1/4">
                        <Button text="Add Vehicle" onClick={handleAddVehicle}/>
                    </div>
                </div>
            </div>
            <div className=" h-10"/>
            {displayData}
            <div/>
         </div>        
    </div>
  )
}
