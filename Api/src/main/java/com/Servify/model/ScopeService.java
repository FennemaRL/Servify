package com.Servify.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class ScopeService {
    @Id
    @Column
    private String scope;

    public ScopeService() { }

    public ScopeService(String scope) { this.scope = scope; }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

}
