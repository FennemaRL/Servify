package com.Servify.model;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ServiceProviderServify {
    private String name;
    private ArrayList<ServiceL> offerServices;
    public ServiceProviderServify(String name) {
        this.name = name;
        offerServices = new ArrayList<>();
    }

    public void addService(ServiceL ser) throws ServiceProvideError {
      List<ServiceL> sameServices = offerServices.stream().filter(serv -> serv.sameCategory(ser)).collect(Collectors.toList());
      if (0 <sameServices.size() ) {
        throw new ServiceProvideError("ya provees ese servicio");
      }
      offerServices.add(ser);
    }


    public boolean providesService(ServiceL ser) {
        return offerServices.stream().filter(serv -> serv.sameCategory(ser)).collect(Collectors.toList()).size() == 1 ;
    }

    public void remove(CategoryService sc) {

        offerServices = (ArrayList<ServiceL>) offerServices.stream().filter(serv -> ! serv.sameCategory(sc)).collect(Collectors.toList());

    }

    public boolean providesService(CategoryService cs) {
        return offerServices.stream().filter(serv -> serv.sameCategory(cs)).collect(Collectors.toList()).size() == 1 ;
    }
}
