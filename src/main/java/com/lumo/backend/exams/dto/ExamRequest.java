package com.lumo.backend.exams.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import java.util.List;

public record ExamRequest(
    Long classId,
    String examName,
    LocalDate startDate,
    LocalDate endDate,
    String status,
    List<ExamSubjectRequest> subjects
) {
}
