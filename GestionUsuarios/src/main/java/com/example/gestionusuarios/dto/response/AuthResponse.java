package com.example.gestionusuarios.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Schema(description = "Respuesta de autenticación con tokens JWT")
public class AuthResponse {
    @Schema(description = "Token de acceso JWT", example = "eyJhbGciOiJIUzI1NiJ9...")
    private String accessToken;
    @Schema(description = "Token para renovar el acceso", example = "eyJhbGciOiJIUzI1NiJ9...")
    private String refreshToken;
    @Schema(description = "Datos del usuario autenticado")
    private UserResponseDTO user;
}
