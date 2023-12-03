import React, { useMemo, useState } from 'react'
import useGetMessages from '../../../hooks/convo/useGetMessages'
import { useParams } from 'react-router-dom';
import { Container } from '../../../component';
import useGetAccountFromStorage from '../../../hooks/useGetAccountFromStorage';
import { formatFullName } from '../../../utils/string';
import { configVariable } from '../../../constant/ConfigVariable';
import { getDataFromStorage } from '../../../utils/storage';
import { sendMessage } from '../../../services/Message.service';
import useAlertOption from '../../../hooks/useAlertOption';

export default function Convo() {
    const {id} = useParams();
    const {data,sendRequest} = useGetMessages({convoId:id?id:''});
    const {user} = useGetAccountFromStorage();
    const [message,setMessage] = useState<string>('');
    const {alertError} = useAlertOption();

    const displayData = useMemo(()=>{
        return data.map((val:any,i:number)=>{
            if(!user){
                return <></>
            }

            let name = '';

            if(val?.message?.sender_type === 'DRIVER'){
                name = formatFullName({
                    firstName:val.senderData.firstName,
                    middleName:val.senderData.middleName,
                    lastName:val.senderData.lastName,
                })
            }else{
                name = formatFullName({
                    firstName:val.senderData.firstname,
                    middleName:val.senderData.middlename,
                    lastName:val.senderData.lastname,
                })
            }
            const userType = user.user_type ? user.user_type : 'DRIVER'
            if(userType === val.message.sender_type){
               return <div className=' w-full flex flex-row justify-end my-1'>
                    <div className=' bg-slate-900 text-white p-2 rounded-md mx-2 flex flex-row'>
                        <p>{val.message.message}</p>
                    </div>
                </div>
            }
            
            return (
                <div className=' w-full flex flex-row my-1'>
                    <div>
                        <div className=' bg-slate-800 text-white p-2 rounded-md mx-2 flex flex-row'>
                            <p>{val.message.message}</p>
                                                
                        </div>
                        <div className=' text-sm text-gray-500 mx-2'>{name}</div> 
                    </div>
                   
                </div>
            );
        })
    },[user,data]);

    async function handleSend(){
        try {
            if(message === ''){
                return;
            }
            const user = await getDataFromStorage('account');
            if(!user){
                return;
            }

            const type = user.user_type ? user.user_type : 'DRIVER';

            const payload = {
                convo_id:id,
                message:message,
                sender:user.user_id,
                sender_type:type,
            }

            const resp = await sendMessage(payload);

            if(resp.status.toString() === '1'){
                setMessage('')
                sendRequest(id ? id :'');
                
                return;
            }

            alertError();
        } catch (error) {
            alertError()
        }     
    }
    return (
    <Container>
        <div className=' flex flex-col justify-center items-center w-full'>
            <div className=' bg-slate-900 text-white w-1/2 p-3'>
                <p>Message</p>
            </div>
            <div className=' w-1/2 bg-white h-[70vh]  overflow-scroll overflow-x-hidden'>
                {displayData}
            </div>
            <div className=' flex flex-row w-1/2 mt-2 gap-2'>
                <input onChange={(e)=>setMessage(e.target.value)} value={message} className=' w-full bg-gray-white border border-gray-400 rounded-lg p-3' placeholder='Message ... '/>
                <button className=' p-3 rounded-md bg-slate-900 text-white' onClick={handleSend}>Send</button>
            </div>
        </div>
    </Container>
  )
}
