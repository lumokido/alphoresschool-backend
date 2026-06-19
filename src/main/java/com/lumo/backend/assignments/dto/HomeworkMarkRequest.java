package com.lumo.backend.assignments.dto;

import java.time.LocalDate;

public record HomeworkMarkRequest(
    String studentId,
    String status,
    LocalDate submissionDate,
    String teacherRemarks,
    String attachmentUrl
) {}
