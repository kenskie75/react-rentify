import { useMemo } from "react";
import { Container } from "../../component";
import useGetNotifications from "../../hooks/notification/useGetNotifications";
import { useModalContext } from "../../context/ModalContext/ModalContext";
import ViewNotification from "./ViewNotification";

export default function Notifications() {
    const {data} = useGetNotifications();
    const {setIsOpen,setContent} = useModalContext();
    
    function handleViewNotif(notification:any){
        setContent(<ViewNotification notification={notification} onClick={()=>setIsOpen(false)}/>);
        setIsOpen(true);
    }

    const displayData = useMemo(() => {
        return data.map((val:any,i:number)=>{
           return (
            <div className=" px-4 py-6 bg-white w-1/2 my-1 shadow-lg cursor-pointer hover:border hover:border-slate-500 rounded-md" key={i.toString()} onClick={()=>handleViewNotif(val)}>
                <h4 className=" text-lg font-bold">{val.header}</h4>
                <p className=" text-gray-500 text-sm">{val.createdAt}</p>
            </div>
            )
        });
    }, [data])
    
    return (
        <Container>
            <div className=" flex justify-center items-center w-full flex-col">
                <div className=" w-1/2 p-3 bg-slate-900 text-white rounded-sm" >
                    <h1 className=" text-lg">Notifications</h1>
                </div>
                <div className=" h-3"/>
                {displayData}
            </div>
        </Container>
  )
}
