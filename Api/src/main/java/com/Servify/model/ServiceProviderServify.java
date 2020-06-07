package com.Servify.model;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ServiceProviderServify {
    private String name;
    private ArrayList<ServiceL> offerServices;
    public ServiceProviderServify(String name) {
        this.name = name;
        offerServices= new ArrayList<>();
    }

    public void addService(ServiceL ser) throws ServiceProvide {
      List<ServiceL> sameServices = offerServices.stream().filter(serv -> serv.sameCategory(ser)).collect(Collectors.toList());
      if (0 <sameServices.size() ) {
        throw new ServiceProvide();
      }
      offerServices.add(ser);
    }


    public boolean providesService(ServiceL ser) {
        return offerServices.stream().filter(serv -> serv.sameCategory(ser)).collect(Collectors.toList()).size() == 1 ;
    }
}
