package com.Servify.controller;

import com.Servify.model.ServiceConsumer;
import lombok.Data;

@Data
public class ServiceNewCalificationDTO implements DTOServify{

    private String providerName;
    private String serviceCategory;
    private Integer calificationValue;
    private ServiceConsumer consumer;
    private String message;



    public ServiceNewCalificationDTO(String providerName, String serviceCategory,
                                     Integer calificationValue, ServiceConsumer consumer, String message){
        this.providerName = providerName;
        this.serviceCategory = serviceCategory;
        this.calificationValue = calificationValue;
        this.consumer = consumer;
        this.message = message;
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

    public ServiceConsumer getConsumer() { return consumer; }

    public String getMessage() { return message; }
}
