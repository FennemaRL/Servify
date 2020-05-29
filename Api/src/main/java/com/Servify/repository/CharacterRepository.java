package com.Servify.repository;

import com.Servify.model.MetalslugCharacter;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacterRepository extends CrudRepository<MetalslugCharacter,String> {
}
