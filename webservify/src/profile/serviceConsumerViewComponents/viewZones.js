import React  from 'react';
import { Tag} from 'antd';

function ViewZones({service}){
    return  (<>{ !!service.scopes.length &&
        <div  styles={{display:"flex"}}>
            <p style={{textAlign:'left',marginTop:"2vh", marginBottom: "1vh"}} >Zonas de alcance:</p>
            <div className='zones'>
            {service.scopes.map(scope => <Tag key={scope.scope}>{scope.scope}</Tag>)}
            </div>
        </div>}</>
    )  
}
export default ViewZones