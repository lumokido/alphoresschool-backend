package com.lumo.backend.exams.dto;

public record SubjectMarkDto(
    Long subjectId,
    String subjectName,
    Double maxMarks,
    Double marksObtained,
    String grade,
    String remarks
) {}
