package com.example.gestionusuarios.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Schema(description = "DTO para actualizar tokens")
public class RefreshTokenRequest {
    @Schema(description = "Token para renovar el acceso", example = "eyJhbGciOiJIUzI1NiJ9...")
    @NotBlank(message = "El refresh token es obligatorio")
    private String refreshToken;
}