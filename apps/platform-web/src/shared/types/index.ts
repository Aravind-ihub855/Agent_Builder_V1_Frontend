export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    is_verified: boolean;
    is_googleSignup?: boolean;
    createdAt?: string;
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
}
