import React from 'react';
import {Rate, Tooltip} from 'antd';
import ModalRate from './modalRate'

function Rating({serviceName, username, service, addCalification, addIdCalification}) {
    let text="promedio de "+service.calificationAverage.toString()+" en "+service.califications.length+" calificaciones"
  
    return (
        <div style={{display: "flex", flexdirection: "row", alignItems: "center", marginTop:"2vh", marginBottom:"1vw"}}>
                    <p>Calificación: </p>
                    <Tooltip title={text}>
                        <div><Rate style={{marginLeft:"1vw"}} disabled defaultValue={service.calificationAverage}/></div>
                    </Tooltip>
                <ModalRate serviceName={serviceName} username={username} addCalification={addCalification} addIdCalification={addIdCalification}/>
        </div>
    );
}
export default Rating