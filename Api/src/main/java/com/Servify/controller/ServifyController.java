package com.Servify.controller;

import com.Servify.model.CategoryManager;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin
@RestController
@RequestMapping("/api")
public class ServifyController {
    @CrossOrigin
    @GetMapping("/categories")
    public ResponseEntity getAllCategories(){
        return ResponseEntity.ok().body(CategoryManager.categories());
    }


}
