package com.skillsync.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/health")
@Tag(name = "Health Check", description = "Connectivity test endpoint for Android app and clients")
public class HealthController {

    @GetMapping
    @Operation(summary = "Ping backend to verify mobile-to-server IP connectivity")
    public ResponseEntity<Map<String, Object>> ping() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("platform", "SkillSync AI (SIH26134)");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("message", "Connected successfully to SkillSync AI Spring Boot Backend!");
        return ResponseEntity.ok(response);
    }
}

