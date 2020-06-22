package com.Servify.model;

public class ServiceProviderError extends RuntimeException {
    public static final String SERVICIO_YA_PROVISTO = "Error: Servicio ya provisto";

    public ServiceProviderError() {
        super(SERVICIO_YA_PROVISTO);
    }

    public ServiceProviderError(String msg) {
        super(msg);
    }
}
