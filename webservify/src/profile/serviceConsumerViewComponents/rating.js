import React from 'react';
import {Rate} from 'antd';
import ModalRate from './modalRate'

function Rating({serviceName, username, service, addCalification}) {
    return (
        <div style={{display: "flex", flexdirection: "row", alignItems: "center", marginTop:"2vh", marginBottom:"1vw"}}>
                <p>Calificación: </p>
                <Rate style={{marginLeft:"1vw"}} disabled defaultValue={service.calificationAverage}/>
                <ModalRate serviceName={serviceName} username={username} addCalification={addCalification}/>

        </div>
    );
}
export default Rating