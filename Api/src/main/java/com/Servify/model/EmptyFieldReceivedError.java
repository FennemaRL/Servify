package com.Servify.model;

public class EmptyFieldReceivedError extends Throwable {

    public EmptyFieldReceivedError(String errorMessage) {
        super(errorMessage);
    }
}
