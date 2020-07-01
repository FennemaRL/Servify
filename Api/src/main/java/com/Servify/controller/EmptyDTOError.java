package com.Servify.controller;

public class EmptyDTOError extends Throwable {

    public static final String DTO_IS_EMPTY = "Alguno de los parametros del body esta vacio";

    EmptyDTOError() {
        super(DTO_IS_EMPTY);
    }
}
