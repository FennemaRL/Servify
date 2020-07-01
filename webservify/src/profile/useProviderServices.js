import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";


export function useProvider() {
    let {username, category} = useParams();
    const [providerSevices, setproviderSevices] = useState([])
    const [err, setErr] = useState()
    const [personalInfo, setPersonalInfo] = useState({})
    const addCalification  = (serviceName,calif)  => {
        let categoryf = [...providerSevices].filter(s=> s.category.categoryName === serviceName)
        if(categoryf.length){
            categoryf[0].califications.push({calificationValue:calif.calificationValue,message:calif.message,consumer:{email: calif.consumerEmail ,name: calif.consumerName}})
            setproviderSevices(categoryf)
        }


    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/provider/${username}`)
            .then(res => { 
                setproviderSevices(res.data.offerServices )  
                setPersonalInfo({providerName: res.data.name, phoneNumber: res.data.phoneNmbr, 
                                cellNumber: res.data.celNmbr, webPage: res.data.webPage, residence: res.data.residence,})
                            })
            .catch(err => setErr(err.response.data))
    }, [username])
    return {username, providerSevices, setproviderSevices, personalInfo, setPersonalInfo, category, err, addCalification}
}

