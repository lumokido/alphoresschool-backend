package com.lumo.backend.classes.dto;

public record SectionResponse(
    Long id,
    String name,
    Long classId,
    String className,
    String assignedTeacher,
    Integer totalStudents,
    Integer totalTeachers,
    String subject
) {}
