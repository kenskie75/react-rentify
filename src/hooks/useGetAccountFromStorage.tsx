import React, { useCallback, useEffect, useState } from 'react'

export default function useGetAccountFromStorage() {
    const [user,setUser] = useState<any>(null);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const getUser = useCallback(async()=>{
        try {
            setIsLoading(true)
            const resp = await localStorage.getItem('account');
            if(!resp){
                return;
            }
            const userData = JSON.parse(resp);
            setUser(userData);
           
        } catch (error) {
            
        }finally{
            setIsLoading(false)
        }
    },[]);

    useEffect(() => {
      getUser();
    }, [])
    
    return {
        user,
        getUser,
        isLoading
    }
}
