package com.Servify.controller;

import com.Servify.model.ScopeService;
import lombok.Data;

import java.util.List;

@Data
public class ServiceScopeDTO implements DTOServify{

    private String providerName;
    private String serviceCategory;
    private List<String> scopes;

    public ServiceScopeDTO(String providerName, String serviceCategory, List scopes){
        this.providerName = providerName;
        this.serviceCategory = serviceCategory;
        this.scopes = scopes;
    }

    @Override
    public void assertEmpty() throws EmptyDTOError {
        if(providerName.isEmpty() || serviceCategory.isEmpty() || scopes == null){
            throw new EmptyDTOError();
        }
    }

    public String getProviderName(){
        return this.providerName;
    }

    public String getServiceCategory(){
        return this.serviceCategory;
    }

    public List<String> getScope() { return this.scopes;}
}