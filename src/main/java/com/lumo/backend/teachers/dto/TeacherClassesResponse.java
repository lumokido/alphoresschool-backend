package com.lumo.backend.teachers.dto;

import java.util.List;

public record TeacherClassesResponse(
    String homeroomClass,
    String homeroomSection,
    List<String> assignedClasses
) {}
