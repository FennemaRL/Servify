package com.Servify.controller;

import com.Servify.model.*;
import com.Servify.repository.services.ServiceProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return ResponseEntity.ok().body(new providerEditDTO(user.getName(), user.getCelNmbr(), user.getPhoneNmbr(),user.getResidence(),user.getWebPage(),user.getServices()));

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
    public ResponseEntity editPersonalInfo(@RequestBody ProviderPersonalInfoDTO providerPersonalInfo,@RequestHeader TokenResponse token) {
        try {
            this.checkToken(token, providerPersonalInfo.getProviderOriginalName());
            providerPersonalInfo.assertEmpty();
            ServiceProviderServify provider = dbServiceProvider.findOne(providerPersonalInfo.getProviderOriginalName());
            provider.setPersonalInformation(providerPersonalInfo.getNewProviderName(), providerPersonalInfo.getNewPhoneNmbr(),
                    providerPersonalInfo.getNewCellPhoneNmbr(), providerPersonalInfo.getNewWebPage(),
                    providerPersonalInfo.getNewResidence());
            ServiceProviderServify save = dbServiceProvider.save(provider);
            return ResponseEntity.status(200).body(save);

        } catch (ServiceProvideError | EmptyFieldReceivedError | EmptyDTOError e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @CrossOrigin
    @PostMapping("/provider/service")
    public ResponseEntity addService(@RequestBody ProviderDTO provider, @RequestHeader TokenResponse token) {
        try {
            this.checkToken(token, provider.getName());
            provider.assertEmpty();
            ServiceProviderServify user = dbServiceProvider.findOne(provider.getName());
            user.addService(CategoryManager.createService(provider.getCategory()));
            return ResponseEntity.status(201).body(dbServiceProvider.save(user));
        } catch (ServiceProvideError | NoExistentCategoryError | EmptyDTOError  e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @CrossOrigin
    @PostMapping("/provider/service/description")
    public ResponseEntity addDescription(@RequestBody ServiceDescriptionDTO serviceDescription,@RequestHeader  TokenResponse token) {
        try {

            this.checkToken(token, serviceDescription.getUsername());
            serviceDescription.assertEmpty();
            ServiceProviderServify provider = dbServiceProvider.findOne(serviceDescription.getUsername());
            CategoryService category = CategoryManager.getCategory(serviceDescription.getCategory());
            provider.setServiceWithDescription(category, serviceDescription.getDescription());
            ServiceProviderServify save = dbServiceProvider.save(provider);

            return ResponseEntity.status(201).body(save);
        } catch (  EmptyDTOError | ServiceProvideError e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @CrossOrigin
    @DeleteMapping("/provider/service")
    public ResponseEntity deleteService(@RequestBody ProviderDTO provider,@RequestHeader TokenResponse token) {
        try {
            this.checkToken(token, provider.getName());
            provider.assertEmpty();
            ServiceProviderServify user = dbServiceProvider.findOne(provider.getName());
            user.remove(CategoryManager.getCategory(provider.getCategory()));

            return ResponseEntity.status(200).body(dbServiceProvider.save(user));
        } catch (EmptyDTOError | ServiceProvideError e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @CrossOrigin
    @PostMapping("/provider/login")
    public ResponseEntity loginWith(@RequestBody LoginDTO loginDTO) {

        try {
            ServiceProviderServify sp = dbServiceProvider.findOne(loginDTO.getUsername());
            if(sp != null){
                sp.changePassword(sp.getName());
                dbServiceProvider.save(sp);
            }
            if (sp == null || ! sp.canLoginWith(loginDTO.getPassword())) {
                throw new ServiceProvideError("Usuario o contraseña incorrectos");
            }
            String token = Jtoken.getTokenFor(sp.getName());
            return ResponseEntity.status(200).body(new TokenResponse(token));
        } catch (ServiceProvideError  e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
    @CrossOrigin
    @PutMapping("/provider/password")
    public ResponseEntity changePassword(@RequestBody LoginDTO loginDTO){
        try {
            ServiceProviderServify sp = dbServiceProvider.findOne(loginDTO.getUsername());
            sp.changePassword(loginDTO.getPassword());
            return ResponseEntity.status(200).body("se cambio correctamente");
        } catch (ServiceProvideError e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
    @CrossOrigin
    @PostMapping("/tokenVerify")
    public ResponseEntity validateToken(@RequestBody LoginDTO user,@RequestHeader TokenResponse token){
        try{
            checkToken(token, user.getUsername());
            return  ResponseEntity.status(200).body("estas Logueado");
        }
        catch (ServiceProvideError e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    private void checkToken(TokenResponse token, String name){
        Jtoken.isValidToken(token.getToken().split(" ")[1],name);
<<<<<<< HEAD
    }
=======

>>>>>>> e3386f8f84f7fca9b5d90acf6c9a1eff9dd780c5
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
