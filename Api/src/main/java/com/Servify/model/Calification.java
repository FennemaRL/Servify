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
    @OneToOne(cascade = CascadeType.ALL)
    private ServiceConsumer consumer;
    @Column
    private String comments;

    public Calification(){}

    public Calification(Integer aValue) throws WrongValueError {

        if(aValue < 0 || aValue > 5){
            throw new WrongValueError("Invalid value for a calification");
        }else{
            this.calificationValue = aValue;
            this.comments = "";
        }
    }

    public Calification(Integer aValue, String comments, ServiceConsumer consumer) throws WrongValueError {

        if(aValue < 0 || aValue > 5){
            throw new WrongValueError("Invalid value for a calification");
        }else{
            this.calificationValue = aValue;
            this.comments = comments;
            this.consumer = consumer;
        }
    }

    public Integer getCalificationValue(){
        return this.calificationValue;
    }

    public String getComments() { return comments; }

    public ServiceConsumer getConsumer() { return consumer; }
}
