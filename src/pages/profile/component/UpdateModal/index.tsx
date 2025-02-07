import { useMemo, useState } from "react";
import { Button, TextInput } from "../../../../component";
import { useModalContext } from "../../../../context/ModalContext/ModalContext";

export default function UpdateModal() {
  const [img,setImg] = useState<any>(null);
  const {setIsOpen} = useModalContext();
  const displayImage = useMemo(() => {
    if(!img){
        return <div className=" h-[100px] w-[100px] bg-slate-300 rounded-full self-center"/>
    }

    return <img src={URL.createObjectURL(img)} alt='Profile Pic' className=" w-[100px] h-[100px] rounded-full self-center"/>
  }, [img])
  return (
    <div className=" w-full">
        <h1 className=" text-center font-bold">Update Profile Picture</h1>
        <div className=" w-full flex flex-col justify-center mt-10">
            <div className=" flex flex-col items-center">
            {displayImage}
                <TextInput type='file' label="Image"  onChange={(e)=>{setImg(e?.target?.files?.[0])}}/>
            </div>
            <div className=" flex flex-row mt-10">
                <Button text={"Change"} onClick={function (): void {
                      throw new Error("Function not implemented.");
                  } }/>
                <div className=" w-8"/>
                <Button outline={true} text={"Reset Image"} onClick={()=>setImg(null)}/>
                    <div className=" w-8 w-full"/>
                  <button className=" w-full px-2 py-3 hover:text-red-500" onClick={()=>setIsOpen(false)}>Close</button>
            </div>
        </div>
       
    </div>
  )
}
