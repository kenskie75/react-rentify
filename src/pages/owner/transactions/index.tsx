import React, { useMemo } from 'react'
import { Container } from '../../../component'
import useGetTransactions from '../../../hooks/bookings/useGetTransactions'
import TransactionCard from '../bookings/components/TransactionCard';
import { Button } from "../../../component";

export default function Transactions() {
    const {data} = useGetTransactions();
    const displayData = useMemo(()=>{
        return data.map((data:any,i:number)=>{
          const ownerName = data.firstname+" "+data.middlename+" "+data.lastname;
          return <TransactionCard images={data.images} refId={data.ref_id} key={i.toString()} description={data.description} image={data.vehicleImage} vehicleName={data.brand} ownerName={ownerName} price={data.amount}  />
      })
      },[data])
  return (
    <div className='pt-32 flex justify-center'>
          <div className="bg-white w-1/2 p-8">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Transaction</h1>
              <div className="flex gap-3">
                <div>
                  <Button text='Back' onClick={() => window.history.back()} />
                </div>
              </div>
            </div>
            <div className="h-10" />
            {displayData}
          </div>
        </div>
  )
}
