import React, {useEffect, useState} from 'react';
import {Button, Select, message } from 'antd';
import axios from "axios";
import { scopes} from '../../catAndScopes'


function ZonesEditable({name, service}){
    const [zones, setzones] = useState([]) 
    const { Option } = Select;
    const children = [];
    const filteredOptions = scopes.filter(o => !zones.includes(o));
    scopes.map(zone => children.push(<Option key={zone}>{zone}</Option>))

    useEffect(() => {
        if(service.scopes) setzones(service.scopes.map(scope => scope.scope))
    }, [service])

    const onSend = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/api/provider/service/scope`, {
            providerName: name,
            serviceCategory: service.category.categoryName,
            scopes: zones
        }).then(() => {
            message.success("Se modificaron las zonas de alcance con éxito")
        })
        .catch(err => {
            message.error(err.response.data)
        })
    };

    function handleChange(values) {setzones(values);}
        return (
            <div styles={{display:"flex"}}>
            <p style={{textAlign:'left',marginTop:"2vh", marginBottom: "1vh"}} >Zonas de alcance:</p>
            <Select
                mode="multiple"
                style={{ width: '55%', marginRight:"1vw"}}
                placeholder="Por favor seleccione una zona"
                value={zones}
                onChange={handleChange}>
                {filteredOptions.map(zone => <Option key={zone}>{zone}</Option>)}
            </Select>
            <Button type="primary" onClick={onSend}>
                Guardar
            </Button>
            </div>)
}
export default ZonesEditable