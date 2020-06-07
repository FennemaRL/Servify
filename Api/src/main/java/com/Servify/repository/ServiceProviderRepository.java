package com.Servify.repository;

import com.Servify.model.ServiceProviderServify;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceProviderRepository extends CrudRepository<ServiceProviderServify, Long> {

}
