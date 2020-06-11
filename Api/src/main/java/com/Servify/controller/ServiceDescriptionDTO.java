package com.Servify.controller;

import lombok.Data;

@Data
public class ServiceDescriptionDTO {

    private String username;
    private String category;
    private String description;

    ServiceDescriptionDTO() {
    }

    public ServiceDescriptionDTO(String name, String description, String category) {
        this.username = name;
        this.description = description;
        this.category = category;
    }

    public String getUsername() {
        return username;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }
}
