import React, { useMemo } from 'react'
import { Container } from '../../../component'
import useGetTransactions from '../../../hooks/bookings/useGetTransactions'
import TransactionCard from '../bookings/components/TransactionCard';

export default function Transactions() {
    const {data} = useGetTransactions();
    const displayData = useMemo(()=>{
        return data.map((data:any,i:number)=>{
          const ownerName = data.firstname+" "+data.middlename+" "+data.lastname;
          return <TransactionCard refId={data.ref_id} key={i.toString()} description={data.description} image={data.vehicleImage} vehicleName={data.brand} ownerName={ownerName} price={data.amount}  />
      })
      },[data])
  return (
    <Container>
            <div className=' w-full flex justify-center'>
                <div className=' w-1/2 bg-white p-4'>
                    <h1 className=' text-xl font-bold'>Transactions</h1>
                    <div className=' h-5'/>
                    {displayData}
                </div>
            </div>
        </Container>
  )
}
