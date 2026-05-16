package com.example.gestionusuarios.service;

import com.example.gestionusuarios.dto.request.UserRequestDTO;
import com.example.gestionusuarios.dto.response.AuthResponse;
import com.example.gestionusuarios.dto.response.UserResponseDTO;
import com.example.gestionusuarios.entity.User;
import com.example.gestionusuarios.exception.InvalidPasswordException;
import com.example.gestionusuarios.exception.UserNotFoundException;
import com.example.gestionusuarios.mapper.UserMapper;
import com.example.gestionusuarios.repository.UserRepository;
import com.example.gestionusuarios.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional(readOnly = true)
    public List<UserResponseDTO> findAll() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(UserMapper::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserResponseDTO findById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        return UserMapper.toResponse(user);
    }

    @Transactional
    public UserResponseDTO update(Long id, UserRequestDTO dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());

        userRepository.save(user);
        return UserMapper.toResponse(user);
    }

    @Transactional
    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id); // 404
        }
        userRepository.deleteById(id);
    }

    @Transactional
    public void changePassword(Long id, String currentPassword, String newPassword) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new InvalidPasswordException();
        }

        user.setPassword(passwordEncoder.encode(newPassword));
    }

    @Transactional(readOnly = true)
    public UserResponseDTO findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));
        return UserMapper.toResponse(user);
    }
}
