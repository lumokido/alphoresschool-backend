package com.lumo.backend.attendance.dto;

public record AttendanceHistoryRecord(
    Long studentId,
    String studentRegistrationId,
    String studentName,
    String className,
    String status
) {}
