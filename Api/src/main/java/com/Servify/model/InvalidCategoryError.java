package com.Servify.model;

public class InvalidCategoryError extends RuntimeException {

    public static final String THERE_IS_NO_SUCH_CATEGORY = "There is no such category";

    public InvalidCategoryError() {
        super(THERE_IS_NO_SUCH_CATEGORY);
    }
}
