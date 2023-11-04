import { useCallback, useEffect, useState } from 'react';
import { getDriverByOwner } from '../../services/DriverService.service';

type Params = {
    userId:string;
}

export default function useGetDriversByUserId(params:Params) {
    const {userId} = params
    const [data,setData] = useState<any[]>()
  
    const sendRequest = useCallback(
      async() => {
        const resp = await getDriverByOwner(userId);
        console.log(resp);
        setData(resp.data)
      },
      [userId],
    )

    useEffect(() => {
      sendRequest();
    }, [userId])
    
    
    return{
        data
    }
}

