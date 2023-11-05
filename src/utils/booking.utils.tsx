import { BookingStatus } from "../types/BookingStatus.enum";

export const  displaystatus = (status:string) =>{
    let content = <p></p>
    switch(status){
        case BookingStatus.PENDING:
            content =<p className=" text-gray-500">Pending (Wait for the owner acceptance)</p>    
        break;
        case BookingStatus.ACCEPTED:
            content = <p className=" text-green-400">Accepted By Owner</p>    
        break;
        case BookingStatus.TO_PICK_UP:
            content = <p className=" text-yellow-500">Driver is on the way to pick up</p>
        break;
        case BookingStatus.PICK_UP:
            content = <p className=" text-orange-500">Passenger is picked up on the way to destination</p>    
        break;
        case BookingStatus.SUCCESS:
            content = <p className=" text-green-600">Passenger is successfully Arrived to the destination</p>    
        break;
        
       
    }
    return content;
}

export const displayStatusByOwner = (status:string) =>{
    let content = <p></p>
    switch(status){
        case BookingStatus.PENDING:
            content =<p className=" text-gray-500">Waiting for your acceptance</p>    
        break;
        case BookingStatus.ACCEPTED:
            content = <p className=" text-green-400">Accepted By Owner</p>    
        break;
        case BookingStatus.TO_PICK_UP:
            content = <p className=" text-yellow-500">Heading out to pick up the passenger.
            </p>
        break;
        case BookingStatus.PICK_UP:
            content = <p className=" text-orange-500">Heading out to pick up the destination.
            </p>    
        break;
        case BookingStatus.SUCCESS:
            content = <p className=" text-green-600">Passenger is successfully Arrived to the destination</p>    
        break;
        
       
    }
    return content;
} 