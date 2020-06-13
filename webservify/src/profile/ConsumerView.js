import React from "react";

import {useProviderServices} from "./profileEditable";
import {ViewService} from "./servicesProfile";

function ConsumerView() {
    let {username, providerSevices, setproviderSevices} = useProviderServices();
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
            <div>
                <h1>{username}</h1>
                <ViewService username={username} services={providerSevices} setServices={setproviderSevices}/>
            </div>
        </div>
    );
}


export default ConsumerView;