package com.Servify.model;

import javax.persistence.*;

@Entity
public class ServiceServify {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;
    @OneToOne(cascade=CascadeType.ALL)
    private CategoryService category;

    public ServiceServify() {
    }

    public ServiceServify(CategoryService category) {
        this.category = category;
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
}
