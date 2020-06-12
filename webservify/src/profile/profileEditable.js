import React,{ useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import ViewEditableService from "./servicesProfile";




function ProfileEditable() {
    let { username } = useParams();
    const  [providerSevices, setproviderSevices] = useState([])
    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_API_URL}/api/provider/${username}`)
      .then(res=> {console.log(res.data.offerServices)
        setproviderSevices(res.data.offerServices)})
      .catch(err=>alert(err.response.data))
    },[username] )
      return (
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignContent:'center'}}>
          <div>
          <h1>{username}</h1>
          <ViewEditableService username ={username} services={providerSevices} setServices={setproviderSevices}/>
          </div>
        </div>
          );
};
export default ProfileEditable;
