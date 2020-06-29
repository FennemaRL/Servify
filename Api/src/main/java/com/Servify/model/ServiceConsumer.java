package com.Servify.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class ServiceConsumer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;
    @Column(unique = true)
    private String name;
    @Column
    private String email;

    public ServiceConsumer() { }

    public ServiceConsumer(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getEmail() { return email; }

    public String getName() { return name; }
}
