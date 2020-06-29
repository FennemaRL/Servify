package com.Servify.model;

import javax.persistence.*;

@Entity
public class Calification {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;
    @Column
    private Integer calificationValue;
    @ManyToOne(cascade = CascadeType.ALL)
    private ServiceConsumer consumer;
    @Column
    private String message;

    public Calification(){}

    public Calification(Integer aValue) throws WrongValueError {

        if(aValue < 0 || aValue > 5){
            throw new WrongValueError("Invalid value for a calification");
        }else{
            this.calificationValue = aValue;
            this.message = "";
        }
    }

    public Calification(Integer aValue, ServiceConsumer consumer, String message) throws WrongValueError {

        if(aValue < 0 || aValue > 5){
            throw new WrongValueError("Invalid value for a calification");
        }else{
            this.calificationValue = aValue;
            this.consumer = consumer;
            this.message = message;
        }
    }

    public Integer getCalificationValue(){
        return this.calificationValue;
    }

    public String getMessage() { return message; }

    public ServiceConsumer getConsumer() { return consumer; }
}
