package com.Servify.model;

import lombok.Data;

@Data
public class CategoryService {
    private final String category;
    private final String imageURL;

    public CategoryService(String category, String imageURL) {
        this.category = category;
        this.imageURL = imageURL;
    }
}
