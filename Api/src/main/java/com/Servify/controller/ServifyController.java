package com.Servify.controller;

import com.Servify.model.*;
import com.Servify.repository.services.ServiceProviderService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/api")
public class ServifyController {
    @Autowired
    private ServiceProviderService dbServiceProvider;

    @CrossOrigin
    @GetMapping("/categories")
    public ResponseEntity<List<CategoryService>> getAllCategories() {
        return ResponseEntity.ok().body(CategoryManager.categories());
    }

    @GetMapping("/services/{category}")
    public ResponseEntity<List<ServiceProviderServify>> category(@PathVariable String category) {
        return ResponseEntity.ok().body(dbServiceProvider.findByCategory(category));
    }
    @GetMapping("/provider/{name}")
    public ResponseEntity getUser(@PathVariable String name){
        ServiceProviderServify user = dbServiceProvider.findOne(name);
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/provider")
    public ResponseEntity addProvider(@RequestBody String provider){
        try {
            HashMap<String,Object> result = new ObjectMapper().readValue(provider, HashMap.class);
            String username = (String) ((HashMap<String,Object>) ( (HashMap<String,Object>) result.get("data")).get("values")).get("username");
            ServiceProviderServify user = new ServiceProviderServify(username);
            return ResponseEntity.status(201).body( dbServiceProvider.save(user));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
    @PostMapping("/provider/service")
    public ResponseEntity addService(@RequestBody String provider){
        try {
            System.out.print(provider);
            HashMap<String,Object> result = new ObjectMapper().readValue(provider, HashMap.class);
            String username = (String) ((HashMap<String,Object>) ( (HashMap<String,Object>) result.get("data")).get("values")).get("username");
            String category = (String) ((HashMap<String,Object>) ( (HashMap<String,Object>) result.get("data")).get("values")).get("category");
            System.out.print(username + " totatada "+category);
            ServiceProviderServify user = dbServiceProvider.findOne(username);
            user.addService(CategoryManager.createService(category));
            return ResponseEntity.status(201).body( dbServiceProvider.save(user));
        } catch (JsonProcessingException | ServiceProvideError | NoExistentCategorieError e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
    @DeleteMapping("/provider/serviced")
    public ResponseEntity deleteService(@RequestBody String provider){
        System.out.print(provider);
        try {
            HashMap<String,Object> result = new ObjectMapper().readValue(provider, HashMap.class);
            String username = (String) ( (HashMap<String,Object>) result.get("values")).get("username");
            String category = (String)  ( (HashMap<String,Object>) result.get("values")).get("category");
            System.out.print(username + " totatada "+category);
            ServiceProviderServify user = dbServiceProvider.findOne(username);
            user.remove(CategoryManager.getCategory(category));
            return ResponseEntity.status(201).body( dbServiceProvider.save(user));
        }  catch (JsonProcessingException e) {
            return ResponseEntity.status(400).body( e.getMessage());
        }
    }

}
