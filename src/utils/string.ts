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


export function generateNonce() {
    var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var combination = '';
  
    for (var i = 0; i < 6; i++) {
      var randomIndex = Math.floor(Math.random() * characters.length);
      combination += characters.charAt(randomIndex);
    }
  
    return combination;
  }