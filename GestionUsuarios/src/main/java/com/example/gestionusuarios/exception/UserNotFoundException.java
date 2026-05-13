package com.example.gestionusuarios.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("Usuario con id " + id + " no encontrado");
    }

    public UserNotFoundException(String email) {
        super("Usuario no encontrado con email: " + email);
    }
}