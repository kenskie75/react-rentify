import React from 'react'
import { GCASH } from '../../../../../constant/Image'



export default function PaymentModal() {
    
async function handlePay(){
    
}
    
    return (
    <div className=' w-[500px] m-auto bg-blue-400 px-6 py-5'>
    <div className=' flex justify-center'>
        <img src={GCASH} alt='gcash' className=' w-1/2 '/>
    </div>
    <p className=' text-white text-center'>Disclaimer this is mock testing purposes only</p>
    <div className=' h-10'/>
    <label className=' text-white'>Mobile Number</label>
    <div className=' bg-white p-3 rounded'>
        <p className=' text-center'>{}</p>
    </div>
    <div className=' h-5'/>
    <label className=' text-white'>Total Amount</label>
    <div className=' bg-white p-3 rounded'>
        <p className=' text-center'>PHP {}</p>
    </div>
    <div className=' h-12'/>
    <button className=' bg-blue-700 text-white w-full p-3 rounded-2xl hover:bg-blue-500' onClick={()=>handlePay()}>
        Pay Now
    </button>
    <div className=' h-5'/>
    <button className=' bg-white text-blue-700 border border-blue-700 p-3 w-full rounded-2xl'>
        Cancel
    </button>
</div>
  )
}
