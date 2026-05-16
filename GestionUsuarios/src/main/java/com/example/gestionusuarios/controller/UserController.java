package com.example.gestionusuarios.controller;

import com.example.gestionusuarios.dto.request.UserRequestDTO;
import com.example.gestionusuarios.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
@Tag(name = "Usuarios", description = "Gestión de usuarios")
@SecurityRequirement(name = "Bearer Auth")
public class UserController {
    private final UserService userService;

    @Operation(summary = "Obtener todos los usuarios")
    @ApiResponse(responseCode = "200", description = "Lista de usuarios")
    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @Operation(summary = "Obtener usuario por ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Usuario encontrado"),
            @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@Valid
            @Parameter(description = "ID del usuario", example = "1")
            @PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @Operation(summary = "Actualizar usuario")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Usuario actualizado"),
            @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@Valid
            @Parameter(description = "ID del usuario", example = "1") @PathVariable Long id,
            @Valid @RequestBody UserRequestDTO dto) {
        userService.update(id, dto);
        return ResponseEntity.ok("Usuario actualizado con exito");
    }

    @Operation(summary = "Eliminar usuario")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Usuario eliminado"),
            @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@Valid
            @Parameter(description = "ID del usuario", example = "1")
            @PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.ok("Usuario eliminado");
    }

    @Operation(summary = "Cambiar contraseña")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Contraseña actualizada"),
            @ApiResponse(responseCode = "401", description = "Contraseña actual incorrecta"),
            @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @PutMapping("/{id}/password")
    public ResponseEntity<?> changePassword(@Parameter(description = "ID del usuario", example = "1")
              @PathVariable Long id,
              @RequestBody String currentPassword,
              @RequestBody String newPassword) {
        userService.changePassword(id, currentPassword, newPassword);
        return ResponseEntity.ok("Contraseña actualizada con éxito");
    }

    @Operation(summary = "Obtener usuario por token")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Usuario encontrado"),
            @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @GetMapping("/me")
    public ResponseEntity<?> getUserFromToken(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(userService.findByEmail(email));
    }
}
