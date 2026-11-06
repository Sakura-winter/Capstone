package com.skillsync.controller;

import com.skillsync.dto.AuthDTOs;
import com.skillsync.model.User;
import com.skillsync.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication & User Management", description = "Endpoints for Android user registration, login, and token session issuance")
public class AuthController {

    private final UserRepository userRepository;

    @PostMapping("/register")
    @Operation(summary = "Register a new user (Candidate, Employer, or Policy Officer)")
    public ResponseEntity<AuthDTOs.AuthResponse> register(@RequestBody AuthDTOs.RegisterRequest req) {
        if (userRepository.existsByUsername(req.getUsername())) {
            return ResponseEntity.badRequest().body(AuthDTOs.AuthResponse.builder()
                    .message("Error: Username already exists.")
                    .build());
        }

        User user = User.builder()
                .username(req.getUsername())
                .password(req.getPassword()) // In production, hash with BCrypt
                .email(req.getEmail())
                .role(req.getRole() != null ? req.getRole().toUpperCase() : "CANDIDATE")
                .district(req.getDistrict() != null ? req.getDistrict() : "Pune")
                .build();

        User saved = userRepository.save(user);
        String token = "skillsync-jwt-" + UUID.randomUUID();

        return ResponseEntity.ok(AuthDTOs.AuthResponse.builder()
                .userId(saved.getId())
                .username(saved.getUsername())
                .email(saved.getEmail())
                .role(saved.getRole())
                .token(token)
                .message("User registered successfully.")
                .expiresAt(LocalDateTime.now().plusDays(7))
                .build());
    }

    @PostMapping("/login")
    @Operation(summary = "Login user and retrieve session token")
    public ResponseEntity<AuthDTOs.AuthResponse> login(@RequestBody AuthDTOs.LoginRequest req) {
        Optional<User> userOpt = userRepository.findByUsername(req.getUsername());

        if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(req.getPassword())) {
            return ResponseEntity.status(401).body(AuthDTOs.AuthResponse.builder()
                    .message("Invalid username or password.")
                    .build());
        }

        User user = userOpt.get();
        String token = "skillsync-jwt-" + UUID.randomUUID();

        return ResponseEntity.ok(AuthDTOs.AuthResponse.builder()
                .userId(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .token(token)
                .message("Login successful.")
                .expiresAt(LocalDateTime.now().plusDays(7))
                .build());
    }
}
