package com.lumo.backend.attendance.dto;

import java.time.LocalDate;

public record DailyAttendanceStatsResponse(
    LocalDate date,
    long totalStudentsInSchool,
    long totalStudentsMarked,
    long totalPresent,
    long totalAbsent
) {}
