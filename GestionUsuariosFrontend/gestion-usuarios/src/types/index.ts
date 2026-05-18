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

export interface ChangePasswordRequest {
    currentPassword: string,
    newPassword: string,
}

export interface UpdateProfileRequest {
    name: string,
    email: string,
}

export interface ChangePasswordForm extends ChangePasswordRequest {
    confirmPassword: string;
}

export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}