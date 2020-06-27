package com.Servify.controller;

import lombok.Data;

@Data
public class ProviderRatingDTO implements DTOServify {

    private Double averageRating;
    private String username;

    ProviderRatingDTO() {
    }

    ProviderRatingDTO(String username, Double averageRating) {
        this.username = username;
        this.averageRating = averageRating;
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
