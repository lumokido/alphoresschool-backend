package com.lumo.backend.admin.dto;

public record StudentProfileResponse(
        Long id,
        String firstName,
        String lastName,
        String middleName,
        String mobileNumber,
        String parentName,
        String dateOfBirth,
        String gender,
        String rollNumber,
        String studentClass,
        String profilePhotoUrl
) {}
