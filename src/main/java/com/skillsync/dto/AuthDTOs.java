package com.skillsync.dto;

import lombok.*;
import java.time.LocalDateTime;

public class AuthDTOs {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RegisterRequest {
        private String username;
        private String password;
        private String email;
        private String role; // "CANDIDATE", "EMPLOYER", "POLICY_OFFICER"
        private String district;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class LoginRequest {
        private String username;
        private String password;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AuthResponse {
        private Long userId;
        private String username;
        private String email;
        private String role;
        private String token; // Bearer token for mobile sessions
        private String message;
        private LocalDateTime expiresAt;
    }
}
