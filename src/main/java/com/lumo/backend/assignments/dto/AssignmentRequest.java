package com.lumo.backend.assignments.dto;

import java.time.LocalDate;

public record AssignmentRequest(
    Long classId,
    Long sectionId,
    String type,
    String title,
    String description,
    String imageUrl,
    LocalDate assignedDate,
    LocalDate dueDate,
    String createdBy
) {}
