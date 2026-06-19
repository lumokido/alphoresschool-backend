package com.lumo.backend.classes.dto;

public record ClassResponse(
    Long id,
    String name,
    String assignedTeacher,
    Integer totalStudents,
    Integer totalTeachers,
    Integer totalSections,
    String subject
) {}
