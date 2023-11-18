import { useMemo, useState } from "react";
import { Button } from "../../../component";
import { useModalContext } from "../../../context/ModalContext/ModalContext";
import AddSubscription from "./AddSubscription";
import useGetAllSubscriptions from "../../../hooks/subscription/useGetAllSubscriptions";

export default function Subscription() {
    const {setContent,setIsOpen} = useModalContext();
    const [isRefetch,setIsRefetch] = useState<boolean>(false);
    const {sendRequest,data} = useGetAllSubscriptions();

    function handleOpenModal(){
        setIsOpen(true)
        setContent(<AddSubscription setIsOpen={setIsOpen} setIsRefetch={setIsRefetch}/>)
    }


    const displayData = useMemo(()=>{
        if(data.length < 1){
            <p className=" my-10 font-bold text-center">No Record Found</p>
        }

        return data.map((val:any,i:number)=>{
            return (
                <tr className=" border-b border-slate-400" key={i.toString()}>
                    <td className=" p-3 text-center">{val.sub_name}</td>
                    <td className=" p-3 text-center">{val.sub_description}</td>
                    <td className=" p-3 text-center">{val.price} for {val.monthly} {parseInt(val.monthly) < 2 ? 'month' : 'months'}</td> 
                    <td className=" p-3 text-center">{val.dateCreated}</td>
                    <td className="p-3 text-center"><button className=" px-4 py-2 text-blue-500 bg-slate-200">Edit</button></td>
                </tr>
            );
        })
    },[data])
  
  return (
    <div>
        <div className=" flex flex-row w-full">
            <div className=" flex flex-1">
                <h1 className=" text-xl font-bold">Subscription Management</h1>
            </div>
            <div className=" flex flex-1 items-end justify-end">
                <div className=" w-1/2">
                   <Button text={"Add New Subscription"} onClick={handleOpenModal}/>
                </div> 
            </div>
        </div>
        <div className=" h-16"/>
        <table className=" min-w-full">
            <thead className=" bg-slate-300">
                <tr className="">
                    <th className=" p-3">Subscription Name</th>
                    <th className=" p-3">Description</th>
                    <th className=" p-3">Price</th>
                    <th className=" p-3">Date Created</th>
                    <th className=" p-3">Action</th>
                </tr>
            </thead>
            <tbody>
               {displayData}
            </tbody>
        </table>
    </div>
  )
}
