import React from 'react'
import { ListItem } from '../../../../../component';
import { configVariable } from '../../../../../constant/ConfigVariable';

type Props ={
    data:any
}

export default function Details(props:Props) {
    const {data} =  props;
  return (
    <div className=' w-full'>
        <h1 className=' font-bold text-lg'>Driver Details</h1>
        <div className=' flex w-full justify-center items-center'>
            <img src={configVariable.BASE_URL+data?.driver_pic} className=' w-32 h-32' alt='pic'/>
        </div>
        <ListItem label="Firstname" value={data?.firstName}/>
        <ListItem label="Middlename" value={data?.middleName} />
        <ListItem label="Lastname" value={data?.lastName} />
        <ListItem label="Contact Number" value={data?.contactNumber} />
        <div className=' mt-10 flex w-full justify-center items-center'>
            <img src={configVariable.BASE_URL+data?.driver_license} className=' w-32 h-32' alt='pic'/>
        </div>
    </div>
  )
}
