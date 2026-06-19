package com.lumo.backend.exams.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record ExamSubjectRequest(
    String subject,
    LocalDate examDate,
    LocalTime startTime,
    LocalTime endTime,
    Integer maxMarks
) {}
