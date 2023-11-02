export const getDataFromStorage = async(key:string) =>{
    try {
        const resp = await localStorage.getItem(key);
        if(!resp){
            return;
        }
        const userData = JSON.parse(resp);
        return userData;
    } catch (error) {
        
    }
}