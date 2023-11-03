
import React, { useMemo } from 'react'
import Button from '../Button';

type Props = {
    title:string;
    message:string;
    onConfirm:()=>void;
    onCancel:()=>void;
    confirmText?:string;
    cancelText?:string;
}


export default function ModalContent(props:Props) {
  const {title,message,onCancel,onConfirm,confirmText,cancelText} = props;
  
  const displayConfirmText = useMemo(() => {
    return confirmText ? confirmText : 'Okay';
  }, [confirmText]);

  const displayCancelText = useMemo(()=>{
    return cancelText ? cancelText : 'Close';
  },[cancelText]);
   return (
    <div className=' p-5'>
        <p className=' text-xl font-bold'>{title}</p>
        <div className=' h-5'/>
        <p>{message}</p>
        <div className=' flex flex-row w-full mt-10'>
            <div className=' px-5 flex flex-1'>
                <Button text={displayConfirmText} onClick={onConfirm}/>
            </div>
            <div className=' px-5 flex flex-1'>
                <Button text={displayCancelText} onClick={onCancel} outline={true}/>
            </div>
        </div>
    </div>
  )
}
