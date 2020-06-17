package com.Servify.controller;

import com.Servify.model.*;
import com.Servify.repository.services.ServiceProviderService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.aspectj.apache.bcel.classfile.Module;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.cbor.Jackson2CborDecoder;
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
    public ResponseEntity category(@PathVariable String category) {
        try{
            CategoryService categoryObj = CategoryManager.getCategory(category);
            List<ServiceDescriptionDTO> byCategory = dbServiceProvider.findByCategory(category)
                    .stream().map(sp ->
                            new ServiceDescriptionDTO(sp.getName(), sp.getServiceDescription(categoryObj), category)
                    ).collect(Collectors.toList());
            return ResponseEntity.ok().body(byCategory);}
        catch (InvalidCategoryError e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @CrossOrigin
    @GetMapping("/provider/{name}")
    public ResponseEntity getUser(@PathVariable String name) {
        ServiceProviderServify user = dbServiceProvider.findOne(name);
        if(user == null) return ResponseEntity.status(400).body("No existe ese proveedor");
        return ResponseEntity.ok().body(user);

    }

    @CrossOrigin
    @PostMapping("/provider")
        public ResponseEntity addProvider(@RequestBody ProviderLogUpDTO providerLogUpDTO) {
            try {
                providerLogUpDTO.assertEmpty();
                ServiceProviderServify user = new ServiceProviderServify(providerLogUpDTO.getName(), providerLogUpDTO.getPhoneNmbr(),
                        providerLogUpDTO.getCelNmbr(), providerLogUpDTO.getWebPage(), providerLogUpDTO.getResidence());
                return ResponseEntity.status(201).body(dbServiceProvider.save(user));
            } catch (EmptyDTOError emptyDTOError) {
                return ResponseEntity.status(400).body("Bad_Request");
            }
    }

    @CrossOrigin
    @PutMapping("/provider")
    public ResponseEntity editPersonalInfo(@RequestBody ProviderPersonalInfoDTO providerPersonalInfo) {
        try {
            providerPersonalInfo.assertEmpty();
            ServiceProviderServify provider = dbServiceProvider.findOne(providerPersonalInfo.getProviderOriginalName());
            provider.setPersonalInformation(providerPersonalInfo.getNewProviderName(), providerPersonalInfo.getNewPhoneNmbr(),
                    providerPersonalInfo.getNewCellPhoneNmbr(), providerPersonalInfo.getNewWebPage(),
                    providerPersonalInfo.getNewResidence());
            ServiceProviderServify save = dbServiceProvider.save(provider);
            System.out.println(save);
            return ResponseEntity.status(201).body(save);

        } catch (Exception | EmptyFieldReceivedError | EmptyDTOError e) {
            return ResponseEntity.status(400).body("BAD REQUEST");
        }
    }

    @CrossOrigin
    @PostMapping("/provider/service")
    public ResponseEntity addService(@RequestBody ProviderDTO provider) {
        try {
            System.out.print(provider);
            provider.assertEmpty();
            ServiceProviderServify user = dbServiceProvider.findOne(provider.getName());
            user.addService(CategoryManager.createService(provider.getCategory()));
            return ResponseEntity.status(201).body(dbServiceProvider.save(user));
        } catch (ServiceProvideError | NoExistentCategoryError | EmptyDTOError e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @CrossOrigin
    @PostMapping("/provider/service/description")
    public ResponseEntity addDescription(@RequestBody ServiceDescriptionDTO serviceDescription) {
        try {
            serviceDescription.assertEmpty();

            ServiceProviderServify provider = dbServiceProvider.findOne(serviceDescription.getUsername());
            CategoryService category = CategoryManager.getCategory(serviceDescription.getCategory());
            provider.setServiceWithDescription(category, serviceDescription.getDescription());
            ServiceProviderServify save = dbServiceProvider.save(provider);

            return ResponseEntity.status(201).body(save);
        } catch (Exception | EmptyDTOError e) {
            System.out.print(e.getClass());
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @CrossOrigin
    @DeleteMapping("/provider/service")
    public ResponseEntity deleteService(@RequestBody ProviderDTO provider) {
        try {
            provider.assertEmpty();
            ServiceProviderServify user = dbServiceProvider.findOne(provider.getName());
            user.remove(CategoryManager.getCategory(provider.getCategory()));
            return ResponseEntity.status(201).body(dbServiceProvider.save(user));
        } catch (EmptyDTOError e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @CrossOrigin
    @PostMapping("/provider/service/calification")
    public ResponseEntity addCalification(@RequestBody ServiceNewCalificationDTO newCalificationDTO) {
        try {
            newCalificationDTO.assertEmpty();
            ServiceProviderServify user = dbServiceProvider.findOne(newCalificationDTO.getProviderName());
            CategoryService category = CategoryManager.getCategory(newCalificationDTO.getServiceCategory());
            user.addNewCalificationToService(category, newCalificationDTO.getCalificationValue());
            return ResponseEntity.status(201).body(dbServiceProvider.save(user));

        } catch (EmptyDTOError | WrongValueError e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}
