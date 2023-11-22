import { configVariable } from "../../constant/ConfigVariable";
import { VehicleDto } from "../../types/VehicleDto.type";

type Props = {
    vehicle:any
    onClick:()=>void;
};

export default function index(props:Props) {
    const {vehicle_id,brand,model,description,price} = props.vehicle;
    console.log(props.vehicle)
    return (
    <div className=' bg-white mx-3  px-3 py-4 rounded-lg shadow-lg zoom group' onClick={()=>props.onClick()}>
        <div className=" h-[300px] flex justify-center items-center">
            <img
                src={configVariable.BASE_URL+props.vehicle?.images?.[0].path}
                alt={`${brand+vehicle_id}`}
                className=" h-[300px]  w-full p-3"
            />
        </div>
        <p className=" font-bold text-center">{description}</p>
        <p className=" text-center">PHP {" "+price+" per km "}</p>
    </div>
    )
}