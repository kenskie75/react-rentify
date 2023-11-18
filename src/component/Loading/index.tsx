import Lottie from 'lottie-react';
import Truck from '../../assets/truckloading.json';

export default function Loading() {
  return (
    <div className=" fixed  backdrop-blur-sm h-screen w-screen white z-50 flex justify-center items-center">
        <div className=' w-1/4 h-1/4 mb-64'>
            <Lottie animationData={Truck} size={20}/>
            <p className=' text-2xl text-center font-bold'>Loading ...</p>
        </div>
    </div>
  )
}
