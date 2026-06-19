package com.lumo.backend.exams.dto;

import java.util.List;

public record ReportCardResponse(
    String studentId,
    String studentName,
    String className,
    String sectionName,
    List<ExamReportDto> exams
) {}
