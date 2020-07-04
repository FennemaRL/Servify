package com.Servify.controller;

import com.Servify.model.*;
import com.Servify.repository.services.ServiceProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;


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
    public ResponseEntity category(@PathVariable String category, @RequestParam(defaultValue = "") String scope) {
        try{
            CategoryService categoryObj = CategoryManager.getCategory(category);
            List<ServiceDescriptionDTO> byCategory = dbServiceProvider.findByCategoryAndScope(category, scope)
                    .stream().map(sp ->
                            new ServiceDescriptionDTO(sp.getName(), sp.getServiceDescription(categoryObj),
                                    sp.getServiceAverage(categoryObj), category)
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
        if (user == null) return ResponseEntity.status(400).body("No existe ese proveedor");
        return ResponseEntity.ok().body(new ProviderEditDTO(user.getName(), user.getCelNmbr(),
                user.getPhoneNmbr(), user.getResidence(), user.getWebPage(), user.getServices()));
    }

    @CrossOrigin
    @GetMapping("/providers/bestRated")
    public ResponseEntity getHighestRatedProviders() {
        try {
            List<ProviderRatingDTO> recommended = dbServiceProvider.bestRated()
                    .stream().map(p -> new ProviderRatingDTO(p.getName(), p.getAverageRating(), p.getServices()))
                    .collect(Collectors.toList());
            return ResponseEntity.ok().body(recommended);
        } catch (RuntimeException e ) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
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

        } catch (ServiceProviderError | EmptyFieldReceivedError | EmptyDTOError e) {
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
        } catch (ServiceProviderError | NoExistentCategoryError | EmptyDTOError e) {
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
        } catch (  EmptyDTOError | ServiceProviderError e) {
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
        } catch (EmptyDTOError | ServiceProviderError e) {
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
                throw new ServiceProviderError("Usuario o contraseña incorrectos");
            }
            String token = Jtoken.getTokenFor(sp.getName());
            return ResponseEntity.status(200).body(new TokenResponse(token));
        } catch (ServiceProviderError  e) {
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
        } catch (ServiceProviderError e) {
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
        catch (ServiceProviderError e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    private void checkToken(TokenResponse token, String name){
        Jtoken.isValidToken(token.getToken().split(" ")[1],name);
    }

    @CrossOrigin
    @PostMapping("/provider/service/calification")
    public ResponseEntity addCalification(@RequestBody ServiceNewCalificationDTO newCalificationDTO) {
        try {
            newCalificationDTO.assertEmpty();
            ServiceProviderServify user = dbServiceProvider.findOne(newCalificationDTO.getProviderName());
            CategoryService category = CategoryManager.getCategory(newCalificationDTO.getServiceCategory());
            ServiceConsumer consumer = new ServiceConsumer(newCalificationDTO.getConsumerName(), newCalificationDTO.getConsumerEmail());
            user.addNewCalificationToService(category, newCalificationDTO.getCalificationValue(), consumer, newCalificationDTO.getMessage());
            dbServiceProvider.save(user);
            return ResponseEntity.status(201).body("Calificacion agregada con exito");
        } catch (EmptyDTOError | WrongValueError e ) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @CrossOrigin
    @PostMapping("/provider/service/question")
    public ResponseEntity addQuestion(@RequestBody ServiceNewQuestionDTO questionDTO) {
        try {
            questionDTO.assertEmpty();
            ServiceProviderServify user = dbServiceProvider.findOne(questionDTO.getProviderName());
            CategoryService category = CategoryManager.getCategory(questionDTO.getServiceCategory());
            ServiceQuestion serviceQuestion = new ServiceQuestion(questionDTO.getQuestion(),questionDTO.getConsumerName(),questionDTO.getConsumerEmail());
            user.addQuestionToService(category,serviceQuestion);
            dbServiceProvider.save(user);
            return ResponseEntity.status(201).body("Pregunta agregada con exito");
        } catch (EmptyDTOError  | InvalidQuestion | ServiceProviderError e ) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
    @CrossOrigin
    @PostMapping("/provider/service/questionAnswer")
    public ResponseEntity addResponse(@RequestBody ServiceQuestionAnswerDTO answerDTO, @RequestHeader TokenResponse token) {
        try {
            this.checkToken(token, answerDTO.getProviderName());
            answerDTO.assertEmpty();
            ServiceProviderServify user = dbServiceProvider.findOne(answerDTO.getProviderName());
            CategoryService category = CategoryManager.getCategory(answerDTO.getServiceCategory());
            user.addAnswerToServiceInQuestion(answerDTO.getResponse(), category, answerDTO.getQuestion());
            dbServiceProvider.save(user);
            return ResponseEntity.status(201).body("Pregunta agregada con exito");
        } catch (EmptyDTOError  | InvalidQuestion | ServiceProviderError e ) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @CrossOrigin
    @PostMapping(value="/provider/service/img" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity addImage(@ModelAttribute ServiceImageDTO imgDTO,@RequestParam("imageFile") MultipartFile file){
        try {
            ServiceProviderServify user = dbServiceProvider.findOne(imgDTO.getProviderName());
            CategoryService category = CategoryManager.getCategory(imgDTO.getServiceCategory());
            ServifyImage img = new ServifyImage(file.getOriginalFilename(), file.getContentType(), compressBytes(file.getBytes()));
            user.addImageToService(img,category);
            dbServiceProvider.save(user);
            return ResponseEntity.status(201).body("se agrego con exito");
        } catch (IOException | ServiceProviderError e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }

    }


    @CrossOrigin
    @PutMapping("/provider/service/scope")
    public ResponseEntity modifyScope(@RequestBody ServiceScopeDTO scopeDTO){
        try {
            scopeDTO.assertEmpty();
            ServiceProviderServify user = dbServiceProvider.findOne(scopeDTO.getProviderName());
            CategoryService category = CategoryManager.getCategory(scopeDTO.getServiceCategory());
            List<ScopeService> sc = scopeDTO.getScope().stream().map(scopeName -> ScopeManager.getScope(scopeName)).collect(Collectors.toList());
            user.modifyServiceWithScope(category, sc);
            return ResponseEntity.status(201).body(dbServiceProvider.save(user));
        } catch (EmptyDTOError e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);		return outputStream.toByteArray();
    }

    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }
}
