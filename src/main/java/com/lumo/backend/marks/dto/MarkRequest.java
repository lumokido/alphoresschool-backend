package com.lumo.backend.marks.dto;

public record MarkRequest(
    String studentId,
    Long examId,
    String subject,
    Integer marksObtained,
    Integer maxMarks
) {
}
