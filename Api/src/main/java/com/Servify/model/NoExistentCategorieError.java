package com.Servify.model;

public class NoExistentCategorieError extends Throwable {
    public NoExistentCategorieError(String s) {
        super(s);
    }
}
