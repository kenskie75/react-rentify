import { useMemo, useState } from 'react';
import { Button, Container } from '../../../../component';
import UpdateDriver from './UpdateDriver';
import { useParams, useNavigate } from 'react-router-dom';
import useGetDriverById from '../../../../hooks/drivers/useGetDriverById';
import Details from './Details';
import { updateDriverDetails } from '../../../../services/DriverService.service';
import Swal from 'sweetalert2';
import useAlertOption from '../../../../hooks/useAlertOption';
import { Routes } from '../../../../types/Routes.enum';
export default function DriverDetails() {
    const {id} = useParams();
    const {data} = useGetDriverById({id:id ? id : ''});
    const [isUpdate,setIsUpdate] = useState<boolean>(false);
    const {alertError} = useAlertOption();
    const navigate = useNavigate();
     const displayContent = useMemo(() => {
        if(isUpdate){
            return <UpdateDriver setIsUpdate={setIsUpdate} data={data}/>
        }

        return <Details data={data}/>
    }, [isUpdate,data]);

    const handleUpdate =async()=>{
        try {
            const payload = {
              isDeleted:1
            }
            
            const resp = await updateDriverDetails(data?.driver_id,payload);
    
            if(resp.status.toString() === '1'){
                Swal.fire({
                    icon:'success',
                    text:'Successfully Removed',
                }).then((val)=>{
                    if(val.isConfirmed){
                        navigate(Routes.DRIVERS);
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
        <div className=' flex w-full justify-center items-center'>
            <div className=' w-1/2 bg-white p-8'>
                {displayContent}
                
                    {!isUpdate && 
                       <div className=' py-5 flex flex-row gap-5'>
                            <Button text='Update Details' onClick={()=>setIsUpdate(true)}/>
                            <Button text='Remove this Driver' onClick={()=>handleOpenModal()} outline/>
                            <Button text='Back' onClick={() => navigate(-1)} />
                       </div>
                    }
               
            </div>
        </div>
    </Container>
  )
}
