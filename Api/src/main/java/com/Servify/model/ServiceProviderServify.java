package com.Servify.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class ServiceProviderServify {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;
    @OneToMany
    private List<ServiceServify> services;

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

    public Boolean hasServicesWithCategory(String category) {
        return this.services.stream().anyMatch(s -> s.hasCategory(category));
    }
}
