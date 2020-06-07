package com.Servify.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Entity
public class ServiceProviderServify {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;
    @OneToMany
    private List<ServiceServify> services;

    private String name;
    @OneToMany
    private List<ServiceServify> offerServices;

    protected ServiceProviderServify() {
    }

    public Long getId() {
        return id;
    }

    public Long setId() {
        return id;
    }

    public List<ServiceServify> getServices() {
        return services;
    }

    public void setServices(List<ServiceServify> services) {
        this.services = services;
    }

    public ServiceProviderServify(String name) {
        this.name = name;
        offerServices = new ArrayList<>();
    }

    public Boolean hasServicesWithCategory(String category) {
        return this.services.stream().anyMatch(s -> s.hasCategory(category));
    }

    public void addService(ServiceServify ser) throws ServiceProvideError {
        List<ServiceServify> sameServices = offerServices.stream().filter(serv -> serv.sameCategory(ser)).collect(Collectors.toList());
        if (!sameServices.isEmpty()) {
            throw new ServiceProvideError("Servicio con categoria" + ser.getCategory().getCategoryName() + "ya proveeido");
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
