import { Button } from "../../../component";

type Props = {
    notification:any;
    onClick:()=>void;
}

export default function ViewNotification(props:Props) {
  const {notification,onClick} = props;
    return (
    <div className=" w-full">
        <h2 className=" font-bold">{notification?.header}</h2>
        <div className=" mt-4 mb-16 mx-5">
            <p>{notification?.body}</p>
        </div>
        <Button text="Okay" onClick={()=>onClick()}/>
    </div>
  )
}
