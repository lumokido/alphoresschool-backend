package com.lumo.backend.exams.dto;

import java.util.List;

public record ExamReportDto(
    Long examId,
    String examName,
    List<SubjectMarkDto> subjects,
    Double totalMarksObtained,
    Double totalMaxMarks,
    Double percentage
) {}
