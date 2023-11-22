import React, { useMemo } from 'react'
import { Container } from '../../../component'
import useGetBookingByCustomerId from '../../../hooks/bookings/useGetBookingByCustomerId'
import TransactionCard from '../../owner/bookings/components/TransactionCard';
import { formatFullName } from '../../../utils/string';

export default function MyTransactions() {
  const {data} = useGetBookingByCustomerId();
  
  const displayData = useMemo(() => {
    if(!data){
        return;
    }

    return data.map((val:any,i:number)=>(
        <TransactionCard images={val.images} refId={val.ref_id} key={i.toString()} isRenter={false} description={val.description} image={val.vehicleImage} vehicleName={val.brand} ownerName={formatFullName({firstName:val.firstname,middleName:val.middlename,lastName:val.lastname})} price={val.amount}  />
    ))
  }, [data])
  
  return (
    <Container>
        <div className=' w-full flex justify-center'>
            <div className=' w-1/2 bg-white p-5'>
               <h1>Booking List</h1> 
                <div className=' h-10'/>
                {displayData}
            </div>
        </div>
    </Container>
  )
}
