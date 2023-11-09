import { useMemo } from "react";
import { Container } from "../../component";
import useGetAccountFromStorage from "../../hooks/useGetAccountFromStorage";
import { useModalContext } from "../../context/ModalContext/ModalContext";
import UpdateModal from "./component/UpdateModal";

const image = require('../../assets/images/user.png')

export default function Profile() {
    const {user} = useGetAccountFromStorage();
    const {setContent,setIsOpen} = useModalContext();
  
    const profileImage = useMemo(() => {
        if(!user){
            return;
        }
        console.log(user)
        if(!user.image){
            return <img src={image} alt='profile' className=" w-[150px] h-[150px]"/>
        }
        
    }, [user]);

    const handleShowUpdatePicture =()=>{
        setContent(<UpdateModal/>)
        setIsOpen(true)
    }
   return (
    <Container>
        <div className=" flex w-full justify-center">
            <div className=" w-1/2 bg-white p-10">
                <h1 className=" font-bold text-lg">Profile</h1>
                <div className=" mt-5 flex justify-center ">
                    <div className="  w-fit">
                        {profileImage}
                        <div className=" mt-5 flex justify-center">
                            <button onClick={()=>handleShowUpdatePicture()} className=" p-2 rounded bg-slate-900 text-white  ">Edit Profile Picture</button>
                        </div>                     
                    </div>
                </div>
            </div>
        </div>
    </Container>
  )
}
