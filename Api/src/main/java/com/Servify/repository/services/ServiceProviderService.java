package com.Servify.repository.services;

import com.Servify.model.ServiceProviderServify;
import com.Servify.repository.ServiceProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class ServiceProviderService {

    @Autowired
    private ServiceProviderRepository serviceProviderRepository;

    public List<ServiceProviderServify> findByCategoryAndScope(String category, String scope) {
        List<ServiceProviderServify> all = serviceProviderRepository.findAll();
        if (scope.isEmpty()) {
            return findByCategory(category, all);
        } else {
            return all.stream()
                    .filter(p -> p.hasServicesWithCategoryAndZone(category, scope))
                    .collect(Collectors.toList());
        }
    }

    private List<ServiceProviderServify> findByCategory(String category, List<ServiceProviderServify> all) {
        return all.stream()
                .filter(p -> p.hasServicesWithCategory(category))
                .collect(Collectors.toList());
    }


    public ServiceProviderServify save(ServiceProviderServify user) {
        return serviceProviderRepository.save(user);
    }

    public ServiceProviderServify findOne(String name) {
        return serviceProviderRepository.findByName(name);
    }

    public List<ServiceProviderServify> bestRated() {
        Sort sorting = Sort.by("averageRating").descending();
        Integer limit = 5;
        Pageable sortedByRatingDesc = PageRequest.of(0, limit, sorting);
        return serviceProviderRepository.findAll(sortedByRatingDesc).getContent();
    }
}
