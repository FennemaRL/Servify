import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";


export function useProvider() {
    let {username, category} = useParams();
    const [providerSevices, setproviderSevices] = useState([])
    const [err, setErr] = useState()
    const [personalInfo, setPersonalInfo] = useState({})

    const addIdCalification = (serviceName, consumerName, consumerEmail, comment, id) => {
        let services = [...providerSevices]
        let service = services.filter(service => service.category.categoryName === serviceName)[0]
        let calification = service.califications.filter(calification => calification.consumer.name === consumerName
                                     && calification.message === comment && calification.consumer.email === consumerEmail)[0]
        calification.id = id
        setproviderSevices(services)
    }

    const addCalification  = (serviceName,calif)  => {
        let categoryf = [...providerSevices].filter(s=> s.category.categoryName === serviceName)
        if(categoryf.length){
            categoryf[0].califications.push({calificationValue:calif.calificationValue,message:calif.message,consumer:{email: calif.consumerEmail ,name: calif.consumerName}, likes:0})
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

    const addLike = (serviceCategory, id) => {
        let categories = [...providerSevices]
        let category = categories.filter(s=> s.category.categoryName === serviceCategory)[0]
        let calification = category.califications.filter(calificacion => calificacion.id === id)[0]
        calification.likes+=1
        setproviderSevices(categories)
    }

    return {username, providerSevices, setproviderSevices, personalInfo, setPersonalInfo, category, err, addCalification, addIdCalification, addLike}
}

