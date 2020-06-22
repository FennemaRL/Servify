package com.Servify.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
public class ServiceServify {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;
    @OneToOne(cascade = CascadeType.ALL)
    private CategoryService category;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Calification> califications;
    @Column
    private String description;
    @ManyToMany (cascade = CascadeType.ALL)
    private List<ScopeService> scopeAreas;

    public ServiceServify() {
    }

    public ServiceServify(CategoryService category) {

        this.category = category;
        this.califications = new ArrayList<Calification>();
        this.scopeAreas = new ArrayList<ScopeService>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean hasCategory(String category) {
        return this.category.getCategory().equals(category);
    }

    public CategoryService getCategory() {
        return category;
    }

    public void setCategory(CategoryService category) {
        this.category = category;
    }

    public boolean sameCategory(ServiceServify serv) {
        return serv.sameCategory(this.category);
    }

    public boolean sameCategory(CategoryService categoryService) {
        return this.category.equals(categoryService);
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void addCalification(Calification calificacion) {
        this.califications.add(calificacion);
    }

    public List<Calification> getCalifications(){
        return this.califications;
    }

    public List<ScopeService> getScopes() { return this.scopeAreas;}

    public void setScope(List scope) { this.scopeAreas = scope;}

}
