import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Container, ListItem } from '../../../component';
import useAlertOption from '../../../hooks/useAlertOption';
import { useLoadingContext } from '../../../context/LoadingContext/LoadingContext';
import { getUserSubscription, subscribe } from '../../../services/UserSubscription.service';
import { getDataFromStorage } from '../../../utils/storage';
import { getSubscription } from '../../../services/SubscriptionService.service';
import { useModalContext } from '../../../context/ModalContext/ModalContext';
import { displayMonth } from '../../../utils/string';
import useGetAccountFromStorage from '../../../hooks/useGetAccountFromStorage';
import { GCASH } from '../../../constant/Image';
import Swal from 'sweetalert2';

export default function Subscription() {
    const [mySubscription,setMySubscription] = useState<any>(null);
    const {alertError} = useAlertOption();
    const {openLoading,handleCloseLoading} = useLoadingContext();
    const {user} = useGetAccountFromStorage();
    const [subscriptions,setSubscriptions] = useState<any[]>([]);
    const {setIsOpen,setContent,setSize} = useModalContext();
    const sendRequest = useCallback(
      async() => {
        try {
            openLoading();
            const user = await getDataFromStorage("account");
            if(!user){
                return;
            }
            const subscription = await getUserSubscription(user?.user_id);

            if(subscription?.status?.toString() === '1'){
                setMySubscription(subscription.data);
                return
            }else{
                const resp = await getSubscription();

                if(resp?.status?.toString() === '1'){
                    setSubscriptions(resp?.data);
                }
            }
        } catch (error) {
            alertError();
        }finally{
            handleCloseLoading();
        }
      },
      [],
    )

    useEffect(() => {
        sendRequest();
    }, []);
    
    const displayMySubscription = useMemo(() => {
        if(!mySubscription || mySubscription === null){
            return;
        }

        return (
            <div className=''>
                <p>{mySubscription.sub_name}</p>
            </div>
        );
    }, [mySubscription]);

    async function handlePay(amount:string,sub_id:string){
      try {
        const account = await getDataFromStorage('account');
        if(!account){
            return;
        }
        const payload = {
            userId:account?.user_id,
            amount:amount,
            sub_id:sub_id
        }
        const resp = await subscribe(payload);
        if(resp.status.toString() === '1'){
            Swal.fire({
                icon:'success',
                title:"Successful",
                text:'Successfully Subscribe'
            }).then((x)=>{
                if(x.isConfirmed){
                    window.location.reload();
                }
            })
            
            return;
        }

        alertError();
      } catch (error) {
        alertError();
      }  
    }


    const paymentContent = (sub:any) =>{
        if(!user){
            return;
        }

        return(
            <div className=' w-[500px] m-auto bg-blue-400 px-6 py-5'>
                <div className=' flex justify-center'>
                    <img src={GCASH} alt='gcash' className=' w-1/2 '/>
                </div>
                <p className=' text-white text-center'>Disclaimer this is mock testing purposes only</p>
                <div className=' h-10'/>
                <label className=' text-white'>Mobile Number</label>
                <div className=' bg-white p-3 rounded'>
                    <p className=' text-center'>{user.mobileNumber}</p>
                </div>
                <div className=' h-5'/>
                <label className=' text-white'>Total Amount</label>
                <div className=' bg-white p-3 rounded'>
                    <p className=' text-center'>PHP {sub.price}</p>
                </div>
                <div className=' h-12'/>
                <button className=' bg-blue-700 text-white w-full p-3 rounded-2xl hover:bg-blue-500' onClick={()=>handlePay(sub.price,sub.sub_id)}>
                    Pay Now
                </button>
                <div className=' h-5'/>
                <button className=' bg-white text-blue-700 border border-blue-700 p-3 w-full rounded-2xl'>
                    Cancel
                </button>
            </div>
        );
    }
    function handlePayment(sub:any){
        setIsOpen(false);
        setIsOpen(true)
        setSize(400);
        setContent(paymentContent(sub))
    }

    const handleViewContent = (sub:any) =>{
        return(
            <div className=' w-full'>
                <h1 className=' text-xl font-bold'>Confirmation</h1>
                <div className=' h-5'/>
                <ListItem label='Subscription Name' value={sub.sub_name}/>
                <ListItem label='Descriptions' value={sub.sub_description}/>
                <ListItem label='Validity' value={sub.monthly+" "+displayMonth(sub.monthly.toString())}/>
                <ListItem label='Price' value={sub.price}/>
                <div className=' h-5'/>
                <div className=' flex flex-row gap-3'>
                    <Button text='Proceed To Payment' onClick={()=>handlePayment(sub)}/>
                    <Button text='Close' onClick={()=>setIsOpen(false)} outline/>
                </div>
            </div>
        );
    }
    function handleSubscribeNow(sub:any){
        setIsOpen(true)
        setContent(handleViewContent(sub))
    }
    
    
    const displaySubscriptions = useMemo(()=>{
        return subscriptions.map((val:any,i:number)=>{
            return(
                <div className=' p-5 shadow-md bg-white'>
                    <h1 className=' text-xl text-center text-slate-800 font-bold'>{val.sub_name}</h1>
                    <h3 className=' text-lg text-center text-slate-600'>{val.sub_description}</h3>
                    <div className=' mt-10 text-center text-lg text-red-700'>
                        Php {val.price} for {val.monthly} {displayMonth(val.monthly.toString())}
                    </div>
                    <div className=' mt-5   '>
                        <Button text="Subscribe Now" onClick={()=>handleSubscribeNow(val)}/>
                    </div>
            </div>
            )
        })
    },[subscriptions]);

    return (
        <Container>
            <div className=' w-1/2 m-auto  p-3'>
            <h1>Subscription</h1>
            <div className=' h-16'/>
            {displayMySubscription}
                <div className=' w-full grid grid-cols-2 gap-4'>
                    {displaySubscriptions}     
                </div>
            </div>
        </Container>
  )
}
