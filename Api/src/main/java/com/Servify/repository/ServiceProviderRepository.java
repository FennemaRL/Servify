package com.Servify.repository;

import com.Servify.model.ServiceProviderServify;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceProviderRepository extends JpaRepository<ServiceProviderServify, Long> {

    ServiceProviderServify findByName(String name);
}
