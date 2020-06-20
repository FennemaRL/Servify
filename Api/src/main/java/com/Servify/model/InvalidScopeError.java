package com.Servify.model;

public class InvalidScopeError extends RuntimeException{
    public static final String THERE_IS_NO_SUCH_SCOPE = "No existe la zona ";

    public InvalidScopeError(String zona) {
        super(THERE_IS_NO_SUCH_SCOPE+zona);
    }
}
