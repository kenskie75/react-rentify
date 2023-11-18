import { useCallback, useEffect, useState } from 'react';
import { getSubscription } from '../../services/SubscriptionService.service';

export default function useGetAllSubscriptions() {
    const [data,setData] = useState<any[]>([]);
    const sendRequest = useCallback(
      async() => {
        try {
            const resp = await getSubscription();

            setData(resp.data);
        } catch (error) {
            
        }
      },
      [],
    )

    useEffect(() => {
      sendRequest()
    }, []);
    
    
  return {
    data,
    sendRequest
  }
}
