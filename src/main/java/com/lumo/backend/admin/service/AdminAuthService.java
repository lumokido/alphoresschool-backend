package com.lumo.backend.admin.service;

import com.lumo.backend.admin.dto.AdminLoginRequest;
import com.lumo.backend.admin.dto.AdminProfileResponse;
import com.lumo.backend.admin.dto.AdminRegisterRequest;
import com.lumo.backend.admin.entity.Principal;
import com.lumo.backend.admin.repository.PrincipalRepository;
import com.lumo.backend.security.JwtService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminAuthService {

    private final PrincipalRepository principalRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AdminAuthService(
            PrincipalRepository principalRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.principalRepository = principalRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public java.util.Map<String, String> login(AdminLoginRequest request) {
        Principal principal = principalRepository.findByEmailId(request.emailId()).orElse(null);
        if (principal == null || !passwordEncoder.matches(request.passwordHash(), principal.getPasswordHash())) {
            return null;
        }
        java.util.Map<String, String> tokens = new java.util.HashMap<>();
        tokens.put("accessToken", jwtService.generateAdminToken(principal.getEmailId()));
        tokens.put("refreshToken", jwtService.generateAdminRefreshToken(principal.getEmailId()));
        return tokens;
    }

    public String refreshAccessToken(String refreshToken) {
        String emailId = jwtService.extractAdminSubject(refreshToken);
        if (emailId == null) {
            return null;
        }
        Principal principal = principalRepository.findByEmailId(emailId).orElse(null);
        if (principal == null) {
            return null;
        }
        return jwtService.generateAdminToken(principal.getEmailId());
    }

    public AdminProfileResponse getProfile(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return null;
        }

        String token = authorizationHeader.substring(7);
        String emailId = jwtService.extractAdminSubject(token);
        if (emailId == null) {
            return null;
        }

        Principal principal = principalRepository.findByEmailId(emailId).orElse(null);
        if (principal == null) {
            return null;
        }

        return new AdminProfileResponse(principal.getId(), principal.getName(), principal.getEmailId(), principal.getSchoolName());
    }
    
    public boolean register(AdminRegisterRequest request) {
   

        Principal principal = new Principal();
        principal.setName(request.name());
        principal.setPasswordHash(passwordEncoder.encode(request.passwordHash()));
        principal.setSchoolName(request.schoolName());
        principal.setEmailId(request.emailId());
        principal.setMobileNumber(request.mobileNumber());
        Principal savedPrincipal = principalRepository.save(principal);
        return savedPrincipal.getId() != null;
    }
}