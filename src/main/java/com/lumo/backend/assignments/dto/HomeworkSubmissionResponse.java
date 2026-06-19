package com.lumo.backend.assignments.dto;

import java.time.LocalDate;

public record HomeworkSubmissionResponse(
    Long id,
    Long assignmentId,
    String studentId,
    String studentName,
    String status,
    LocalDate submissionDate,
    String teacherRemarks,
    String attachmentUrl
) {}
