package com.Servify.model;

public class ServiceProvideError extends RuntimeException {
    public ServiceProvideError(String msg) {
        super(msg);
    }
}
