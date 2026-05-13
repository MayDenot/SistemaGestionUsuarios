package com.example.gestionusuarios.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Schema(description = "DTO para crear o actualizar usuarios")
public class UserRequestDTO {
    @Schema(description = "Nombre del usuario", example = "Juan")
    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    @Schema(description = "Email del usuario", example = "juan@example.com")
    @Email(message = "Email inválido")
    @NotBlank(message = "El email es obligatorio")
    private String email;

    @Schema(description = "Fecha de creación del usuario", example = "13/05/2026 14:30:00")
    private LocalDateTime createAt;
}
