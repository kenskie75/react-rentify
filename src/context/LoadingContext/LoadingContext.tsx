import React, { createContext, useContext, useMemo, useState } from "react";
import Loading from "../../component/Loading";

export type LoadingContextType = {
    loading:boolean;
    openLoading:()=>void;
    handleCloseLoading:()=>void;
}

export type Props = {
    children:React.ReactNode;
}

const LoadingContext = createContext<LoadingContextType | null>(null);


export default function LoadingContextProvider(props:Props){
    const [loading,setLoading] = useState<boolean>(false);


    function openLoading(){
        setLoading(true);
    }
    
    function handleCloseLoading(){
        setTimeout(() => {
            setLoading(false);
        },5000);
       
    }

    function getValues():LoadingContextType{
        return{
            openLoading,
            handleCloseLoading,
            loading
        }
    }

    const displayLoading = useMemo(()=>{
        if(!loading){
            return;
        }

        return(
            <Loading/>
        );
    },[loading])
    return(
        <LoadingContext.Provider value={getValues()}>
            {displayLoading}
            {props.children}
        </LoadingContext.Provider>
    );
}


export const useLoadingContext = () =>{
    const currentContext = useContext(LoadingContext);

    if(!currentContext){
       throw new Error( "useCurrentUser has to be used within <Modal.Provider>");
    }

    return currentContext;
}
