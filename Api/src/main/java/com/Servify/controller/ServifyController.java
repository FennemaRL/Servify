package com.Servify.controller;

import com.Servify.model.*;
import com.Servify.repository.services.ServiceProviderService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;


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

    @CrossOrigin
    @GetMapping("/services/{category}")
    public ResponseEntity<List<ServiceDescriptionDTO>> category(@PathVariable String category) {
        List<ServiceDescriptionDTO> byCategory = dbServiceProvider.findByCategory(category)
                .stream().map(sp -> new ServiceDescriptionDTO(sp.getName(),
                        sp.getServiceDescription(CategoryManager.getCategory(category)), category))
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(byCategory);
    }

    @CrossOrigin
    @GetMapping("/provider/{name}")
    public ResponseEntity getUser(@PathVariable String name) {
        ServiceProviderServify user = dbServiceProvider.findOne(name);
        return ResponseEntity.ok().body(user);
    }

    @CrossOrigin
    @PostMapping("/provider")
    public ResponseEntity addProvider(@RequestBody String provider) {
        try {
            HashMap<String, Object> result = new ObjectMapper().readValue(provider, HashMap.class);
            String username = (String) ((HashMap<String, Object>) ((HashMap<String, Object>) result.get("data")).get("values")).get("username");
            ServiceProviderServify user = new ServiceProviderServify(username);
            return ResponseEntity.status(201).body(dbServiceProvider.save(user));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @CrossOrigin
    @PostMapping("/provider/service")
    public ResponseEntity addService(@RequestBody String provider) {
        try {
            HashMap<String, Object> result = new ObjectMapper().readValue(provider, HashMap.class);
            String username = (String) ((HashMap<String, Object>) ((HashMap<String, Object>) result.get("data")).get("values")).get("username");
            String category = (String) ((HashMap<String, Object>) ((HashMap<String, Object>) result.get("data")).get("values")).get("category");
            ServiceProviderServify user = dbServiceProvider.findOne(username);
            user.addService(CategoryManager.createService(category));
            return ResponseEntity.status(201).body(dbServiceProvider.save(user));
        } catch (JsonProcessingException | ServiceProvideError | NoExistentCategoryError e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @CrossOrigin
    @PostMapping("/provider/service/description")
    public ResponseEntity addDescription(@RequestBody ServiceDescriptionDTO serviceDescription) {
        System.out.println(serviceDescription.toString());
        try {
            ServiceProviderServify provider = dbServiceProvider.findOne(serviceDescription.getUsername());
            CategoryService category = CategoryManager.getCategory(serviceDescription.getCategory());
            provider.setServiceWithDescription(category, serviceDescription.getDescription());
            ServiceProviderServify save = dbServiceProvider.save(provider);
            return ResponseEntity.status(201).body(save);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @CrossOrigin
    @DeleteMapping("/provider/serviced")
    public ResponseEntity deleteService(@RequestBody String provider) {
        System.out.print(provider);
        try {
            HashMap<String, Object> result = new ObjectMapper().readValue(provider, HashMap.class);
            String username = (String) ((HashMap<String, Object>) result.get("values")).get("username");
            String category = (String) ((HashMap<String, Object>) result.get("values")).get("category");
            ServiceProviderServify user = dbServiceProvider.findOne(username);
            user.remove(CategoryManager.getCategory(category));
            return ResponseEntity.status(201).body(dbServiceProvider.save(user));
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

}
