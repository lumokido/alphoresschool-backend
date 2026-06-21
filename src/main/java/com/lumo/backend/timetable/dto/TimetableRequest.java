package com.lumo.backend.timetable.dto;

import java.time.LocalTime;

public record TimetableRequest(
    Long classId,
    Long sectionId,
    String day,
    Integer period,
    String subject,
    Long teacherId,
    String type,
    LocalTime startTime,
    LocalTime endTime
) {
}
