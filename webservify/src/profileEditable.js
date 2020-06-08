import React,{useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

function ProfileEditable() {
    let { username } = useParams();
    const [userdata, setUser] = useState({});

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/provider/${username}`)
          .then(res=>{setUser(res.data)
            console.log(res.data) })
          .catch(err=> window.alert(err))
      },[username]);
return <div>{}</div>
}
export default ProfileEditable;