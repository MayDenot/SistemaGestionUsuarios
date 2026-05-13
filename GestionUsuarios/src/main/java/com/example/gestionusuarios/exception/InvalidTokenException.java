package com.example.gestionusuarios.exception;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException() {
        super("Refresh token inválido");
    }
}
