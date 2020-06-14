import React from 'react';
import { ViewEditableService, ViewService, } from "./servicesProfile";
import { useProviderServices } from "./useProviderServices";

export function ProfileEditable(){
    return <Profile ComponentViewService={ViewEditableService}/>
}
export function ConsumerView(){
    return <Profile ComponentViewService={ViewService}/>
}

const Profile = ({ComponentViewService}) => {
    let data = useProviderServices();
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
            <div>
                <h1>{data.username}</h1>
                <ComponentViewService {...data} />
            </div>
        </div>
    );
}
