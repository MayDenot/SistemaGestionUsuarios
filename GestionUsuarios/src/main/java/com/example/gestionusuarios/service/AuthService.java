package com.example.gestionusuarios.service;

import com.example.gestionusuarios.dto.request.LoginRequest;
import com.example.gestionusuarios.dto.request.RefreshTokenRequest;
import com.example.gestionusuarios.dto.request.RegisterRequest;
import com.example.gestionusuarios.dto.response.AuthResponse;
import com.example.gestionusuarios.entity.Role;
import com.example.gestionusuarios.entity.User;
import com.example.gestionusuarios.exception.EmailAlreadyExistsException;
import com.example.gestionusuarios.exception.InvalidPasswordException;
import com.example.gestionusuarios.exception.InvalidTokenException;
import com.example.gestionusuarios.exception.UserNotFoundException;
import com.example.gestionusuarios.mapper.UserMapper;
import com.example.gestionusuarios.repository.UserRepository;
import com.example.gestionusuarios.security.JwtService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public AuthResponse register(RegisterRequest dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new EmailAlreadyExistsException(dto.getEmail());
        }

        User user = UserMapper.registerToEntity(dto);

        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        user.setRole(Role.USER);

        userRepository.save(user);

        String token = jwtService.generateToken(user);

        System.out.println(token);

        return AuthResponse.builder()
                .accessToken(token)
                .user(UserMapper.toResponse(user))
                .build();
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException(request.getEmail()));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidPasswordException();
        }

        String accessToken = jwtService.generateToken(user);

        String refreshToken = jwtService.generateRefreshToken(user);

        return new AuthResponse(
                accessToken,
                refreshToken,
                UserMapper.toResponse(user)
        );
    }

    @Transactional
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        String email = jwtService.extractUsername(request.getRefreshToken());

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));

        if (!jwtService.isTokenValid(request.getRefreshToken(), user)) {
            throw new InvalidTokenException();
        }

        String newAccessToken = jwtService.generateToken(user);

        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(request.getRefreshToken())
                .user(UserMapper.toResponse(user))
                .build();
    }
}
