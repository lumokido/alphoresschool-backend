package com.lumo.backend.teachers.dto;

public record TeacherResponse (
    boolean success,
    String message,
    String token
){
}
