package com.Servify.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class CategoryService {
    @Column
    private String imageURL;
    @Id
    @Column
    private String category;
    public CategoryService() {
    }

    public CategoryService(String category, String imageURL) {
        this.category = category;
        this.imageURL = imageURL;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public CategoryService(String type) {
        category = type;
    }

    public String getCategoryName() {
        return category;
    }
}
