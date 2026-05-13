package com.example.gestionusuarios.exception;

public class InvalidPasswordException extends RuntimeException {
    public InvalidPasswordException() {
        super("Contraseña incorrecta");
    }
}
