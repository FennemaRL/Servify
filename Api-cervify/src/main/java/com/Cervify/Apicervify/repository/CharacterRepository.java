package com.Cervify.Apicervify.repository;

import com.Cervify.Apicervify.model.MetalslugCharacter;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacterRepository extends CrudRepository<MetalslugCharacter,String> {
}
