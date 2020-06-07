package com.Servify.model;

import lombok.Data;
import lombok.Getter;

@Data
public class CategoryService {


    private String name ;
    private String url ;
    public CategoryService(String type) {
        name = type;
    }
    public CategoryService() {
    }
    public CategoryService(String type, String url) {
        this.url= url;
        name = type;
    }
    public String getName() {
        return name;
    }
}
