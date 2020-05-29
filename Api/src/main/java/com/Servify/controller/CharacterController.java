package com.Servify.controller;

import com.Servify.model.MetalslugCharacter;
import com.Servify.repository.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class CharacterController {
    @Autowired
    private CharacterRepository repository;
    @CrossOrigin
    @GetMapping("/characters")
    public List<MetalslugCharacter> getAllCharacters(){
        System.out.println("get");
        return (List<MetalslugCharacter>) repository.findAll();
    }

    @PostMapping("/character")
    public ResponseEntity newCharacter(@RequestBody MetalslugCharacter newChar){
        System.out.println("post "+newChar);
        repository.save(newChar);
        return ResponseEntity.ok().body(newChar);
    }
}
