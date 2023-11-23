import React, { useCallback, useEffect, useState } from 'react'
import { getDriverById } from '../../services/DriverService.service';

type Props = {
    id:string
}
export default function useGetDriverById(props:Props) {
    const [data,setData] = useState<any>(null)
    const {id} = props;
    const sendRequest = useCallback(
      async() => {
        try {
         
           const resp = await getDriverById(id);

           setData(resp.data);
        } catch (error) {
            console.log(error)
        }
      },
      [],
    )
    
    useEffect(() => {
      sendRequest();
    }, [])
    
    
    return {
        data
    }
}
