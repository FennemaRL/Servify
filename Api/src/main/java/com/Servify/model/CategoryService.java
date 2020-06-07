package com.Servify.model;

import lombok.Data;

@Data
public class CategoryService {


    private String category;
    private String imageURL;
    public CategoryService(String type) {
        category = type;
    }
    public CategoryService() {
    }
    public CategoryService(String category, String imageURL) {
        this.category = category;
        this.imageURL = imageURL;
    }
    public String getCategoryName() {
        return category;
    }
}
