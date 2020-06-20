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

    public Calification(){}

    public Calification(Integer aValue) throws WrongValueError {

        if(aValue < 0 || aValue > 5){
            throw new WrongValueError("Invalid value for a calification");
        }else{
            this.calificationValue = aValue;
        }
    }

    public Integer getCalificationValue(){
        return this.calificationValue;
    }
}
