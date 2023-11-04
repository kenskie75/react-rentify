import { useMemo } from "react";
import useGetBookingsByStatus from "../../../hooks/bookings/useGetBookingsByStatus";
import TransactionCard from "./components/TransactionCard";
import { Container } from "../../../component";

export default function Bookings() {
    const {data} = useGetBookingsByStatus({status:'PENDING'});
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
                    <h1 className=' text-xl font-bold'>Pending Transaction</h1>
                    <div className=' h-5'/>
                    {displayData}
                </div>
            </div>
        </Container>
  )
}
