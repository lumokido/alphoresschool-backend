package com.lumo.backend.admin.dto;

import java.util.List;

public record GetAllTeacherProfile(
    List<TeacherProfileResponse> teachers,
    int pageNumber,
    int pageSize,
    long totalElements,
    int totalPages,
    boolean last
) {
    public GetAllTeacherProfile(List<TeacherProfileResponse> teachers) {
        this(teachers, 0, teachers.size(), teachers.size(), 1, true);
    }
}
