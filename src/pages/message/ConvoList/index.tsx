import React, { useMemo } from 'react'
import useGetConvo from '../../../hooks/convo/useGetConvo'
import { Container } from '../../../component';
import { formatFullName } from '../../../utils/string';
import { Routes } from '../../../types/Routes.enum';

export default function ConvoList() {
  const {data} = useGetConvo();

  const displayData = useMemo(() => {
    return data?.map((val:any,i:number)=>{
        let name = "";
        if(val.renter){
            name = formatFullName({firstName:val.renter.firstname,middleName:val.renter.middlename,lastName:val.renter.lastname});
        }

        if(val.owner){
            name = formatFullName({firstName:val.owner.firstname,middleName:val.owner.middlename,lastName:val.owner.lastname});
        }

        if(val.driver){
            name = formatFullName({firstName:val.driver.firstName,middleName:val.driver.middleName,lastName:val.driver.lastName});
        }

        return (<div className=' bg-white w-1/2 shadow-md py-2 px-4 my-1' onClick={()=>window.location.href=Routes.MESSAGE+"/"+val.message.convo_id}>
            <p className=' font-bold'>{name}</p>
            <p className=' mt-2'>
                {val.lastMessage.message}
            </p>
            <p className=' mt-3 text-sm text-gray-500'>
                {val.lastMessage.createdAt}
            </p>
            
        </div>)
    })
  }, [data])
    return (
    <Container>
        <div className=' w-full flex justify-center flex-col items-center'>
            <div className=' w-1/2 bg-slate-900 text-white p-4'>
                <h1>Message</h1>
            </div>
            <div className=' h-5'/>
            {displayData}
        </div>
    </Container>
  )
}
