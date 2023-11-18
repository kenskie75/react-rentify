import { useState } from "react";
import { Button, TextInput } from "../../../../component";
import useAlertOption from "../../../../hooks/useAlertOption";
import { addCategory } from "../../../../services/CategoriesService.service";
import Swal from 'sweetalert2';

type Props = {
    setIsRefetch:(isRefetch:boolean)=>void;
    setIsOpen:(isOpen:boolean)=>void;
}

export default function AddCategories(props:Props) {
    const {setIsOpen,setIsRefetch} = props;
    const [min,setMin] = useState<string>("");
    const [max,setMax] = useState<string>("");
    const [vehicleType,setVehicleType] = useState<string>('');
    const [typeDescription,setTypeDescription] = useState<string>("");
    const {alertWarning,alertError} = useAlertOption();
    
    async function handleCreateCategory(){
        try {
            if(vehicleType === ""){
                alertWarning("Vehicle Type Is Required");
                return
            }
            if(min === ""){
                alertWarning("Mininmum Amount Type Is Required");
                return
            }

            if(max === ""){
                alertWarning("Maximum Amount Type Is Required");
                return
            }

            if(typeDescription === ""){
                alertWarning("Description Type Is Required");
                return
            }

            const payload = {
                type:vehicleType,
                min:min,
                max:max,
                desc:typeDescription
            }

            const resp = await addCategory(payload);

            if(resp.status.toString() === '1'){
                Swal.fire({
                    icon:'success',
                    text:"Successfully Added"
                }).then(val=>{
                    if(val.isConfirmed){
                        setIsRefetch(true)
                        setIsOpen(false)
                    }
                })
            }
            
        } catch (error) {
            alertError();
        }
  }
  
  return (
    <div className=" w-full">
    <h1 className=" font-bold text-lg">Create New Category</h1>
    <div className=" h-5"/>
        <TextInput label="Vehicle Type" onChange={(e)=>setVehicleType(e.target.value)} value={vehicleType} />
    <div className=" h-5"/>
        <TextInput label="Minimum Amount" onChange={(e)=>setMin(e.target.value)} value={min} />
    <div className=" h-5"/>
        <TextInput label="Maximum Amount" onChange={(e)=>setMax(e.target.value)} value={max} />
    <div className=" h-5"/>
        <TextInput label="Type Description" onChange={(e)=>setTypeDescription(e.target.value)} value={typeDescription} />
    <div className=" h-5"/>
    <div className=" flex flex-row w-full gap-5">
        <Button text="Create" onClick={handleCreateCategory}/>
        <Button text="Close" onClick={()=>setIsOpen(false)} outline/>
    </div>
</div>
  )
}
