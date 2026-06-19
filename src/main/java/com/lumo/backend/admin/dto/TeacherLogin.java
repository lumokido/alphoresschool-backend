package com.lumo.backend.admin.dto;

public record TeacherLogin(
    boolean success,
    String emailId,
    String passwordHash
) {
    
}
