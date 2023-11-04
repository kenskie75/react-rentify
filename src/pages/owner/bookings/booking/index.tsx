import { useParams } from "react-router-dom";
import { Button, Container, ListItem } from "../../../../component";
import useGetBookingsByRefId from "../../../../hooks/bookings/useGetBookingsByRefId";
import { formatFullName } from "../../../../utils/string";
import dayjs from "dayjs";
import { configVariable } from "../../../../constant/ConfigVariable";
import useGetDriversByUserId from "../../../../hooks/drivers/useGetDriversByUserId";
import { useMemo, useState } from "react";
import useAlertOption from "../../../../hooks/useAlertOption";

export default function Booking() {
    const {id} = useParams();
    const {data} = useGetBookingsByRefId({refId:id?id:''});
   
    const {data:driversList} = useGetDriversByUserId({userId:data?.owner?.user_id ?? data?.owner?.user_id});

    const [selectedDriver,setSelectedDriver] = useState<any>(null);
    const {alertWarning} = useAlertOption();

    const displayDriver = useMemo(()=>{
        if(!data?.driver){
            return driversList?.map((val,i)=>(
                <div className=" w-full border-b border-b-slate-300 py-3 px-5 flex flex-row bg-slate-200">
                    <div className=" flex flex-1 flex-col">
                        <p className=" text-lg font-bold">{val.username}</p>
                        <p>{formatFullName({firstName:val.firstName,middleName:val.middleName,lastName:val.lastName})}</p>
                    </div>
                    <div className=" flex items-center">
                        <button className=" py-2 px-3 rounded-md bg-green-500 text-white">Assign This Driver</button>
                    </div>
                </div>
            ))
        }

        return (
            <div className=" w-full">
                <p>{data?.driver?.username}</p>
            </div>
        );

    },[data?.driver,driversList])

    async function handleAccept(){
        if(!selectedDriver){
            alertWarning('Please assign a driver');

            return;
        }

        alertWarning('Success');
    }

  return (
   <Container>
        <div className=" flex w-full justify-center">
            <div className=" w-1/2 bg-white p-5">
                <h1 className=" font-bold text-xl">{data?.booking?.ref_id}</h1>
                <div className=" h-10"/>
                <ListItem label="Renter Name" value={formatFullName({firstName:data?.customer?.firstname,middleName:data?.customer?.middlename,lastName:data?.customer?.lastname})}/>
                <ListItem label="Pick Up Date" value={dayjs(data?.booking?.book_date).format("MM-DD-YYYY") + ` ${data?.booking?.pickup_time}`}/>
                <ListItem label="Status" value={data?.booking?.status}/>
                <div className=" h-10"/>
                <h1 className=" font-bold text-xl">Vehicle Information</h1>
                <div className=" h-5"/>
                <div className=" flex  flex-row">
                    <div className=" flex flex-1 justify-center">
                        <img src={configVariable.BASE_URL+data?.vehicles?.vehicleImage} alt="Vehicle" className=" h-[200px] w-[200px]"/>
                    </div>
                    <div className=" flex flex-1 flex-col">
                        <p className=" font-bold">{data?.vehicles?.brand}</p>
                        <div className=" h-5"/>
                        <ListItem label="Description" value={data?.vehicles?.description}/>
                        <ListItem label="Model" value={data?.vehicles?.model}/>
                        <ListItem label="Vehicle Type" value={data?.vehicles?.vehicle_type}/>
                    </div>
                </div>
                <div className=" h-10"/>
                <h1 className=" font-bold text-xl"> Driver</h1>
                <div className=" h-5"/>
                {displayDriver}
                <div className=" h-10"/>
                <Button text="Accept" onClick={handleAccept}/>
            </div>
        </div>
   </Container>
  )
}
