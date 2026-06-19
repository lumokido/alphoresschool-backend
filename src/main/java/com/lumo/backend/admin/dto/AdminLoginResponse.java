package com.lumo.backend.admin.dto;

public record AdminLoginResponse(
        boolean success,
        String message,
        String token,
        String type
) {
}

