package com.example.gestionusuarios.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Schema(description = "DTO para registrar usuarios")
public class RegisterRequest {
    @Schema(description = "Nombre del usuario", example = "Juan")
    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    @Schema(description = "Email del usuario", example = "juan@example.com")
    @Email(message = "Email inválido")
    @NotBlank(message = "El email es obligatorio")
    private String email;

    @Schema(description = "Contraseña del usuario", example = "miPassword123")
    @Size(min = 8)
    private String password;
}
