package com.Servify.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class CategoryManager {
    public static List<CategoryService> listOfCategories() {
        List<CategoryService> list = new ArrayList();
        list.add(new CategoryService("Electricidad","https://i.ibb.co/H4Lf2cK/elec-Lista.jpg"));
        list.add(new CategoryService("Mecanica","https://i.ibb.co/X52sdtD/meca-Lista.jpg"));
        list.add(new CategoryService("Carpinteria","https://i.ibb.co/b7tB76s/carp-Lista.jpg"));
        list.add(new CategoryService("Plomeria","https://i.ibb.co/B27vf53/plome-Lista.jpg"));
        list.add(new CategoryService("Gas Natural","https://i.ibb.co/LJ5cD2m/gas.jpg"));
        return list;
    }

    public static ServiceL createService(String cat) throws NoExistentCategorieError {
       List<CategoryService> matchCategories =  listOfCategories().stream().filter(categoryService -> {return categoryService.getName().equals(cat);}).collect(Collectors.toList());
       if (matchCategories.size() != 0){
           return new ServiceL(matchCategories.get(0));
       }
       throw new NoExistentCategorieError();
    }
}
