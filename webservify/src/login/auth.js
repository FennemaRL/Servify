import {useState, useEffect} from 'react';
import Axios from 'axios';

export function GetToken(){
    return(localStorage.getItem("token"))
}

export function IsAuth() {
    const [islog, setIslog]  = useState(false);
    const [userName, setUserName]  = useState('');
    
    useEffect(()=>{
        let token = localStorage.getItem("token")
        let user = localStorage.getItem("userName")
        if( token && user){
            Axios.post(`${process.env.REACT_APP_API_URL}/api/tokenVerify`,{username:localStorage.getItem("userName")},{headers:{
                'token': 'Bearer ' + localStorage.getItem("token")
                 }}).then(res=> {setIslog(true)
                         setUserName(localStorage.getItem("userName"))
          }).catch(err=>()=>{});
    }
    },[])
    const closeSession = ()=>{
        localStorage.removeItem("userName")
        localStorage.removeItem("token")
        setUserName('')
        setIslog(false)
    }
    const openSession = (token, userName)=>{
        localStorage.removeItem("userName")
        localStorage.removeItem("token")
        localStorage.setItem("userName", userName)
        localStorage.setItem("token", token)
        setUserName(userName)
        setIslog(true)
    }
    return {islog, closeSession, openSession, userName}
}