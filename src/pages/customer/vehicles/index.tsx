import { useMemo } from "react";
import useGetAllVehicles from "../../../hooks/vehicle/useGetAllVehicles";
import { Cards } from "../../../component";
import { Routes } from "../../../types/Routes.enum";

export default function Vehicles() {
    const {data:vehicles} = useGetAllVehicles();
    
    const displayVehicles = useMemo(() => {
        if(!vehicles){
            return;
        }

        if(vehicles.length < 1){
            return (<p>No Vehicle found</p>)
        }


        return vehicles.map((val,i)=>(
            <Cards vehicle={val} key={i.toString()} onClick={()=>window.location.href=`${Routes.VEHICLE}/${val.vehicle_id}`}/>
        ))
    }, [vehicles])
    
    return(
    <div className=' pt-32'>
        <div className=' grid grid-cols-5'>
            {displayVehicles}
        </div>
    </div>
  )
}
