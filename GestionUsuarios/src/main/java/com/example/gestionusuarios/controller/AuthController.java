package com.example.gestionusuarios.controller;

import com.example.gestionusuarios.dto.request.LoginRequest;
import com.example.gestionusuarios.dto.request.RefreshTokenRequest;
import com.example.gestionusuarios.dto.request.RegisterRequest;
import com.example.gestionusuarios.dto.response.AuthResponse;
import com.example.gestionusuarios.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticación", description = "Endpoints para registro e inicio de sesión")
public class AuthController {
    private final AuthService authService;

    @Operation(
            summary = "Registrar nuevo usuario",
            description = "Crea un nuevo usuario y devuelve un token JWT"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Usuario registrado exitosamente",
                    content = @Content(schema = @Schema(implementation = AuthResponse.class))
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "El email ya está registrado",
                    content = @Content(schema = @Schema(example = "El email ya está registrado: ejemplo@mail.com"))
            )
    })
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest dto) {
        return ResponseEntity.ok(authService.register(dto));
    }

    @Operation(
            summary = "Iniciar sesión",
            description = "Autenticar al usuario y devuelve access token y refresh token"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Login exitoso",
                    content = @Content(schema = @Schema(implementation = AuthResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Usuario no encontrado"
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Contraseña incorrecta"
            )
    })
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        return ResponseEntity.ok(authService.refreshToken(request));
    }
}
