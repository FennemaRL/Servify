package com.Cervify.Apicervify.controller;

import com.Cervify.Apicervify.model.MetalslugCharacter;
import com.Cervify.Apicervify.repository.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CharacterController {
    @Autowired
    private CharacterRepository repository;
    @CrossOrigin
    @GetMapping("/characters")
    public List<MetalslugCharacter> getAllCharacters(){
        return (List<MetalslugCharacter>) repository.findAll();
    }
}
