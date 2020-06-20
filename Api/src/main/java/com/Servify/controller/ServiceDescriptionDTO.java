package com.Servify.controller;

import lombok.Data;

@Data
public class ServiceDescriptionDTO implements DTOServify{

    private String username;
    private String category;
    private String description;
    private Double average;

    ServiceDescriptionDTO() {
    }

    public ServiceDescriptionDTO(String name, String description, Double average, String category) {
        this.username = name;
        this.description = description;
        this.category = category;
        this.average = average;
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

    public void assertEmpty() throws EmptyDTOError {
        if (description.equals("") || username.equals("") || category.equals("")) {
            throw new EmptyDTOError();
        }
    }
}
