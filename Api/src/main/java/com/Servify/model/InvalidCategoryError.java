package com.Servify.model;

public class InvalidCategoryError extends RuntimeException {

    public static final String THERE_IS_NO_SUCH_CATEGORY = "No existe la categoria ";

    public InvalidCategoryError(String cat) {
        super(THERE_IS_NO_SUCH_CATEGORY+cat);
    }
}
