import { useMemo } from "react";

type Props = {
    text:string;
    onClick:()=>void;
    outline?:boolean;
    disable?:boolean;
  }


export default function Button(props:Props) {
  const {outline,onClick,disable} = props;
  const design = useMemo(() => {
    if(disable){
      return ' w-full px-2 py-3 rounded-md bg-gray-300 text-gray-600'
    }
    if(outline){
      return 'w-full px-2 py-3 rounded-md hover:bg-black hover:text-white border bg-white text-black '
    }

    return 'w-full px-2 py-3 rounded-md hover:border-black hover:border hover:bg-white hover:text-black bg-black text-white'

  }, [outline,disable])
  
  return (
    <button disabled={disable} className={`${design} `} onClick={()=>onClick()} >
        {props.text}
    </button>
  )
}
