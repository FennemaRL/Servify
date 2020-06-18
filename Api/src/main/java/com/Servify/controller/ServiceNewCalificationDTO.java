package com.Servify.controller;

import lombok.Data;

@Data
public class ServiceNewCalificationDTO implements DTOServify{

    private String providerName;
    private String serviceCategory;
    private Integer calificationValue;

    public ServiceNewCalificationDTO(String providerName, String serviceCategory,
                                     Integer calificationValue){

        this.providerName = providerName;
        this.serviceCategory = serviceCategory;
        this.calificationValue = calificationValue;
    }

    @Override
    public void assertEmpty() throws EmptyDTOError {

        if(providerName.isEmpty() || serviceCategory.isEmpty() || calificationValue == null){
            throw new EmptyDTOError();
        }
    }

    public String getProviderName(){
        return this.providerName;
    }

    public String getServiceCategory(){
        return this.serviceCategory;
    }

    public Integer getCalificationValue(){
        return this.calificationValue;
    }
}
