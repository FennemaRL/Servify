import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";


export function useProviderServices() {
    let {username, category} = useParams();
    const [providerSevices, setproviderSevices] = useState([])
    const [err, setErr] = useState()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/provider/${username}`)
            .then(res => setproviderSevices(res.data.offerServices ))
            .catch(err =>{console.log(err.response.data)
                setErr(err.response.data)})
    }, [username])
    return {username, providerSevices, setproviderSevices, category, err};
}

