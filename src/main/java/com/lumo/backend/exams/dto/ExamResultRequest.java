package com.lumo.backend.exams.dto;

public record ExamResultRequest(
    String studentId,
    Double marksObtained,
    String grade,
    String remarks
) {}
