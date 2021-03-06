package com.Servify.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
public class MetalslugCharacter {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private long id;
    private String name;
    private String haircolor;
    public MetalslugCharacter(){}
    public MetalslugCharacter(String name, String color){
        this.name=name;
        haircolor=color;
    }
    @Override
    public String toString(){
        return name +' '+ haircolor;
    }
}
