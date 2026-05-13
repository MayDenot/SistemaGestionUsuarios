package com.example.gestionusuarios.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Schema(description = "Datos para iniciar sesión")
public class LoginRequest {
    @Schema(description = "Email del usuario", example = "juan@example.com")
    @Email(message = "Email inválido")
    @NotBlank(message = "El email es obligatorio")
    private String email;

    @Schema(description = "Contraseña del usuario", example = "miPassword123")
    @NotBlank(message = "La contraseña es obligatoria")
    private String password;
}
