package com.Servify.controller;

public class EmptyDTOError extends Throwable {

    public static final String DTO_IS_EMPTY = "DTO is empty";

    EmptyDTOError() {
        super(DTO_IS_EMPTY);
    }
}
