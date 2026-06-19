package com.lumo.backend.attendance.dto;

import java.time.LocalDate;
import java.util.List;

public record ClassAttendanceRequest(
    Long classId,
    Long sectionId,
    LocalDate date,
    List<String> absentStudentIds
) {}
