package com.Servify.controller;

import com.Servify.model.ServiceServify;
import lombok.Data;

import java.util.List;

@Data
public class ProviderRatingDTO implements DTOServify {

    private List<ServiceServify> services;
    private Double averageRating;
    private String username;

    ProviderRatingDTO() {
    }

    ProviderRatingDTO(String username, Double averageRating, List<ServiceServify> services) {
        this.username = username;
        this.averageRating = averageRating;
        this.services = services;
    }

    @Override
    public void assertEmpty() throws EmptyDTOError {
        if (username.equals("") || averageRating.isNaN()) throw new EmptyDTOError();
    }

    public String getName() {
        return username;
    }

    public Double getAverageRating() {
        return averageRating;
    }
}
