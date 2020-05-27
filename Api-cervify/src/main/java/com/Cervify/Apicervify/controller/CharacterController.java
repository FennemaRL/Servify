package com.Cervify.Apicervify.controller;

import com.Cervify.Apicervify.model.MetalslugCharacter;
import com.Cervify.Apicervify.repository.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CharacterController {
    @Autowired
    private CharacterRepository repository;

    @GetMapping("/characters")
    public ResponseEntity<MetalslugCharacter> getAllCharacters(){
        List<MetalslugCharacter> characters = (List<MetalslugCharacter>) repository.findAll();
        characters.forEach(System.out::println);
        ArrayList<MetalslugCharacter> c =new ArrayList<MetalslugCharacter>();
        c.add(new MetalslugCharacter("Termo","blanco"));
        return new ResponseEntity<>(c.get(0), HttpStatus.OK) ;
    }
}
