import { useCallback, useEffect, useState } from 'react';
import { getCategories } from '../../services/CategoriesService.service';

export default function useGetCategories() {
  const [data,setData] = useState<any[]>([]);
  
  const sendRequest = useCallback(async()=>{
    try {
        const resp = await getCategories();
    
        setData(resp.data);
    } catch (error) {
        console.log(error)
    }
  },[]);
  
  useEffect(() => {
    sendRequest();
  }, [])
  
    return {
        data,
        sendRequest
    }
}
