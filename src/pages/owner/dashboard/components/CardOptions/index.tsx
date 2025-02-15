import React from 'react'

type Props = {
    icon:any;
    title:string;
    redirect:string;
}

export default function CardOptions(props:Props) {
  
    function handleRedirect(){
        window.location.href=props.redirect
    }
  
    return (
    <div className=' bg-white p-5 flex rounded-md cursor-pointer hover:border hover:border-slate-600' onClick={handleRedirect}>
        <div className=' px-5'>
                <img src={props.icon} alt='driver icon' className=' h-28 w-24'/>
        </div>
        <div className=' flex flex-1'>
            <h1 className=' font-bold'>{props.title}</h1>
        </div>
    </div>
  )
}
