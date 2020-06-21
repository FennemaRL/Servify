package com.Servify.controller;

import com.Servify.model.ServiceServify;
import lombok.Data;
import java.util.List;
@Data
public class providerEditDTO {

    private String name;
    private String phoneNmbr;
    private String celNmbr;
    private String webPage;
    private String residence;
    private List<ServiceServify> offerServices;
    public providerEditDTO(String name, String celNmbr, String phoneNmbr, String residence, String webPage, List<ServiceServify> services) {
        this.name=name;
        this.celNmbr=celNmbr;
        this.phoneNmbr=phoneNmbr;
        this.residence=residence;
        this.webPage=webPage;
        this.offerServices=services;

    }
}
