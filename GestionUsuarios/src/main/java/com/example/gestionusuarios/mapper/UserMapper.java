package com.example.gestionusuarios.mapper;

import com.example.gestionusuarios.dto.request.RegisterRequest;
import com.example.gestionusuarios.dto.request.UserRequestDTO;
import com.example.gestionusuarios.dto.response.UserResponseDTO;
import com.example.gestionusuarios.entity.User;

public class UserMapper {
    public static User registerToEntity(RegisterRequest dto) {
        User user = new User();

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());

        return user;
    }

    public static User toEntity(UserRequestDTO dto) {
        User user = new User();

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());

        return user;
    }

    public static UserResponseDTO toResponse(User user) {
        return new UserResponseDTO (
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getCreatedAt()
        );
    }
}
