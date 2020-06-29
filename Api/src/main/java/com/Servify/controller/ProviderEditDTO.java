package com.Servify.controller;

import com.Servify.model.ServiceServify;
import lombok.Data;

import java.util.List;

@Data
public class ProviderEditDTO {

    private final String name;
    private final String phoneNmbr;
    private final String celNmbr;
    private final String webPage;
    private final String residence;
    private final List<ServiceServify> offerServices;

    public ProviderEditDTO(String name, String celNmbr, String phoneNmbr, String residence, String webPage, List<ServiceServify> services) {
        this.name = name;
        this.celNmbr = celNmbr;
        this.phoneNmbr = phoneNmbr;
        this.residence = residence;
        this.webPage = webPage;
        this.offerServices = services;

    }
}
