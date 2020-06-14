import React from 'react';
import ViewEditableService,{ViewService} from "./servicesProfile";
import { useProviderServices } from "./profileEditable";


export function ProfileEditable2(){
    return <Profile ComponentViewService={ViewEditableService}/>
}
export function ConsumerView2(){
    return <Profile ComponentViewService={ViewService}/>
}

const Profile = ({ComponentViewService}) => {
    let {username, providerSevices, setproviderSevices, category} = useProviderServices();
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
            <div>
                <h1>{username}</h1>
                <ComponentViewService username={username} services={providerSevices} setServices={setproviderSevices} category={category}/>
            </div>
        </div>
    );
}
