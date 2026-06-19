package com.lumo.backend.students.dto;


public record StudentAddResponse(
    String message,
    Long studentId,
    String profilePhotoUrl
) {}