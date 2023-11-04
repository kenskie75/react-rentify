import { useCallback, useEffect, useState } from 'react';
import { getBookingByRefId } from '../../services/BookingsService.service';

type Params = {
    refId:string;
}


export default function useGetBookingsByRefId(params:Params) {
    const [data,setData] = useState<any>();
    const {refId} = params;
    const sendRequest = useCallback(async()=>{
        try {
            const resp = await getBookingByRefId(refId);

            setData(resp.data);
        } catch (error) {
            
        }
    },[refId]);

    useEffect(() => {
      sendRequest();
    }, [])
    
    return{
        data
  }
}
