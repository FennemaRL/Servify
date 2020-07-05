package com.Servify.controller;

import lombok.Data;

@Data
public class ServiceReviewDTO implements DTOServify{
    private String providerName;
    private String serviceCategory;
    private Long id;

    @Override
    public void assertEmpty() throws EmptyDTOError {
        if (providerName.equals("") ||  serviceCategory.equals("") || id.toString().equals(null)){
            throw new EmptyDTOError();
        }
    }

    public String getProviderName() {
        return providerName;
    }

    public String getServiceCategory() {
        return serviceCategory;
    }

    public Long getId() { return id; }
}

