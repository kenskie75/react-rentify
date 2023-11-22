import React, { useCallback, useState } from 'react'
import { Button, TextInput } from '../../../../../component';
import { createAdditionalFee } from '../../../../../services/BookingsService.service';
import Swal from 'sweetalert2';
type Props = {
    id:string;
    onClose:()=>void
}

export default function AdditionalFee(props:Props) {
    const {id,onClose} = props;
    const [fee,setFee] = useState<string>("");

    const sendRequest = useCallback(async()=>{
        if(!fee){
            return;
        }

        if(parseFloat(fee) < 1){
            return;
        }

        const payload = {
            ref_id:id,
            amount:fee
        }

        const resp = await createAdditionalFee(payload);

        if(resp.status?.toString() === '1'){
            Swal.fire({
                icon:'success',
                text:'Successfully Added Additional Fee'
            }).then(x=>{
                if(x.isConfirmed){
                    window.location.reload();
                }
            })
        }
    },[fee, id]);
    
    return (
    <div className=' w-full p-4'>
        <h1>{id}</h1>
        <div className=' h-10'/>
        <TextInput label='Add Fee' className=' w-full' onChange={(e)=>setFee(e.target.value)} value={fee}/>
        <div className=' h-5'/>
        <div className=' flex flex-row gap-5'>
            <Button text="Confirm" onClick={()=>sendRequest()}/>
            <Button text="Close" onClick={()=>onClose()}/>
        </div>
       
    </div>
  )
}
