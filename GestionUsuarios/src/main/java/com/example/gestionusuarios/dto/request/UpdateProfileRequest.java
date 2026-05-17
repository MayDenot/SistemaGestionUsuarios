package com.example.gestionusuarios.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Schema(description = "Datos para actualizar el perfil del usuario")
public class UpdateProfileRequest {
    private String name;
    private String email;
}
