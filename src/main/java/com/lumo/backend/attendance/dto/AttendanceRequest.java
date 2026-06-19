package com.lumo.backend.attendance.dto;

import java.time.LocalDate;

public record AttendanceRequest(String studentId, LocalDate attendanceDate, String status) {}
