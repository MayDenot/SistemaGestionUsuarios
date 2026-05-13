package com.example.gestionusuarios.dto.response;

import com.example.gestionusuarios.entity.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Schema(description = "DTO para mostrar usuarios")
public class UserResponseDTO {
    @Schema(description = "ID del usuario", example = "1")
    private Long id;
    @Schema(description = "Nombre del usuario", example = "Juan")
    private String name;
    @Schema(description = "Email del usuario", example = "juan@example.com")
    private String email;
    @Schema(description = "Rol del usuario", example = "USER")
    private Role role;
    @Schema(description = "Fecha de creación del usuario", example = "13/05/2026 14:30:00")
    private LocalDateTime createAt;
}
