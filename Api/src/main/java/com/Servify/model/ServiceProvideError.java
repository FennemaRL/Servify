package com.Servify.model;


public class ServiceProvideError extends Throwable {
    public static final String SERVICIO_YA_PROVISTO = "Error: Servicio ya provisto";

    public ServiceProvideError() {
        super(SERVICIO_YA_PROVISTO);
    }
}
