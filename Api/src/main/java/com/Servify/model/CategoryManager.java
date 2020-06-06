package com.Servify.model;

import java.util.ArrayList;
import java.util.List;

public class CategoryManager {

    public static final List<CategoryService> CATEGORY_SERVICES = new ArrayList<>();

    static {
        CATEGORY_SERVICES.add(new CategoryService("Electricidad", "https://i.ibb.co/H4Lf2cK/elec-Lista.jpg"));
        CATEGORY_SERVICES.add(new CategoryService("Mecanica", "https://i.ibb.co/X52sdtD/meca-Lista.jpg"));
        CATEGORY_SERVICES.add(new CategoryService("Carpinteria", "https://i.ibb.co/b7tB76s/carp-Lista.jpg"));
        CATEGORY_SERVICES.add(new CategoryService("Plomeria", "https://i.ibb.co/B27vf53/plome-Lista.jpg"));
        CATEGORY_SERVICES.add(new CategoryService("Gas Natural", "https://i.ibb.co/LJ5cD2m/gas.jpg"));
    }


    public static List<CategoryService> categories() {
        return CATEGORY_SERVICES;
    }

}
