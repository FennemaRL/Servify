package com.Servify.controller;

import com.Servify.model.CategoryManager;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("/api")
public class ServifyController {
    @CrossOrigin
    @GetMapping("/categories")
    public ResponseEntity getAllCategories(){
        return ResponseEntity.ok().body(CategoryManager.listOfCategories());
    }


}
