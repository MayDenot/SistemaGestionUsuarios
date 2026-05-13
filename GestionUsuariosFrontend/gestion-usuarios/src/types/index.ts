export interface User {
    id: number,
    name: string,
    email: string,
    role: string,
}

export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
    user: User,
}

export interface LoginRequest {
    email: string,
    password: string,
}

export interface RegisterRequest {
    name: string,
    email: string,
    password: string,
}

export interface UserRequestDTO {
    name: string,
    email: string,
}