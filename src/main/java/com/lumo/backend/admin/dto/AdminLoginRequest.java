package com.lumo.backend.admin.dto;

import jakarta.validation.constraints.NotBlank;

public record AdminLoginRequest(
        @NotBlank(message = "email id is required")
        String emailId,
        @NotBlank(message = "password is required")
        String passwordHash
) {
}
