import { Route, useParams } from "react-router-dom";
import { Button, Container, ListItem } from "../../../../component";
import useGetBookingsByRefId from "../../../../hooks/bookings/useGetBookingsByRefId";
import { formatFullName } from "../../../../utils/string";
import dayjs from "dayjs";
import { configVariable } from "../../../../constant/ConfigVariable";
import useGetDriversByUserId from "../../../../hooks/drivers/useGetDriversByUserId";
import { useCallback, useMemo, useState } from "react";
import useAlertOption from "../../../../hooks/useAlertOption";
import { acceptTransactions, updateBookingStatus } from "../../../../services/BookingsService.service";
import useGetAccountFromStorage from "../../../../hooks/useGetAccountFromStorage";
import { Routes } from "../../../../types/Routes.enum";
import { BookingStatus } from "../../../../types/BookingStatus.enum";
import Swal from "sweetalert2";
import { displayStatusByOwner, displaystatus } from "../../../../utils/booking.utils";

export default function Booking() {
    const {id} = useParams();
    const {data} = useGetBookingsByRefId({refId:id?id:''});
    const {user} = useGetAccountFromStorage();
    const {data:driversList} = useGetDriversByUserId({userId:data?.owner?.user_id ?? data?.owner?.user_id});


    const [selectedDriver,setSelectedDriver] = useState<any>(null);
    const {alertWarning,alertSuccess} = useAlertOption();

    const displayDriver = useMemo(()=>{
        if(!user){
            return;
        }

        
        if(selectedDriver){
            return(
            <div className=" w-full font-bold">
                <p>{selectedDriver?.username}</p>
                <p>{formatFullName({firstName:selectedDriver?.firstName,middleName:selectedDriver?.middleName,lastName:selectedDriver?.lastName})}</p>
            </div>
            );
        }
        

        if(!data?.driver_id && data?.user_type !== 'RENTER'){
            return driversList?.map((val:any,i:number)=>(
                <div className=" w-full border-b border-b-slate-300 py-3 px-5 flex flex-row bg-slate-200">
                    <div className=" flex flex-1 flex-col">
                        <p className=" text-lg font-bold">{val.username}</p>
                        <p>{formatFullName({firstName:val.firstName,middleName:val.middleName,lastName:val.lastName})}</p>
                    </div>
                    <div className=" flex items-center">
                        <button className=" py-2 px-3 rounded-md bg-green-500 text-white" onClick={()=>handleSelectDriver(val)}>Assign This Driver</button>
                    </div>
                </div>
            ))
        }

        return (
            <div className=" w-full">
                <p className=" font-bold">{data?.driver?.username}</p>
                <p>{formatFullName({firstName:data?.driver?.firstName,middleName:data?.driver?.middleName,lastName:data?.driver?.lastName})}</p>
            </div>
        );

    },[data?.driver?.firstName, data?.driver?.lastName, data?.driver?.middleName, data?.driver?.username, data?.driver_id, data?.user_type, driversList, selectedDriver, user])

    const handleAccept = useCallback(async()=>{
        try {
            if(!selectedDriver){
                alertWarning('Please assign a driver');
    
                return;
            }
    
            const payload = {
                refId:data?.booking?.ref_id,
                driver_id:selectedDriver?.driver_id
            }
            const resp = await acceptTransactions(payload)

            if(parseInt(resp.status) == 1){
                alertSuccess(resp.message);
                return;
            }
    
            alertWarning(resp.message);
        } catch (error) {
            
        }

    },[alertSuccess, alertWarning, data?.booking?.ref_id, selectedDriver])
   
  function handleSelectDriver(driver:any){
    setSelectedDriver(driver);
  }


  const handlePickUp = useCallback(async(status:BookingStatus)=>{
    try {
        const resp = await updateBookingStatus(data?.booking?.ref_id,status);
        
        if(resp.status.toString() === '1'){
            Swal.fire({
                title:"We will notify the passenger that you were on the way",
                icon:'success',
                confirmButtonText:'Okay'
            }).then((val)=>{
                if(val.isConfirmed){
                    window.location.href=Routes.DRIVER_VIEW_MAPS+'/'+data?.booking?.ref_id
                }
            })
        }
    } catch (error) {
        console.log("GG");
    }
  },[data?.booking?.ref_id])

  const displayButton = useMemo(()=>{
    const isBookIsToday =data?.booking?.book_date !== dayjs().format('YYYY-MM-DD');

    switch(data?.booking?.status){
        case 'PENDING':
            if(user === undefined){
                return;
            }

            if(user.user_type === 'RENTER'){
                return;
            }
            if(user.user_type === 'OWNER'){
                return(
                    <Button text="Accept" onClick={handleAccept}/>
                );
            }

            
            break;
        case 'ACCEPTED':
            if(user === undefined){
                return;
            }

            if(user?.user_type === 'RENTER'){
                return(
                    <Button text='Pay' onClick={()=>{}}/>
                )
            }
            
            if(!user.user_type){
                return(
                    <Button text='Pick Up Passenger' disable={isBookIsToday}  onClick={()=>handlePickUp(BookingStatus.TO_PICK_UP)}/>
                );
            }
            break;
            case BookingStatus.TO_PICK_UP:        
            if(!user.user_type){
                return(
                    <Button text='View Maps' disable={isBookIsToday}  onClick={()=>window.location.href=Routes.DRIVER_VIEW_MAPS+'/'+data?.booking?.ref_id}/>
                );
            }
            break;
        }   
    
   
    
  },[data?.booking?.book_date, data?.booking?.status, handleAccept, handlePickUp, user])
 
  const textStatusDisplay = useMemo(()=>{
    if(!user){
        return;
    }

    if(user?.user_type !== 'RENTER'){
        return displayStatusByOwner(data?.booking?.status);
    }
    return displaystatus(data?.booking?.status)
  },[data?.booking?.status, user]);
  return (
   <Container>
        <div className=" flex w-full justify-center">
            <div className=" w-1/2 bg-white p-5">
                <h1 className=" font-bold text-xl">{data?.booking?.ref_id}</h1>
                <div className=" h-5"/>
                {textStatusDisplay}
                <div className=" h-10"/>
                <ListItem label="Renter Name" value={formatFullName({firstName:data?.customer?.firstname,middleName:data?.customer?.middlename,lastName:data?.customer?.lastname})}/>
                <ListItem label="Pick Up Date" value={dayjs(data?.booking?.book_date).format("MM-DD-YYYY") + ` ${data?.booking?.pickup_time}`}/>
                <ListItem label="Distance" value={data?.booking?.distance+' km'}/>
                <ListItem label="Total Amount" value={'Php ' +data?.booking?.amount}/>
                <div className=" w-full flex ">
                    <div className=" flex flex-1"/>
                    <div>
                        <Button text="View Destination"  onClick={()=>window.location.href=Routes.SHOW_MAPS+"/"+data?.booking?.ref_id}/>
                    </div>
                </div>
                <div className=" h-10"/>
                <h1 className=" font-bold text-xl">Vehicle Information</h1>
                <div className=" h-5"/>
                <div className=" flex  flex-row">
                    <div className=" flex flex-1 flex-col">
                        <p className=" font-bold">{data?.vehicles?.brand}</p>
                        <div className=" h-5"/>
                        <ListItem label="Description" value={data?.vehicles?.description}/>
                        <ListItem label="Model" value={data?.vehicles?.model}/>
                        <ListItem label="Vehicle Type" value={data?.vehicles?.vehicle_type}/>
                    </div>
                    <div className=" flex flex-1 justify-center">
                        <img src={configVariable.BASE_URL+data?.vehicles?.vehicleImage} alt="Vehicle" className=" h-[200px] w-[200px]"/>
                    </div>
                </div>
                <div className=" h-10"/>
                <h1 className=" font-bold text-xl"> Driver</h1>
                <div className=" h-5"/>
                {displayDriver}
                <div className=" h-10"/>
                {displayButton}
            </div>
        </div>
   </Container>
  )
}
