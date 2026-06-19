package com.lumo.backend.teachers.dto;

import java.util.List;

public record GetAllTeacherProfile(List<TeacherProfileResponse> teachers) {
}
