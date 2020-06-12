package com.Servify.controller;

import lombok.Data;

@Data
public class ProviderDTO implements DTOServify{


    private String username;
    private String category;

    ProviderDTO() {
    }
    ProviderDTO(String username, String category) {
        this.category = category;
        this.username = username;
    }

    @Override
    public void assertEmpty() throws EmptyDTOError {
        if (username.equals("") ||  category.equals("")) {
            throw new EmptyDTOError();
        }
    }

    public String getName() {
        return username;
    }

    public String getCategory() {
        return category;
    }
}
