type Name = {
    firstName:string;
    middleName?:string;
    lastName:string;
}

export const formatFullName = (params:Name) =>{

    return params.firstName +' '+params?.middleName +' '+params.lastName;
} 


export const generateSixDigitNumber = () =>{
    return Math.floor(100000 + Math.random() * 900000);
}