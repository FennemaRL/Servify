package com.Servify.model;

public class WrongValueError extends Throwable {
    public WrongValueError(String message) {
        super(message);
    }
}
