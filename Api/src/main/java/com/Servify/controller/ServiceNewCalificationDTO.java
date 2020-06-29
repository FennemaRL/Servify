package com.Servify.controller;

import lombok.Data;

@Data
public class ServiceNewCalificationDTO implements DTOServify{

    private String providerName;
    private String serviceCategory;
    private Integer calificationValue;
    private String message;
    private String consumerName;
    private String consumerEmail;

    @Override
    public void assertEmpty() throws EmptyDTOError {
        if(providerName.isEmpty() || serviceCategory.isEmpty() || calificationValue == null){
            throw new EmptyDTOError();
        }
    }

    public String getProviderName(){
        return this.providerName;
    }

    public String getServiceCategory() {
        return this.serviceCategory;
    }

    public Integer getCalificationValue() {
        return this.calificationValue;
    }

    public String getMessage() {
        return message;
    }

    public String getConsumerName() {
        return consumerName;
    }

    public String getConsumerEmail() {
        return consumerEmail;
    }
}
