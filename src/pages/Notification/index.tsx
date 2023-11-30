import { useMemo } from "react";
import { Container } from "../../component";
import useGetNotifications from "../../hooks/notification/useGetNotifications";
import { useModalContext } from "../../context/ModalContext/ModalContext";
import ViewNotification from "./ViewNotification";
import { CiRead, CiUnread } from "react-icons/ci";
import useAlertOption from "../../hooks/useAlertOption";
import { updateNotificationStatus } from "../../services/Notification.service";
export default function Notifications() {
    const {data,sendRequest} = useGetNotifications();
    const {setIsOpen,setContent} = useModalContext();
    const {alertError,alertSuccess} = useAlertOption();

    const handleClickOkay = async(id:string) =>{
        try {
            const payload = {
                notif_id:id
            }
            const resp = await updateNotificationStatus(payload);

            if(resp.status.toString() === '1'){
                sendRequest();
                setIsOpen(false);
            }else{  
                alertError();
            }
        } catch (error) {
            alertError();
        }
    }


    function handleViewNotif(notification:any){
        setContent(<ViewNotification notification={notification} onClick={()=>handleClickOkay(notification.notif_id)}/>);
        setIsOpen(true);
    }

    const displayData = useMemo(() => {
        return data.map((val:any,i:number)=>{
           return (
            <div className=" px-4 py-6  flex flex-row bg-white w-1/2 my-1 shadow-lg cursor-pointer hover:border hover:border-slate-500 rounded-md" key={i.toString()} onClick={()=>handleViewNotif(val)}>
                <div className=" flex-1">
                    <h4 className=" text-lg font-bold">{val.header}</h4>
                    <p className=" text-gray-500 text-sm">{val.createdAt}</p>
                </div>
                {val.notif_status.toString() === '1' ? (
                    <div className="  justify-center items-center flex flex-row gap-5">
                       <p>Unread</p> <CiUnread color='red' size={20}/>
                    </div>
                ):(
                    <div className="  justify-center items-center flex flex-row gap-5">
                       <p>Read</p> <CiRead color='green' size={20}/>
                    </div>
                )}
             
             
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
