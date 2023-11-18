import { createContext, useContext, useState } from "react";
import { Modal } from "../../component";

export type ModalContextType = {
    isOpen:boolean;
    setIsOpen:(isOpen:boolean)=>void;
    isFullScreen?:boolean;
    content:React.ReactNode;
    setContent:(content:React.ReactNode)=>void;
    setIsFullScreen:(setIsFullScreen:boolean)=>void;
}

export type Props = {
    children:React.ReactNode;
}

const ModalContext = createContext<ModalContextType | null>(null);

export default function  ModalContextProvider(props:Props){
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [content,setContent] = useState<React.ReactNode | null>(null);
    const [isFullScreen,setIsFullScreen] = useState<boolean>(false);
    
    function getValues(){
        return{
            isOpen,
            setIsOpen,
            content,
            setContent,
            isFullScreen,
            setIsFullScreen
        }
    }

    return(
        <ModalContext.Provider value={getValues()}>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} isFullScreen={isFullScreen}>
                {content}
            </Modal>
            {props.children}
        </ModalContext.Provider>
    );
}

export const useModalContext = () =>{
     const currentContext = useContext(ModalContext);

     if(!currentContext){
        throw new Error( "useCurrentUser has to be used within <Modal.Provider>");
     }

     return currentContext;
}
