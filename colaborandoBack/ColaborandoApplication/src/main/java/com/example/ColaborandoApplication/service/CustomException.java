package com.example.ColaborandoApplication.service;

public class CustomException extends RuntimeException {
    public CustomException(String message) {
        super(message);
    }
}