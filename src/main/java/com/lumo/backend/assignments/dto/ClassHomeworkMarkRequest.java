package com.lumo.backend.assignments.dto;

import java.time.LocalDate;
import java.util.List;

public record ClassHomeworkMarkRequest(
    LocalDate submissionDate,
    List<String> studentIdsToMark, // e.g., the students who completed it (or didn't depending on default status)
    String defaultStatus,          // Status to apply to everyone else (e.g., "COMPLETED")
    String targetStatus            // Status to apply to studentIdsToMark (e.g., "INCOMPLETE")
) {}
