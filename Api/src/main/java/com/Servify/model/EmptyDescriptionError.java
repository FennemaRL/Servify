package com.Servify.model;

public class EmptyDescriptionError extends RuntimeException {

    public static final String DESCRIPCIÓN_VACÍA = "Error: Descripción vacía";

    EmptyDescriptionError() {
        super(DESCRIPCIÓN_VACÍA);
    }
}
