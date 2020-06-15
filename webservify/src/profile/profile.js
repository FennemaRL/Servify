import React from 'react';
import { ViewEditableService, ViewService, } from "./servicesProfile";
import { useProvider } from "./useProviderServices";
import { Descriptions } from 'antd';


function ProfileInfoEditable(){
    
 
    return (<div> </div>)
}

function ProfileInfoView({personalInfo}){
    const layout = {labelCol: { span: 8 }, wrapperCol: { span: 8 },};
    return(<div >
        <Descriptions {...layout} title="User Info">
            <Descriptions.Item label="Nombre"> {personalInfo.providerName} </Descriptions.Item>
            <Descriptions.Item label="Número de celular"> {personalInfo.cellNumber ? personalInfo.cellNumber: "Este usuario no cuenta con número de celular"} </Descriptions.Item>
            <Descriptions.Item label="Número de telefono"> {personalInfo.phoneNumber ? personalInfo.phoneNumber: "Este usuario no cuenta con número de teléfono"}</Descriptions.Item>
             <Descriptions.Item label="Sitio Web"> {personalInfo.webPage ? personalInfo.webPage: "Este usuario no cuenta con sitio web"}</Descriptions.Item>
             <Descriptions.Item label="Residencia"> {personalInfo.residence ? personalInfo.residence: "Este usuario no cuenta con una localidad"}</Descriptions.Item>
        </Descriptions>
    </div>)
    
}

export function ProfileEditable(){
    return <Profile ComponentViewService={ViewEditableService} ComponentViewProfileInfo={ProfileInfoEditable}/>
}
export function ConsumerView(){
    return <Profile ComponentViewService={ViewService} ComponentViewProfileInfo={ProfileInfoView} />
}

const Profile = ({ComponentViewService, ComponentViewProfileInfo}) => {
    let data = useProvider();
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <ComponentViewProfileInfo {...data} />
                <ComponentViewService {...data} />
        </div>
    );
}
