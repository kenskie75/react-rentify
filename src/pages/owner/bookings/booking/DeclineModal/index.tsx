import React, { useState } from 'react'
import { Button } from '../../../../../component';
import useAlertOption from '../../../../../hooks/useAlertOption';
import { declineAbooking } from '../../../../../services/BookingsService.service';
import Swal from 'sweetalert2';
import { Routes } from '../../../../../types/Routes.enum';

type Props = {
    refId:string;
    setIsClose:(isOpen:boolean)=>void;
}


export default function DeclineModal(props:Props) {
    const [reason,setReason] = useState<string>('');
    const {alertWarning,alertError} = useAlertOption();

    async function handleDeclined(){
        try {
            if(reason === ''){
                alertWarning("Please put a reason for declining a booking");
                return;
            }

            const payload = {
                reason:reason
            }
            const resp = await declineAbooking(props.refId,payload);

            if(resp.status.toString() === '1'){
                Swal.fire({
                    text:'Successfully Declined',
                    icon:'success'
                }).then(res=>{
                    if(res.isConfirmed){
                        window.location.href=Routes.BOOKINGS
                        return;
                    }
                })
                
                return;
            }

            alertError();
        } catch (error) {
            alertError();
        }
    }
    return (
    <div className=' w-full'>
        <h1 className=' text-lg font-bold p-3'>Reason of Declining</h1>
        <div className=' h-10'/>
        <input className=' w-full p-3 outline-none border border-gray-200 bg-gray-100 rounded-lg'  placeholder='Enter your reason..' value={reason} onChange={(e)=>setReason(e.target.value)}/>
        <div className=' h-10'/>
        <div className=' flex flex-row gap-3'>
            <Button text='Confirm' onClick={()=>handleDeclined()}/>
            <Button text='Close' onClick={()=>props.setIsClose(false)} outline/>
        </div>
    </div>
  )
}
