import {useState, useEffect} from 'react';
import Axios from 'axios';


export function IsAuth(user) {
    const [islog, setIslog]  = useState(false);


    useEffect(()=>{
        Axios.post(`${process.env.REACT_APP_API_URL}/api/tokenVerify`,{username:user},{headers:{
            'token': 'Bearer ' + localStorage.getItem("tokenUser")
        }}).then(res=> setIslog(true)).catch(err=>()=>{});
    },[user])
    
    return {islog, setIslog}
}