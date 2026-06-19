package com.lumo.backend.admin.controller;

import com.lumo.backend.admin.dto.AdminLoginRequest;
import com.lumo.backend.admin.dto.AdminLoginResponse;
import com.lumo.backend.admin.dto.AdminProfileResponse;
import com.lumo.backend.admin.dto.AdminRegisterRequest;
import com.lumo.backend.admin.dto.AdminRegisterResponse;
import com.lumo.backend.admin.service.AdminAuthService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminAuthController {

    private final AdminAuthService adminAuthService;

    public AdminAuthController(AdminAuthService adminAuthService) {
        this.adminAuthService = adminAuthService;
    }

    @PostMapping("/login")
    public ResponseEntity<AdminLoginResponse> login(@Valid @RequestBody AdminLoginRequest request) {
        String token = adminAuthService.login(request);
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AdminLoginResponse(false, "Invalid username or password", null, null));
        }
        return ResponseEntity.ok(new AdminLoginResponse(true, "Principal login successful", token, "principal"));
    }

    @PostMapping("/register")
    public ResponseEntity<AdminRegisterResponse> register(@Valid @RequestBody AdminRegisterRequest request) {
        boolean ok = adminAuthService.register(request);
        if (!ok) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AdminRegisterResponse(false, "Failed to register admin"));
        }
        return ResponseEntity.ok(new AdminRegisterResponse(true, "Admin registered successfully"));
    }

    @GetMapping("/profile")
    public ResponseEntity<AdminProfileResponse> getProfile(

            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
                System.out.println("Authorization header: " + authorizationHeader);
        AdminProfileResponse profile = adminAuthService.getProfile(authorizationHeader);
        if (profile == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(profile);
    }
}

