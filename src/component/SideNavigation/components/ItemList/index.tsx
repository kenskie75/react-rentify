import { useMemo, useState } from "react";
import { SidebarItem, SubType } from "../../../../types/SidebarItemTypes.type";

type Props = SidebarItem

export default function ItemList(props:Props) {
   const [isOpen,setIsOpen] = useState<boolean>(false);

   const displaySubType = useMemo(()=>{
        if(!isOpen || props.subitem.length < 1){
            return;
        }

        return props.subitem.map((val:SubType,i:number)=>(
            <li className=" px-10 py-3 list-none text-white cursor-pointer">
                {val.title}
            </li>
        ))

   },[isOpen,props.subitem]);

   function onClick(){
    if(props.subitem.length < 1){
        return window.location.href=props.route;
    }

    setIsOpen(!isOpen)

   }
  
    return (
    <>
    <li className=" px-6 py-3 text-white list-none w-full hover:bg-slate-800 cursor-pointer" onClick={()=>onClick()}>
       {props.title}
    </li>
    <nav>
        {displaySubType}
    </nav>
    </>
  )
}
