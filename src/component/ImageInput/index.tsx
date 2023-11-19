
import React, { useMemo } from "react";
import { FaRegFileImage } from "react-icons/fa";


type Props =   React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement 
> & {
    image?:Blob;
}
export default function ImageInput(
  props:Props
) {
    const {image} = props;

    const displayImage = useMemo(()=>{
        console.log(image)
        if(!image){
            return (<div className=" absolute flex w-full h-full justify-center items-center">
                <div className=" text-3xl">
                <FaRegFileImage />
                </div>
          </div>)
        }

        return(
            <div className=" h-full w-full absolute">
                <img src={URL.createObjectURL(image)} alt="documents" className=" w-full h-full"/>
            </div>
        )
    },[image,onchange])
  return (
    <div className="  h-80  w-80  relative bg-gray-300">
      {displayImage}
      <input
        type="file"
        className=" opacity-0 h-full w-full z-10"
        placeholder=""
        disabled={props?.disabled}
        onChange={props.onChange}
      />
    </div>
  );
}