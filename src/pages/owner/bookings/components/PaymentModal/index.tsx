import Swal from 'sweetalert2';
import { GCASH } from '../../../../../constant/Image';
import useAlertOption from '../../../../../hooks/useAlertOption';
import { payBooking } from '../../../../../services/BookingsService.service';
type Props = {
    renterMobileNo:string;
    ownerMobileNo:string;
    amount:string;
    refId:string;
    setIsOpen:(isOpen:boolean)=>void;
}

export default function PaymentModal(props:Props) {
const {alertError} = useAlertOption();
async function handlePay(){   
    try {
        const payload = {
            refid:props.refId,
            cMobileNo:props.renterMobileNo,
            oMobileNo:props.ownerMobileNo,
            amount:props.amount
        }
        const resp = await payBooking(payload);

        if(resp.status?.toString() === '1'){
            Swal.fire({
                icon:'success',
                text:"Successfully Paid"
            }).then(val=>{
                if(val.isConfirmed){
                    window.location.reload();
                }
            })
        }
    } catch (error) {
        alertError();        
    }

} 
    return (
    <div className=' w-[500px] m-auto bg-blue-400 px-6 py-5'>
    <div className=' flex justify-center'>
        <img src={GCASH} alt='gcash' className=' w-1/2 '/>
    </div>
    <p className=' text-white text-center'>Disclaimer this is mock testing purposes only</p>
    <div className=' h-10'/>
    <label className=' text-white'>Receiver</label>
    <div className=' bg-white p-3 rounded'>
        <p className=' text-center'>{props.ownerMobileNo}</p>
    </div>
    <div className=' h-5'/>
    <label className=' text-white'>Sender</label>
    <div className=' bg-white p-3 rounded'>
        <p className=' text-center'>{props.renterMobileNo}</p>
    </div>
    <div className=' h-5'/>
    <div className=' bg-white p-3 rounded'>
        <p className=' text-center'>PHP {props.amount}</p>
    </div>
    <div className=' h-12'/>
    <button className=' bg-blue-700 text-white w-full p-3 rounded-2xl hover:bg-blue-500' onClick={()=>handlePay()}>
        Pay Now
    </button>
    <div className=' h-5'/>
    <button className=' bg-white text-blue-700 border border-blue-700 p-3 w-full rounded-2xl' onClick={()=>props.setIsOpen(false)}>
        
        Cancel
    </button>
</div>
  )
}
