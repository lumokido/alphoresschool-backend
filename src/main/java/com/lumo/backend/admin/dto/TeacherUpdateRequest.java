package com.lumo.backend.admin.dto;

import java.util.ArrayList;

public record TeacherUpdateRequest(
    boolean success,
    String emailId,
    String passwordHash,
    String name,
    String mobileNumber,
    String classTeacher,
    ArrayList<String> classes,
    ArrayList<String> subjects
) {
}
