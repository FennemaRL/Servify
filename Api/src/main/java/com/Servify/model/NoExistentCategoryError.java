package com.Servify.model;

public class NoExistentCategoryError extends RuntimeException {

    public static final String NO_EXISTE_ESA_CATEGORIA_EN_EL_SISTEMA = "No existe esa categoria en el sistema";

    public NoExistentCategoryError() {
        super(NO_EXISTE_ESA_CATEGORIA_EN_EL_SISTEMA);
    }
}
