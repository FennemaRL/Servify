package com.Servify.model;

public class ServiceL {
    private final CategoryService cat;

    public ServiceL(CategoryService categoryService) {
    this.cat = categoryService;
    }

    public boolean sameCategory(ServiceL serv){
        return serv.sameCategory(this.cat);
    }

    public boolean sameCategory(CategoryService cate) {
        return this.cat.equals(cate);
    }

}
