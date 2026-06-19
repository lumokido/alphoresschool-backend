package com.lumo.backend.students.dto;

public record StudentUpdate(
    String firstName,
    String lastName,
    String middleName,
    String mobileNumber,
    String parentName,
    String dateOfBirth,
    String gender,
    String rollNumber,
    String studentClass,
    String marks,
    String profilePhotoUrl
) {}