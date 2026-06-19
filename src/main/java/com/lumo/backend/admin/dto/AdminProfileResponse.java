package com.lumo.backend.admin.dto;

public record AdminProfileResponse(
        Long id,
        String name,
        String emailId,
        String schoolName
) {
}
