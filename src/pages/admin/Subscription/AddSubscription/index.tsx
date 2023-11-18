import { useState } from 'react';
import { Button, TextInput } from '../../../../component';
import useAlertOption from '../../../../hooks/useAlertOption';
import { createSubscription } from '../../../../services/SubscriptionService.service';
import Swal from 'sweetalert2';
type Props = {
    setIsOpen:(isOpen:boolean)=>void;
    setIsRefetch:(isRefetch:boolean)=>void;
}


export default function AddSubscription(props:Props) {
    const {setIsOpen,setIsRefetch} = props;
  const [name,setName] = useState<string>("");
  const [monthly,setMonthly] = useState<string>("");
  const [desc,setDesc] = useState<string>("");
  const [price,setPrice] = useState<string>("");
  const {alertWarning,alertError} = useAlertOption();

    async function handleCreateSubscription(){
        try {
            if(name === ""){
                alertWarning("Subscription Name is Required");
    
                return;
            }
    
            if(desc === ""){
                alertWarning("Description is Required");
    
                return;
            }
            if(price === ""){
                alertWarning("Price is Required");
    
                return;
            }
    
            if(monthly === ""){
                alertWarning("Monthly is Required");
    
                return;
            }
    
            const payload = {
                subname:name,
                desc:desc,
                monthly:monthly,
                price:price
            }
    
            const resp = await createSubscription(payload);
    
            if(resp.status.toString() === "1"){
                Swal.fire({
                    icon:'success',
                    text:'Successfully Created'
                }).then(val=>{
                    if(val.isConfirmed){
                        setIsOpen(false)
                        setIsRefetch(true)
                    }
                })
                return;
            }
            alertError();
        } catch (error) {
            alertError()
        }
      
    }
    return (
    <div>
        <h1 className=" font-bold text-lg">Create New Subscription</h1>
        <div className=" h-5"/>
            <TextInput label="Subscription Name" onChange={(e)=>setName(e.target.value)} value={name} />
        <div className=" h-5"/>
            <TextInput label="Description" onChange={(e)=>setDesc(e.target.value)} value={desc} />
        <div className=" h-5"/>
            <TextInput label="Price" onChange={(e)=>setPrice(e.target.value)} value={price} />
        <div className=" h-5"/>
            <TextInput label="Monthly" onChange={(e)=>setMonthly(e.target.value)} value={monthly} />
        <div className=" h-5"/>
        <div className=" flex flex-row w-full gap-5">
            <Button text="Create" onClick={handleCreateSubscription}/>
            <Button text="Close" onClick={()=>setIsOpen(false)} outline/>
        </div>
    </div>
  )
}
