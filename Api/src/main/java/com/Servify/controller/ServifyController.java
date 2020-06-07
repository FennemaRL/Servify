package com.Servify.controller;

import com.Servify.model.CategoryManager;
import com.Servify.model.CategoryService;
import com.Servify.model.ServiceProviderServify;
import com.Servify.services.ServiceProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/api")
public class ServifyController {
    @Autowired
    private ServiceProviderService serviceProviderService;

    @CrossOrigin
    @GetMapping("/categories")
    public ResponseEntity<List<CategoryService>> getAllCategories() {
        return ResponseEntity.ok().body(CategoryManager.categories());
    }

    @GetMapping("/services/{category}")
    public List<ServiceProviderServify> category(@PathVariable String category) {
        return serviceProviderService.findByCategory(category);
    }


}
