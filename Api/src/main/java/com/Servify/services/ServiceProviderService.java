package com.Servify.services;

import com.Servify.model.ServiceProviderServify;
import com.Servify.repository.ServiceProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class ServiceProviderService {

    @Autowired
    private ServiceProviderRepository serviceProviderRepository;

    public List<ServiceProviderServify> findByCategory(String category) {
        List<ServiceProviderServify> all = (List<ServiceProviderServify>) serviceProviderRepository.findAll();
        return all.stream()
                .filter(p -> p.hasServicesWithCategory(category))
                .collect(Collectors.toList());
    }

}
