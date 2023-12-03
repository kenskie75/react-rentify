import { Rating } from '@smastrom/react-rating';
import React, { useState } from 'react'
import { Button } from '../../../../../component';
import Swal from 'sweetalert2';
import { createRating } from '../../../../../services/Rating.service';
import { getDataFromStorage } from '../../../../../utils/storage';
import useAlertOption from '../../../../../hooks/useAlertOption';

type Prosp = {
    owner_id:string;
    setIsOpen:(isOpen:boolean)=>void;
}
export default function RatingModal(props:Prosp) {
    const [rating,setRating] = useState<number>(2);
    const {alertSuccess,alertError} = useAlertOption();

    async function handleRate(){
        try {
            const user = await getDataFromStorage('account');
            
            if(!user){
                return;
            }
            const payload = {
                owner_id:props.owner_id,
                renter_id:user.user_id,
                rate:rating,
            }
            const resp = await createRating(payload);
            
            if(resp.status.toString() === '1'){
                Swal.fire({
                    'text':'Succesfully Rate',
                    icon:'success'
                }).then(res=>{
                    if(res.isConfirmed){
                        props.setIsOpen(false);
                    }
                })
            }
        } catch (error) {
            alertError();
        }
    }

    return (
        <div className=' w-full'>
            <h1 className=' font-bold text-2xl'>Rate Now</h1>
            <div className=' flex flex-row justify-center mt-10'>
                <Rating value={rating} style={{width:500}} onChange={(e:number)=>setRating(e)}/>
            </div>
            <div className=' h-10'/>
            <div className=' w-full flex flex-row gap-3'>
                <Button text='Rate Now!' onClick={()=>handleRate()}/>
                <Button text='Close' outline onClick={()=>props.setIsOpen(false)}/>
            </div>
        </div>
    )
}
