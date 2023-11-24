import { useMemo, useState } from 'react';
import useGetVehicleDetails from '../../../../hooks/vehicle/useGetVehicleDetails';
import { useParams } from 'react-router-dom';
import { Button, Container } from '../../../../component';
import UpdateDetails from './UpdateVehicle';
import Details from './Details';
import Swal from 'sweetalert2';
import { updateVehicle } from '../../../../services/VehicleService';
import useAlertOption from '../../../../hooks/useAlertOption';
import { Routes } from '../../../../types/Routes.enum';
export default function VehicleDetails() {
    const {id} = useParams();
    const {data:item} = useGetVehicleDetails({id:id?id:''});
    const [isUpdated,setIsUpdated] = useState<boolean>(false);
    const {alertError} = useAlertOption();
    const displayContent = useMemo(() => {
        if(isUpdated){
            return <UpdateDetails data={item} setIsUpdate={setIsUpdated}/>
        }

        return <Details data={item}/>
    }, [isUpdated,item]);


    async function handleUpdate(){
        try {
            const payload = {
              isDeleted:1
            }
            
            const resp = await updateVehicle(item?.vehicle_id,payload);
    
            if(resp.status.toString() === '1'){
                Swal.fire({
                    icon:'success',
                    text:'Successfully Removed',
                }).then((val)=>{
                    if(val.isConfirmed){
                        window.location.href=Routes.VEHICLES;
                    }
                })            
            }
        } catch (error) {
            alertError();
        }
      }

      function handleOpenModal(){
        Swal.fire({
            icon:'question',
            text:'Are you sure do want to delete this Data?',
            showCancelButton:true
        }).then((val)=>{
            if(val.isConfirmed){
                handleUpdate();
            }else{
                Swal.close()
            }
        })
      }
    return (
        <Container>
            <div className=' w-full items-center flex justify-center'>
                <div className=" bg-white w-1/2 p-8">
                   {displayContent}
                    
                    {!isUpdated && 
                        <div className=' flex flex-row gap-5'>
                            <Button text='Update Details' onClick={()=>setIsUpdated(true)}/>
                            <Button text='Remove this Vehicle' outline onClick={()=>handleOpenModal()}/>
                        </div>
                    }
                </div>

            </div>
        </Container>
    );

}
