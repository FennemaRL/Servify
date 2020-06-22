import {useState, useEffect} from 'react';
import Axios from 'axios';


export function IsAuth(user) {
    const [islog, setIslog]  = useState(false);


    useEffect(()=>{
        Axios.post(`${process.env.REACT_APP_API_URL}/api/tokenVerify`,{username:localStorage.getItem("userName")},{headers:{
            'token': 'Bearer ' + localStorage.getItem("token")
        }}).then(res=> setIslog(true)).catch(err=>()=>{});
    },[user])
    const closeSession = ()=>{
        localStorage.removeItem("userName")
        localStorage.removeItem("token")
        setIslog(false);
    }
    const openSession = (token, userName)=>{
        localStorage.setItem("userName", userName)
        localStorage.setItem("token", token)
        setIslog(true);
    }
    return {islog, closeSession, openSession}
}