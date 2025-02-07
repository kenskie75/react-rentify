import { useMemo, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Container, ListItem } from "../../../../component";
import useGetBookingsByRefId from "../../../../hooks/bookings/useGetBookingsByRefId";
import { useParams } from "react-router-dom";


export default function BookingReciept() {
  const {id} = useParams();
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    const {data} = useGetBookingsByRefId({refId:id ? id : ''})
  
    const displayTotal = useMemo(() => {
      const fee  = data?.booking?.additionalFee ? data?.booking?.additionalfee : "0";
    
      const total = parseFloat(data?.booking?.amount) + parseFloat(fee); 
    
    
      return total;
    }, [data]);

    const displayCode = useMemo(()=>{
      if(data?.booking?.paymentCode){
        return <p>Payment Referance No. {data?.booking?.paymentCode}</p>
      }

      
    },[data])
    return (
    <Container>
        <div className=" flex w-1/2 m-auto bg-white flex-col">
            <div className=" w-full"  ref={componentRef} >
                <div className=" bg-slate-900 p-3 ">
                    <h1 className=" font-bold text-xl text-white">Rentify</h1>
                </div>
                <div className=" px-6">
                  <ListItem label="Referance No." value={data?.booking?.ref_id}/>
                  <ListItem label="Booking Date" value={data?.booking?.book_date}/>
                  <ListItem label="Booking Amount" value={data?.booking?.amount}/>
                  <ListItem label="Additional Fee" value={data?.booking?.additionalfee}/>
                  <ListItem label="Total Amount" value={displayTotal.toString()}/>
                  <div className=" h-3"/>
                  <p className=" font-bold">Pay Via {data?.booking?.paymentMethod}</p>
                  <div className=" h-3"/>
                  {displayCode}
                </div>
              
            </div>
            <div className=" flex justify-end w-full p-3">
            <button className=" mt-5 w-fit p-3 bg-slate-800 text-white float-right" onClick={handlePrint}>Print this out!</button>
            </div>
        </div>
    </Container>
  )
}
