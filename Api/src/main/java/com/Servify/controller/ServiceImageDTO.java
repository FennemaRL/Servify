package com.Servify.controller;

import lombok.Data;

import java.io.Serializable;

@Data
public class ServiceImageDTO  implements Serializable {

    private String providerName;
    private String serviceName;
    private String nameImg;
    private String type;




    public void assertEmpty() throws EmptyDTOError {
        if( providerName == null || providerName.isEmpty() || serviceName == null || serviceName.isEmpty()
        ){
            throw new EmptyDTOError();
        }

    }

    public String getProviderName() {
        return providerName;
    }

    public String getServiceCategory() {
        return serviceName;
    }

    public String getImageName() {
    return nameImg;
    }
    public String getType(){
        return type;
    }
}
