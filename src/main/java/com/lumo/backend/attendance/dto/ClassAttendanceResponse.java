package com.lumo.backend.attendance.dto;

import com.lumo.backend.students.dto.StudentResponse;
import java.time.LocalDate;
import java.util.List;

public record ClassAttendanceResponse(
    LocalDate date,
    List<StudentResponse> presentStudents,
    List<StudentResponse> absentStudents
) {}
