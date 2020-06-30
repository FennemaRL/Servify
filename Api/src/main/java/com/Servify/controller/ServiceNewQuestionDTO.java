package com.Servify.controller;

import lombok.Data;

@Data
public class ServiceNewQuestionDTO implements DTOServify{

    private String providerName;
    private String serviceCategory;
    private String question;
    private String consumerName;
    private String consumerEmail;

    @Override
    public void assertEmpty() throws EmptyDTOError {

    }

    public String getProviderName() {
        return providerName;
    }

    public String getServiceCategory() {
        return serviceCategory;
    }

    public String getConsumerName() {
        return consumerName;
    }

    public String getConsumerEmail() {
        return consumerEmail;
    }

    public String getQuestion() {
        return question;
    }
}
