package com.Servify.controller;

import lombok.Data;

@Data
public class ServiceQuestionAnswerDTO implements  DTOServify{

    private String providerName;
    private String serviceCategory;
    private String question;
    private String answer;
    public String getProviderName() {
        return providerName;
    }

    public String getServiceCategory() {
        return serviceCategory;
    }

    @Override
    public void assertEmpty() throws EmptyDTOError {
        if (providerName.equals("") ||  serviceCategory.equals("") ||  question.equals("") ||  answer.equals("")) {
            throw new EmptyDTOError();
        }
    }

    public String getResponse() {
        return answer;
    }

    public String getQuestion() {
        return question;
    }
}
