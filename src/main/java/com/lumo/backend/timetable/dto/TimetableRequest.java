package com.lumo.backend.timetable.dto;

public record TimetableRequest(
    Long classId,
    Long sectionId,
    String day,
    Integer period,
    String subject,
    Long teacherId
) {
}
