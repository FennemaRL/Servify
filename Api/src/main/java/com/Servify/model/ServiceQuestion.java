package com.Servify.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class ServiceQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;

    private String consumerName;

    private String mail;

    private String question;
    private String answer;


    public ServiceQuestion(){}


    public ServiceQuestion(String question, String consumerName, String mail) throws InvalidQuestion {
        if(question.isEmpty() || consumerName.isEmpty() || mail.isEmpty()){
            throw new InvalidQuestion("el nombre, la pregunta o el mail no pueden estar vacios");
        }
        this.question= question;
        this.consumerName= consumerName;
        this.mail= mail;
    }

    public void addAnswer(String resp) throws InvalidQuestion {
        if(resp.isEmpty() ){
            throw new InvalidQuestion("la respuesta no puede estar vacia");
        }
        this.answer = resp;
    }

    public String getAnswer() {
        return answer;
    }

    public String getQuestion() {
        return question ;   }
}
