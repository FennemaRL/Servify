package com.Servify.model;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Entity
@Data
public class ServiceProviderServify {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;

    private String name;
    @OneToMany(cascade=CascadeType.ALL)
    private List<ServiceServify> offerServices;

    protected ServiceProviderServify() {
    }


    public ServiceProviderServify(String name) {
        this.name = name;
        offerServices = new ArrayList<>();
    }

    public Boolean hasServicesWithCategory(String category) {
        return this.offerServices.stream().anyMatch(s -> s.hasCategory(category));
    }

    public void addService(ServiceServify ser) throws ServiceProvideError {
        List<ServiceServify> sameServices = offerServices.stream().filter(serv -> serv.sameCategory(ser)).collect(Collectors.toList());
        if (0 < sameServices.size()) {
            throw new ServiceProvideError("ya provees ese servicio");
        }
        offerServices.add(ser);
    }


    public boolean providesService(ServiceServify ser) {
        return offerServices.stream().filter(serv -> serv.sameCategory(ser)).collect(Collectors.toList()).size() == 1;
    }

    public void remove(CategoryService sc) {

        offerServices = offerServices.stream().filter(serv -> !serv.sameCategory(sc)).collect(Collectors.toList());

    }

    public boolean providesService(CategoryService cs) {
        return offerServices.stream().filter(serv -> serv.sameCategory(cs)).collect(Collectors.toList()).size() == 1;
    }
}
