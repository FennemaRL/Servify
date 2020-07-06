package com.Servify.model;

public class InvalidReviewError extends Throwable {
    public InvalidReviewError(String s) {
        super(s);
    }
}