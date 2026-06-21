package com.lumo.backend.admin.dto;

import java.util.List;

public record GetAllStudentProfile(
    List<StudentProfileResponse> students,
    int pageNumber,
    int pageSize,
    long totalElements,
    int totalPages,
    boolean last
) {
    public GetAllStudentProfile(List<StudentProfileResponse> students) {
        this(students, 0, students.size(), students.size(), 1, true);
    }
}
