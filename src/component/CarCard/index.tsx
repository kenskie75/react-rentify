import Button from "../Button";

type Props ={ 
    imagePath:any;
    name:string;
    description?:string;
}

export default function CarCard(props:Props) {
  const {imagePath,name} = props;
    return (
    <div className=' bg-white mx-3  px-3 rounded-lg shadow-lg zoom'>
        <div className=" h-[300px] flex justify-center items-center">
            <img
                src={imagePath}
                alt={`${name}`}
                className=" h-[300px] w-full p-3"
            />
        </div>
        <div className=" px-3 py-5">
            <p className=" text-2xl font-bold">{name}</p>
            <div className="h-3"/>
            <Button text="Show More" onClick={()=>{}}/>
        </div>
        
    </div>
  )
}
