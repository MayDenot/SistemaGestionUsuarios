package com.example.gestionusuarios.service;

import com.example.gestionusuarios.dto.request.UpdateProfileRequest;
import com.example.gestionusuarios.dto.request.UserRequestDTO;
import com.example.gestionusuarios.dto.response.UserResponseDTO;
import com.example.gestionusuarios.entity.User;
import com.example.gestionusuarios.exception.InvalidPasswordException;
import com.example.gestionusuarios.exception.SamePasswordException;
import com.example.gestionusuarios.exception.UserNotFoundException;
import com.example.gestionusuarios.mapper.UserMapper;
import com.example.gestionusuarios.repository.UserRepository;
import com.example.gestionusuarios.specification.UserSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public Page<UserResponseDTO> findAll(String name, String email, String role, Pageable pageable) {
        Specification<User> spec = Specification
                .where(UserSpecification.hasName(name))
                .or(UserSpecification.hasEmail(email))
                .or(UserSpecification.hasRole(role));

        return userRepository.findAll(spec, pageable)
                .map(UserMapper::toResponse);
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
    public void changePassword(String email, String currentPassword, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new InvalidPasswordException();
        }

        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            throw new SamePasswordException();
        }

        user.setPassword(passwordEncoder.encode(newPassword));
    }

    @Transactional(readOnly = true)
    public UserResponseDTO findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));
        return UserMapper.toResponse(user);
    }

    @Transactional
    public UserResponseDTO updateProfile(String email, UpdateProfileRequest dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());

        userRepository.save(user);

        return UserMapper.toResponse(user);
    }
}
